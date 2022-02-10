import React from "react";
import styled, { css } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  font-weight: bold;
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
  height: 30px;
  border-radius: 10px;
  padding: 10px;
  justify-content: center;
  cursor: pointer;
`;
const StyledFieldset = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  legend {
    padding: 0 10px;
  }
  label {
    padding-right: 30px;
  }
  input {
    margin-right: 10px;
  }
`;
const Error = styled.h1`
  height: 40px;
  color: red;
  padding: 10px;
  font-size: 15px;
`;

const AddBeneficiary = () => {
  const initialValues = {
    name: "",
    address: "",
    number: "",
    gender: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("required").max(20),
    address: Yup.string().required("required").max(100),
    number: Yup.string().max(10).required("required"),
    gender: Yup.bool().required("required"),
    email: Yup.string().email("INVALID EMAIL").required("required"),
    password: Yup.string().required("required").min(6),
    cpassword: Yup.string().required("").min(6),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container>
      <FormWrapper>
        <Form onSubmit={formik.handleSubmit}>
          <NewBeneficiaryTitle> + Register New Beneficiary</NewBeneficiaryTitle>
          <label htmlFor="name">Full Name</label>
          <FormInput
            type="text"
            id="name"
            name="name"
            {...formik.getFieldProps("name")}
          />
          {formik.errors.name && formik.touched.name ? (
            <Error>{formik.errors.name}</Error>
          ) : null}
          <label htmlFor="address">Address</label>
          <FormInput
            type="text"
            id="address"
            name="address"
            {...formik.getFieldProps("address")}
          />
          {formik.errors.address && formik.touched.address ? (
            <Error>{formik.errors.address}</Error>
          ) : null}
          <label htmlFor="number">Phone Number</label>
          <FormInput
            type="string"
            id="number"
            name="number"
            {...formik.getFieldProps("number")}
          />
          {formik.errors.number && formik.touched.number ? (
            <Error>{formik.errors.number}</Error>
          ) : null}
          <StyledFieldset>
            <legend>Gender</legend>
            <label>
              <input
                type="radio"
                value="female"
                name="gender"
                // {...formik.getFieldProps("gender")}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="male"
                name="gender"
                // {...formik.getFieldProps("gender")}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="other"
                name="gender"
                // {...formik.getFieldProps("gender")}
              />
              Others
            </label>
            {/* {formik.errors.gender && formik.touched.name ? (
              <Error>{formik.errors.gender}</Error>
            ) : null} */}
          </StyledFieldset>
          <label htmlFor="email">Email</label>
          <FormInput
            type="email"
            id="email"
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            <Error>{formik.errors.email}</Error>
          ) : null}
          <label htmlFor="password">Password</label>
          <FormInput
            type="password"
            id="password"
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password ? (
            <Error>{formik.errors.password}</Error>
          ) : null}
          <label htmlFor="password">Confirm Password</label>
          <FormInput
            type="password"
            id="cpassword"
            name="cpassword"
            {...formik.getFieldProps("cpassword")}
          />
          {formik.errors.cpassword && formik.touched.cpassword ? (
            <Error>{formik.errors.cpassword}</Error>
          ) : null}
          <FormButton type="submit">Register</FormButton>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default AddBeneficiary;
