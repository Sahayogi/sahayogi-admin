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

function createData(id, from, to,token, timestamp, status) {
  return { id, from, to,token, timestamp, status };
}

const rows = [
  createData(
    1,
    "0xc30004803f5dc1f6ad15193a197fd1fbd0d471d1",
    "0xc30004803f5dc1f6ad15193a197fd1fbd0d471d1",
    2000,
    "2022-01-27T14:13:23+00:00",
    "failed"
  ),
];

const Container = styled.div`
  flex: 4;
  min-height: calc(100vh - 80px);
  color: white;
  font-size: 1rem;
  background-color: rgb(53, 51, 51);
  padding: 40px;

  @media only screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;

const Transaction = () => {
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">From</TableCell>
              <TableCell align="left">To</TableCell>
              <TableCell align="left">Tokens</TableCell>
              <TableCell align="left">Timestamp</TableCell>
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
                <TableCell align="left">{row.from}</TableCell>
                <TableCell align="left">{row.to}</TableCell>
                <TableCell align="left">{row.token}</TableCell>
                <TableCell align="left">{row.timestamp}</TableCell>
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

export default Transaction;
