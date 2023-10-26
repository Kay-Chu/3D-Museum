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
import Chinese_temple from "./Chinese_temple-freepoly";


const Test = () => {
  const portal = useRef();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/item/:id");

  useFrame((state, dt) => {
    easing.damp(
      portal.current,
      "blend",
      params?.id === "temple" ? 1 : 0,
      0.2,
      dt
    );
  });



  return (
    <>
      <group>
        <Text
          position={[-0.375, 0.715, 0.01]}
          lineHeight={0.3}
          fontSize={0.2}
          material-toneMapped={false}
        >
          {`Temple`}
        </Text>
        <Text
          position={[0.4, -0.659, 0.01]}
          fontSize={0.1}
          material-toneMapped={false}
        >
          01
        </Text>

        <mesh
          name="temple"
          onClick={(e) => setLocation("/item/" + e.object.name)}
        >
          <roundedPlaneGeometry args={[1, 1.6, 0.1]} />

          <MeshPortalMaterial ref={portal} side={THREE.DoubleSide}>
            <color attach="background" args={["#e4cdac"]} />
            <ambientLight intensity={3}></ambientLight>
            <directionalLight position={[3, 2, 1]}></directionalLight>
            {params ? <ModelView /> : <CardView />}
            <Chinese_temple position={[0, -0.5, 0]} fov={25} scale={0.1} />
          </MeshPortalMaterial>
        </mesh>
      </group>

    </>
  );
};

const ModelView = () => {

  return (
    <>
      <CameraControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};

const CardView = () => {
    const cameraControlRef = useRef();

  return (
    <>
      <OrbitControls enableZoom={false} autoRotate={false} ></OrbitControls>
    </>
  );
};

export default Test;
