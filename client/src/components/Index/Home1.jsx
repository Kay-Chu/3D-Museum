import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import Pot from "../Gallery/Pot";

const StyledCanvas = styled(({ shiftright, ...rest }) => <Canvas {...rest} />)`
  flex: 1;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) =>
    props.shiftright ? "translateX(50%)" : "translateX(0)"};
`;

const DescriptionContainer = styled(({ shiftleft, ...rest }) => (
  <div {...rest} />
))`
  width: 50vw;
  transition: transform 0.5s ease-in-out;

  transform: ${(props) =>
    props.shiftleft ? "translateX(-100%)" : "translateX(0)"};
`;

const Section = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  transition: transform 0.5s;
  scroll-snap-align: center;
`;

const Title = styled.h1`
  font-size: 40px;
`;

const animationContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      when: "beforeChildren", // Ensures that the container fades in before children start animating.
    },
  },
};
const description = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5 }, // Controls the speed of the fade-in for each child.
  },
};

const InteractivePot = ({ scrollY }) => {
  const potRef = useRef();

  useFrame((state) => {
    state.scene.rotation.y += 0.01;
    if (potRef.current) {
      const scale = 1.2 + scrollY / 500;
      potRef.current.position.y = -0.1 + scrollY / 500;
      potRef.current.scale.set(scale, scale, scale);
    }
  });

  return <Pot ref={potRef} />;
};

const Home1 = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shiftRight = scrollY > window.innerHeight * 0.5;
  const shiftLeft = scrollY > window.innerHeight * 0.5;

  return (
    <>
      <Navbar />
      <Section>
        <StyledCanvas shiftright={shiftRight}>
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          <InteractivePot scrollY={scrollY} /> {/* Adjust as needed */}
        </StyledCanvas>
        <DescriptionContainer shiftleft={shiftLeft}>
          <Title>Hong Kong Palace Museum</Title>
          <p>Web AR Exhibition</p>
        </DescriptionContainer>
      </Section>

      <Section>
        <motion.div
          variants={animationContainer}
          initial="hidden"
          animate="show"
        >
          <DescriptionContainer style={{ marginLeft: "5rem" }}>
            <motion.div variants={description}>
              <Title>Explore the museum by 3D models</Title>
              <p>
                This project shows the combination of 3D website and AR
                technology.
              </p>
              <p>Unlocking the future of cultural heritage presentations.</p>
            </motion.div>
            <img src="/ar/home_hkpm.jpg" width="160" height="160"></img>

            
          </DescriptionContainer>
        </motion.div>
        <StyledCanvas>
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          <InteractivePot scrollY={-scrollY / 2} />
        </StyledCanvas>
      </Section>
    </>
  );
};

export default Home1;
