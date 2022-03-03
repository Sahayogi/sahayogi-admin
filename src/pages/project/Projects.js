import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { useAuth } from '../../context/UserContext';

function createData(id, projectName, numOfBene, tokens, status) {
  return { id, projectName, numOfBene, tokens, status };
}

const rows = [
  createData(1, 'LandSlide', 20, 23000, 'closed'),
  createData(2, 'Earthquake', 2, 3000, 'active'),
  createData(3, 'Covid', 3, 5000, 'active'),
  createData(4, 'Orphanage', 11, 2000, 'closed'),
];
const ProjectName = styled.div`
  color: black;
`;

const Container = styled.div`
  flex: 4;
  min-height: calc(100vh - 80px);
  color: white;
  font-size: 1rem;
  background-color: rgb(53, 51, 51);
  padding: 40px;
`;
const AddDiv = styled.div`
  padding-bottom: 20px;
  font-size: 30px;
  cursor: pointer;
`;

const Projects = () => {
  const [posts, setPosts] = useState([]);
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
        'http://localhost:5000/api/project/',
        config
      );
      setPosts(data.data);
      console.log(posts);
      setLoading(false);
    } catch (err) {
      console.log(err, 'error occured');
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const {
    data: {
      user: { role },
    },
  } = useAuth();
  // const [loading, setLoading] = useState(true);

  return (
    <Container>
      {role && role !== 'Admin' && (
        <Link to='/addProject'>
          <AddDiv> + Add Projects</AddDiv>
        </Link>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align='center'>Donation Projects</TableCell>
              <TableCell align='center'>Number of Beneficiaries</TableCell>
              <TableCell align='center'>Tokens</TableCell>
              <TableCell align='center'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell align='center'>
                  <Link to={`/projects/${row._id}`}>
                    <ProjectName>{row.projectName}</ProjectName>
                  </Link>
                </TableCell>
                <TableCell align='center'>{row.beneficiaries.length}</TableCell>
                <TableCell align='center'>{row.collectedToken}</TableCell>
                <TableCell align='center'>
                  <button className='statusButton'>
                    {row.status === true ? 'Active' : 'Unverified'}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Projects;
