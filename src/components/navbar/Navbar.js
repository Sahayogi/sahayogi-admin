import avatar from "../../assets/metamask.png";
import { FiBell } from "react-icons/fi";
import logo from "../../assets/sahayogi.png";
import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import Metamask from "./Metamask";

const Container = styled.div`
  width: 100%;
  height: 80px;
  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    top: 0;
    position: sticky;
  }
`;
const NavbarWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(
    to left,
    #8c908c,
    #777c7a,
    #646969,
    #535657,
    #424445,
    #393b3c,
    #313233,
    #292a2b,
    #262828,
    #242626,
    #222323,
    #202120
  );
  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    height: 100%;
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgb(207, 207, 207);
  }
`;
const NavbarLeft = styled.div`
  &:img {
    height: 80px;
    display: flex;
  }
`;
const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  /* margin-left: auto; */
  padding-right: 20px;
`;
const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  display: flex;
  object-fit: cover;
`;
const Bell = styled.div`
  color: white;
  font-size: 1.4rem;
  display: flex;
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <Container>
      <NavbarWrapper>
        <Link to="/">
          <NavbarLeft>
            <img src={logo} alt="" />
          </NavbarLeft>
        </Link>

        <NavbarRight>
          <Bell>
            <FiBell onClick={() => {}} />
          </Bell>
          <Image src={avatar} alt="" />
         <Metamask/>
        </NavbarRight>
      </NavbarWrapper>
    </Container>
  );
};

export default Navbar;
