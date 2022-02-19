import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
const Container = styled.div`
  height: 50vh;
  padding: 20px;
`;
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

const UploadButton = styled.button`
  background-color: blue;
  color: white;
  border: none;
  padding: 7px;
  &:hover {
    background-color: blueviolet;
  }
`;
const FileInput = styled.input`
  color: lightgrey;
`;
const MidContainer = styled.div`
  background-color: lightgrey;
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
const Upload = () => {
    const [projectImg, setProjectImg] = useState(
      "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png"
    );

  const [projectImgA, setProjectImgA] = useState({
    file: [],
    filepreview:null,
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
//   const handleSubmit = async () => {
//     const formdata = new FormData();
//     formdata.append("projectavatar", projectImg.file);
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/imageupload",
//         formdata,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       console.log(res);
//       if (res.data.success === 1) {
//         // setSuccess("Image uploaded sucessfully");
//         console.log("image uploaded sucessfully");
//       }
//     } catch (err) {
//       console.log("err", err);
//     }
//   };

  return (
    <Container>
      <ImageForm>
      <Image src={projectImg} alt="" id="img"></Image>
       {/* { projectImg.filepreview !== null ? <Image src={projectImg.filepreview} alt="" id="img"></Image>: null} */}
        <MidContainer>
          <FileInput type="file" name="myfile" onChange={handleInputChange} />
        </MidContainer>
        {/* <UploadButton type="submit" onClick={handleSubmit}>
          Upload
        </UploadButton> */}
      </ImageForm>
    </Container>
  );
};

export default Upload;
