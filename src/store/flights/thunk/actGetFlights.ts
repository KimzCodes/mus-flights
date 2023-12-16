import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Flight } from "../../../types/Flight";

const actGetFlights = createAsyncThunk(
  "flights/getFlights",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response: AxiosResponse<Flight> = await axios.get<Flight>(
        "flights"
      );
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

export default actGetFlights;
