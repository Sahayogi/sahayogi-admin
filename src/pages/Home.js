import React from "react";
import Charts from "../components/charts/Charts";
import Milstones from "../components/milstones/Milstones";
import { donationData } from "../components/constants/Constant";
import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Container = styled.div`
  flex: 4;
  height: calc(100vh - 80px);
  color: white;
  font-size: 1rem;
  background-color: rgb(53, 51, 51);
  padding: 40px;
`;

const Home = () => {
  return (
    <Container>
      <Milstones />
      <Charts
        data={donationData}
        title="Donation Analytics"
        grid
        dataKey="Donations"
      />
    </Container>
  );
};

export default Home;
