import {React, useState} from "react";
import styled from "styled-components";
import { useLocation, useRoute } from "wouter";

import { Drawer,List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Section = styled.div`
  height: 10vh;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

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
  color: #596e79;
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

  const DrawerList = () => (
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
  );

  return (
    <Section>
      <Container>

        <nav id="mobileNavBar" >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="button"
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}
          sx={{
            '.MuiDrawer-paper': { width: '80%', maxWidth: 360 },
          }}
          >
            <DrawerList />
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
          <Button className="button" onClick={handleNavigateToAI}>Try with AI</Button>
        </Icons>
      </Container>
    </Section>
  );
};

export default Navbar;
