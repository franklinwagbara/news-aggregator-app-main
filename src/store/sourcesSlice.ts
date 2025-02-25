import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import SourceService from "../services/source.service";
import { Source } from "../types/Source";

export type Status = "idle" | "loading" | "succeeded" | "failed";
export interface SourcesState {
  sources: Source[];
  loading: boolean;
  error: string | null;
  status: Status;
}

const initialState: SourcesState = {
  sources: [],
  loading: false,
  error: null,
  status: "idle",
};

export const fetchSources = createAsyncThunk(
  "source/fetchSources",
  async (): Promise<Source[]> => {
    return await new SourceService().getSources();
  }
);

const sourcesSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    resetSources(state) {
      state.sources = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSources.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchSources.fulfilled,
        (state, action: PayloadAction<Source[]>) => {
          state.status = "succeeded";
          state.sources = action.payload;
        }
      )
      .addCase(fetchSources.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const { resetSources } = sourcesSlice.actions;
export default sourcesSlice.reducer;
