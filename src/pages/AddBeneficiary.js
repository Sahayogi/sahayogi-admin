import React from "react";
import styled, { css } from "styled-components";

const sharedStyles = css`
  background-color: grey;
  color: white;
  height: 40px;
  padding: 20px;
  margin: 10px 0 20px 0;
  border-radius: 5px;
  border: none;
`;

const Container = styled.div`
  flex: 4;
  height: calc(100vh - 80px);
  color: white;
  font-size: 1rem;
  background-color: rgb(53, 51, 51);
  padding: 40px;
`;
const NewBeneficiaryTitle = styled.div`
  color: black;
  padding: 20px 0px;
`;
const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(53, 51, 51);
  padding: 20px;
  height: 100%;
`;

const Form = styled.form`
  padding: 40px;
  /* max-width: 700px; */
  width: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 15px 19px 11px -6px rgba(237, 230, 230, 0.75);
  -webkit-box-shadow: 15px 19px 11px -6px rgba(237, 230, 230, 0.75);
  -moz-box-shadow: 15px 19px 11px -6px rgba(237, 230, 230, 0.75);
`;
const FormInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}
`;
const FormButton = styled.button``;

const AddBeneficiary = () => {
  return (
    <Container>
      <FormWrapper>
        <Form>
          <NewBeneficiaryTitle> Register New Beneficiary</NewBeneficiaryTitle>

          <label htmlFor="name"></label>
          <FormInput type="text" placeholder="enter name" name="name" />
          <label htmlFor="email"></label>
          <FormInput type="email" placeholder="enter email" name="email" />
          <label htmlFor="password"></label>
          <FormInput type="password" name="password" />
          <FormButton type="submit">Register</FormButton>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default AddBeneficiary;
