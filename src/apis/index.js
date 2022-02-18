import axios from "axios";
const baseUrl = "http://localhost:5000/api";

//get token from local storage

export const getHeaders = () => {
  const loginToken = JSON.parse(localStorage.getItem("access-token"));
  return {
    Authorization: `Bearer ${loginToken}`,
  };
};
export const getAgency= () => {
  return axios({
    url: baseUrl + "/user/aidagencies",
    method: "GET",
    headers: getHeaders(),
  });
};

export const login = (data) => {
  return axios({
    url: baseUrl + "/auth/login",
    method: "POST",
    data,
  });
};

export const addAgency = (data) => {
  return axios({
    url: baseUrl + "/admin/add/aidagency",
    method: "POST",
    data,
  });
};
