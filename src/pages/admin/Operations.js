import React, { useState } from "react";
import styled from "styled-components";
import { mintToken, getOwnBalance, transact } from "../Web3Client";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  height: 50px;
  &:focus {
    background-color: rgb(63, 65, 65);
    border: none;
  }
`;
const FormWrapper = styled.form`
  display: flex;
  display: block;
  flex: 1;
  margin: 10px;
  align-items: center;
  justify-content: center;
  background-color: rgb(53, 51, 51);
  padding: 20px;
  width: 500px;
  border: 1px solid gray;
`;
const Loginlabel = styled.label`
  margin-bottom: 10px;
  display: block;
  color: white; ;
`;

const Label = styled.label`
  display: block;
  color: white;
  margin-bottom: 20px;
`;

const ButtonBal = styled.button`
  background: black;
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
  &:hover {
    background-color: gray;
  }
`;

const Balance = styled.div`
  flex: 1;
  margin: auto;
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  height: 100%;
  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const H3 = styled.h2`
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: 30px;
`;

const Operations = () => {
  const [mintAddress, setMintAddress] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [minted, setMinted] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transfer, setTransfer] = useState(false);

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
  const initialValues = {
    token: "",
    address: "",
  };
  const validationSchema = Yup.object({
    token: Yup.string().required("required"),

    address: Yup.string().max(42).required("required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      const handleTransfer = (e) => {
        transact(values.address, values.token)
          .then((tx) => {
            console.log(tx);
            setTransfer(true);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      handleTransfer();
    },
  });
  return (
    <Container>
      <Wrapper>
        <Mint>
          {/* <Circle></Circle> */}
          <FormContainer>
            <FormWrapper>
              <H3>Mint Token</H3>
              <Loginlabel>Token</Loginlabel>
              <LoginInput
                type="string"
                value={mintAmount}
                placeholder="amount"
                onChange={(e) => setMintAmount(e.target.value)}
              />
              <Loginlabel>Wallet-Address</Loginlabel>
              <LoginInput
                type="string"
                value={mintAddress}
                placeholder="address"
                onChange={(e) => setMintAddress(e.target.value)}
              />
              <ButtonS>
                <SubmitButton onClick={handleMint}>Mint</SubmitButton>
              </ButtonS>
            </FormWrapper>
            <FormWrapper>
              <H3>Transfer Token</H3>
              {/* <PaymentContainer> */}
              <form onSubmit={formik.handleSubmit}>
                <Loginlabel htmlFor="token">Token</Loginlabel>
                <LoginInput
                  type="string"
                  id="token"
                  placeholder="amount"
                  token="token"
                  {...formik.getFieldProps("token")}
                />
                {formik.errors.token && formik.touched.token ? (
                  <Error>{formik.errors.token}</Error>
                ) : null}

                <Loginlabel htmlFor="token">Wallet-Address</Loginlabel>
                <LoginInput
                  type="string"
                  id="address"
                  placeholder="address"
                  token="address"
                  {...formik.getFieldProps("address")}
                />
                {formik.errors.address && formik.touched.address ? (
                  <Error>{formik.errors.address}</Error>
                ) : null}
                <ButtonS>
                  <SubmitButton type="submit">Submit</SubmitButton>
                </ButtonS>
              </form>
              {/* </PaymentContainer> */}
            </FormWrapper>
          </FormContainer>
          <Balance>
            <Label>your current balance is {balance}</Label>
            <ButtonBal onClick={fetchBalance}>Balance</ButtonBal>
          </Balance>
        </Mint>
      </Wrapper>
    </Container>
  );
};

export default Operations;
const ButtonS = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const SubmitButton = styled.button`
  border: none;
  color: white;
  width: 100%;
  font-size: 20px;
  background-color: black;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;
const Error = styled.h1`
  height: 40px;
  color: red;
  padding: 6px;
  font-size: 15px;
`;
