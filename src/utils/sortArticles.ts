import { Article } from "../types/Article";

export const sortArticlesByDate = (articles: Article[]): Article[] => {
  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};
