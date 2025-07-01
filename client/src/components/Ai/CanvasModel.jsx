import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Environment, Center } from "@react-three/drei";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import ModelForAI from "./ModelForAI";
import { memo, useRef, useEffect, forwardRef } from "react";


const CanvasModel = memo(( {resetFlag, onMeshReady} ) => {

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 15 }}
        // gl={{ preserveDrawingBuffer: true }}
        style={{ width: "100%", height: "70vh" }}
        // className="transition-all ease-in"
      >
        <ambientLight intensity={0.7} />
        <Environment preset="sunset" />


        <CameraRig>
        {/* <Backdrop /> */}
          <ModelForAI resetFlag={resetFlag} onMeshReady={onMeshReady}/>
        </CameraRig>
      </Canvas>
    </>
  );
});

export default CanvasModel;
