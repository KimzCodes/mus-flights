import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { IFlight } from "../../../types/Flight";

interface FlightResponse {
  total: number;
  count: number;
  resources: IFlight[];
}

interface PayLoad {
  size?: number;
  page?: number;
}

const actGetFlights = createAsyncThunk(
  "flights/getFlights",
  async (payLoad: PayLoad, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    const { size, page } = payLoad;
    try {
      const response: AxiosResponse<FlightResponse> =
        await axios.get<FlightResponse>(`flights?page=${page}&size=${size}`, {
          signal,
        });

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
