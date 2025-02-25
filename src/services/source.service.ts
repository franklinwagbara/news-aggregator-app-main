import { Source } from "../types/Source";

class SourceService {
  private baseUrl: string = "https://newsapi.org/v2/top-headlines/sources";
  async getSources(): Promise<Source[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}?apiKey=${import.meta.env.VITE_APP_NEWS_API_KEY}`
      );

      const data = await response.json();
      if (data.status === "error") throw new Error(data.message);

      return data.sources.map(
        (source: { id: string; name: string; category: string }) => ({
          id: source.id,
          name: source.name,
          category: source.category,
        })
      );
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}

export default SourceService;
