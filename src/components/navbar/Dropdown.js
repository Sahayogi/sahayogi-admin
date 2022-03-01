import React, { useState } from 'react';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';

const Container = styled.div`
  display: flex;
  margin-top: 149px;
  margin-left: -312px;
  height: 100px;
  width: 300px;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  z-index: auto;
`;
const DropMenu = styled.div`
  z-index: 100;
  background-color: rgb(61, 60, 60);
  color: white;
  display: flex;
  flex-direction: column;
`;
const LogoutButton = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgb(61, 60, 60);
  padding: 7px;
  cursor: pointer;
  color: white;
  font-size: 15px;
  border: none;
  &:hover {
    background-color: black;
  }
`;

const DropDown = ({ setAccountAddress }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  return (
    <Container onClick={handleClick}>
      <Wrapper>
        <DropMenu>
          <LogoutButton onClick={() => setAccountAddress('')}>
            <LogoutIcon />
            Disconnect
          </LogoutButton>
        </DropMenu>
      </Wrapper>
    </Container>
  );
};

export default DropDown;
