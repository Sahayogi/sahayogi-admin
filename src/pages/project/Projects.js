import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { useAuth } from "../../context/UserContext";
import { countOfFunding } from "../../utils/fetchBlockchainData";
import { claimFunds } from "../Web3Client";
const ProjectName = styled.div`
  color: black;
`;

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
  padding: 20px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 4px;
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: bolder;
  &:hover {
    background-color: grey;
  }
`;
const Projects = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(false);
  //blockchain
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [claim, setClaim] = useState(false);

  const handleClick = (pidForClaim, setSuccess, setFailed, frCount) => {
    // setClick(!click);
    // axios req to update project.claimed to true
    console.log(pidForClaim);
    console.log(frCount);
    console.log("btn clikced");
    // {
    //   claimFunds(frCount, pidForClaim)
    //     .then((tx) => {
    //       console.log(tx);
    //       if (setClaim(true)) {
    //         setSuccess(true);
    //         setTimeout(() => {
    //           setSuccess('');
    //         }, 5000);
    //       } else {
    //         setFailed(true);
    //         setTimeout(() => {
    //           setFailed('');
    //         }, 5000);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log('Catch error');
    //       console.log(err);
    //     });
    // }
    // countOfFunding()
    //   .then((fundCountForClaim) => {
    //     console.log(fundCountForClaim);
    //     console.log("Proj count is up");

    //   })

    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const fetchPosts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/project/",
        config
      );
      setPosts(data.data);
      console.log(posts);
      setLoading(false);
    } catch (err) {
      console.log(err, "error occured");
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
  // const [loading, setLoading] = useState(true);

  return (
    <Container>
      {role && role !== "Admin" && (
        <Link to="/addProject">
          <AddDiv> + Add Projects</AddDiv>
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
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Project Id</TableCell>
                <TableCell align="center">Donation Projects</TableCell>
                <TableCell align="center">Number of Beneficiaries</TableCell>
                <TableCell align="center">Tokens</TableCell>
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
                    {row.relateBlockProj}
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/projects/${row._id}`}>
                      <ProjectName>{row.projectName}</ProjectName>
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {row.beneficiaries.length}
                  </TableCell>
                  <TableCell align="center">{row.collectedToken}</TableCell>
                  <TableCell align="center">
                    <ClaimedC>
                      {row.claimed ? (
                        "Claimed"
                      ) : (
                        <ToBlockchain
                          onClick={() =>
                            handleClick(
                              row.relateBlockProj,
                              setSuccess,
                              setFailed,
                              row.frCount
                            )
                          }
                        >
                          Claim Funds
                        </ToBlockchain>
                      )}
                    </ClaimedC>
                    {/* <button className='statusButton'>
                      {row.status === true ? 'Active' : 'Unverified'}
                    </button> */}
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

export default Projects;

const ClaimedC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
