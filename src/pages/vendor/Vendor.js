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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAuth } from "../../context/UserContext";

function createData(id, name, email, location, address, status) {
  return { id, name, email, location, address, status };
}

const rows = [
  createData(
    1,
    "Hamro Pasal",
    "mina@gmail.com",
    "Nakhipot,Lalitpur",
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
const Vendor = () => {
  const { data:{user:{role}}} = useAuth();
 
  return (
    <Container>
      {role && role!=="Admin" &&
        <Link to="/addVendor">
          <AddDiv> + Add Vendor</AddDiv>
        </Link>
      }
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Wallet </TableCell>
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
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.location}</TableCell>
                <TableCell align="center">
                  {row.address}
                  <CopyButton
                    style={{ height: "10px" }}
                    onClick={() => {
                      navigator.clipboard.writeText(row.address);
                    }}
                  >
                    <ContentCopyIcon />
                  </CopyButton>
                </TableCell>
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

export default Vendor;
