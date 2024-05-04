import React from "react";

const Card = ({ product }) => {
  return (
    <div
      style={{
        maxWidth: "300px",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "5px",
        margin: "8px 0",
      }}
    >
      <img src={product.images[0]} alt="product" width={300} />
      <h3>{product.title}</h3>
      <p style={{ fontWeight: "bold" }}>$69</p>
    </div>
  );
};

export default Card;
