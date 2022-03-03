import React from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router";

const Container = styled.div`
  flex: 4;
  min-height: calc(100vh - 80px);
  color: white;
  font-size: 1rem;
  background-color: rgb(53, 51, 51);
  padding: 40px;
`;
const LogoutC = styled.button`
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 1rem;
`;
const Wrapper = styled.div`
  padding: 10px;
  align-items: center;
`;
const Settings = () => {
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

export default Settings;
