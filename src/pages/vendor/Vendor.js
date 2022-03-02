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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAuth } from '../../context/UserContext';

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

const StatusButton = ({ status, id }) => {
  const [changeableStatus, setChangeableStatus] = useState(status);
  const handleStatus = async (id) => {
    // alert('button CLicked');
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/aidagency/status/${id}`,
        {},
        config
      );
      console.log(data.data);
      setChangeableStatus(data.data.status);
    } catch (err) {
      console.log(err, 'error occured');
    }
  };
  return (
    <button className='statusButton' onClick={() => handleStatus(id)}>
      {changeableStatus === true ? 'Active' : 'Inactive'}
    </button>
  );
};

const Vendor = () => {
  const [vendorData, setVendorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVendor = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      };
      const { data } = await axios.get(
        'http://localhost:5000/api/user/vendors',
        config
      );
      setVendorData(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err, 'error occured');
    }
  };
  useEffect(() => {
    getVendor();
  }, []);
  const {
    data: {
      user: { role },
    },
  } = useAuth();

  return (
    <Container>
      {role && role !== 'Admin' && (
        <Link to='/addVendor'>
          <AddDiv> + Add Vendor</AddDiv>
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
                <TableCell align='left'>Name</TableCell>
                <TableCell align='center'>Email</TableCell>
                <TableCell align='center'>Location</TableCell>
                <TableCell align='center'>Wallet </TableCell>
                <TableCell align='center'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendorData.map((row, index) => (
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
                    <StatusButton status={row.status} id={row._id} />
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

export default Vendor;
