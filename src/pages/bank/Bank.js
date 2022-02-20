import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
function createData(id, username, email, address, walletAddress, status) {
  return { id, username, email, address, walletAddress, status };
}

const rows = [
  createData(
    1,
    'Nepal Rastra Bank',
    'nrb@gmail.com',
    'lalitpur',
    '0xc30004803f5dc1f6ad15193a197fd1fbd0d471d1',
    'inactive'
  ),
];

const Container = styled.div`
  flex: 4;
  height: calc(100vh - 80px);
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

const CopyButton = styled.button`
  padding-bottom: 20px;
  font-size: 10px;
  cursor: pointer;
  border: none;
  background: none;
`;

const Bank = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      };
      const { data } = await axios.get(
        'http://localhost:5000/api/user/banks',
        config
      );
      // console.log("hi", response)
      console.log(data);
      console.log(data.success);
      console.log(data.data);
      setPosts(data.data);
      console.log('this is state', posts);
      //console.log("agencyData", {  });
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
  return (
    <Container>
      {role && role !== 'Admin' && (
        <Link to='/addBank'>
          <AddDiv> + Add Bank</AddDiv>
        </Link>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align='left'> Bank</TableCell>
              <TableCell align='center'> Email</TableCell>
              <TableCell align='center'>Location</TableCell>
              <TableCell align='center'>Wallet Address</TableCell>
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
                <TableCell align='left'>{row.username}</TableCell>
                <TableCell align='center'>{row.email}</TableCell>
                <TableCell align='center'>{row.address}</TableCell>
                <TableCell align='center'>
                  {row.walletAddress ? row.walletAddress : '-'}
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
                <TableCell align='center'>
                  <button className='statusButton'>
                    {row.status === true ? 'Active' : 'Inactive'}
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

export default Bank;
