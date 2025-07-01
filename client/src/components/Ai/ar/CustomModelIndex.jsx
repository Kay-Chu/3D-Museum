


import React from "react";

const CustomModelIndex = () => {
    const modelUrl = "https://k-chu.com/ar/customModel.glb";

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <model-viewer
        src={modelUrl}
        ar
        ar-modes="scene-viewer quick-look webxr"
        environment-image="neutral"
        auto-rotate
        camera-controls
        style={{ width: "100%", height: "100%" }}
        ios-src={modelUrl}
      />
    </div>
  );
};

export default CustomModelIndex;
