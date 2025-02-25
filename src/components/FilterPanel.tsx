import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/solid";

import Filters from "../types/filters";
import { AppDispatch, RootState } from "../store/store";
import { CATEGORIES, SORTBY } from "../constants/options";
import { fetchNews, resetArticles, setFilters } from "../store/newsSlice";

const FilterPanel: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.news);
  const { sources } = useSelector((state: RootState) => state.sources);
  const [localFilters, setlocalFilters] = useState<Filters>(filters);
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = () => {
    dispatch(setFilters(localFilters));
    dispatch(resetArticles());
    dispatch(fetchNews(localFilters));
  };

  useEffect(() => {
    setlocalFilters(filters);
  }, [filters]);

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-4 border border-gray-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-600 text-white p-3 rounded w-full flex justify-between items-center font-semibold transition-all duration-300 hover:bg-slate-700"
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden mt-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <select
            className="border p-3 rounded w-full bg-white"
            value={localFilters.category}
            onChange={(e) =>
              setlocalFilters((prev) => ({
                ...prev,
                page: 1,
                category: e.target.value,
              }))
            }
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.text}
              </option>
            ))}
          </select>
          <select
            className="border p-3 rounded w-full bg-white"
            value={localFilters.sources}
            onChange={(e) =>
              setlocalFilters((prev) => ({
                ...prev,
                page: 1,
                sources: e.target.value,
              }))
            }
          >
            {sources?.map((source) => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="border p-3 rounded w-full bg-white"
            value={localFilters.startDate}
            onChange={(e) =>
              setlocalFilters((prev) => ({
                ...prev,
                page: 1,
                startDate: e.target.value,
              }))
            }
          />
          <input
            type="date"
            className="border p-3 rounded w-full bg-white"
            value={localFilters.endDate}
            onChange={(e) =>
              setlocalFilters((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
          <select
            className="border p-3 rounded w-full bg-white"
            value={localFilters.sortBy}
            onChange={(e) =>
              setlocalFilters((prev) => ({ ...prev, sortBy: e.target.value }))
            }
          >
            {SORTBY.map((s) => (
              <option key={s.value} value={s.value}>
                {s.text}
              </option>
            ))}
          </select>
          <button
            onClick={handleFilterChange}
            className="bg-slate-600 text-white p-3 rounded w-full font-semibold transition-all duration-300 hover:bg-slate-700"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FilterPanel;
