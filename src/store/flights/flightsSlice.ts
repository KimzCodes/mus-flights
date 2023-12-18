import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import actCreateFlight from "./thunk/actCreateFlight";
import actEditFlight from "./thunk/actEditFlight";
import actGetFlights from "./thunk/actGetFlights";
import actGetFlight from "./thunk/actGetFlight";
import actDeleteFlight from "./thunk/actDeleteFlight";

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all
    builder.addCase(actGetFlights.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetFlights.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.total = action.payload.total;
      state.records = action.payload.resources;
    });

    builder.addCase(actGetFlights.rejected, (state, action) => {
      //handle cancelled request
      if (action.error.name === "AbortError") {
        state.loading = "idle";
        state.error = null;
      }

      if (
        action.payload &&
        typeof action.payload === "string" &&
        action.payload !== "canceled"
      ) {
        state.loading = "failed";
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
    //edit
    builder.addCase(actEditFlight.pending, (state) => {
      state.editLoading = "pending";
      state.error = null;
    });
    builder.addCase(actEditFlight.fulfilled, (state, action) => {
      state.editLoading = "succeeded";
      state.records = state.records.map((record) => {
        if (record.id === action.payload.id) {
          return { ...record, ...action.payload };
        }
        return { ...record };
      });
    });
    builder.addCase(actEditFlight.rejected, (state, action) => {
      state.editLoading = "failed";
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

export {
  actCreateFlight,
  actGetFlights,
  actDeleteFlight,
  actEditFlight,
  actGetFlight,
};
export default flightsSlice.reducer;
