import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { getTotalSupply,getAdminBalance } from "../../pages/Web3Client";

const Milstones = () => {
  const [posts, setPosts] = useState([]);
  const [supply, setSupply] = useState(0);

  const handleBlockchain = () => {
    getTotalSupply()
      .then((supply) => {
        setSupply(supply);
      })
      .catch((err) => {
        console.log(err);
      });
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
        "http://localhost:5000/api/user/home",
        config
      );

      setPosts(data.data);
    } catch (err) {
      console.log(err, "error occured");
    }
  };
  useEffect(() => {
    fetchPosts();
    handleBlockchain();
  }, []);
  return (
    <Featured>
      <Link to="/projects">
        <FeaturedItem>
          <FeaturedName>Donation Projects</FeaturedName>
          <FeaturedCount>{posts.numberOfProject}</FeaturedCount>
        </FeaturedItem>
      </Link>

      <Link to="/beneficiary">
        <FeaturedItem>
          <FeaturedName>Benefeceries</FeaturedName>
          <FeaturedCount>{posts.numberOfBeneficiary}</FeaturedCount>
        </FeaturedItem>
      </Link>
      <Link to="/vendor">
        <FeaturedItem>
          <FeaturedName>Vendors</FeaturedName>
          <FeaturedCount>{posts.numberOfVendor}</FeaturedCount>
        </FeaturedItem>
      </Link>

      <FeaturedItem>
        <FeaturedName>Total Supply</FeaturedName>
        <FeaturedCount>{supply/10**18}</FeaturedCount>
      </FeaturedItem>

    </Featured>
  );
};

export default Milstones;

const Featured = styled.div`
  width: 100%;
  padding-top: 10px;
  display: grid;
  grid-template-columns: auto auto auto;
  row-gap: 25px;
  margin-bottom: 60px;
  column-gap: 20px;
  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    display: flex;
    gap: 4rem;
    flex-direction: column;
    padding: 60px 60px 0px 60px;
  }
`;
const FeaturedItem = styled.div`
  background-color: rgb(102, 101, 101);
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 150px;
  margin: 0px 10px;
  padding: 60px;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 15px 19px 11px -6px rgba(237, 230, 230, 0.75);
  -webkit-box-shadow: 15px 19px 11px -6px rgba(237, 230, 230, 0.75);
  -moz-box-shadow: 15px 19px 11px -6px rgba(237, 230, 230, 0.75);
`;
const FeaturedName = styled.h1`
  text-align: center;
  font-size: 20px;
`;
const FeaturedCount = styled.label`
  font-weight: bolder;
  padding-top: 15px;
  text-align: center;
`;
