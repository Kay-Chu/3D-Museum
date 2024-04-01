import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from './store';

const CameraRig = ({ children }) => {
  const { camera } = useThree();

  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // Set the initial position of the model
    let targetPosition = [0, 1, state.camera.position.z];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, -0.5, 2]; // Adjusted Y-coordinate
      if (isMobile) targetPosition = [0, 2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 2, 2.5]; // Adjusted Y-coordinate
      else targetPosition = [0, -0.5, 2]; // Adjusted Y-coordinate
    }

    // Set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // Set the model rotation smoothly
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return (
    <>
      <OrbitControls args={[camera]} />
      <group ref={group}>{children}</group>
    </>
  );
};

export default CameraRig