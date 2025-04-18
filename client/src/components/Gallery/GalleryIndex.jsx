import { React, useState } from "react";
import Navbar from "../Navbar";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import { OrbitControls, Stage } from "@react-three/drei";
import { useLocation, useRoute } from "wouter";
import Card from "./Card";
import "../../../index.css";

import CustomButton from "../Ai/CustomButton";
import { motion } from "framer-motion";
import Slider from "@mui/material/Slider";

const Section = styled.div`
  // scroll-snap-align: center;
`;

const Container = styled.div`
  height: 90vh;
  flex-direction: column; // corrected spelling mistake from 'coloumn' to 'column'
  width: 1400px;
  text-align: center;
  justify-content: space-between;
  > div {
    width: 100%;
  }
`;

const ModelSpace = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  height: 70vh;
  width: 100%;

  @media only screen and (max-width: 768px) {
    display: inline-block !important;
    > div {
      display: block !important;
      height: 80% !important;
      width: 90% !important;
      margin-bottom: 50px;
    }
  }
`;
const SliderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  // transform: translateY(-50%);
  width: 200px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px;
  z-index: 999;
`;

const CustomSlider = styled(Slider)`
  color: #e4c072 !important; 
  .MuiSlider-thumb {
    &:hover,
    &.Mui-focusVisible,
    &.Mui-active {
      box-shadow: inherit;
    }
  }
  .MuiSlider-track {
    border: none;
  }
  .MuiSlider-rail {
    opacity: 0.8;
    background-color: #bfbfbf;
  }
  .MuiSlider-mark {
    background-color: currentColor;
    height: 8px;
    width: 1px;
    &.MuiSlider-markActive {
      opacity: 0.8;
      background-color: currentColor;
    }
  }
`;

const Button = styled.button``;

const GalleryIndex = () => {
  const modelResources = [
    { name: "Vase", title: "Jade Hall" },
    { name: "Chinese_temple", title: "Porcelain Hall" },
    { name: "Collection3", title: "Handicrafts Hall" },
  ];

  const [selectedHall, setSelectedHall] = useState(null);
  const [modeLight, setModeLight] = useState(1);

  const handleClick = (hall) => {
    setSelectedHall(hall);
  };
  const handleShowAll = () => {
    setSelectedHall(null);
  };

  const handleSliderChange = (event, newValue) => {
    setModeLight(newValue);
  };

  const [_, setLocation] = useLocation();
  const [, params] = useRoute("/Gallery/:id");
  const isIndex = params.id === "GalleryIndex";

  const renderModels = modelResources.map((model, index) => {
    const isModelSelected = params.id === model.name;
    const isIndex = params.id === "GalleryIndex";
    const buttonText = isModelSelected ? "< back" : "Explore >";
    const mode = isModelSelected ? "ModelView" : "CardView";

    if (selectedHall !== null && model.name !== selectedHall) {
      return null;
    }

    let modelJSX;
    if (isIndex || isModelSelected) {
      modelJSX = (
        <div
          key={index}
          style={
            isIndex
              ? { width: `${100 / modelResources.length}%` }
              : { width: "80%" }
          }
        >
          <Canvas>
            <Card modelName={model.name} index={index} mode={mode} modeLight={modeLight} />
          </Canvas>
          <Button
            className="button"
            id={model.name}
            onClick={() => {
              if (params.id === "GalleryIndex") {
                setLocation("/Gallery/" + String(model.name));
              } else {
                setLocation("/Gallery/GalleryIndex");
              }
            }}
          >
            <span>{buttonText}</span>
          </Button>
        </div>
      );
    }

    return modelJSX;
  });

  

  return (
    <>
      <Navbar />
      <Section className="section fullHeight">
        {!isIndex && (
          <SliderContainer>
            <label>Light</label>
            <CustomSlider
              value={modeLight}
              onChange={handleSliderChange}
              aria-labelledby="continuous-slider"
              min={-2}
              max={4}
              step={0.1}
            />
          </SliderContainer>
        )}

        <div>
          <ul
            className="list-group"
            style={{ color: "#ffffff", display: "inline-flex" }}
          >
            <li className="list-inline-item">
              <motion.div whileHover={{ scale: 1.2 }}>
                <CustomButton
                  type="filled"
                  title="All"
                  handleClick={handleShowAll}
                />
              </motion.div>
            </li>
            {modelResources.map((model) => (
              <li className="list-inline-item" key={model.name}>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <CustomButton
                    type="filled"
                    title={model.title}
                    handleClick={() => handleClick(model.name)}
                  />
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
        <Container className="container">
          <ModelSpace>{renderModels}</ModelSpace>
        </Container>
      </Section>
    </>
  );
};

export default GalleryIndex;
