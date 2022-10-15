import axiosClient from "../axiosClient";

const userApi = {
  login: () => {
    const url = "auth/google";
    return axiosClient.get(url);
  },

  loginWithGoogle: (data) => {
    const url = "auth/google";
    return axiosClient.post(url, {
      credentialId: data.credentialId,
    });
  },

  logout: (data) => {
    const url = "auth/logout";
    return axiosClient.post(url, {
      refreshToken: data.refreshToken,
    });
  },

  decodeAccessToken: () => {
    const url = "auth/user/profile";
    return axiosClient.get(url);
  },

  loginAsStore: (data) => {
    const url = "auth/store";
    return axiosClient.post(url, {
      loginId: data.email,
      password: data.password,
    });
  },

  updateCustomer: (data) => {
    const url = "customer/profile";
    return axiosClient.post(url, {
      customerName: data.customerName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      avatarPicture: data.avatarPicture,
      refreshToken: data.refreshToken,
    });
  },

  getStores: (data) => {
    const url = "customer/store/list";
    return axiosClient.post(url, {
      latitude: data.latitude,
      longtitude: data.longtitude,
    });
  },

  getStoreById: (data) => {
    const url = `customer/store/${data.storeId}`;
    return axiosClient.post(url, {
      latitude: data.latitude,
      longtitude: data.longtitude,
    });
  },

  postComment: (data) => {
    const url = `user/store/comment/${data.storeId}`;
    return axiosClient.post(url, {
      content: data.content,
      replyId: data.replyId,
    });
  },

  getStoreComment: (data) => {
    const url = `user/store/comment/${data.storeId}`;
    return axiosClient.get(url);
  },

  ratingStore: (data) => {
    const url = `customer/store/rating/${data.storeId}`;
    return axiosClient.post(url, {
      rating: data.rating,
    })
  },

  getCurrentRating: (data) => {
    const url = `customer/store/rating/${data.storeId}`;
    return axiosClient.get(url, {
      rating: data.rating,
    })
  }
};

export default userApi;
