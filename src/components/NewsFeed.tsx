import ArticleCard from "./ArticleCard";
import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { Article } from "../types/Article";
import { Status } from "../store/newsSlice";
import Filters from "../types/filters";
import ArticleCardSkeleton from "./skeletons/ArticleCard.skeleton";

interface NewsFeedProps {
  articles: Article[];
  status: Status;
  error: string | null;
  hasMore: boolean;
  filters: Filters;
  fetchMoreNews: (filters: Filters) => void;
}

const SKELETON_COUNT = 12;
const NewsFeed: React.FC<NewsFeedProps> = ({
  articles,
  status,
  error,
  hasMore,
  filters,
  fetchMoreNews,
}) => {
  if (status === "failed")
    return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div>
      <InfiniteScroll
        dataLength={articles.length}
        next={() => fetchMoreNews(filters)}
        hasMore={hasMore}
        loader={null}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {articles.map((article) => (
            <ArticleCard key={article.url} {...article} />
          ))}
          {status == "loading" &&
            Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <ArticleCardSkeleton key={`skeleton-${index}`} />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default React.memo(NewsFeed);
