import React, { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


const CameraRig = ({ children }) => {
  const { camera } = useThree();

  const group = useRef();

  return (
    <>
      <OrbitControls args={[camera]} />
      <group ref={group}>{children}</group>
    </>
  );
};

export default CameraRig