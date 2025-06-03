import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const Ratings = ({ recipeId, handleRate, recipeRatings }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const userId = "user1"; 

  // Initialize rating from props
  useEffect(() => {
    if (
      recipeRatings &&
      recipeRatings[recipeId] &&
      recipeRatings[recipeId][userId]
    ) {
      setRating(recipeRatings[recipeId][userId]);
    }
  }, [recipeId, recipeRatings, userId]);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const inputStyle = {
    display: "none",
  };

  const labelStyle = {
    cursor: "pointer",
    width: "2rem",
    height: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const svgStyle = {
    width: "100%",
    height: "100%",
    fill: "#d1d5db",
    transition: "fill 0.2s ease",
  };

  return (
    <div style={containerStyle}>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i} style={labelStyle}>
            <input
              type="radio"
              name="rating"
              style={inputStyle}
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                handleRate(recipeId, userId, ratingValue);
              }}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
            <FaStar
              className="star"
              style={{
                ...svgStyle,
                fill:
                  ratingValue <= (hover || rating) ? "#fbbf24" : "#d1d5db",
              }}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Ratings;
