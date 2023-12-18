import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Flight } from "../../../types/Flight";

const actGetFlight = createAsyncThunk(
  "flights/flightDetails",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response: AxiosResponse<Flight> = await axios.get<Flight>(
        `flights/${id}/details`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        // Handle other types of errors
        return rejectWithValue("An unexpected error occurred during login");
      }
    }
  }
);

export default actGetFlight;
