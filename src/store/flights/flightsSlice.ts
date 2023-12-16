import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import actCreateFlight from "./thunk/actCreateFlight";

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(actCreateFlight.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actCreateFlight.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actCreateFlight.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export { actCreateFlight };
export default flightsSlice.reducer;
