import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Chinese_temple from './Chinese_temple-freepoly'

const Development = () => {
  return (
    <Canvas>

      <Stage environment="city" scale={0.5}>

        <Chinese_temple></Chinese_temple>

      </Stage>
      
      


      <OrbitControls enableZoom={true} autoRotate={true}></OrbitControls>
      

    </Canvas>
  )
}

export default Development