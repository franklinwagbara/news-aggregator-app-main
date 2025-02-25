import Filters from "../../types/filters";
import NewsProviderFactor from "./NewsProviderFactory";
import { Article } from "../../types/Article";
import { getNewsProviders, NewsProvider } from "../../types/enums/NewsProvider";
import { sortArticlesByDate } from "../../utils/sortArticles";

class NewsAggregator {
  private static providers = getNewsProviders() as NewsProvider[];

  static async fetchArticles(filters: Filters): Promise<Article[]> {
    try {
      const requests = this.providers.map((provider) =>
        NewsProviderFactor.create(provider).fetchArticles(filters)
      );

      const articlesResults = await Promise.all(requests);
      const mergedArticles = articlesResults.flat();

      return sortArticlesByDate(mergedArticles);
    } catch (error) {
      console.error("Error aggregating articles", error);
      return Promise.reject(error);
    }
  }
}

export default NewsAggregator;
