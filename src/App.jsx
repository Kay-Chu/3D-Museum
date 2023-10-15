import Navbar from "./components/Navbar"
import Home1 from "./components/Index/Home1"
import Antique from "./components/Index/Antique";
import Who from "./components/Index/Who"
import styled from "styled-components";
import "../index.css"

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  color: white;
  background: url("./img/bg.jpeg");
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  }
`;

const App = () => {

  return (
    <Container>
      
      <Home1 />
      <Antique />
      <Who />
    </Container>
  )
}

export default App
