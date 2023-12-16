import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Auth } from "../../../types/Auth";

interface UserData {
  email: string;
  password: string;
}

const actLogin = createAsyncThunk(
  "user/login",
  async (userData: UserData, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response: AxiosResponse<Auth> = await axios.post<Auth>(
        "auth/login",
        userData,
        {
          signal,
        }
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

export default actLogin;
