import Filters from "../types/filters";
import NewsAggregator from "./provider/NewsAggregator";
import { Article } from "../types/Article";

class ArticleService {
  async getArticles(filters: Filters): Promise<Article[]> {
    return await NewsAggregator.fetchArticles(filters);
  }
}

export default ArticleService;
