import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { IFlight } from "../../../types/Flight";

interface FlightResponse {
  count: number;
  resources: IFlight[];
}

interface PayLoad {
  size?: number;
  page?: number;
  search?: string;
}

const actGetFlights = createAsyncThunk(
  "flights/getFlights",
  async (payLoad: PayLoad, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    const { size, page, search } = payLoad;

    const query: string = search
      ? `page=${page}&size=${size}&code=${search}`
      : `page=${page}&size=${size}`;
    try {
      const response: AxiosResponse<FlightResponse> =
        await axios.get<FlightResponse>(`flights?${query}`, {
          signal,
        });

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

export default actGetFlights;
