import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IndeterminateCheckBox } from '@mui/icons-material';

function createData(id, beneEmail, walletAddress) {
  return { id, beneEmail, walletAddress };
}

const rows = [
  createData(1, 'abc@gmail.com', 23000),
  createData(2, 'cde@email.com', 3000),
];
const CopyButton = styled.button`
  padding-bottom: 20px;
  font-size: 10px;
  cursor: pointer;
  border: none;
  background: none;
`;
const Container = styled.div`
  flex: 4;
  height: calc(100vh - 80px);
  color: black;
  font-size: 1rem;
  background-color: rgb(53, 51, 51);
  padding: 40px;
`;
const AddDiv = styled.div`
  padding-bottom: 20px;
  font-size: 30px;
  cursor: pointer;
`;
const FormWrapper = styled.div`
  display: flex;
  display: block;
  align-items: center;
  justify-content: center;
  background-color: rgb(53, 51, 51);
  padding: 20px;
  height: 100%;
  background-color: white;
`;
const H3 = styled.h3`
display: block;
padding 20px;`;

const P = styled.p`
  padding: 30px;
`;

const Create = styled.div`
  float: right;
  align-self: right;
`;

const ProjectDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [posts, setPosts] = useState({
    projectName: '',
    beneficiaries: [],
    users: [],
    createdBy: '',
    collectedToken: 0,
    description: 'Description',
    targetedArea: 'Domain',
  });
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/project/detail/${id}`,
        config
      );
      console.log(data);

      setPosts(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err, 'error occured');
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container>
      <FormWrapper>
        <h1>{posts.projectName}</h1>
        <div>
          <H3>Description</H3>
          <P>{posts.description}</P>
        </div>
        <Create>
          <H3>Created by: {posts.createdBy}</H3>
        </Create>
        <div>
          <H3>Category</H3>
          <P>{posts.targetedArea}</P>
        </div>
        <div>
          <H3>Beneficiary</H3>
          <TableHead>
            <TableRow>
              <TableCell> Email </TableCell>
              <TableCell>Wallet Address</TableCell>
            </TableRow>
          </TableHead>
          {posts.users.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center'>{row.email}</TableCell>
              <TableCell align='center'>
                {row.walletAddress}
                {row.walletAddress ? (
                  <CopyButton
                    style={{ height: '10px' }}
                    onClick={() => {
                      navigator.clipboard.writeText(row.walletAddress);
                    }}
                  >
                    <ContentCopyIcon />
                  </CopyButton>
                ) : (
                  ''
                )}
              </TableCell>
            </TableRow>
          ))}
        </div>
      </FormWrapper>
    </Container>
  );
};
export default ProjectDetail;
