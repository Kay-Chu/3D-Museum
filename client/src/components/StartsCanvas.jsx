import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

const Stars = (props) => {
  const ref = useRef();
  const [positions, setPositions] = useState(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * window.innerWidth / 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * window.innerHeight / 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * window.innerWidth / 200;
    }
    return positions;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <>
      <group
        rotation={[0, 0, Math.PI / 4]}
        scale={[window.innerWidth / 500, window.innerHeight / 500, window.innerWidth / 500]}
      >
        <Points
          ref={ref}
          positions={positions}
          stride={3}
          frustumCulled
          {...props}
        >
          <PointMaterial
            transparent
            color="#f272c8"
            size={0.007}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </group>
    </>
  );
};

const StartsCanvas = () => {
  // const [containerRef, setContainerRef] = useState(null);

  // useEffect(() => {
  //   const resizeHandler = () => {
  //     if (containerRef) {
  //       containerRef.style.height = `${window.innerHeight}px`;
  //     }
  //   };

  //   window.addEventListener("resize", resizeHandler);
  //   resizeHandler();

  //   return () => {
  //     window.removeEventListener("resize", resizeHandler);
  //   };
  // }, [containerRef]);

  return (
    <div className="w-full absolute z-[-1] background_particles">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StartsCanvas;