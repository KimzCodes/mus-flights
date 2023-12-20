import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FlightData {
  code: string;
  capacity: number;
  departureDate: string;
  photo: FileList;
}

const actCreateFlight = createAsyncThunk(
  "flights/create",
  async (data: FlightData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("capacity", String(data.capacity));
    formData.append("departureDate", String(data.departureDate));
    formData.append("photo", data.photo[0]);

    try {
      const response = await axios.post("flights/withPhoto", formData);

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

export default actCreateFlight;
