import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Flight } from "../../../types/Flight";

interface FlightResponse {
  total: number;
  count: number;
  resources: Flight[];
}

const actGetFlights = createAsyncThunk(
  "flights/getFlights",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response: AxiosResponse<FlightResponse> =
        await axios.get<FlightResponse>("flights");

      return response.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        // Handle other types of errors
        return rejectWithValue("An unexpected error occurred during login");
      }
    }
  }
);

export default actGetFlights;
