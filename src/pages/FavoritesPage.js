import React, { useEffect, useState, useLayoutEffect } from "react";
//styling
import styled from "styled-components";
//components
import Card from "../components/Card";
//redux
import { useSelector, useDispatch } from "react-redux";
//actions
import { loginAction } from "../actions/loginAction";

const FavoritesPage = () => {
  //state
  const [size, setSize] = useState([0, 0]);
  const [mv, setMV] = useState(false);
  //useEffects
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  useEffect(() => {
    setMV(window.matchMedia("(min-width: 1000px)").matches);
  }, [size, mv]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction());
  }, [dispatch]);
  //get data back
  const { user, isLogged } = useSelector((state) => state.login);
  return (
    <FavoritesPageComponent>
      <div className="header">
        <h2>Favorites</h2>
        {isLogged && (
          <span className="products-amount">
            {user.favorites.length}{" "}
            {user.favorites.length === 1 ? "item" : "items"}
          </span>
        )}
      </div>
      {isLogged && (
        <div className="items-display">
          {user.favorites.length > 0
            ? user.favorites.map((item) => (
                <Card
                  key={item.id}
                  height={mv ? "30rem" : "20rem"}
                  width={mv ? "23%" : "50%"}
                  margin={mv ? "1.5rem 0.5rem" : "0.5rem 0"}
                  id={item.id}
                  gender={item.gender}
                  category={item.category}
                  item={item}
                />
              ))
            : "Add item to favorites"}
        </div>
      )}
    </FavoritesPageComponent>
  );
};

const FavoritesPageComponent = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  align-items: center;
  .header {
    width: 80%;
    position: relative;
    display: flex;
    text-align: Center;
    justify-content: center;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
    h2 {
      @media screen and (max-width: 1000px) {
        font-size: 1.5rem;
      }
    }
    .products-amount {
      position: absolute;
      right: 0;
      top: 0;
      margin: 0rem 0.5rem;
    }
  }
  .items-display {
    margin-top: 2rem;
    width: 80%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
  }
`;

export default FavoritesPage;
