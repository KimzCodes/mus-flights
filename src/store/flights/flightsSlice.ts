import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import actCreateFlight from "./thunk/actCreateFlight";
import actGetFlights from "./thunk/actGetFlights";
import actDeleteFlight from "./thunk/actDeleteFlight";

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    resetRecords: (state) => {
      state.count = 0;
      state.total = 0;
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    //get all
    builder.addCase(actGetFlights.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetFlights.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.total = action.payload.total;
      state.count = action.payload.count;
      state.records = action.payload.resources;
    });

    builder.addCase(actGetFlights.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
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

    //delete
    builder.addCase(actDeleteFlight.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actDeleteFlight.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actDeleteFlight.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export { actCreateFlight, actGetFlights, actDeleteFlight };
export const { resetRecords } = flightsSlice.actions;
export default flightsSlice.reducer;
