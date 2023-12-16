import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
});

export default flightsSlice.reducer;
