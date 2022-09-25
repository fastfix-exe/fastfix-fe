import axiosClient from "../axiosClient";

const userApi = {
  login: () => {
    const url = "auth/google";
    return axiosClient.get(url);
  },

  loginWithGoogle: (data) => {
    const url = "auth/google";
    return axiosClient.post(url, {
      credentialId: data.credentialId
    });
  },

  logout: (data) => {
    const url = "auth/logout";
    return axiosClient.post(url, {
      refreshToken: data.refreshToken
    });
  },

  getAccessToken: () => {
    const url = "auth/token";
  },

  decodeAccessToken: () => {
    const url = "auth/user/profile";
  },

  loginAsStore: (data) => {
    const url = "auth/store";
    return axiosClient.post(url, {
        loginId: data.email,
        password: data.password,
    });
  },

  updateStore: () => {
    const url = "store/profile";
  },

  updateCustomer: () => {
    const url = "customer/profile";
  },

  getStores: () => {
    const url = "customer/store/list";
    return axiosClient.get(url);
  },

  getStoreById: (data) => {
    const url = `customer/store/${data}`;
    return axiosClient.get(url);
  },
};

export default userApi;
