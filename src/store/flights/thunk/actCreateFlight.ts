import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FlightData {
  code: string;
  capacity: number;
  departureDate: string;
}

const actCreateFlight = createAsyncThunk(
  "flights/create",
  async (flightData: FlightData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post("flights", flightData);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else {
        // Handle other types of errors
        return rejectWithValue("An unexpected error occurred during login");
      }
    }
  }
);

export default actCreateFlight;
