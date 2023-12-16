import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface UserData {
  email: string;
  password: string;
}

interface LoginResponse {
  email: string;
  token: string;
  name: string;
}

const actLogin = createAsyncThunk(
  "user/login",
  async (userData: UserData, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response: AxiosResponse<LoginResponse> =
        await axios.post<LoginResponse>(
          "http://localhost:3000/auth/login",
          userData,
          {
            signal,
          }
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

export default actLogin;
