import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "logIn",
  initialState: {
    isLoggedIn: localStorage.hasOwnProperty("user") ? true : false,
    data: JSON.parse(localStorage.getItem("user")),
  },
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
  },
});
export const { getData } = loginSlice.actions;

export default loginSlice.reducer;
