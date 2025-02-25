export enum NewsProvider {
  NewsAPI = "newsapi",
  NYTimes = "nytimes",
  Guardian = "guardian",
}

export const getNewsProviders = (): string[] => {
  return Object.values(NewsProvider);
};
