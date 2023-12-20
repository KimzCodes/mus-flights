import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface Response {
  status: "available" | "unavailable";
}

const actCheckingCodeAvailability = createAsyncThunk(
  "flights/checkingCodeAvailability",
  async (code: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response: AxiosResponse<Response> = await axios.get<Response>(
        `flights/available?code=${code}`
      );

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

export default actCheckingCodeAvailability;
