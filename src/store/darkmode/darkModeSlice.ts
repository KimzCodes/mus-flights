import { createSlice } from "@reduxjs/toolkit";

const initialState: { darkModeOn: boolean } = { darkModeOn: false };
const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: initialState,
  reducers: {
    setDarkMode: (state) => {
      state.darkModeOn = !state.darkModeOn;
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
