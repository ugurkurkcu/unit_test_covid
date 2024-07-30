import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../constants";

export const getCountryData = createAsyncThunk(
  "covid/getCountryData",
  async ({ code, query }) => {
    const params = { iso: code, q: query };
    const req1 = axios.get(
      "https://covid-19-statistics.p.rapidapi.com/reports",
      { params, headers }
    );

    const req2 = axios.get(
      code
        ? `https://restcountries.com/v3.1/alpha/${code}`
        : `https://restcountries.com/v3.1/name/${query}`
    );

    const res = await Promise.all([req1, req2]);

    const covid = {
      ...res[0].data.data[0],
      ...res[0].data.data[0].region,
    };
    delete covid.region;
    delete covid.cities;

    return { covid, country: res[1].data[0] };
  }
);
