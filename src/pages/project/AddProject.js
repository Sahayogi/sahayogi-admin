import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import Upload from "./Upload";

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
  background-color: white;
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
    projectName: "",
    targetedArea: "",
    description: "",
  };
  const validationSchema = Yup.object({
    projectName: Yup.string().required("required").max(20),
    targetedArea: Yup.string().required("required").max(100),
    description: Yup.string().required("required").max(100),
  });
  const [projectImg, setProjectImg] = useState(
    "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png"
  );

  const [projectImgA, setProjectImgA] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProjectImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setProjectImgA({
      ...projectImg,
      file: e.target.files[0],
    });
    // filepreview:URL.createObjectURL(e.target.files[0]),
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/project/add",
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
      //for image upload

      const formdata = new FormData();
      formdata.append("projectavatar", projectImgA.file);
      try {
        const res = await axios.post(
          "http://localhost:5000/imageupload",
          formdata,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(res);
        if (res.data.success === 1) {
          // setSuccess("Image uploaded sucessfully");
          console.log("image uploaded sucessfully");
        }
      } catch (err) {
        console.log("err", err);
      }
    },
  });
  const fileRef = useRef(null);
  return (
    <Container>
      <FormWrapper>
        <Form onSubmit={formik.handleSubmit}>
          <NewBeneficiaryTitle>Add New Donation Project</NewBeneficiaryTitle>
          <ImageForm>
            <Image src={projectImg} alt="" id="img"></Image>
            {/* { projectImg.filepreview !== null ? <Image src={projectImg.filepreview} alt="" id="img"></Image>: null} */}
            <MidContainer>
              <FileInput
                ref={fileRef}
                hidden
                type="file"
                name="myfile"
                onChange={handleInputChange}
              />
              <UploadButton
                type="button"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                Upload
              </UploadButton>
            </MidContainer>
          </ImageForm>

          <label htmlFor="projectName">Donation Project</label>
          <FormInput
            type="text"
            id="projectName"
            name="projectName"
            {...formik.getFieldProps("projectName")}
          />
          {formik.errors.projectName && formik.touched.projectName ? (
            <Error>{formik.errors.projectName}</Error>
          ) : null}
          <label htmlFor="targetedArea">Targeted Area</label>
          <FormInput
            type="text"
            id="targetedArea"
            name="targetedArea"
            {...formik.getFieldProps("targetedArea")}
          />
          {formik.errors.targetedArea && formik.touched.targetedArea ? (
            <Error>{formik.errors.targetedArea}</Error>
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
const ImageForm = styled.div`
  height: 50vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  /* border: 1px solid grey; */
  gap: 1rem;
`;
const FileInput = styled.input`
  color: lightgrey;
`;
const MidContainer = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  gap: 2rem;
  color: grey;
  padding: 5px;
`;
const Image = styled.img`
  height: 35vh;
  width: 100%;
  object-fit: cover;
`;
const UploadButton = styled.button`
  justify-content: center;
  background-color: blue;
  color: white;
  border: none;
  padding: 7px;
  &:hover {
    background-color: blueviolet;
  }
`;

export default AddProject;
