import React from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import { useAuth } from "../context/UserContext";

const Container = styled.div`
  flex: 4;
  height: calc(100vh - 80px);
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
const Logout = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    logoutUser();
    navigate("/");
  };
  return (
    <Container>
      <LogoutC onClick={handleLogout}>
        Logout <LogoutIcon />
      </LogoutC>
    </Container>
  );
};

export default Logout;
