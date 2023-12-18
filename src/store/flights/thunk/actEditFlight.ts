import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FlightData {
  id: string;
  code: string;
  capacity: number;
  departureDate: string;
}

const actEditFlight = createAsyncThunk(
  "flights/edit",
  async (formData: FlightData, thunkAPI) => {
    console.log(formData);
    const { rejectWithValue } = thunkAPI;
    try {
      const { id, ...flightData } = formData;

      const response = await axios.put<FlightData>(`flights/${id}`, flightData);

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

export default actEditFlight;
