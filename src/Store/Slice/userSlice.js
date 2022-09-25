import { createSlice } from "@reduxjs/toolkit"

let initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("USER", JSON.stringify(state.user));
    },

    logout(state) {
      localStorage.clear();
      state.user = null;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
