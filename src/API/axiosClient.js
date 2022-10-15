import axios from "axios";
import qs from "qs";
import jwt_decode from "jwt-decode";

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
    var decoded = jwt_decode(user.tokens.accessToken);
    var expiredDate = new Date(decoded.exp * 1000);
    var toDay = new Date();
    if (toDay >= expiredDate) {
      localStorage.clear();
      window.location.reload();
    }
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
