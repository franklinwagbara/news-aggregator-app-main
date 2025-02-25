import { SelectOption } from "../types/selectOption";

export const CATEGORIES: SelectOption[] = [
  {
    value: "allcategories",
    text: "All Categories",
  },
  {
    value: "technology",
    text: "Technology",
  },
  {
    value: "business",
    text: "Business",
  },
  {
    value: "sports",
    text: "Sports",
  },
];

export const SOURCES: SelectOption[] = [
  {
    value: "",
    text: "All Sources",
  },
  {
    value: "newsapi",
    text: "NewsAPI",
  },
  {
    value: "guardian",
    text: "The Guardian",
  },
  {
    value: "nyt",
    text: "New York Times",
  },
];

export const SORTBY: SelectOption[] = [
  {
    value: "relevance",
    text: "Relevance",
  },
  {
    value: "popularity",
    text: "Popularity",
  },
  {
    value: "newest",
    text: "Newest",
  },
  {
    value: "oldest",
    text: "Oldest",
  },
];
