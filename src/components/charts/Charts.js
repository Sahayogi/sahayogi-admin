import React from "react";
import "./Charts.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ title, data, dataKey, grid }) => {
  return (
    <div className="charts">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="projects" stroke="lightgrey" />
          <Line type="monotone" dataKey={dataKey} stroke="green" />
          <Tooltip />
          <CartesianGrid stroke="grey" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Charts;
