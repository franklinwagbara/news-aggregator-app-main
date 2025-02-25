import { useDispatch, useSelector } from "react-redux";

import { CATEGORIES } from "../constants/options";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { fetchNews, resetArticles, setFilters } from "../store/newsSlice";

const SearchBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.news);
  const { sources } = useSelector((state: RootState) => state.sources);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setFilters(localFilters));
    dispatch(resetArticles());
    dispatch(fetchNews(localFilters));
  };

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 mb-6"
    >
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded w-full"
        value={localFilters.query}
        onChange={(e) =>
          setLocalFilters((prev) => ({ ...prev, query: e.target.value }))
        }
      />
      <select
        value={localFilters.category}
        onChange={(e) =>
          setLocalFilters((prev) => ({ ...prev, category: e.target.value }))
        }
        className="border p-2 rounded"
      >
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.text}
          </option>
        ))}
      </select>
      <select
        value={localFilters.sources}
        onChange={(e) =>
          setLocalFilters((prev) => ({ ...prev, sources: e.target.value }))
        }
        className="border p-2 rounded"
      >
        {sources.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-red-800 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
