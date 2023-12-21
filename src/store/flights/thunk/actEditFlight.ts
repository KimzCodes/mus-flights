import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FlightData {
  id: string;
  code: string;
  capacity: number;
  departureDate: string;
  photo?: FileList | null;
}

const actEditFlight = createAsyncThunk(
  "flights/edit",
  async (data: FlightData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { id, photo, ...flightData } = data;
    let response;
    try {
      if (photo && photo.length > 0) {
        const formData = new FormData();
        formData.append("code", data.code);
        formData.append("capacity", String(data.capacity));
        formData.append("departureDate", String(data.departureDate));
        formData.append("photo", photo[0]);

        response = await axios.put<FlightData>(
          `flights/${id}/withPhoto`,
          formData
        );
      } else {
        response = await axios.put<FlightData>(`flights/${id}`, flightData);
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

export default actEditFlight;
