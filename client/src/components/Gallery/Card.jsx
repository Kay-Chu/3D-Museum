import { useState, useEffect, useRef } from "react";
import {
  CameraControls,
  Gltf,
  MeshPortalMaterial,
  Text,
} from "@react-three/drei";
import { easing, geometry } from "maath";
import { extend, useFrame, useLoader, useThree  } from "@react-three/fiber";
import { TextureLoader, PlaneGeometry, MeshBasicMaterial, Mesh } from "three";
extend(geometry);
import * as THREE from "three";
import { useLocation, useRoute } from "wouter";

import { OrbitControls, Stage } from "@react-three/drei";


import Chinese_temple from "./Chinese_temple-freepoly";
import Collection3 from "./Collection3";
import Vase from "./Vase";


const Card = (props) => {
  const modelName = props.modelName;
  const mode = props.mode;

  const [lightIntensity, setLightIntensity] = useState(props.modeLight);
  useEffect(() => {
    setLightIntensity(props.modeLight);
  }, [props.modeLight]);

  

  const portal = useRef();
  const [, params] = useRoute("/Gallery/:id");

  const ImagePlane = ({ modelName }) => {

    // Dynamically generate the URL based on modelName
    // const texture = useLoader(TextureLoader, `/ar/${modelName}.jpg`);
    const texture = useLoader(TextureLoader, `/ar/collection1.jpg`);
  
    return (
      <mesh position={[3, 0, -1]}>
        <planeGeometry args={[1, 1]} /> 
        <meshBasicMaterial map={texture} />
      </mesh>
    );
  };

  return (
    <>
      {params.id !== modelName && mode === "CardView" ? (
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
            0{props.index + 1}
          </Text>
          <mesh>
            <roundedPlaneGeometry args={[1, 1.6, 0.1]} />
            <MeshPortalMaterial ref={portal} side={THREE.DoubleSide}>
              <color attach="background" args={["#dfd3c3"]} />

              <CardView />
              {modelName === "Vase" && (
                <Vase position={[-0.4, 0, -2]} fov={0} scale={0.2} />
              )}
              {modelName === "Chinese_temple" && (
                <Chinese_temple position={[0, -0.4, 0]} fov={25} scale={0.1} />
              )}
              {modelName === "Collection3" && (
                <Collection3 position={[0, -0.7, 0]} fov={0} scale={2.7} />
              )}

            </MeshPortalMaterial>
          </mesh>
        </group>
      ) : (
        <>
         <ImagePlane modelName={modelName}/>
        <group>
       
          <mesh>
            <ModelView lightIntensity={lightIntensity} />
            {modelName === "Vase" && (
              <Vase position={[-1, 0, -7]} fov={0} scale={0.5} />
            )}
            {modelName === "Chinese_temple" && (
              <Chinese_temple position={[0, -0.3, 0]} fov={25} scale={0.1} />
            )}
            {modelName === "Collection3" && (
              <Collection3 position={[0, -0.7, 0]} fov={10} scale={3} />
            )}

          </mesh>
        </group>
        </>
      )}
    </>
  );
};

const ModelView = ({lightIntensity}) => {
  const controlsRef = useRef();

  useEffect(() => {
    const controls = controlsRef.current;
    controls.minDistance = 0.5; // Set the minimum distance from the target
    controls.maxDistance = 10; // Set the maximum distance from the target
  }, []);

  return (
    <>
      <ambientLight intensity={lightIntensity}></ambientLight>
      <directionalLight position={[3, 2,  1]}></directionalLight>
      <CameraControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.3}
        ref={controlsRef}
      />
    </>
  );
};

const CardView = () => {
  const controlsRef = useRef();

  useEffect(() => {
    const controls = controlsRef.current;
    controls.minDistance = 2; // Set the minimum distance from the target
    controls.maxDistance = 2; // Set the maximum distance from the target
    controls.distance = 2; // Set the initial camera position
  }, []);

  return (
    <>
      <CameraControls
        makeDefault
        minPolarAngle={0.7}
        maxPolarAngle={Math.PI / 2}
        ref={controlsRef}
      />
      <ambientLight intensity={1}></ambientLight>
      <OrbitControls enableZoom={false} autoRotate={false}></OrbitControls>
    </>
  );
};

export default Card;
