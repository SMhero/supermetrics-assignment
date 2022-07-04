import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getPosts } from "api/posts";
import { IPost } from "typings/posts";

export interface IPostsState {
  data: {
    posts: IPost[];
    page: number;
  };
  error: string | null;
  status: "pending" | "fulfilled" | "rejected" | null;
}

const initialState: IPostsState = {
  data: {
    posts: [],
    page: 1,
  },
  error: null,
  status: null,
};

const posts = createSlice({
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getPosts.pending, (state: IPostsState) => {
      state.status = "pending";
      state.error = null;
    });
    addCase(
      getPosts.fulfilled,
      (state: IPostsState, action: PayloadAction<IPostsState["data"]>) => {
        state.status = "fulfilled";
        state.data = { ...action.payload };
      },
    );
    addCase(getPosts.rejected, (state: IPostsState, action) => {
      state.error = action.payload as string;
      state.status = "rejected";
    });
  },
  initialState,
  name: "posts",
});

export default posts.reducer;
