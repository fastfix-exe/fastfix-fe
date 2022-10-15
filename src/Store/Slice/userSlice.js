import { createSlice } from "@reduxjs/toolkit"

let initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("USER", JSON.stringify(action.payload));
      state.user = action.payload
    },

    logout(state) {
      localStorage.clear();
      state.user = null;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
