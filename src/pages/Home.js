import React, { useState, useEffect } from "react";
import Charts from "../components/charts/Charts";
import Milstones from "../components/milstones/Milstones";
// import { donationData } from "../components/constants/Constant";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  flex: 4;
  min-height: calc(100vh - 80px);
  color: white;
  font-size: 1rem;
  background-color: rgb(53, 51, 51);
  padding: 40px;
`;

const Home = () => {
  const [chartData, setChartData] = useState([]);
  const fetchApi = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/aidagency/chart",

        config
      );
      console.log("data:", data);
      setChartData(data.data);
      console.log("chartData", chartData);

      if (data.success === true) {
        console.log("added sucessful");
      }
    } catch (err) {
      console.log(err, "err");
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Container>
      <Milstones />
      <Charts data={chartData} title="Donation Analytics" grid dataKey="goal" />
    </Container>
  );
};

export default Home;
