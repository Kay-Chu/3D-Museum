import { useEffect, useMemo, memo, useRef, useState, useCallback } from "react";
import { useSnapshot } from "valtio";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import state from "./store";

const OPTIMIZATION_SETTINGS = {
  cylinderSegments: 64,
  layerStep: 0.2,
  normalUpdateInterval: 5
};

const ModelForAI = memo((resetFlag, props) => {

  // Configs
  const snap = useSnapshot(state);
  const { camera, gl } = useThree();
  const geometry = useMemo(() => {
    const geom = new THREE.CylinderGeometry(0.7, 0.7, 2, OPTIMIZATION_SETTINGS.cylinderSegments, OPTIMIZATION_SETTINGS.cylinderSegments,false);

    const posAttr = geom.attributes.position;
    const threshold = 1e-5;
    const duplicates = new Map();
    const grid = new Map();
    const gridSize = 0.01;

    for (let i = 0; i < posAttr.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
      const key = `${Math.floor(v.x/gridSize)},${Math.floor(v.y/gridSize)},${Math.floor(v.z/gridSize)}`;
      
      if (!grid.has(key)) grid.set(key, []);
      const cell = grid.get(key);
      
      for (const j of cell) {
        const v2 = new THREE.Vector3().fromBufferAttribute(posAttr, j);
        if (v.distanceTo(v2) < threshold) {
          if (!duplicates.has(i)) duplicates.set(i, []);
          duplicates.get(i).push(j);
        }
      }
      cell.push(i);
    }

    geom.userData.layers = new Map();
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      const layerKey = Math.round(y / OPTIMIZATION_SETTINGS.layerStep);
      
      if (!geom.userData.layers.has(layerKey)) {
        geom.userData.layers.set(layerKey, []);
      }
      geom.userData.layers.get(layerKey).push(i);
    }

    geom.userData.duplicateMap = duplicates;
    return geom;
  }, []);


  // States & Refs
  const meshRef = useRef();
  const originalPositions = useRef(null);
  const originalNormals = useRef(null);
  const normalUpdateCounter = useRef(0);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useMemo(() => new THREE.Vector2(), []);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Variables
  const maxDisplacement = 0.3;

  // =============== Texture =============== 
  const [logoPosition, setLogoPosition] = useState({ x: 0.5, y: 0.5, size: 0.5 });

  const fullTexture = useMemo(() => {
    if (!snap.fullDecal) return null;
    return new THREE.TextureLoader().load(snap.fullDecal);
  }, [snap.fullDecal]);

  const logoTexture = useMemo(() => {
    if (!snap.logoDecal) return null;
    const texture = new THREE.TextureLoader().load(snap.logoDecal);
    texture.encoding = THREE.sRGBEncoding; 
    return texture;
  }, [snap.logoDecal]);

  const baseTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 2;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = snap.color;
      ctx.fillRect(0, 0, 2, 2);
    }
    return new THREE.CanvasTexture(canvas);
  }, [snap.color]);

  const shaderMaterial = useMemo(() => {
    if (!logoTexture) return null;
    return new THREE.ShaderMaterial({
      uniforms: {
        baseMap: { value: baseTexture },
        logoMap: { value: logoTexture },
        logoPosition: { value: new THREE.Vector2(logoPosition.x, logoPosition.y) },
        logoSize: { value: logoPosition.size },
        opacity: { value: 0.5 },
        lightPosition: { value: new THREE.Vector3(0, 5, 10) },
        lightColor: { value: new THREE.Color(0xffffff) },
        ambientColor: { value: new THREE.Color(0x404040) },
        specularPower: { value: 30 },
        specularIntensity: { value: 0.5 },

        envMap: { value: null },
        reflectivity: { value: 0.2 },
      },
      vertexShader: `
      uniform mat4 shadowMatrix;
      varying vec4 vShadowCoord;
      varying vec3 vNormal;
      varying vec2 vUv;
      varying vec3 vViewPosition;
      
      void main() {
        vUv = uv;
        vNormal = normalMatrix * normal;
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vViewPosition = -worldPosition.xyz;

        vShadowCoord = shadowMatrix * worldPosition;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
      fragmentShader: `
      uniform sampler2D baseMap;
      uniform sampler2D logoMap;
      uniform sampler2D shadowMap;
      uniform vec2 logoPosition;
      uniform float logoSize;
      uniform float opacity;

      // lights
      uniform vec3 lightPosition;
      uniform vec3 lightColor;
      uniform vec3 ambientColor;
      uniform float lightIntensity;
      
      
      varying vec4 vShadowCoord;
      varying vec3 vNormal;
      varying vec2 vUv;
      varying vec3 vViewPosition;

      float getShadow() {
        vec3 shadowCoord = vShadowCoord.xyz / vShadowCoord.w;
        shadowCoord = shadowCoord * 0.5 + 0.5;
        
        if (shadowCoord.z > 1.0) return 0.0;
        
        float depth = texture2D(shadowMap, shadowCoord.xy).r;
        float bias = 0.001;
        return shadowCoord.z - bias > depth ? 0.5 : 0.0;
      }
        void main() {
          vec4 baseColor = texture2D(baseMap, vUv);
          // lights
          vec3 normal = normalize(vNormal);
          vec3 lightDir = normalize(lightPosition - vViewPosition);
          float diffuse = max(dot(normal, lightDir), 0.0);
          vec3 diffuseLight = lightColor * diffuse * lightIntensity;
          // shadow
          float shadow = getShadow();
          vec3 lighting = ambientColor + lightColor * diffuse * (1.0 - shadow);
          vec3 finalBaseColor = baseColor.rgb * lighting;
          // logo
          vec2 logoUV = (vUv - logoPosition) / logoSize + 0.5;
          if (logoUV.x > 0.0 && logoUV.x < 1.0 && logoUV.y > 0.0 && logoUV.y < 1.0) {
            vec4 logoColor = texture2D(logoMap, logoUV);
            vec3 finalLogoColor = mix(finalBaseColor, logoColor.rgb * lighting, logoColor.a * opacity);
            gl_FragColor = vec4(finalLogoColor, 1.0);
          } else {
            gl_FragColor = vec4(finalBaseColor, 1.0);
          }
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      shadowSide: THREE.FrontSide,
    });
  }, [logoTexture, baseTexture, logoPosition]);

  // Bind texture material
  
  useEffect(() => {
    if (!meshRef.current) return;
    if (snap.isFullTexture && fullTexture) {
      meshRef.current.material = new THREE.MeshStandardMaterial({ map: fullTexture });
    } else if (snap.isLogoTexture && shaderMaterial) {
      meshRef.current.material = shaderMaterial;
    } else {
      meshRef.current.material = new THREE.MeshStandardMaterial({ map: baseTexture });
    }
  }, [snap.isFullTexture, snap.isLogoTexture, fullTexture, shaderMaterial, baseTexture]);

  useFrame(() => {
    if (meshRef.current?.material?.uniforms) {
      meshRef.current.material.uniforms.logoPosition.value.set(
        logoPosition.x,
        logoPosition.y
      );
      meshRef.current.material.uniforms.logoSize.value = logoPosition.size;
    }
    if (isDragging) {
      normalUpdateCounter.current++;
      if (normalUpdateCounter.current % OPTIMIZATION_SETTINGS.normalUpdateInterval === 0) {
        meshRef.current.geometry.computeVertexNormals();
        meshRef.current.geometry.normalizeNormals();
      }
    } else if (normalUpdateCounter.current > 0) {
      meshRef.current.geometry.computeVertexNormals();
      meshRef.current.geometry.normalizeNormals();
      normalUpdateCounter.current = 0;
    }
  });

  // =============== Shape =============== 
  // Mouse interaction
  const getIntersect = (e) => {
    const bounds = gl.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(meshRef.current);
    return intersects[0];
  };

  const onPointerDown = (e) => {
    e.stopPropagation();
    const intersect = getIntersect(e);
    if (!intersect) return;
    setIsDragging(true);

    const position = meshRef.current.geometry.attributes.position;
    if (!originalPositions.current) {
      originalPositions.current = new Float32Array(position.array);
    }

    const point = intersect.point;

    let closest = -1;
    let minDist = Infinity;
    for (let i = 0; i < position.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(position, i);
      const dist = v.distanceTo(point);
      if (dist < minDist) {
        closest = i;
        minDist = dist;
      }
    }
    setDraggedIndex(closest);
  };

  const onPointerUp = () => {
    setIsDragging(false);
    setDraggedIndex(null);
  };
  const onPointerMove = useCallback((e) => {
    if (!isDragging || draggedIndex === null) return;
    const intersect = getIntersect(e);
    if (!intersect) return;
  
    const geometry = meshRef.current.geometry;
    const pos = geometry.attributes.position;
    const center = new THREE.Vector3().fromBufferAttribute(pos, draggedIndex);
    const targetY = center.y;
    const yTolerance = 0.2;
  
    const layerKey = Math.round(center.y / OPTIMIZATION_SETTINGS.layerStep);
    const layerIndices = geometry.userData.layers.get(layerKey) || [];
    
    const direction = e.shiftKey ? -1 : 1;
    const duplicates = geometry.userData.duplicateMap;

  
    for (const i of layerIndices) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      if (Math.abs(v.y - targetY) < yTolerance) {
        const strength = 1 - Math.abs(v.y - targetY) / yTolerance;
  
        const original = new THREE.Vector3(
          originalPositions.current[i * 3],
          originalPositions.current[i * 3 + 1],
          originalPositions.current[i * 3 + 2]
        );
        const originalNormal = new THREE.Vector3(
          originalNormals.current[i * 3],
          originalNormals.current[i * 3 + 1],
          originalNormals.current[i * 3 + 2]
        );
  
        const currentDisplacement = v.clone().sub(original).dot(originalNormal);
        const delta = direction * 0.01 * strength;
        const newDisplacement = currentDisplacement + delta;
  
        if (Math.abs(newDisplacement) <= maxDisplacement) {
          const moved = v.clone().addScaledVector(originalNormal, delta);
          pos.setXYZ(i, moved.x, moved.y, moved.z);
  
          // Apply to duplicates
          const dupList = duplicates.get(i);
          if (dupList) {
            for (const j of dupList) {
              pos.setXYZ(j, moved.x, moved.y, moved.z);
            }
          }
        }
      }
    }
  
    pos.needsUpdate = true;
    // geometry.computeVertexNormals();
    // geometry.normalizeNormals();
  }, [isDragging, draggedIndex]);

  const resetGeometry = () => {
    if (!meshRef.current) return;
  
    const geometry = meshRef.current.geometry;
    const pos = geometry.attributes.position;
  
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(
        i,
        originalPositions.current[i * 3],
        originalPositions.current[i * 3 + 1],
        originalPositions.current[i * 3 + 2]
      );
    }
  
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.normalizeNormals();
  };
  
  
  useEffect(() => {
    const pos = geometry.attributes.position;
    const normal = geometry.attributes.normal;

    originalPositions.current = new Float32Array(pos.array);
    originalNormals.current = new Float32Array(normal.array);

  }, []);

  useEffect(() => {
    if (resetFlag) {
      resetGeometry();
    }
  }, [resetFlag]);

  return (
    <group {...props}>
      <mesh
        ref={meshRef}
        // geometry={useMemo(() => new THREE.SphereGeometry(1, 64, 64), [])}
        geometry={geometry}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        castShadow
        receiveShadow
      />
    </group>
  );
});

export default ModelForAI;
