import React, { useState, useEffect } from "react";
//styling
import styled from "styled-components";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadClothes } from "../actions/clothesAction";
//router
import { useLocation } from "react-router-dom";
//icons
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const ItemDetailsPage = () => {
  //state
  const [item, setItem] = useState(null);
  const [activeImg, setActiveImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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
  }, [isLoading]);
  return (
    <>
      {item && (
        <ItemDetailsPageComponent>
          <div className="left-side">
            <div
              className="main-image"
              style={{
                backgroundImage: activeImg
                  ? `url(${activeImg})`
                  : `url(${item[0].images[currentIndex].img})`,
              }}
            >
              <ArrowBackIosIcon
                className="arrows"
                onClick={() =>
                  currentIndex - 1 === -1
                    ? setCurrentIndex(item[0].images.length - 1)
                    : setCurrentIndex(
                        (currentIndex - 1) % item[0].images.length
                      )
                }
              />
              <ArrowForwardIosIcon
                className="arrows"
                onClick={() =>
                  setCurrentIndex((currentIndex + 1) % item[0].images.length)
                }
              />
            </div>
          </div>

          <div className="right-side">
            {console.log(item[0].images.length)}
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
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .main-image {
      height: 70vh;
      width: 60vh;
      background-size: cover;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .arrows {
        font-size: 2rem;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .right-side {
    font-size: 2rem;
  }
`;

export default ItemDetailsPage;
