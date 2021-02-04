import React, { useState, useEffect } from "react";
//styling
import styled from "styled-components";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadClothes } from "../actions/clothesAction";
//router
import { useLocation } from "react-router-dom";

const ItemDetailsPage = () => {
  //state
  const [item, setItem] = useState(null);
  //location, id
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const gender = location.pathname.split("/")[1];
  const pathId = parseInt(location.pathname.split("/")[3], 10);
  //dispatch data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadClothes());
  }, [dispatch]);
  //get data back
  const { clothes, isLoading } = useSelector((state) => state.clothes);
  useEffect(() => {
    if (!isLoading) {
      if (gender === "male") {
        if (category === "clothes") {
          setItem(clothes.male.clothes.filter((cloth) => cloth.id === pathId));
        } else if (category === "accessories") {
          setItem(
            clothes.male.accessories.filter((cloth) => cloth.id === pathId)
          );
        }
      } else if (gender === "female") {
        if (category === "clothes") {
          setItem(
            clothes.female.clothes.filter((cloth) => cloth.id === pathId)
          );
        } else if (category === "accessories") {
          setItem(
            clothes.female.accessories.filter((cloth) => cloth.id === pathId)
          );
        } else if (category === "shoes") {
          setItem(clothes.female.shoes.filter((cloth) => cloth.id === pathId));
        }
      }
    }
  }, [isLoading, clothes, category, gender, pathId]);
  return (
    <>
      {item && (
        <ItemDetailsPageComponent>
          <div className="left-side">
            <img src={item[0].images[0].first}></img>
          </div>
          <div className="right-side">
            {console.log(item[0])}
            <span>{item[0].name}</span>
            <span>{item[0].price} GBP</span>
          </div>
        </ItemDetailsPageComponent>
      )}
    </>
  );
};

const ItemDetailsPageComponent = styled.div`
  display: flex;
  min-height: 70vh;
  .left-side {
    img {
      height: 70vh;
      width: 60vh;
    }
  }
  .right-side {
    font-size: 2rem;
  }
`;

export default ItemDetailsPage;
