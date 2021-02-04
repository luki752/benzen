import React, { useState } from "react";
//styling
import styled from "styled-components";
//icons
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
//notistack
import { useSnackbar } from "notistack";

const Card = ({
  img,
  secondImage,
  name,
  price,
  hasDiscount,
  beforeDiscount,
  height,
  width,
  margin,
}) => {
  const [favorite, setFavorite] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //handlers
  const snackbarHandler = (snackbarMessage, snackVariant) => {
    enqueueSnackbar(snackbarMessage, { variant: snackVariant });
    closeSnackbar(500);
  };

  return (
    <CardComponent style={{ height: height, width: width, margin: margin }}>
      <img
        src={img}
        alt={name}
        onMouseOver={(e) => (e.currentTarget.src = `${secondImage}`)}
        onMouseOut={(e) => (e.currentTarget.src = `${img}`)}
      />
      <FavoriteBorderIcon
        className="favoriteIcon"
        style={{ color: favorite ? "red" : "rgba(0, 0, 0, 0.2)" }}
        onClick={() => {
          setFavorite(!favorite);
          if (favorite === false) {
            snackbarHandler("Added to favorites", "success");
          } else {
            snackbarHandler("Removed from favorites", "error");
          }
        }}
      />
      <div className="name">{name}</div>
      <div className="price">
        {hasDiscount ? (
          <p>
            {price} GBP
            <span style={{ textDecoration: "line-through" }}>
              {beforeDiscount} GBP
            </span>
          </p>
        ) : (
          <span>{price} GBP</span>
        )}
      </div>
    </CardComponent>
  );
};

const CardComponent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 4px;
  img {
    height: 93%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  .price {
    height: 2%;
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
    height: 5%;
    padding: 2px 0;
    color: rgba(0, 0, 0, 0.6);
    @media screen and (max-width: 1000px) {
      font-size: 0.6rem;
    }
  }
  .favoriteIcon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    font-size: 3rem;
    margin: 1rem;
  }
`;

export default Card;
