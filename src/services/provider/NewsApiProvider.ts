import Filters from "../../types/filters";
import INewsProvider from "./INewsProvider";
import { Article } from "../../types/Article";

const SORT_MAP: { [key: string]: string } = {
  relevancy: "relevancy",
  popularity: "popularity",
  publishedAt: "publishedAt",
};

class NewsApiProvider implements INewsProvider {
  private baseUrl: string = "https://newsapi.org/v2/";

  async fetchArticles({
    query,
    startDate,
    endDate,
    // News API dropped support for filtering the articles by category - no way that I could find to accomplish this on the News API Doc.
    // category,
    page,
    pageSize,
    sources,
    sortBy,
  }: Filters): Promise<Article[]> {
    try {
      const response = await fetch(
        `${
          this.baseUrl
        }everything?q=${query}&from=${startDate}&to=${endDate}&sources=${sources}&page=${page}&pageSize=${pageSize}&sortBy=${
          SORT_MAP[sortBy] ?? ""
        }&searchIn=title,description,content&apiKey=${
          import.meta.env.VITE_APP_NEWS_API_KEY
        }`
      );

      const data = await response.json();
      if (data.status === "error") throw new Error(data.message);

      return data.articles.map(
        (article: {
          url: string;
          title: string;
          description: string;
          urlToImage: string;
          publishedAt: string;
          source: { name: string };
          author: string;
        }) => ({
          id: article.url,
          title: article.title,
          description: article.description,
          url: article.url,
          imageUrl: article.urlToImage,
          publishedAt: article.publishedAt,
          source: {
            name: article.source.name,
          },
          author: article.author,
          category: "",
        })
      );
    } catch (error) {
      console.error("Error fetching NewsAPI articles", error);
      return [];
    }
  }
}

export default NewsApiProvider;
