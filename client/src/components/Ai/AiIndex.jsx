import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import CanvasModel from "./CanvasModel";
import styled from "styled-components";

import CustomButton from "./CustomButton";
import { motion } from "framer-motion";

import Customizer from "./Customizer";
import state from "./store/index";


const Section = styled.div``;
const TextInput = styled.div`
  height: 30vh;
  position: absolute;
  left: 0px;
  bottom: 0px;
  z-index: 999;
`;
const Container = styled.div`
  height: 90vh;
`;

const AiIndex = () => {
  const [selectedStyle, setSelectedStyle] = useState("ink");
  const [resetFlag, setResetFlag] = useState(false);

  const handleButtonClick = (style) => {
    setSelectedStyle(style);
  };

  const handleReset = () => {
    setResetFlag(prev => !prev);
  };

  const handleFullTexture = () => {
    state.isLogoTexture = false;
    state.isFullTexture = true;
    // state.fullDecal = imageUrl;
    // console.log(state.logoDecal);
  };

  const handleLogoTexture = () => {
    state.isLogoTexture = true;
    state.isFullTexture = false;
    // state.logoDecal = imageUrl;
    // console.log(state.logoDecal);
  };

  const handleClearTexture = () => {
    state.isLogoTexture = false;
    state.isFullTexture = false;
  };



  const getButtonProps = (style) => {
    switch (style) {
      case "ink":
        return {
          type: "filled",
          title: "Ink Arts",
          isActive: selectedStyle === "ink",
        };
      case "porcelain":
        return {
          type: "filled",
          title: "Blue and white porcelain",
          isActive: selectedStyle === "porcelain",
        };
      case "mural":
        return {
          type: "filled",
          title: "Mural Arts",
          isActive: selectedStyle === "mural",
        };
      default:
        return {};
    }
  };

  return (
    <>
      <Navbar />

      <Section className="section">
        <Container className="container">
          <div className="styleSelection">
            <ul className="list-group" style={{ display: "flex" }}>
              <li className="style_button list-inline-item">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <CustomButton
                    {...getButtonProps("ink")}
                    type={selectedStyle === "ink" ? "filled" : "outline"}
                    handleClick={() => handleButtonClick("ink")}
                  />
                </motion.div>
              </li>
              <li className="style_button list-inline-item">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <CustomButton
                    {...getButtonProps("porcelain")}
                    type={selectedStyle === "porcelain" ? "filled" : "outline"}
                    handleClick={() => handleButtonClick("porcelain")}
                  />
                </motion.div>
              </li>
              <li className="style_button list-inline-item">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <CustomButton
                    {...getButtonProps("mural")}
                    type={selectedStyle === "mural" ? "filled" : "outline"}
                    handleClick={() => handleButtonClick("mural")}
                  />
                </motion.div>
              </li>
            </ul>
          </div>
          <div>
            <button
              className="button"
              style={{ borderRadius: "5rem", display: "flex" }}
              onClick={handleReset}
            >
              <div style={{ alignItems: "center", padding: "0" }}>
                <img src="/img/refresh.png" />
              </div>
            </button>
          </div>

          <TextInput>

            <Customizer
              selectedStyle={selectedStyle}
              className="absolute z-999"
            />
          </TextInput>

          <CanvasModel
            className="z-10 h-full"
            resetFlag={resetFlag}
          />
          <div className="sketch-picker sticky-md-bottom" style={{width:"min-content"}} >
            <button
              onClick={() => handleFullTexture()}
              style={{ borderRadius: "5rem", display: "flex" }}
            >
              {/* <img className="" src="/img/lemon.jpeg" /> */}
              <p style={{fontSize: '1em'}}>FULL</p>
            </button>
            <button
              onClick={() => handleLogoTexture()}
              style={{ borderRadius: "5rem", display: "flex" }}
            >
              {/* <img className="" src="/img/blue.jpeg" /> */}
              <p style={{fontSize: '1em'}}>LOGO</p>
            </button>
            <button
              onClick={() => handleClearTexture()}
              style={{ borderRadius: "5rem", display: "flex" }}
            >
              <p style={{fontSize: '1em'}}>CLEAR</p>
            </button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AiIndex;
