import Filters from "../../types/filters";
import INewsProvider from "./INewsProvider";
import { Article } from "../../types/Article";

const SORT_MAP: { [key: string]: string } = {
  relevancy: "relevance",
  newest: "newest",
  oldest: "oldest",
};

class NYTimesProvider implements INewsProvider {
  private baseUrl: string =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  private API_KEY = import.meta.env.VITE_APP_NEW_YORK_TIMES_API_KEY;

  async fetchArticles({
    query,
    // News API dropped support for filtering the articles by category - no way that I could find to accomplish this on the News API Doc.
    // category,
    startDate,
    endDate,
    page,
    sortBy,
  }: Filters): Promise<Article[]> {
    try {
      const url: string = `${
        this.baseUrl
      }?q=${query}&begin_date=${startDate}&end_date=${endDate}&page=${page}&sort=${
        SORT_MAP[sortBy] ?? "relevance"
      }&api-key=${this.API_KEY}`;

      const response = await fetch(url);

      const data = await response.json();
      if (!response.ok) throw new Error(data?.fault.faultstring);

      return data.response.docs.map(
        (article: {
          _id: string;
          headline: { main: string };
          abstract: string;
          snippet: string;
          web_url: string;
          multimedia: { url: string }[];
          pub_date: string;
          source: string;
          byline: { original: string };
          section_name: string;
        }) => ({
          id: article._id,
          title: article.headline.main,
          description:
            article.abstract || article.snippet || "No description available",
          url: article.web_url,
          imageUrl: article.multimedia?.length
            ? `https://www.nytimes.com/${article.multimedia[0].url}`
            : "https://via.placeholder.com/600",
          publishedAt: article.pub_date,
          source: {
            name: article.source,
          },
          author: article.byline?.original || "Unknown Author",
          category: article.section_name || "General",
        })
      );
    } catch (error) {
      console.error("Error fetching NY Times articles", error);
      return Promise.reject(error);
    }
  }
}

export default NYTimesProvider;
