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
const Error = styled.h1`
  height: 40px;
  color: red;
  padding: 10px;
  font-size: 15px;
`;

const AddProject = () => {
  const initialValues = {
    name: "",
    location: "",
    description: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("required").max(20),
    location: Yup.string().required("required").max(100),
    description: Yup.string().required("required").max(100),
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
          <NewBeneficiaryTitle> + Add New Donation Project</NewBeneficiaryTitle>
          <label htmlFor="name">Donation Project</label>
          <FormInput
            type="text"
            id="name"
            name="name"
            {...formik.getFieldProps("name")}
          />
          {formik.errors.name && formik.touched.name ? (
            <Error>{formik.errors.name}</Error>
          ) : null}
          <label htmlFor="location">Targeted Area</label>
          <FormInput
            type="text"
            id="location"
            name="location"
            {...formik.getFieldProps("location")}
          />
          {formik.errors.location && formik.touched.location ? (
            <Error>{formik.errors.location}</Error>
          ) : null}
          <label htmlFor="description">Description</label>
          <FormInput
            type="message"
            id="description"
            name="description"
            {...formik.getFieldProps("description")}
          />
          {formik.errors.description && formik.touched.description ? (
            <Error>{formik.errors.description}</Error>
          ) : null}

          <FormButton type="submit">Add</FormButton>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default AddProject;
