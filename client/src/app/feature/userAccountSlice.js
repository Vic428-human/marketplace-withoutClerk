import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
};

const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    setUserAccount: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
});
export const { setUserAccount } = userAccountSlice.actions;
export default userAccountSlice.reducer;