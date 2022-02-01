import React from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
function createData(id, name, address, status) {
  return { id, name, address, status };
}

const rows = [
  createData(
    1,
    "mina@gmail.com",
    "0xc30004803f5dc1f6ad15193a197fd1fbd0d471d1",
    "inactive"
  ),
];

const Container = styled.div`
  flex: 4;
  height: calc(100vh - 80px);
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
const BeneficiaryList = () => {
  const { data } = useAuth();
  return (
    <Container>
      {data.role && data.role!=="admin" &&
        <Link to="/addBeneficiary">
          <AddDiv>Add Beneficiary</AddDiv>
        </Link>
      }
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Beneficiary Email</TableCell>
              <TableCell align="center">Wallet Adress</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">
                  <button className="statusButton">{row.status}</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BeneficiaryList;
