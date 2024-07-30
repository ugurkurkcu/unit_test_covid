import { createSlice } from "@reduxjs/toolkit";
import { getCountryData } from "./actions";

const initialState = {
  isloading: false,
  error: null,
  data: null,
};

const covidSlice = createSlice({
  name: "covid",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCountryData.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getCountryData.rejected, (state, { error }) => {
      state.isloading = false;
      state.error = error.message;
    });
    builder.addCase(getCountryData.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.error = null;
      state.data = payload;
    });
  },
});

export default covidSlice.reducer;
