import Filters from "../../types/filters";
import { Article } from "../../types/Article";

interface INewsProvider {
  fetchArticles(filters: Filters): Promise<Article[]>;
}

export default INewsProvider;
