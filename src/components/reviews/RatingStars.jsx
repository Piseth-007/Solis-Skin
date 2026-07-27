import { Star } from "lucide-react";
import { useState } from "react";

export default function RatingStars({
  rating = 0,
  onChange,
  readOnly = false,
  size = 24,
}) {
  const [hovered, setHovered] = useState(0);

  const displayRating = hovered || rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          disabled={readOnly}
          onMouseEnter={() => !readOnly && setHovered(value)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          onClick={() => !readOnly && onChange?.(value)}
          className={`transition ${
            readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
          }`}
        >
          <Star
            size={size}
            className={`${
              value <= displayRating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } transition`}
          />
        </button>
      ))}
    </div>
  );
}
