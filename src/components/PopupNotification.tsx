import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const PopupNotification: React.FC = () => {
  const newsError = useSelector((state: RootState) => state.news.error);
  const sourcesError = useSelector((state: RootState) => state.sources.error);
  const error = newsError || sourcesError;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!visible || !error) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div className="max-w-sm w-full bg-red-600 text-white p-4 rounded-md shadow-lg flex items-start space-x-3">
        <div className="flex-1">
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close notification"
        >
          <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 015.05 3.636L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PopupNotification;
