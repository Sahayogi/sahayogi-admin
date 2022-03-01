import React from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import { useAuth } from "../context/UserContext";


const Container = styled.div`
  flex: 4;
  min-height: calc(100vh - 80px);
  font-size: 1rem;
  background-color: rgb(53, 51, 51);
  padding: 40px;
`;

const Wrapper = styled.div`
  height: 100%;
  background-color: rgb(53, 51, 51);
`;
const LogoutC = styled.button`
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 1rem;
`;


const Logout = () => {
  const { logoutUser } = useAuth();
  
  const navigate = useNavigate();
  const handleLogout = (e) => {
    logoutUser();
    navigate("/");
  };

  
  return (
    <Container>
      <Wrapper>
        <LogoutC onClick={handleLogout}>
          Logout <LogoutIcon />
        </LogoutC>
      </Wrapper>
    </Container>
  );
};

export default Logout;
