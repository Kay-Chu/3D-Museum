import React from "react";
import Navbar from "../Navbar";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import { OrbitControls, Stage } from "@react-three/drei";
import { useLocation, useRoute } from "wouter";
import Card from "./Card";
import "../../../index.css";

// const Section = styled.div``;

// const Container = styled.div`
//   margin-left: 1em;
//   margin-right: 1em;
// `;
const Section = styled.div`
  height: 100vh;
  // scroll-snap-align: center;
  display: flex;

 
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  height: 90vh;
  flex-direction: coloumn;
  width: 1400px;
  text-align: center;
  justify-content: space-between;
  > div{
    width: 100%;
  }


`;

const ModelSpace = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  height: 80vh;
  width: 100%;

  @media only screen and (max-width: 768px) {
    display: inline-block!important;
    // width: 100%;
    > div {
      display: block!important;
      height: 80%!important;
      width: 90% !important;

      margin-bottom: 50px;
    }
  }
`;
const Button = styled.button`
@media only screen and (max-width: 768px) {
width: 20%;
}
`;


const GalleryIndex = () => {
  const modelResources = ["Chair", "Chinese_temple", "Pot", "To-Adds"];

  const [_, setLocation] = useLocation();
  const [, params] = useRoute("/Gallery/:id");

  const renderModels = modelResources.map((modelName, index) => {
    const isModelSelected = params.id === modelName;
    const isIndex = params.id === "GalleryIndex";
    const buttonText = isModelSelected ? "< back" : "Explore >";
    const mode = isModelSelected ? "ModelView" : "CardView";

    let modelJSX;
    if (isIndex || isModelSelected) {
      modelJSX = (
        <>
        
          
        
        <div
          key={index}
          style={
            isIndex
              ? { width: `${100 / modelResources.length}%` }
              : { width: "100%" }
          }
        >
          <Canvas>
            <Card modelName={modelName} index={index} mode={mode} />
          </Canvas>
          <Button
            className="button"
            id={modelName}
            onClick={() => {
              if (params.id === "GalleryIndex") {
                setLocation("/Gallery/" + String(modelName));
              } else {
                setLocation("/Gallery/GalleryIndex");
              }
            }}
          >
            {buttonText}
          </Button>
        </div>
        
        </>
      );
    }

    return modelJSX;
  });

  return (
    <>
      <Navbar />
      <Section className="section">
        
        <Container className="container">
          <ModelSpace>{renderModels}</ModelSpace>
        </Container>
      </Section>
    </>
  );

};

export default GalleryIndex;
