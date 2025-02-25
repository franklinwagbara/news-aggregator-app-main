export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author?: string;
  category?: string;
}
