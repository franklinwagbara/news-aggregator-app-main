interface Filters {
  query: string;
  startDate: string;
  endDate: string;
  category: string;
  page: number;
  pageSize: number;
  sources: string;
  sortBy: string;
}
export default Filters;
