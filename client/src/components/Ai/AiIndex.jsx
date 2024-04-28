import React from 'react'
import Navbar from '../Navbar'
import CanvasModel from './CanvasModel'
import styled from "styled-components";
// import "../../../index.css";

import Customizer from "./Customizer";

const Section = styled.div`
`
const TextInput = styled.div`
height: 30vh;
position: absolute;
left: 0px;
bottom: 0px;
z-index: 999;
`
const Container = styled.div`
height: 60vh;
`

const AiIndex = () => {

  return (
    
    <>
        <Navbar />

        <Section className="section"> 

        <TextInput>
        <Customizer className="absolute z-999"/>
        </TextInput>

        <Container className="container">
        
          <CanvasModel className="z-10"/>
          
        </Container>
        </Section> 

    </>
  )
}

export default AiIndex