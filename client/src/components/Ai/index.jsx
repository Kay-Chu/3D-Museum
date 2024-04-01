import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

import Pot from "./Pot";

import CustomButton from "./CustomButton";
import AIPicker from "./AIPicker";
import ColorPicker from "./ColorPicker";
import FilePicker from "./FilePicker";
import Tab from "./Tab";


const CanvasModel = () => {



  return (
    <>




      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 15 }}
        // gl={{ preserveDrawingBuffer: true }}
        style={{ width: "100%", height: "70vh" }}
        // className="transition-all ease-in"
      >
        <ambientLight intensity={0.7} />
        <Environment preset="city" />

        <CameraRig>
          <Pot />
        </CameraRig>

      </Canvas>
    </>
  );
};

export default CanvasModel;
