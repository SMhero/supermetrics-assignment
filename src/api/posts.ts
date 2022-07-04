import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPostsState } from "reducers/posts";
import { RootState } from "../store";

const URL = "https://api.supermetrics.com/assignment/posts";

const parsePost = (rawData: unknown) => {
  const data = rawData as {
    created_time: string;
    from_id: string;
    from_name: string;
    id: string;
    message: string;
    type: string;
  };

  return {
    createdTime: new Date(data.created_time),
    fromId: data.from_id,
    fromName: data.from_id,
    id: data.id,
    message: data.message,
    type: data.type,
  };
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue, getState }) => {
    const { user } = getState() as RootState;

    try {
      const response = await fetch(`${URL}?sl_token=${user.data?.slToken}`, {
        method: "GET",
      });

      if (!response.ok) {
        const data = await response.text().then(err => JSON.parse(err));
        return rejectWithValue(data.error.message);
      }

      const result = await response.json();

      return {
        posts: result.data.posts.map(parsePost),
        page: result.data.page,
      } as IPostsState["data"];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
