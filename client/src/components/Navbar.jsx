import {React, useState} from "react";
import styled from "styled-components";
import { useLocation, useRoute } from "wouter";

import { Drawer,List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import MenuIcon from '@mui/icons-material/Menu';

const Section = styled.div`
  height: 10vh;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Container = styled.div`
  // width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vw 2vw;

  @media only screen and (max-width: 768px) {
    display: inline-flex;
    width: 100%;
  }
`;
const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;
const Logo = styled.img`
  height: 50px;
`;
const MenuList = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const MenuListItem = styled.a`
  // color: #596e79;
  color: aliceblue;
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Icon = styled.img`
  width: 20px;
  cursor: pointer;
`;
const Button = styled.a``;

const Navbar = () => {

  const [, setLocation] = useLocation();
  const handleNavigateToAI = () => {
    setLocation('/Ai/AiIndex'); 
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
  };

  const DrawerList = ({onClose}) => (
    <>
         <Box sx={{alignSelf: "flex-end"}}>
     <IconButton onClick={onClose} sx={{ color: '#fff' }}>
       <CloseIcon />
     </IconButton>
   </Box>
     <List>
      <ListItem>
        <MenuListItem  component="a" href="/">
          Home
        </MenuListItem>
      </ListItem>
      <ListItem>
        <MenuListItem  component="a" href="/Gallery/GalleryIndex">
          Gallery
        </MenuListItem>
      </ListItem>
      <ListItem>
        <MenuListItem  component="a" href="/Ai/AiIndex">
          Play with AI
        </MenuListItem>
      </ListItem>
    </List>

    </>
   
  );

  return (
    <Section>
      <Container>

        <nav id="mobileNavBar" >
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{color: "#c1c1c1", '&:hover': {
              color: '#fff', 
            }}}
            onClick={toggleDrawer(true)}
            className="button"
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}
          sx={{
            '.MuiDrawer-paper': { width: '80%', maxWidth: 360, 
            backgroundColor: 'rgba(31, 31, 31, 0.6)',
            backdropFilter: 'blur(10px)',             
            WebkitBackdropFilter: 'blur(10px)',      
            borderRight: '1px solid rgba(255, 255, 255, 0.1)', 
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)', 
          },
          }}
          >
            <DrawerList onClose={toggleDrawer(false)}/>
          </Drawer>
        </nav>

        <Links>
          <Logo src="/img/logo_dark.svg"></Logo>
          <MenuList>
            <MenuListItem  component="a" href="/">
              Home
            </MenuListItem>
            <MenuListItem  component="a" href="/Gallery/GalleryIndex">
              Gallery
            </MenuListItem>
            <MenuListItem  component="a" href="/Ai/AiIndex">
              Play with AI
            </MenuListItem>
          </MenuList>
        </Links>
        <Icons>
          {/* <Icon src="./img/search.png" /> */}
          <Button className="button" onClick={handleNavigateToAI}><span>Try with AI</span></Button>
        </Icons>
      </Container>
    </Section>
  );
};

export default Navbar;
