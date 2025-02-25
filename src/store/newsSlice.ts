import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import ArticleService from "../services/article.service";
import Filters from "../types/filters";
import { Article } from "../types/Article";
import getDateFiveDaysAgo from "../utils/getDateFiveDaysAgo";

export type Status = "idle" | "loading" | "succeeded" | "failed";
export interface ArticlesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  status: Status;
  filters: Filters;
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  status: "idle",
  filters: {
    query: "",
    category: "technology",
    sources: "bbc-news",
    sortBy: "relevance",
    startDate: getDateFiveDaysAgo(),
    endDate: new Date().toISOString().split("T")[0],
    page: 1,
    pageSize: 12,
  },
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (filters: Filters): Promise<Article[]> => {
    return await new ArticleService().getArticles(filters);
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    resetArticles(state) {
      state.articles = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    setFilters(
      state,
      action: PayloadAction<Partial<ArticlesState["filters"]>>
    ) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchNews.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.status = "succeeded";
          if (action.payload.length === 0) state.hasMore = false;
          else {
            if (state.page === 1) state.articles = action.payload;
            else state.articles = state.articles.concat(action.payload);
            state.page++;
            state.filters.page++;
          }
        }
      )
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const { resetArticles, setFilters } = newsSlice.actions;
export default newsSlice.reducer;
