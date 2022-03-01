import React, { useState, useContext } from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import { useAuth } from "../context/UserContext";
import { getBlockchain, mintToken, getOwnBalance } from "./Web3Client";

const Container = styled.div`
  flex: 4;
  height: calc(100vh - 80px);
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
const Mint = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
const LoginInput = styled.input`
  height: 2.8rem;
  border-radius: 10px;
  border: none;
  color: white;
  padding: 10px;
  font-size: 16px;
  background-color: black;
  /* background-color: rgb(53, 51, 51); */
  &:focus {
    background-color: rgb(63, 65, 65);
    border: none;
  }
`;
const MintB = styled.button`
  height: 40px;
  width: 150px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: flex;
  border: none;
  border-radius: 4rem;
  /* background-color: rgb(61, 60, 60); */
  background-color: blue;
  color: white;
  &:hover {
    background-color: pink;
  }
`;
const Logout = () => {
  const { logoutUser } = useAuth();
  const [mintAddress, setMintAddress] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [minted, setMinted] = useState(false);
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();
  const handleLogout = (e) => {
    logoutUser();
    navigate("/");
  };



  const handleMint = async () => {
    mintToken()
      .then((tx) => {
        console.log(tx);
        setMinted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchBalance = () => {
    getOwnBalance()
      .then((balance) => {
        setBalance(balance);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Wrapper>
        <LogoutC onClick={handleLogout}>
          Logout <LogoutIcon />
        </LogoutC>
        <Mint>
          <MintB onClick={getBlockchain}>Connect To MetaMask</MintB>

          <form>
            {/* <label>Address:</label> */}
            <LoginInput
              type="string"
              value={mintAmount}
              placeholder="amount"
              onChange={(e) => setMintAmount(e.target.value)}
            />
            <LoginInput
              type="string"
              value={mintAddress}
              placeholder="address"
              onChange={(e) => setMintAddress(e.target.value)}
            />
            <MintB onClick={handleMint}>Mint</MintB>
          </form>
          <MintB onClick={handleMint}>Mint</MintB>

          <label>your current balance is {balance/100}</label>

          <MintB onClick={fetchBalance}>Balance</MintB>
        </Mint>
      </Wrapper>
    </Container>
  );
};

export default Logout;
