import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { sliceWalletAddress } from '../../components/constants/Constant';
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

const CopyButton = styled.button`
  padding-bottom: 20px;
  font-size: 10px;
  cursor: pointer;
  border: none;
  background: none;
`;
const Container = styled.div`
  flex: 4;
  min-height: calc(100vh - 80px);
  color: white;
  font-size: 1rem;
  background-color: rgb(53, 51, 51);
  padding: 40px;
  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
`;
const AddDiv = styled.div`
  padding-bottom: 20px;
  font-size: 30px;
  cursor: pointer;
`;
const MainLoader = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  /* border: 2px solid white; */
`;

const Loader = styled.div`
  flex: 1;
  margin: auto;
  margin-top: 200px;
  margin-bottom: 200px;
  height: calc(100vh);
  border: 16px solid #f3f3f3;
  border-top: 16px solid black;
  border-radius: 50%;
  width: 130px;
  height: 130px;
  animation: spin 0.5s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Wallet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BeneficiaryList = () => {
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
        'http://localhost:5000/api/user/beneficiaries',
        config
      );
      setPosts(data.data);
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
  return (
    <Container>
      {role && role !== 'Admin' && (
        <Link to='/addBeneficiary'>
          <AddDiv> + Add Beneficiary</AddDiv>
        </Link>
      )}
      {loading && (
        <div>
          <MainLoader>
            <Loader></Loader>
          </MainLoader>
        </div>
      )}

      {!loading && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align='left'>Beneficiary </TableCell>
                <TableCell align='center'>Email </TableCell>
                <TableCell align='center'>Wallet Adress</TableCell>
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

                  <TableCell align='center'>
                  <Wallet>
                      {row.walletAddress
                        ? sliceWalletAddress(row.walletAddress)
                        : "-"}
                    
                    </Wallet>
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
      )}
    </Container>
  );
};

export default BeneficiaryList;
