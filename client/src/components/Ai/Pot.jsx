import {React, useEffect} from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame, useLoader } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { TextureLoader } from 'three';

import state from './store';

const Pot = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/collection2.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  //useFrame((state, delta) => easing.dampC(materials.material0.color, snap.color, 0.25, delta));
    useFrame((state, delta) => {
        if(materials.material0 && snap.color) {
        materials.material0.color.set(snap.color);
        }
    });

  const stateString = JSON.stringify(snap);


const { scene } = useGLTF('/collection1.glb');
// const { scene } = useGLTF('/chair-transformed.glb');

const texture = useLoader(TextureLoader, '/img/blue.jpeg');


// scene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.map = texture;
//     }
//   });
useEffect(() => {
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = texture;
    }
  });
}, [scene, texture]);

  return (
    <>
    {/* <group key={stateString}>
      {Object.keys(nodes).filter(name => name.startsWith("Model_material0_0")).map((nodeName, index) => (
        <mesh
          key={index}
          castShadow
          geometry={nodes[nodeName].geometry}
          material={materials.material0}
          material-roughness={1}
          dispose={null}
        >
          {snap.isFullTexture && (
            <Decal 
            position={[10, 10, 10]} 
            rotation={[0, 0, 0]} 
            scale={1} 
            map={fullTexture}
            matrixWorldNeedsUpdate={true}
            />
          )}

        </mesh>
        
      ))}
    </group> */}
    <primitive object={scene} />


    </>
  );
}

export default Pot