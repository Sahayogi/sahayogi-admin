import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/user/beneficiaries",
        config
      );

      console.log(data);
      console.log(data.success);
      console.log(data.data);
      setPosts(data.data);
      console.log("this is state", posts);
    } catch (err) {
      console.log(err, "error occured");
    }
  };
  useEffect(() => {
    fetchPosts();
  },[]);
  const {
    data: {
      user: { role },
    },
  } = useAuth();
  return (
    <Container>
      {role && role !== "Admin" && (
        <Link to="/addBeneficiary">
          <AddDiv> + Add Beneficiary</AddDiv>
        </Link>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Beneficiary </TableCell>
              <TableCell align="center">Email </TableCell>
              <TableCell align="center">Wallet Adress</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="center">{row.email}</TableCell>

                <TableCell align="center">
                  {row.walletAddress ? row.walletAddress : " - "}
                </TableCell>
                <TableCell align="center">
                  <button className="statusButton">
                    {row.status === true ? "Active" : "Inactive"}
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

export default BeneficiaryList;
