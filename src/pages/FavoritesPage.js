import React from "react";
//styling
import styled from "styled-components";
//components
import Card from "../components/Card";
//redux
import { useSelector } from "react-redux";

const FavoritesPage = () => {
  //get data back
  const { favorites } = useSelector((state) => state.favorites);
  console.log(favorites);
  return (
    <FavoritesPageComponent>
      <div className="header">
        <h2>Favorites</h2>
        <span className="products-amount">
          {favorites.length} {favorites.length === 1 ? "item" : "items"}
        </span>
      </div>
      <div className="items-display">
        {favorites.length > 0
          ? favorites.map((item) => (
              <Card
                key={item.id}
                img={item.images[0].img}
                secondImage={item.images[1].img}
                name={item.name}
                price={item.price}
                hasDiscount={item.discount ? true : false}
                beforeDiscount={item.beforeDiscount}
                height={"30rem"}
                width={"25%"}
                margin="1.5rem 0"
                id={item.id}
                gender={"male"}
                category={"clothes"}
                item={item}
              />
            ))
          : "Add item to favorites"}
      </div>
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
    width: 70%;
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
    width: 70%;
    display: flex;
    justify-content: center;
  }
`;

export default FavoritesPage;
