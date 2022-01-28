import React from "react";
import styled, { css } from "styled-components";

const sharedStyles = css`
  background-color: grey;
  height: 40px;
  padding: 20px;
  color: white;
  margin: 10px 0 20px 0;
  border-radius: 5px;
  border: none;
  font-size: 20px;
`;

const Container = styled.div`
  flex: 4;
  height: calc(100vh - 80px);
  background-color: rgb(53, 51, 51);
  padding: 40px;
`;
const NewBeneficiaryTitle = styled.div`
  color: black;
  padding-bottom: 30px;
  font-weight:bold;
  font-size: 30px;
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
  max-width: 700px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 15px 19px 11px -6px rgba(237, 230, 230, 0.75);
  -webkit-box-shadow: 15px 19px 11px -6px rgba(237, 230, 230, 0.75);
  -moz-box-shadow: 15px 19px 11px -6px rgba(237, 230, 230, 0.75);
`;
const FormInput = styled.input`
  width: 100%;
  ${sharedStyles}
`;
const FormButton = styled.button`
 border: none;
 color: white;
 background-color: black;
 height:30px;
 border-radius: 10px;
 padding: 10px;
 justify-content: center;
 cursor: pointer;
 
`;

const AddVendor = () => {
  return (
    <Container>
      <FormWrapper>
        <Form>
          <NewBeneficiaryTitle> Register New Vendor</NewBeneficiaryTitle>

          <label htmlFor="name">Full Name</label>
          <FormInput type="text"  name="name" />
          <label htmlFor="address">Address</label>
          <FormInput type="text"  name="address" />
          <label htmlFor="number">Phone Number</label>
          <FormInput type="number" name="number" />
          <label htmlFor="email">Email</label>
          <FormInput type="email"  name="email" />
          <label htmlFor="password">Password</label>
          <FormInput type="password" name="password" />
          <label htmlFor="password">Confirm Password</label>
          <FormInput type="password" name="password" />
          <FormButton type="submit">Register</FormButton>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default AddVendor;
