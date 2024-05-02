import React from "react";
import styled from "styled-components";
import Navbar from "../Navbar";

import "aframe";
import "aframe-ar";
import "aframe-particle-system-component";
import { Entity, Scene } from "aframe-react";
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";

import { geometry } from "maath";
import { extend } from "@react-three/fiber";
extend(geometry);

const Section = styled.div`
  // scroll-snap-align: center;
`;

const Container = styled.div``;

const Title = styled.h1`
  font-size: 40px;
`;
const WhatWeDo = styled.div`
  align-items: center;
  gap: 10px;
`;
const Line = styled.img`
  height: 5px;
`;

const Desc = styled.p``;
const Button = styled.button``;

const Home1 = () => {
  return (
    <>
      <Navbar />
      <Section className="section">
        <Container className="container">
          <Title>Hong Kong Palace Meseum</Title>
          <WhatWeDo>
            <Line src="/img/line.png" />
          </WhatWeDo>
          <Desc>Web AR Exhibition</Desc>

          <Scene embedded arjs="sourceType: webcam;">
            <Entity
              gltf-model={"/pot.glb"}
              animation={
                "property: rotation; to: 0 360 0; loop: true; dur: 10000"
              }
              scale={{ x: 0.5, y: 0.5, z: 0.5 }}
              position={{ x: 0, y: 1, z: -3 }}
            />
            <Entity
              text={{
                value: "This is a traditional pot",
                align: "center",
                color: "#FFF",
                width: 6,
              }}
              position={{ x: 0, y: 2, z: -5 }}
            />
          </Scene>
          {/* <a-scene embedded arjs="sourceType: webcam;"> <a-marker-camera preset="hiro"></a-marker-camera></a-scene> */}
          {/* <ARCanvas
  camera={{ position: [0, 0, 0] }}
  onCreated={({ gl }) => {
    gl.setSize(window.innerWidth, window.innerHeight);
  }}
>
  <ARMarker
    type={"pattern"}
    patternUrl={"/ar/pattern-lemon.patt"}
  />
       
    
</ARCanvas> */}

          
        </Container>
      </Section>
    </>
  );
};

export default Home1;
