import React from "react";
//styling
import styled from "styled-components";

const Card = ({ img, name, price, hasDiscount, discountPrice }) => {
  return (
    <CardComponent>
      <img src={img} alt={name} />
      <div className="price">
        {hasDiscount ? (
          <p>
            {discountPrice} GBP
            <span style={{ textDecoration: "line-through" }}>{price} GBP</span>
          </p>
        ) : (
          <span>{price} GBP</span>
        )}
      </div>
      <div className="name">{name}</div>
    </CardComponent>
  );
};

const CardComponent = styled.div`
  height: 20rem;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 1rem;
  img {
    height: 17rem;
    width: 10rem;
    object-fit: cover;
  }
  .price {
    font-size: 0.8rem;
    display: flex;
    p {
      color: red;
      padding: 0 8px;
    }
    .name {
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;

export default Card;
