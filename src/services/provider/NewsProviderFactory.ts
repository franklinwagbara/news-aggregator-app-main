import { NewsProvider } from "../../types/enums/NewsProvider";
import GuardianProvider from "./GuardianProvider";
import NewsApiProvider from "./NewsApiProvider";
import NYTimesProvider from "./NYTimesProvider";

class NewsProviderFactor {
  static create(provider: NewsProvider) {
    switch (provider) {
      case NewsProvider.NewsAPI:
        return new NewsApiProvider();
      case NewsProvider.NYTimes:
        return new NYTimesProvider();
      case NewsProvider.Guardian:
        return new GuardianProvider();
      default:
        throw new Error(`Unsupported news provider: ${provider}`);
    }
  }
}

export default NewsProviderFactor;
