import React, { useState } from "react";
import styled from "styled-components";
import { updateMerkleRoot } from "../Web3Client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
const FormWrapper = styled.div`
  display: flex;
  display: block;
  flex: 1;
  margin: 10px;
  align-items: center;
  justify-content: center;
  background-color: rgb(53, 51, 51);
  padding: 20px;
  width: 300px;
  border: 1px solid gray;
`;
const Loginlabel = styled.label`
  margin-bottom: 10px;
  display: block;
  color: white; ;
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

const BeneOperation = () => {
  const [update, setUpdate] = useState(false);

  const initialValues = {
    projectId: "",
    merkleroot: "",
  };
  const validationSchema = Yup.object({
    projectId: Yup.string().required("required"),

    merkleroot: Yup.string().required("required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      const handleUpdate = (e) => {
        updateMerkleRoot(values.projectId, values.merkleroot)
          .then((tx) => {
            console.log(tx);
            setUpdate(true);
            toast.success("MerkleRoot updated Successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to Update MerkleRoot", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      };

      handleUpdate();
    },
  });
  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Wrapper>
        <Mint>
          <FormContainer>
            <FormWrapper>
              <H3>Update Merkle Root</H3>
              <form onSubmit={formik.handleSubmit}>
                <Loginlabel htmlFor="projectId">Project Id</Loginlabel>
                <LoginInput
                  type="string"
                  id="projectId"
                  placeholder="amount"
                  projectId="projectId"
                  {...formik.getFieldProps("projectId")}
                />
                {formik.errors.projectId && formik.touched.projectId ? (
                  <Error>{formik.errors.projectId}</Error>
                ) : null}

                <Loginlabel htmlFor="merleroot">New Merkle Root</Loginlabel>
                <LoginInput
                  type="string"
                  id="merkleroot"
                  placeholder="merkleroot"
                  merkleroot="merkleroot"
                  {...formik.getFieldProps("merkleroot")}
                />
                {formik.errors.merkleroot && formik.touched.merkleroot ? (
                  <Error>{formik.errors.merkleroot}</Error>
                ) : null}
                <ButtonS>
                  <SubmitButton type="submit">Update</SubmitButton>
                </ButtonS>
              </form>
            </FormWrapper>
          </FormContainer>
        </Mint>
      </Wrapper>
    </Container>
  );
};

export default BeneOperation;
