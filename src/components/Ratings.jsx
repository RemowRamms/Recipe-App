import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({
  noOfStars = 5,
  initialRating = 0,
  readOnly = false,
  onRatingChange = () => {},
}) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  function handleClick(getCurrentIndex) {
    if (!readOnly) {
      setRating(getCurrentIndex);
      onRatingChange(getCurrentIndex);
    }
  }

  function handleMouseEnter(getCurrentIndex) {
    if (!readOnly) {
      setHover(getCurrentIndex);
    }
  }

  function handleMouseLeave() {
    if (!readOnly) {
      setHover(rating);
    }
  }

  return (
    <div className="flex space-x-1">
      {[...Array(noOfStars)].map((_, index) => {
        index += 1;

        return (
          <FaStar
            key={index}
            className={`${readOnly ? "" : "cursor-pointer"} transition-colors duration-200 ${
              index <= (hover || rating || initialRating)
                ? "text-yellow-400"
                : "text-gray-400"
            }`}
            onClick={() => handleClick(index)}
            onMouseMove={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            size={readOnly ? 20 : 40}
          />
        );
      })}
    </div>
  );
}
