import { useSelector } from "react-redux";
import FilterPanel from "../components/FilterPanel";
import NewsFeed from "../components/NewsFeed";
import SearchBar from "../components/SearchBar";
import HomepageSkeleton from "../components/skeletons/Homepage.skeleton";
import useNews from "../hooks/useNews";
import { useRef, useEffect } from "react";
import { RootState } from "../store/store";

const HomePage: React.FC = () => {
  const hasFetched = useRef<boolean>(false);
  const hasFetchSources = useRef<boolean>(false);
  const { status: sourcesStatus } = useSelector(
    (state: RootState) => state.sources
  );
  const {
    articles,
    status,
    error,
    hasMore,
    filters,
    loadNews,
    loadSources,
    fetchMoreNews,
  } = useNews();

  useEffect(() => {
    if (hasFetchSources.current) return;
    loadSources();
    hasFetchSources.current = true;
  }, [filters]);

  useEffect(() => {
    if (hasFetched.current) return;
    loadNews();
    hasFetched.current = true;
  }, [filters]);

  if (sourcesStatus === "loading") return <HomepageSkeleton />;

  return (
    <main>
      <SearchBar />
      <FilterPanel />
      <NewsFeed
        articles={articles}
        filters={filters}
        status={status}
        error={error}
        hasMore={hasMore}
        fetchMoreNews={fetchMoreNews}
      />
    </main>
  );
};

export default HomePage;
