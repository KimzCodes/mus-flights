import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import actLogin from "./thunk/actLogin";
import actRegister from "./thunk/actRegister";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    resetErrorMsg: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(actLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.isAuthenticated = true;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      };
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      //handle cancelled request
      if (action.error.name === "AbortError") {
        state.loading = "idle";
      }

      if (action.payload && typeof action.payload === "string") {
        state.loading = "failed";
        state.error = action.payload;
      }
    });

    // register
    builder.addCase(actRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.isAuthenticated = true;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      };
    });
    builder.addCase(actRegister.rejected, (state, action) => {
      //handle cancelled request
      if (action.error.name === "AbortError") {
        state.loading = "idle";
        state.error = null;
      }

      if (action.payload && typeof action.payload === "string") {
        state.loading = "failed";
        state.error = action.payload;
      }
    });
  },
});

export { actLogin, actRegister };
export const { logout, resetErrorMsg } = authSlice.actions;

export default authSlice.reducer;
