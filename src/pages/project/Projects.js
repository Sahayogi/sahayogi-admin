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

function createData(id, name, num, tokens, status) {
  return { id, name, num, tokens, status };
}

const rows = [
  createData(1, "LandSlide", 20, 23000, "closed"),
  createData(2, "Earthquake", 2, 3000, "active"),
  createData(3, "Covid", 3, 5000, "active"),
  createData(4, "Orphanage", 11, 2000, "closed"),
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

const Projects = () => {
  const { data:{user:{role}}} = useAuth();
  
  return (
    <Container>
      {role && role !== "admin" && (
        <Link to="/addProject">
          <AddDiv> + Add Projects</AddDiv>
        </Link>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">Donation Projects</TableCell>
              <TableCell align="center">Number of Beneficiaries</TableCell>
              <TableCell align="center">Tokens</TableCell>
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
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.num}</TableCell>
                <TableCell align="center">{row.tokens}</TableCell>
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

export default Projects;
