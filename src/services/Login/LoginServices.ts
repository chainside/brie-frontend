import { LoginRequestBody } from "./api";
import axiosInstance from "../axiosConfig";

const LOGIN = {
  path: "user/login",
  method: "POST",
  requestBody: {
    email: "",
    password: "",
  },
};

const LOGOUT = {
  path: "user/logout",
  method: "POST"
};

const CHECK_AUTH = {
  path: "user/checkAuth",
  method: "GET"
};


export const login = async (requestBody: LoginRequestBody) => {
  const api = LOGIN.path;
  return await axiosInstance(api, {
    withCredentials: true,
    method: LOGIN.method,
    data: { ...requestBody },
  }).then((res) => {
    return res;
  }).catch((res) => {
    return { data: { statusCode: res.response.data.statusCode } };
  });
};


export const logout = async () => {
  const api = LOGOUT.path;
  return await axiosInstance(api, {
    withCredentials: true,
    method: LOGIN.method
  }).then((res) => {
    return { data: { statusCode: res.status } };
  }).catch((res) => {
    return { data: { statusCode: res.response.data.statusCode } };
  });
};

export const checkAuth = async () => {
  const api = CHECK_AUTH.path;
  return await axiosInstance(api, {
    withCredentials: true,
    method: CHECK_AUTH.method
  }).then((res) => {
    return res;
  }).catch((res) => {
    return { data: { statusCode: res.response.data.statusCode } };
  });
};
