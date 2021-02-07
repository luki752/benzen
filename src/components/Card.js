import React, { useState } from "react";
//styling
import styled from "styled-components";
//icons
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
//link
import { Link } from "react-router-dom";
//redux
import { connect } from "react-redux";

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
  id,
  gender,
  category,
  item,
  addToFavorties,
}) => {
  //state
  const [favorite, setFavorite] = useState(false);
  //handlers
  const favoritesHandler = () => {
    setFavorite(!favorite);
    addToFavorties();
  };
  return (
    <CardComponent style={{ width: width, margin: margin }}>
      <FavoriteBorderIcon
        className="favoriteIcon"
        style={{ color: favorite ? "red" : "rgba(0, 0, 0, 0.2)" }}
        onClick={() => favoritesHandler()}
      />
      <Link
        to={`/${gender}/${category}/${id}`}
        className="link"
        onClick={() => window.scrollTo(0, 0)}
      >
        <img
          src={img}
          alt={name}
          style={{ height: height }}
          onMouseOver={(e) => (e.currentTarget.src = `${secondImage}`)}
          onMouseOut={(e) => (e.currentTarget.src = `${img}`)}
        />

        <div className="name">{name}</div>
      </Link>
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
  .link {
    text-align: center;
  }
  img {
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
    margin: 2rem 1rem;
    &:hover {
      cursor: pointer;
    }
    @media screen and (max-width: 1000px) {
      margin: 0.5rem;
      font-size: 2rem;
    }
  }
`;
const mapDispatchToProps = (dispatch, ownProps) => {
  const { item } = ownProps;
  return {
    addToFavorties: () =>
      dispatch({ type: "ADD_TO_FAVORITES", payload: { item: { item } } }),
  };
};
export default connect(null, mapDispatchToProps)(Card);
