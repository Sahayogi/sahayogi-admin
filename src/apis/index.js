import axios from "axios";
const baseUrl = "http://localhost:5000/api";

//get token from local storage

const getHeaders = () => {
  const loginToken = JSON.parse(localStorage.getItem("access-token"));
  return {
    Authorization: `Bearer ${loginToken}`,
  };
};


export const login = (data) => {
  return axios({
    url: baseUrl + "/auth/login",
    method: "POST",
    data,
  });
};
