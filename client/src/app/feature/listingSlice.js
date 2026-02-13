// https://redux-toolkit.js.org/api/createSlice
import { createSlice } from "@reduxjs/toolkit";
import { dummyListings } from "../../assets/assets";

const initialState = {
  listings: dummyListings,
  userListings: dummyListings,
  balance: {
    earned: 0,
    withdrawn: 0,
    available: 0,
  },
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    serListings: (state, action) => {
      state.listings = action.payload;
    },
  },
});

export const { serListings } = listingSlice.actions;
// 使用 action 方式 => const { serListings } = listingSlice.selectors
export default listingSlice.reducer;
