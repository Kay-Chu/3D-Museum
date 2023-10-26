import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Chinese_temple from './Chinese_temple-freepoly'

const Development = () => {
  return (
    <Canvas>

      <Stage environment="city">

        <Chinese_temple></Chinese_temple>

      </Stage>

      <OrbitControls enableZoom={false} autoRotate={false}></OrbitControls>
      

    </Canvas>
  )
}

export default Development