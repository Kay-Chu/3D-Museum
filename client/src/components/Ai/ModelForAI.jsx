import { React, useEffect, useRef, useState, useMemo } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame, useLoader } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from 'three';

import state from "./store";


const ModelForAI = ({ currentModel, collections, ...props }) => {
  const snap = useSnapshot(state);
  const { scene, nodes, materials } = useGLTF(`/${collections[currentModel] || ''}`);
  // const { scene, nodes, materials } = useGLTF('/collection1.glb');


  const meshRef = useRef();
  const [logoPosition, setLogoPosition] = useState({ x: 0.5, y: 0.5, size: 1 });

  const fullTexture = useMemo(() => {
    if (!snap.fullDecal) return null;
    const loader = new THREE.TextureLoader();
    return loader.load(snap.fullDecal);
  }, [snap.fullDecal]);

  const logoTexture = useMemo(() => {
    if (!snap.logoDecal ) return null;
    const loader = new THREE.TextureLoader();
    return loader.load(snap.logoDecal);
  }, [snap.logoDecal]);

  const baseTexture = useMemo(() => {
    const mat = Object.values(materials)[0];
    return mat?.map || new THREE.Texture();
  }, [materials]);

  const shaderMaterial = useMemo(() => {
    // if (!snap.isLogoTexture || !logoTexture) return null;

    return new THREE.ShaderMaterial({
      uniforms: {
        baseMap: { value: baseTexture },
        logoMap: { value: logoTexture },
        logoPosition: { value: new THREE.Vector2(logoPosition.x, logoPosition.y) },
        logoSize: { value: logoPosition.size },
        opacity: { value: 0.15 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D baseMap;
        uniform sampler2D logoMap;
        uniform vec2 logoPosition;
        uniform float logoSize;
        uniform float opacity;
        varying vec2 vUv;

        void main() {
          vec4 baseColor = texture2D(baseMap, vUv);
          vec2 logoUV = (vUv - logoPosition) / logoSize + 0.5;

          if (logoUV.x > 0.0 && logoUV.x < 1.0 && logoUV.y > 0.0 && logoUV.y < 1.0) {
            vec4 logoColor = texture2D(logoMap, logoUV);
            gl_FragColor = mix(baseColor, logoColor, logoColor.a * opacity);
          } else {
            gl_FragColor = baseColor;
          }
        }
      `,
      transparent: true
    });
  }, [logoTexture, baseTexture, logoPosition]);

  // Bind shader or full texture
  useEffect(() => {
    if (!meshRef.current) return;

    if (snap.isFullTexture && fullTexture) {
      meshRef.current.material = new THREE.MeshStandardMaterial({
        map: fullTexture,
        transparent: true,
      });
    } else if (snap.isLogoTexture && shaderMaterial) {
      meshRef.current.material = shaderMaterial;
    } else {
      meshRef.current.material = new THREE.MeshStandardMaterial({
        map: baseTexture,
        color: "white",
      });
    }
  }, [snap.isFullTexture, snap.isLogoTexture, fullTexture, shaderMaterial, baseTexture]);

  // Update shader uniforms in realtime
  useFrame(() => {
    if (
      meshRef.current?.material?.uniforms
    ) {
      meshRef.current.material.uniforms.logoPosition.value.set(
        logoPosition.x,
        logoPosition.y
      );
      meshRef.current.material.uniforms.logoSize.value = logoPosition.size;
    }
  });



  return (
    <>
      <group {...props}>
        {/* {snap.isFullTexture && !snap.isLogoTexture && (
          <primitive object={scene} />)} */}

<mesh
        ref={meshRef}
        geometry={nodes.mesh_0.geometry}
        castShadow
        receiveShadow
      />

        {snap.isLogoTexture && !snap.isFullTexture && logoTexture && (
          <>
            <mesh position={[0, 0, -1]} rotation={[0, Math.PI, 0]} scale={1}>
              <planeGeometry args={[0.5, 0.5]} />
              <meshBasicMaterial
                map={logoTexture}
                transparent={true}
                opacity={0.9}
                side={THREE.DoubleSide} />
            </mesh></>
        )}


      </group>

    </>
  );
};

export default ModelForAI;
