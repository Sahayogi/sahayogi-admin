import React from "react";
import styled, { css } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";


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
const Error = styled.h1`
  height: 40px;
  color: red;
  padding: 10px;
  font-size: 15px;
`;


const AddAgency = () => {
  const initialValues = {
    username: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("required").max(20),
    address: Yup.string().required("required").max(100),
    phoneNumber: Yup.string().max(10).required("required"),
    email: Yup.string().email("INVALID EMAIL").required("required"),
    password: Yup.string().required("required").min(6),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/admin/add/aidagency",
          values,
          config
        );
    
        console.log("data:", data);

        if (data.success === true) {
          alert(JSON.stringify(values, null, 2));
          console.log("added sucessful");
        }
      } catch (err) {
        console.log(err, "err");
      }
    },
  });

  return (
    <Container>
      <FormWrapper>
        <Form onSubmit={formik.handleSubmit}>
          <NewBeneficiaryTitle> Register New Agency</NewBeneficiaryTitle>
          <label htmlFor="username">Agency Name</label>
          <FormInput
            type="text"
            id="username"
            name="username"
            {...formik.getFieldProps("username")}
          />
          {formik.errors.username && formik.touched.username ? (
            <Error>{formik.errors.username}</Error>
          ) : null}
          <label htmlFor="address">Location</label>
          <FormInput
            type="text"
            id="address"
            name="address"
            {...formik.getFieldProps("address")}
          />
          {formik.errors.address && formik.touched.address ? (
            <Error>{formik.errors.address}</Error>
          ) : null}
          <label htmlFor="phoneNumber">Phone Number</label>
          <FormInput
            type="string"
            id="phoneNumber"
            name="phoneNumber"
            {...formik.getFieldProps("phoneNumber")}
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
            <Error>{formik.errors.phoneNumber}</Error>
          ) : null}
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
          <FormButton type="submit">Register</FormButton>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default AddAgency;
