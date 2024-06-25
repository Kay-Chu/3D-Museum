import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import CanvasModel from "./CanvasModel";
import styled from "styled-components";

import CustomButton from "./CustomButton";
import { motion } from "framer-motion";

import Customizer from "./Customizer";
import state from "./store/index";

import $ from "jquery";

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
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [currentModel, setCurrentModel] = useState(0);

  const collections = [
    "collection1.glb",
    "collection2.glb",
    "collection3.glb",
    "collection4.glb",
    "collection5.glb",
  ];
  const handleModelSwitch = () => {
    setCurrentModel((prevModel) => (prevModel + 1) % collections.length);
  };

  const handleButtonClick = (style) => {
    setSelectedStyle(style);
  };

  const handleDefaultImg = (imageUrl) => {
    state.isFullTexture = true;
    state.fullDecal = imageUrl;
    console.log(state.fullDecal);
  };

  useEffect(() => {
    $(".style_button").on("click", "li", function (e) {
      $(this).parent().find("li.active").removeClass("active");
      $(this).addClass("active");
    });
  }, []);

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
                    handleClick={() => handleButtonClick("ink")}
                  />
                </motion.div>
              </li>
              <li className="style_button list-inline-item">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <CustomButton
                    {...getButtonProps("porcelain")}
                    handleClick={() => handleButtonClick("porcelain")}
                  />
                </motion.div>
              </li>
              <li className="style_button list-inline-item">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <CustomButton
                    {...getButtonProps("mural")}
                    handleClick={() => handleButtonClick("mural")}
                  />
                </motion.div>
              </li>
            </ul>
          </div>
          <div>
            <button
              className="button"
              onClick={handleModelSwitch}
              style={{ borderRadius: "5rem", display: "flex" }}
            >
              <div style={{ alignItems: "center", padding: "0" }}>
                <img src="/img/shuffle.png" />
              </div>

              {/* <i className="fas fa-shuffle fa-lg" style={{color: "#ffffff"}}/> */}
            </button>
          </div>

          <TextInput>
            <Customizer
              selectedStyle={selectedStyle}
              className="absolute z-999"
            />
          </TextInput>

          <CanvasModel
            className="z-10 h-full "
            currentModel={currentModel}
            collections={collections}
          />
          <div className="sketch-picker sticky-md-bottom">
            <button
              onClick={() => handleDefaultImg("/img/lemon.jpeg")}
              style={{ borderRadius: "5rem", display: "flex" }}
            >
              <img className="" src="/img/lemon.jpeg" />
            </button>
            <button
              onClick={() => handleDefaultImg("/img/blue.jpeg")}
              style={{ borderRadius: "5rem", display: "flex" }}
            >
              <img className="" src="/img/blue.jpeg" />
            </button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AiIndex;
