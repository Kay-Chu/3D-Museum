import { useState, useEffect, useRef } from "react";
import {
  CameraControls,
  Gltf,
  MeshPortalMaterial,
  Text,
} from "@react-three/drei";
import { easing, geometry } from "maath";
import { extend, useFrame } from "@react-three/fiber";
extend(geometry);
import * as THREE from "three";
import { useLocation, useRoute } from "wouter";

import { OrbitControls, Stage } from "@react-three/drei";

import Chair from "./Chair";
import Chinese_temple from "./Chinese_temple-freepoly";

const Card = (props) => {
  const modelName = props.modelName;

  const portal = useRef();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/item/:id");

  useFrame((state, dt) => {
    easing.damp(portal.current, "blend", params?.id ? 1 : 0, 0.2, dt);
  });

  const handleClick = () => {
    setLocation("/item/" + modelName);
  };

  if (params && params.id) {
    console.log(params.id);
  } else {
    console.log("params.id is not available");
  }
  console.log(modelName)

  return (
    <>
      <group>
        <Text
          position={[-0.375, 0.715, 0.01]}
          lineHeight={0.3}
          fontSize={0.2}
          material-toneMapped={false}
        >
          {modelName}
        </Text>
        <Text
          position={[0.4, -0.659, 0.01]}
          fontSize={0.1}
          material-toneMapped={false}
        >
          01
        </Text>
    
        <mesh name={modelName}>
          <roundedPlaneGeometry args={[1, 1.6, 0.1]} />

          <MeshPortalMaterial ref={portal} side={THREE.DoubleSide}>
            <color attach="background" args={["#e4cdac"]} />

            {params?.id===modelName ? <ModelView /> : <CardView />}
            {modelName === "Chair" && (
              <Chair position={[0, 0, 0]} fov={0} scale={0.001} />
            )}
            {modelName === "Chinese_temple" && (
              <Chinese_temple position={[0, -0.5, 0]} fov={25} scale={0.1} />
            )}
          </MeshPortalMaterial>
        </mesh>
      </group>
    </>
  );
};

const ModelView = () => {
  const controlsRef = useRef();

  useEffect(() => {
    const controls = controlsRef.current;
    controls.minDistance = 0.5; // Set the minimum distance from the target
    controls.maxDistance = 10; // Set the maximum distance from the target
  }, []);

  return (
    <>
      <ambientLight intensity={3}></ambientLight>
      <directionalLight position={[3, 2, 1]}></directionalLight>
      <CameraControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        ref={controlsRef}
      />
    </>
  );
};

const CardView = () => {
  const cameraControlRef = useRef();

  return (
    <>
      <ambientLight intensity={1}></ambientLight>
      <OrbitControls enableZoom={false} autoRotate={false}></OrbitControls>
    </>
  );
};

export default Card;
