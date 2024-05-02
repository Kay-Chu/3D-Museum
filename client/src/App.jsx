
import Home1 from "./components/Index/Home1";
import GalleryIndex from "./components/Gallery/GalleryIndex";
import AiIndex from "./components/Ai/AiIndex";
import styled from "styled-components";

import { useLocation, useRoute } from "wouter";

import "../index.css";

const Container = styled.div``;

const App = () => {
  const [, setLocation] = useLocation();
  // const [, gallery_params] = useRoute("/Gallery/:id");
  const [, galleryMatch] = useRoute("/Gallery/:id");
  const [, aiIndexMatch] = useRoute("/Ai/AiIndex");

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
