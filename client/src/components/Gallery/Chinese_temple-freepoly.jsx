/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 chinese_temple-freepoly.gltf --transform 
Files: chinese_temple-freepoly.gltf [135.04MB] > chinese_temple-freepoly-transformed.glb [9.2MB] (93%)
Author: Freepoly.org (https://sketchfab.com/blackrray)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/chinese-temple-freepolyorg-edc9abda7830426d942aa2c075270e69
Title: Chinese Temple-Freepoly.org
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Chinese_temple(props) {
  const { nodes, materials } = useGLTF('/chinese_temple-freepoly-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.defaultMaterial.geometry} material={materials.DefaultMaterial_1010} scale={0.4} />
      <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.DefaultMaterial_1001} scale={0.4} />
      <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.DefaultMaterial_1008} scale={0.4} />
      <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.DefaultMaterial_1009} scale={0.4} />
      <mesh geometry={nodes.defaultMaterial_4.geometry} material={materials.DefaultMaterial_1007} scale={0.4} />
      <mesh geometry={nodes.defaultMaterial_5.geometry} material={materials.DefaultMaterial_1002} scale={0.4} />
      <mesh geometry={nodes.defaultMaterial_6.geometry} material={materials.DefaultMaterial_1003} scale={0.4} />
      <mesh geometry={nodes.defaultMaterial_7.geometry} material={materials.DefaultMaterial_1004} scale={0.4} />
      <mesh geometry={nodes.defaultMaterial_8.geometry} material={materials.DefaultMaterial_1005} scale={0.4} />
      <mesh geometry={nodes.defaultMaterial_9.geometry} material={materials.DefaultMaterial_1006} scale={0.4} />
    </group>
  )
}

useGLTF.preload('/chinese_temple-freepoly-transformed.glb')