import { configureStore } from "@reduxjs/toolkit";

import posts from "reducers/posts";
import user from "reducers/user";

const store = configureStore({
  reducer: {
    posts,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
