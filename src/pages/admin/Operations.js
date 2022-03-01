import React, { useState } from "react";
import styled from "styled-components";
import { getBlockchain, mintToken, getOwnBalance,approve } from "../Web3Client";

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
const Mint = styled.div`
  height: 100%;
  width: 100%;
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
  &:focus {
    background-color: rgb(63, 65, 65);
    border: none;
  }
`;

const Button = styled.button`
  height: 40px;
  width: auto;
  padding: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: flex;
  border: none;
  align-self : center;
  border-radius: 20px;
  background-color: #2952e3;
  color: white;
  font-size: 16px;
  font-weight: bolder;
  &:hover {
    background-color: #2546bd;
    
  }
`;
const Connect = styled.button`
  height: 40px;
  width: auto;
  padding: 20px;
  align-items: center;
  justify-content: center;
  text-align:center;
  cursor: pointer;
  display: flex;
  flex: 1;
  margin: auto;
  border: none;
  border-radius: 20px;
  background-color: #2952e3;
  color: white;
  font-size: 16px;
  font-weight: bolder;

  &:hover {
    background-color: #2546bd;
  }
`;
const Operations = () => {
  const [mintAddress, setMintAddress] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [minted, setMinted] = useState(false);
  const [balance, setBalance] = useState(0);
  const [approved,setApproved] = useState(false);

  const handleMint = async (e) => {
    e.preventDefault();

    console.log("minttoken", mintToken);
    console.log("mintAddress", mintAddress);
    console.log("mintAmt", mintAmount);

    mintToken(mintAddress, mintAmount)
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
  const handleApprove=()=>{
      approve()
      .then((tx)=>{
          setApproved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Container>
      <Wrapper>
        <Mint>
          <Connect onClick={getBlockchain}>Connect To MetaMask</Connect>
          <form>
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
            <Button onClick={handleMint}>Mint</Button>
          </form>
          <Button onClick={handleApprove}>Approve</Button>


          <label>your current balance is {balance / 100}</label>
          <Button onClick={fetchBalance}>Balance</Button>
        </Mint>
      </Wrapper>
    </Container>
  );
};

export default Operations;
