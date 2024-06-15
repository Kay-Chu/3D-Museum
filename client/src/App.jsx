
import Home1 from "./components/Index/Home1";
import GalleryIndex from "./components/Gallery/GalleryIndex";
import AiIndex from "./components/Ai/AiIndex";

import ARIndex from "./components/AR/ARIndex";

import styled from "styled-components";
import StartsCanvas from "./components/StartsCanvas";

import { useLocation, useRoute } from "wouter";

import "../index.css";

const Container = styled.div``;

const App = () => {
  const [, setLocation] = useLocation();

  const [, galleryMatch] = useRoute("/Gallery/:id");
  const [, aiIndexMatch] = useRoute("/Ai/AiIndex");

  const [, arIndexMatch] = useRoute("/AR/ARIndex");

  return (
    <>

    <StartsCanvas className="absolute"/>
      <Container className="w-full h-screen z-999">
      
        {!galleryMatch && !aiIndexMatch && !arIndexMatch && <Home1 />}
        {galleryMatch && <GalleryIndex />}
        {aiIndexMatch && <AiIndex /> }

        {arIndexMatch && <ARIndex /> }

      </Container>


    </>
  );
};

export default App;
