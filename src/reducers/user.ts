import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { login } from "api/login";
import { IUser } from "typings/user";
import { getCookie, setCookie } from "utils/cookie";

interface IUsersState {
  data: IUser | null;
  error: string | null;
  status: "pending" | "fulfilled" | "rejected" | null;
}

const ONE_HOUR = 3600;

const initialState: IUsersState = {
  data: {
    slToken: getCookie("slToken") || null,
  },
  error: null,
  status: null,
};

const user = createSlice({
  extraReducers: ({ addCase }) => {
    addCase(login.pending, (state: IUsersState) => {
      state.status = "pending";
      state.error = null;
    });
    addCase(
      login.fulfilled,
      (state: IUsersState, action: PayloadAction<IUser>) => {
        state.status = "fulfilled";
        state.data = { ...action.payload };

        setCookie("slToken", String(action.payload.slToken), ONE_HOUR);
      },
    );
    addCase(login.rejected, (state: IUsersState, action) => {
      state.error = action.payload as string;
      state.status = "rejected";
    });
  },
  initialState,
  name: "users",
  reducers: {},
});

export default user.reducer;
