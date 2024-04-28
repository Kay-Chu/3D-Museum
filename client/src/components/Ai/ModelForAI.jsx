import { React, useEffect } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame, useLoader } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { TextureLoader } from "three";

import state from "./store";

// collection1: yu
// collection2: shoes

const ModelForAI = () => {
  const snap = useSnapshot(state);



  const stateString = JSON.stringify(snap);

  const { scene } = useGLTF("/collection1.glb");

  const texture = useLoader(TextureLoader, snap.fullDecal);

console.log(state.isFullTexture);

  useEffect(() => {
    scene.traverse((child) => {
      if(state.isFullTexture){
      if (child.isMesh) {
        child.material.map = texture;
      }
    }
    });
  }, [scene, texture]);





  return (
    <>

      <primitive object={scene} />

    </>
  );
};

export default ModelForAI;
