import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
import { raiseFund, getBlockchain } from "../Web3Client";

const Container = styled.div`
  flex: 4;
  height: calc(100vh - 80px);
  background-color: rgb(53, 51, 51);
  padding: 40px;
`;
const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(53, 51, 51);
  padding: 20px;
  height: 100%;
`;
const Connect = styled.button`
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
      <Connect onClick={getBlockchain}>Connct To Metamask</Connect>
      <FormWrapper>
        <div>
          <label htmlFor="project">Project Id</label>
          <input
            placeholder="project"
            id="project"
            name="project"
            type="number"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="agency">Aid Agency</label>
          <input
            placeholder="Aid Agency"
            name="agency"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="goal">Goal</label>
          <input
            placeholder="goal"
            name="goal"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="start">Start</label>
          <input
            placeholder="start date"
            name="start"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="end">End</label>
          <input
            placeholder="End time"
            name="end"
            type="text"
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleFundRaising}>
          Raise Fund
        </button>
      </FormWrapper>
    </Container>
  );
};

export default RaiseFund;
