import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const SculptableSphere = () => {
  const meshRef = useRef();
  const geometryRef = useRef();
  const { camera, gl } = useThree();

  const [isDragging, setIsDragging] = useState(false);
  const [draggedVertexIndex, setDraggedVertexIndex] = useState(null);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useMemo(() => new THREE.Vector2(), []);
  const sculptRadius = 0.1; // affected area radius


  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(1, 64, 64);
  }, []);

  const onPointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    const intersect = getIntersect(e);
    if (intersect) {
      const { face, point, object } = intersect;
      const geom = object.geometry;
      const position = geom.attributes.position;


      let closestIndex = -1;
      let minDist = Infinity;
      for (let i = 0; i < position.count; i++) {
        const v = new THREE.Vector3().fromBufferAttribute(position, i);
        const dist = v.distanceTo(point);
        if (dist < minDist) {
          closestIndex = i;
          minDist = dist;
        }
      }
      setDraggedVertexIndex(closestIndex);
    }
  };

  const onPointerUp = () => {
    setIsDragging(false);
    setDraggedVertexIndex(null);
  };

  const onPointerMove = (e) => {
    if (!isDragging || draggedVertexIndex === null) return;
    const intersect = getIntersect(e);
    if (intersect) {
      const point = intersect.point;
      const geom = meshRef.current.geometry;
      const pos = geom.attributes.position;

      const center = new THREE.Vector3().fromBufferAttribute(pos, draggedVertexIndex);

      for (let i = 0; i < pos.count; i++) {
        const v = new THREE.Vector3().fromBufferAttribute(pos, i);
        const dist = v.distanceTo(center);
        if (dist < sculptRadius) {
          // 基於距離使用線性強度（越近越強）
          const strength = 1 - dist / sculptRadius;
          v.addScaledVector(v.clone().normalize(), 0.01 * strength); // 往外拉
          pos.setXYZ(i, v.x, v.y, v.z);
        }
      }

      pos.needsUpdate = true;
      geom.computeVertexNormals();
    }
  };

  const getIntersect = (e) => {
    const bounds = gl.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(meshRef.current);
    return intersects[0];
  };

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export default SculptableSphere;
