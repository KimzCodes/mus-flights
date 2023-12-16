import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actDeleteFlight = createAsyncThunk(
  "flights/delete",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`flights/${id}`);
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

export default actDeleteFlight;
