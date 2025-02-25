import { configureStore } from "@reduxjs/toolkit";

import newsSlice from "./newsSlice";
import sourcesSlice from "./sourcesSlice";

export const store = configureStore({
  reducer: {
    news: newsSlice,
    sources: sourcesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
