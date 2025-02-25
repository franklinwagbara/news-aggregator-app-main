import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilters, resetArticles, fetchNews } from "../store/newsSlice";
import { fetchSources } from "../store/sourcesSlice";
import { RootState, AppDispatch } from "../store/store";
import Filters from "../types/filters";

const useNews = () => {
  const dispatch: AppDispatch = useDispatch();
  const hasFetched = useRef<boolean>(false);
  const hasFetchSources = useRef<boolean>(false);
  const { articles, status, error, hasMore } = useSelector(
    (state: RootState) => state.news
  );
  const { filters } = useSelector((state: RootState) => state.news);

  const updateFilters = (filters: Filters) => {
    hasFetched.current = false;
    hasFetchSources.current = false;
    setFilters(filters);
  };

  const loadNews = (articleFilters?: Filters) => {
    dispatch(setFilters(articleFilters ?? filters));
    dispatch(resetArticles());
    dispatch(fetchNews(articleFilters ?? filters));
  };

  const fetchMoreNews = (filters: Filters) => {
    dispatch(fetchNews(filters ?? filters));
  };

  const loadSources = () => {
    dispatch(fetchSources());
  };

  return {
    articles,
    status,
    error,
    filters,
    hasMore,
    updateFilters,
    loadNews,
    loadSources,
    fetchMoreNews,
  };
};

export default useNews;
