import React from "react";
//styling
import styled from "styled-components";

const Card = ({
  img,
  secondImage,
  name,
  price,
  hasDiscount,
  discountPrice,
}) => {
  return (
    <CardComponent>
      <img
        src={img}
        alt={name}
        onMouseOver={(e) => (e.currentTarget.src = `${secondImage}`)}
        onMouseOut={(e) => (e.currentTarget.src = `${img}`)}
      />
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
  height: 40rem;
  width: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 1000px) {
    height: 20rem;
    width: 10rem;
    margin: 0.6rem;
  }
  img {
    height: 38rem;
    width: 20rem;
    object-fit: cover;
    @media screen and (max-width: 1000px) {
      height: 18rem;
      width: 10rem;
    }
  }
  .price {
    font-size: 0.8rem;
    display: flex;
    @media screen and (max-width: 1000px) {
      font-size: 0.7rem;
    }
    p {
      color: red;
      padding: 0;
      margin: 0;
    }
    span {
      padding: 0px 5px;
      color: black;
    }
  }
  .name {
    color: rgba(119, 53, 53, 0.8);
    @media screen and (max-width: 1000px) {
      font-size: 0.7rem;
    }
  }
`;

export default Card;
