import Navbar from "./components/Navbar"
import Home1 from "./components/Index/Home1"
import Who from "./components/Index/Who"
import Works from "./components/Index/Works"
import Antique from "./components/Index/Antique"
import styled from "styled-components";
import WebgiViewer from "./components/Index/WebgiViewer"



import "../index.css"

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  color: white;
  background: BlanchedAlmond;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  }
`;


const App = () => {

  


  return (
    <>
      <Container>

        <Home1 />
        
        {/* <WebgiViewer /> */}
        {/* eventSource={document.getElementById('root')} */}
        <Who />
        <Works />
      </Container>
      
      
    </>

  )
}

export default App
