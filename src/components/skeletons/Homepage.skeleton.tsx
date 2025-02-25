import React from "react";

const SkeletonHomepage: React.FC = () => {
  return (
    <main className="p-4 animate-pulse space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-gray-300 h-10 rounded" />
      </div>

      <div className="bg-gray-300 h-20 rounded" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-gray-300 h-64 rounded" />
        ))}
      </div>
    </main>
  );
};

export default SkeletonHomepage;
