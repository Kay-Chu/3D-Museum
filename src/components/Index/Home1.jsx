import React from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../Navbar";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, Stage } from "@react-three/drei";
import { useLocation, useRoute } from "wouter";
import Card from "./Card";
import Cube from "./Cube";

const Section = styled.div`
  height: 100vh;
  // scroll-snap-align: center;
  display: flex;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
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
  
`;

const Title = styled.h1`
  font-siz: 74px;
`;
const WhatWeDo = styled.div`
  align-items: center;
  gap: 10px;
`;
const Line = styled.img`
  height: 5px;
`;
const Subtitle = styled.h2`
  color: #da4ea2;
`;
const Desc = styled.p`
  font-size: 24px;
  color: lightgray;
`;
const Button = styled.button``;
const ModelSpace = styled.div`
  margin-top: 10rem;
  display: flex;
  justify-content: center;
  gap: 5rem;
  height: 50vh;
  width: 100%;
`;

const Home1 = () => {
  const modelResources = ["Chair", "Chinese_temple"];

  const [_, setLocation] = useLocation();
  const [, params] = useRoute("/item/:id");

  const renderModels = () => {
    return modelResources.map((modelName, index) => {
      return (
        <div key={index}>
          <Canvas style={{ width: "100%" }}>
            <Card modelName={modelName} />
          </Canvas>
          <Button
            className="button"
            id={modelName}
            onClick={() => {
              (params == null) ? setLocation("/item/" + String(modelName)) : setLocation("/") ;
            }}
          >
            {params == null || params.id != modelName ? "Learn More" : "< back"}
          </Button>
        </div>
      );
    });
  };

  return (
    <Section>
      <Navbar />
      <Container>
        <Title>Hong Kong Palace Meseum</Title>
        <WhatWeDo>
          <Line src="./img/line.png" />
          <Subtitle>What we Do</Subtitle>
        </WhatWeDo>
        <Desc>
          We enjoy creating delightful, human-centered digital experiences.
        </Desc>

        <ModelSpace>{renderModels()}</ModelSpace>
      </Container>
    </Section>
  );
};

export default Home1;
