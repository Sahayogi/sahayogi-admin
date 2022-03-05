import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  getCurrentWalletAddress,
  sliceWalletAddress,
} from '../../components/constants/Constant';
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
import axios from 'axios';
import { useAuth } from '../../context/UserContext';
import { createAgency } from '../Web3Client';

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
const CopyButton = styled.button`
  padding-bottom: 20px;
  font-size: 10px;
  cursor: pointer;
  border: none;
  background: none;
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
const ToBlockchain = styled.button`
  height: 40px;
  width: auto;
  padding: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  display: block;
  border: none;
  border-radius: 4px;
  background-color: green;
  color: white;
  font-size: 16px;
  font-weight: bolder;
  &:hover {
    background-color: pink;
  }
`;

const AidAgency = () => {
  const [agencyData, setAgencyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const getAgency = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      };

      const { data } = await axios.get(
        'http://localhost:5000/api/user/aidagencies',
        config
      );

      setAgencyData(data.agencyList);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAgency();
  }, []);
  const addToBlockchain = async (id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/admin/agency/addtoblock',
        { id },
        config
      );
      // alert(data.data.username);
      // setAgencyData(data.agencyList);
      // setLoading(false);
    } catch (err) {
      // setError(err.response.data.error);
      // setLoading(false);
    }
  };
  const handleAdd = (currentAddress, setSuccess, setFailed, userId) => {
    alert(userId);

    createAgency(currentAddress)
      .then((tx) => {
        console.log(tx);
        if (setAdded(true)) {
          // Axios call to update user.claimed to True
          setSuccess(true);
          addToBlockchain(userId);
          setTimeout(() => {
            setSuccess('');
          }, 5000);
        } else {
          setFailed(true);
          setTimeout(() => {
            setFailed('');
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const {
    data: {
      user: { role },
    },
  } = useAuth();

  return (
    <Container>
      {role && role === 'Admin' && (
        <Link to='/addAgency'>
          <AddDiv>Register Aid Agency</AddDiv>
        </Link>
      )}
      {success && <h1>Agency Added to Blockchain</h1>}
      {failed && <h1>Faied to add Agency to Blockchain</h1>}
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
                <TableCell align='left'> Aid Agency</TableCell>
                <TableCell align='center'>Email</TableCell>
                <TableCell align='center'>Location</TableCell>
                <TableCell align='center'>Wallet Adress</TableCell>
                <TableCell align='center'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agencyData.map((row, index) => (
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
                    {row.walletAddress
                      ? sliceWalletAddress(row.walletAddress)
                      : '-'}
                    {row.walletAddress && !row.addedToBlockchain ? (
                      // <CopyButton
                      //   style={{ height: "10px" }}
                      //   onClick={() => {
                      //     navigator.clipboard.writeText(sliceWalletAddress(row.walletAddress));
                      //   }}
                      // >
                      <ToBlockchain
                        onClick={() =>
                          handleAdd(
                            row.walletAddress,
                            setSuccess,
                            setFailed,
                            row._id
                          )
                        }
                      >
                        Add
                      </ToBlockchain>
                    ) : (
                      // </CopyButton>
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
      )}
    </Container>
  );
};

export default AidAgency;
