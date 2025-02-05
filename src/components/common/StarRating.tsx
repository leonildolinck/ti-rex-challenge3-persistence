import React from "react";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: totalStars }).map((_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
        return (
          <div key={index} className="relative w-6 h-6">
            <div className="absolute inset-0 clip-star"></div>

            <div
              className="absolute inset-0 bg-yellow-500 clip-star"
              style={{ width: `${fillPercentage}%` }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
