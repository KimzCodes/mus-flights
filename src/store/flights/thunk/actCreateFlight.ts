import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FlightData {
  code: string;
  capacity: number;
  departureDate: string;
  photo?: FileList | null;
}

const actCreateFlight = createAsyncThunk(
  "flights/create",
  async (data: FlightData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    let response;
    try {
      if (data.photo && data.photo.length > 0) {
        const formData = new FormData();
        formData.append("code", data.code);
        formData.append("capacity", String(data.capacity));
        formData.append("departureDate", String(data.departureDate));
        formData.append("photo", data.photo[0]);

        response = await axios.post("flights/withPhoto", formData);
      } else {
        response = await axios.post("flights", {
          code: data.code,
          capacity: +data.capacity,
          departureDate: data.departureDate,
        });
      }

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
