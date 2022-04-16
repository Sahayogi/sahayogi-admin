import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { claimFunds, getFrInfo } from "../Web3Client";
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
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const updateClaim = async (projectId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/aidagency/claim",
        { projectId },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (proId, pidForClaim, setSuccess, setFailed, frCount) => {
    {
      claimFunds(frCount, pidForClaim)
        .then((tx) => {
          console.log(tx);
          updateClaim(proId);
          setSuccess(true);
          toast.success("Claimed Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          console.log("Catch error");
          console.log(err);
          toast.error(`Claiming Fund is not available`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
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
  const showInfo = async (frInfo) => {
    getFrInfo(frInfo)
      .then((information) => {
        const message = `Donated: ${
          information.DONATED_ / 10 ** 18
        } SYT \n Goal: ${information.GOAL_ / 10 ** 18} SYT`;
        console.log(information);
        toast.info(message);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <ToastContainer />
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
                <TableCell align="center">View</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => showInfo(row.relateBlockProj)}
                  >
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
                  {/* {/* <TableCell align='center'>{row.GOAL_} SYT</TableCell> */}
                  <TableCell
                    align="center"
                    cursor="pointer"
                    onClick={() => showInfo(row.frCount)}
                  >
                    *** SYT
                  </TableCell>
                  <TableCell align="center">
                    <ClaimedC>
                      {row.claimed ? (
                        "Claimed"
                      ) : (

                        <ToBlockchain
                          onClick={() =>
                            handleClick(
                              row._id,
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
