import Filters from "../../types/filters";
import INewsProvider from "./INewsProvider";
import { Article } from "../../types/Article";

const SORT_MAP: { [key: string]: string } = {
  relevancy: "relevance",
  newest: "newest",
  oldest: "oldest",
};

class GuardianProvider implements INewsProvider {
  private baseUrl: string = "https://content.guardianapis.com/search";
  private API_KEY = import.meta.env.VITE_APP_GUARDIAN_API_KEY;

  async fetchArticles({
    query,
    category,
    startDate,
    endDate,
    page,
    sortBy,
  }: Filters): Promise<Article[]> {
    try {
      let url: string = `${this.baseUrl}?q=${encodeURIComponent(
        query
      )}&from-date=${startDate}&to-date=${endDate}&page=${page}&order-by=${
        SORT_MAP[sortBy] ?? "relevance"
      }&api-key=${
        this.API_KEY
      }&show-fields=trailText,headline,byline,thumbnail`;

      if (category && category.trim() !== "") {
        url += `&section=${encodeURIComponent(category)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      return data.response.results.map(
        (article: {
          id: string;
          fields: {
            headline?: string;
            trailText?: string;
            byline?: string;
            thumbnail?: string;
          };
          webTitle: string;
          webUrl: string;
          webPublicationDate: string;
          sectionName: string;
        }) => ({
          id: article.id,
          title: article.fields?.headline || article.webTitle || "No Title",
          description: article.fields?.trailText || "No description available",
          url: article.webUrl,
          imageUrl:
            article.fields?.thumbnail || "https://via.placeholder.com/600",
          publishedAt: article.webPublicationDate,
          source: {
            name: "The Guardian",
          },
          author: article.fields?.byline || "Unknown Author",
          category: article.sectionName || "General",
        })
      );
    } catch (error) {
      console.error("Error fetching Guardian articles", error);
      return Promise.reject(error);
    }
  }
}

export default GuardianProvider;
