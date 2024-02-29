import Navbar from "./components/Navbar";
import Home1 from "./components/Index/Home1";
import GalleryIndex from "./components/Gallery/GalleryIndex";
import AiIndex from "./components/Ai/AiIndex";
import Who from "./components/Index/Who";
import Works from "./components/Index/Works";
import Antique from "./components/Index/Antique";
import styled from "styled-components";
import WebgiViewer from "./components/Index/WebgiViewer";

import { useLocation, useRoute } from "wouter";

import "../index.css";

const Container = styled.div``;

const App = () => {
  const [, setLocation] = useLocation();
  // const [, gallery_params] = useRoute("/Gallery/:id");
  const [, galleryMatch] = useRoute("/Gallery/:id");
  const [, aiIndexMatch] = useRoute("/Ai/AiIndex");

  console.log('AI Index Match:', aiIndexMatch);


  return (
    <>
      <Container className="container">

        {!galleryMatch && !aiIndexMatch && <Home1 />}
        {galleryMatch && <GalleryIndex />}
        {aiIndexMatch && <AiIndex /> }


      </Container>
    </>
  );
};

export default App;
