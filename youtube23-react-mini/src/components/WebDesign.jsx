import React from 'react';
import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Chair from "./Chair";

const WebDesign = () => {
  return (
    <Canvas>
      <Stage environment="city" intensity={0.1}>

        <Chair />
      </Stage>
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default WebDesign;