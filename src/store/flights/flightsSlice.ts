import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import actCreateFlight from "./thunk/actCreateFlight";
import actEditFlight from "./thunk/actEditFlight";
import actGetFlights from "./thunk/actGetFlights";
import actDeleteFlight from "./thunk/actDeleteFlight";
import actCheckingCodeAvailability from "./thunk/actCheckingCodeAvailability";

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    resetCheckingCodeAvailability: (state) => {
      state.checkingCodeAvailability = "idle";
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
      state.count = action.payload.count;
      state.records = action.payload.resources;
    });

    builder.addCase(actGetFlights.rejected, (state, action) => {
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
          console.log(action.payload);
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
    builder.addCase(actDeleteFlight.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = state.records.filter(
        (record) => record.id !== action.payload
      );
    });
    builder.addCase(actDeleteFlight.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // Checking Code Availability
    builder.addCase(actCheckingCodeAvailability.pending, (state) => {
      state.checkingCodeAvailability = "pending";
    });
    builder.addCase(actCheckingCodeAvailability.fulfilled, (state, action) => {
      state.checkingCodeAvailability = action.payload.status;
    });
    builder.addCase(actCheckingCodeAvailability.rejected, (state) => {
      //In case of failure, no error message will be displayed. Backend validation will serve as the second line of defense.
      state.checkingCodeAvailability = "failed";
    });
  },
});

export {
  actCreateFlight,
  actGetFlights,
  actDeleteFlight,
  actEditFlight,
  actCheckingCodeAvailability,
};

export const { resetCheckingCodeAvailability } = flightsSlice.actions;

export default flightsSlice.reducer;
