import React from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../Navbar";

import Cube from "./Cube";

const Section = styled.div`
  // scroll-snap-align: center;
`;

const Container = styled.div`
`;

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

const Desc = styled.p`

`;
const Button = styled.button``;

const Home1 = () => {

    return (
      <>
      <Navbar />
      <Section className="section">
        
        <Container className="container">
          <Title >Hong Kong Palace Meseum</Title>
          <WhatWeDo>
            <Line src="/img/line.png" />
          </WhatWeDo>
          <Desc>
            AR Gallery
          </Desc>

        </Container>
      </Section>
      </>
    );
  };


export default Home1
