import React from 'react'
import Navbar from '../Navbar'
import CanvasModel from './index'
import styled from "styled-components";
// import "../../../index.css";

const Section = styled.div`
`
const Container = styled.div`
height: 90vh;
`

const AiIndex = () => {
  return (
    
    <>
        <Navbar />
        <Section className="section"> 
        
        <Container className="container">
          <CanvasModel />
        </Container>
      </Section>
    </>
  )
}

export default AiIndex