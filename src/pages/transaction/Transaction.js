import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { sliceWalletAddress } from "../../components/constants/Constant";
const ADDRESS = "0xb780522e0941142AA1AA97c6b58440fC618d1C56";
const apikey = "C1ZSWKRYWAZNKY6P2RX7BTTTGCAQ4QS4KJ";
const endpoints = "https://api-ropsten.etherscan.io/api";

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
  const [from, setFrom] = useState([]);

  const handleEtherScan = async () => {
    const etherscan = await axios.get(
      endpoints +
        `?module=account&action=txlist&address=${ADDRESS}&apikey=${apikey}`
    );
    let { result } = etherscan.data;
    setFrom(result);
    console.log(from);
  };

  useEffect(() => {
    handleEtherScan();
  }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>TransIndex</TableCell>
              <TableCell align="left">BlockHash</TableCell>
              <TableCell align="left">BlockNumber</TableCell>

              <TableCell align="left">From</TableCell>
              <TableCell align="left">To</TableCell>
              <TableCell align="left">Tokens</TableCell>
              <TableCell align="left">Timestamp</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {from.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.transactionIndex}
                </TableCell>
                <TableCell align="left">{sliceWalletAddress(row.blockHash)}</TableCell>
                <TableCell align="left">{row.blockNumber}</TableCell>

                <TableCell align="left">
                  {sliceWalletAddress(row.from)}
                </TableCell>
                <TableCell align="left">{sliceWalletAddress(row.to)}</TableCell>
                <TableCell align="left">{row.for}</TableCell>
                <TableCell align="left">
                  {new Date(row.timeStamp * 1000).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  <button className="statusButton">
                    {row.isError == 0 ? "Success" : "Failed"}
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

export default Transaction;
