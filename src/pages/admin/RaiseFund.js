import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
import { raiseFund, getBlockchain } from "../Web3Client";

const Container = styled.div`
  flex: 4;
  min-height: calc(100vh - 80px);
  background-color: rgb(53, 51, 51);
  padding: 40px;
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
const FormInput = styled.input`
display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 14px;
`;
const FormLabel = styled.label`
margin-bottom: 10px;
display: block;
color: white`;

const RaiseFund = () => {
  const [raised, setRaised] = useState(false);
  const [formData, setFormData] = useState({
    project: "",
    agency: "",
    goal: "",
    start: "",
    end: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFundRaising = (e) => {
    e.preventDefault();
    const { project, agency, goal, start, end } = formData;
    raiseFund(project, agency, goal, start, end)
      .then((tx) => {
        console.log(tx);
        setRaised(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Connect onClick={getBlockchain}>Connect To Metamask</Connect>
      <FormWrapper>
        <div>
          <FormLabel htmlFor="project">Project Id</FormLabel>
          <FormInput
            placeholder="project"
            id="project"
            name="project"
            type="number"
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel htmlFor="agency">Aid Agency</FormLabel>
          <FormInput
            placeholder="Aid Agency"
            name="agency"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel htmlFor="goal">Goal</FormLabel>
          <FormInput
            placeholder="goal"
            name="goal"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel htmlFor="start">Start</FormLabel>
          <FormInput
            placeholder="start date"
            name="start"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel htmlFor="end">End</FormLabel>
          <FormInput
            placeholder="End time"
            name="end"
            type="text"
            onChange={handleChange}
          />
        </div>
        <Button type="submit" onClick={handleFundRaising}>
          Raise Fund
        </Button>
      </FormWrapper>

    </Container>
  );
};

export default RaiseFund;