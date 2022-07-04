import { createAsyncThunk } from "@reduxjs/toolkit";

import { ILoginValues } from "forms/Login/Login";
import { IUser } from "typings/user";

const URL = "https://api.supermetrics.com/assignment/register";

export const login = createAsyncThunk(
  "user/login",
  async (params: ILoginValues, { rejectWithValue }) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: process.env.CLIENT_ID,
          email: params.email,
          name: params.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Server error!");
      }

      const result = await response.json();

      return {
        clientId: result.data.client_id,
        email: result.data.email,
        name: params.name,
        slToken: result.data.sl_token,
      } as IUser;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
