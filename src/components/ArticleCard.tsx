import React from "react";

type ArticleProps = {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  source: {
    name: string;
  };
};

const ArticleCard: React.FC<ArticleProps> = ({
  title,
  description,
  url,
  imageUrl,
  source,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg p-4">
      {imageUrl && (
        <img className="w-full h-48 object-cover" src={imageUrl} alt="title" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600 text-sm">{source.name}</p>
        <p className="text-gray-800 mt-2">{description}</p>
        <a
          className="text-blue-500 mt-2 inline-block"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default React.memo(ArticleCard);
