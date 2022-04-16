import React, { useEffect,useState } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Container = styled.div`
  background-color: rgb(61, 60, 60);
  padding: 20px;
  margin: 20px;
  box-shadow: 15px 19px 11px -6px rgba(237, 230, 230, 0.75);
  -webkit-box-shadow: 15px 19px 11px -6px rgba(237, 230, 230, 0.75);
  -moz-box-shadow: 15px 19px 11px -6px rgba(237, 230, 230, 0.75);
  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    margin-bottom: 60px;
  }
`;
const Title = styled.h3`
  margin-bottom: 10px;
`;

const Charts = ({ title, data, dataKey, grid }) => {
 
  return (
    <Container>
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="projectName" stroke="lightgrey" />
          <Line type="monotone" dataKey={dataKey} stroke="green" />
          <Tooltip />
          <CartesianGrid stroke="grey" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};
export default Charts;
