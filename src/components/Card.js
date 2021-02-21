import React, { useState, useEffect } from "react";
//styling
import styled from "styled-components";
//icons
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
//link
import { Link } from "react-router-dom";
//axios
import axios from "axios";
//notistack
import { useSnackbar } from "notistack";

//redux
import { useSelector, useDispatch } from "react-redux";
//actions
import { loginAction } from "../actions/loginAction";

const Card = ({ item, height, width, margin, gender, id }) => {
  const dispatch = useDispatch();

  //snack bar
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    dispatch(loginAction());
  }, [dispatch]);
  //state
  const { user, isLogged } = useSelector((state) => state.login);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (isLogged) {
      user.favorites.filter((item) =>
        item.id === id ? setFavorite(true) : ""
      );
    }
  }, [user, id, isLogged]);
  //handlers
  const snackbarHandler = (snackbarMessage, snackVariant) => {
    enqueueSnackbar(snackbarMessage, { variant: snackVariant });
    closeSnackbar(500);
  };
  const favoritesHandler = () => {
    if (favorite === false) {
      axios
        .put(`http://localhost:3000/users/${user.id}/`, {
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          orders: user.orders,
          addresses: user.addresses,
          isLogged: user.isLogged,
          accessibility: user.accessibility,
          favorites: [
            ...user.favorites,
            {
              id: id,
              name: item.name,
              item: item.item,
              amount: item.amount,
              price: item.price,
              desc: item.desc,
              discount: item.discount,
              beforeDiscount: item.beforeDiscount,
              material: item.material,
              images: item.images,
              gender: gender,
            },
          ],
        })
        .then((resp) => {
          setFavorite(true);
          dispatch(loginAction());
          snackbarHandler("Added to favorites", "success");
        })
        .catch((error) => {});
    } else if (favorite === true) {
      if (user.favorites) {
        axios
          .put(`http://localhost:3000/users/${user.id}/`, {
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
            favorites: user.favorites.filter((item) => item.id !== id),
            orders: user.orders,
            isLogged: user.isLogged,
            addresses: user.addresses,
            accessibility: user.accessibility,
          })
          .then((resp) => {
            setFavorite(false);
            dispatch(loginAction());
            snackbarHandler("Removed from favorites", "error");
          })
          .catch((error) => {});
      }
    }
  };
  return (
    <CardComponent style={{ width: width, margin: margin }}>
      {isLogged && (
        <FavoriteBorderIcon
          className="favoriteIcon"
          style={{ color: favorite ? "red" : "rgba(0, 0, 0, 0.2)" }}
          onClick={() => favoritesHandler()}
        />
      )}
      <Link
        to={`/${gender}/${item.id}`}
        className="link"
        onClick={() => window.scrollTo(0, 0)}
      >
        <img
          src={item.images[0].img}
          alt={item.name}
          style={{ height: height }}
          onMouseOver={(e) => (e.currentTarget.src = `${item.images[1].img}`)}
          onMouseOut={(e) => (e.currentTarget.src = `${item.images[0].img}`)}
        />

        <div className="name">{item.name}</div>
      </Link>
      <div className="price">
        {item.discount === true ? (
          <p>
            {item.price} GBP
            <span style={{ textDecoration: "line-through" }}>
              {item.beforeDiscount} GBP
            </span>
          </p>
        ) : (
          <span>{item.price} GBP</span>
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
  .link {
    text-align: center;
  }
  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
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
    height: 1rem;
    padding: 2px 0;
    font-weight: bold;
    font-size: 0.8rem;
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

export default Card;
