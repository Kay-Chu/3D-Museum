import React, { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.5} position={[0, -1, 0]} />;
};

const CustomModelIndex = () => {
  const [modelUrl, setModelUrl] = useState(null);
  const [error, setError] = useState("");
  const videoRef = useRef();

  useEffect(() => {
    const url = new URL(window.location.href);
    const modelParam = url.searchParams.get("model");

    if (modelParam) {
      const decodedUrl = decodeURIComponent(modelParam);
      try {
        new URL(decodedUrl);
        setModelUrl(decodedUrl);
      } catch (err) {
        console.error("Invalid model URL:", err);
        setError("Wrong Model URL formal");
      }
    } else {
      setError("The model address was not found in the URL parameter");
    }
  }, []);

// Enable camera background
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera startup failed:", err);
        setError("Unable to start the camera, please allow permissions");
      }
    };

    startCamera();
  }, []);

  if (error) {
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        height: "100vh", flexDirection: "column", backgroundColor: "#f0f0f0"
      }}>
        <h2 style={{ color: "#ff0000" }}>Error</h2>
        <p style={{ fontSize: "1.2em" }}>{error}</p>
        <p>URL: {window.location.href}</p>
        <p>Please make sure you scan the correct QR Code and allow camera permissions</p>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
     {/* Camera background */}
      <video
        ref={videoRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
        muted
        playsInline
      />

      {/* Model Canvas (transparent overlay) */}
      <Suspense fallback={<p>Loading...</p>}>
        <Canvas
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
          gl={{ alpha: true }}
          camera={{ position: [0, 0, 3], fov: 50 }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[1, 1, 1]} />
          {modelUrl && <Model url={modelUrl} />}
        </Canvas>
      </Suspense>
    </div>
  );
};

export default CustomModelIndex;
