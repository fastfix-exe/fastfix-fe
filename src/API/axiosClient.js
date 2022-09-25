import axios from "axios";
import qs from "qs";

const axiosClient = axios.create({
  baseURL: "https://fastfix-core-service.herokuapp.com/api/",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const user = JSON.parse(localStorage.getItem("USER"));
  if (user) {
    config.headers.Authorization = `Bearer ${user.tokens.accessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Axios Client: ", error);
  }
);

export default axiosClient;
