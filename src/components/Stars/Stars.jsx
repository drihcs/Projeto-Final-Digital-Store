import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Stars() {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(null);

  return (
    <div style={{ display: "flex" }}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <label key={index}>
            <FaStar
              size={20}
              color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              style={{
                cursor: "pointer",
                marginRight: "5px",
                transition: "color 0.2s"
              }}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}