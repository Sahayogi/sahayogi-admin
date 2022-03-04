import React, { useState } from "react";
import styled from "styled-components";
import {
  mintToken,
  getOwnBalance,
  approve,
} from "../Web3Client";

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
  background-color: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const LoginInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 14px;
  &:focus {
    background-color: rgb(63, 65, 65);
    border: none;
  }
`;
const Button = styled.button`
  height: 40px;
  width: auto;
  padding: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  /* display: block; */
  border: none;
  border-radius: 4px;
  /* background-color: rgb(61, 60, 60); */
  background-color: blue;
  color: white;
  font-size: 16px;
  font-weight: 100;
  &:hover {
    background-color: pink;
  }
`;
const FormWrapper = styled.div`
  display: flex;
  display: block;
  flex: 1;
  margin: auto;
  align-items: center;
  justify-content: center;
  background-color: rgb(53, 51, 51);
  padding: 20px;
  height: 100%;
  width: 500px;
`;
const Loginlabel = styled.label`
  margin-bottom: 10px;
  display: block;
  color: white;
`;

const Label = styled.label`
  display: block;
  color: black;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonBal = styled.button`
  background: green;
  color: white;
  text-transform: uppercase;
  border: none;
  padding: 20px;
  font-size: 12px;
  font-weight: 100;
  letter-spacing: 10px;
  appearance: none;
  border-radius: 4px;
  width: auto;
  cursor: pointer;
`;

const Balance = styled.div`
  flex: 1;
  margin: auto;
`;

const Circle = styled.div`
 margin:auto;
 height:150px;
 width:150px;
 border-radius:50%;
 background:#6c6a6a;`

const Operations = () => {
  const [mintAddress, setMintAddress] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [minted, setMinted] = useState(false);
  const [balance, setBalance] = useState(0);
  const [approved, setApproved] = useState(false);

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
  const handleApprove = () => {
    approve()
      .then((tx) => {
        setApproved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Wrapper>
        <Mint>
          <Circle></Circle>
          <FormWrapper>
            <Loginlabel>Amount</Loginlabel>
            <LoginInput
              type="string"
              value={mintAmount}
              placeholder="amount"
              onChange={(e) => setMintAmount(e.target.value)}
            />
            <Loginlabel>Address</Loginlabel>
            <LoginInput
              type="string"
              value={mintAddress}
              placeholder="address"
              onChange={(e) => setMintAddress(e.target.value)}
            />
            <Button onClick={handleMint}>Mint</Button>
          </FormWrapper>
          <Balance>
            <ButtonBal onClick={handleApprove}>Approve</ButtonBal>

            <Label>your current balance is {balance}</Label>
            <ButtonBal onClick={fetchBalance}>Balance</ButtonBal>
          </Balance>
        </Mint>
      </Wrapper>
    </Container>
  );
};

export default Operations;
