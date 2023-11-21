import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  position: relative;
`

const Container = styled.div`
    width: 1400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`

const Links = styled.div`
    display: flex;
    align-items: center;
    gap: 50px;
`
const Logo = styled.img`
    height: 50px;
`
const List = styled.ul`
    display: flex;
    gap: 20px;
    list-style: none;
`
const ListItem = styled.a`
    color: #596e79;
`
const Icons = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`
const Icon = styled.img`
    width: 20px;
    cursor: pointer;
`
const Button = styled.button`
`


const Navbar = () => {
    return (
        <Section>
            <Container>
                <Links>
                    <Logo src="/img/logo_dark.svg"></Logo>
                    <List>
                        <ListItem button component="a" href="/">Home</ListItem>
                        <ListItem button component="a" href="/Gallery/GalleryIndex">Gallery</ListItem>
                    </List>
                </Links>
                <Icons>
                    {/* <Icon src="./img/search.png" /> */}
                    <Button className='button'>Try with AI</Button>
                </Icons>
            </Container>
        </Section>
    )
}

export default Navbar;