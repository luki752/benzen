import React, { useState, useEffect, useLayoutEffect } from "react";
//styling
import styled from "styled-components";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadAllItems } from "../actions/itemsAction";
import { loginAction } from "../actions/loginAction";
//components
import Card from "../components/Card";
import ImageComponent from "../components/ImageComponent";
//bootstrap
import Carousel from "react-bootstrap/Carousel";
//router
import { Link } from "react-router-dom";

const WomanMainPage = () => {
  //state
  const [size, setSize] = useState([0, 0]);
  const [mv, setMV] = useState(false);
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllItems("woman", "", "sweatshirts"));
    dispatch(loginAction(localStorage.getItem("userId")));
  }, [dispatch]);
  //get width
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
  //get data back
  const { AllItems, isLoading } = useSelector((state) => state.item);
  //handlers
  const linkHandler = () => {
    window.scrollTo(0, 0);
  };
  return (
    <WomanMainPageComponent>
      <div className="items">
        <ImageComponent
          text={"sale up to 50% off"}
          textColor={"red"}
          img={
            "https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/sliders/desktop/baner-full-SALE-ona-1900x950px-231220.jpg"
          }
          btnText={"Woman"}
          width={"99%"}
          link={"/woman/sale/trousers"}
        />
        {!isLoading && (
          <div className="four-cards">
            {AllItems.slice(0, 4).map((cloth) => (
              <Card
                key={cloth.id}
                id={cloth.id}
                item={cloth}
                height={mv ? "25rem" : "18rem"}
                width={mv ? "23%" : "48%"}
                margin={mv ? "3rem 0.5rem" : "0.5rem 0.5"}
                gender={"woman"}
              />
            ))}
          </div>
        )}
        <ImageComponent
          text={"cozy clothes"}
          textColor={"white"}
          img={
            "https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/sliders/desktop/baner-full-mix&match-ona-1900x950px-200121.jpg"
          }
          secondImage={
            "https://www.reserved.com/media/catalog/product/Y/S/YS164-MLC-002_1.jpg"
          }
          btnText={"For Her"}
          width={"99%"}
          link={"/woman/clothes/sweatshirts"}
        />
        {!isLoading && (
          <div className="four-cards">
            {AllItems.slice(4, 8).map((cloth) => (
              <Card
                key={cloth.id}
                id={cloth.id}
                item={cloth}
                height={mv ? "25rem" : "18rem"}
                width={mv ? "23%" : "48%"}
                margin={mv ? "3rem 0.5rem" : "0.5rem 0.5"}
                gender={"woman"}
              />
            ))}
          </div>
        )}
        <CarouselStyles>
          <Carousel interval={5000}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/sliders/desktop/baner-full-kurtki-zimowe-ona-1900x950px-200121.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>puffer jackets</h3>
                <div className="buttons">
                  <Link
                    to="/woman/clothes/outerwear/puffer-jackets"
                    onClick={() => linkHandler()}
                  >
                    <button className="button-white">for her</button>
                  </Link>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/sliders/desktop/baner-full-zimowe-acc-ladies-1900x950px-021220.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>winter</h3>
                <h3>accessories</h3>
                <div className="buttons">
                  <Link to="/woman/shoes/boots" onClick={() => linkHandler()}>
                    <button className="button-white">Shoes</button>
                  </Link>
                  <Link
                    to="/woman/accessories/hats"
                    onClick={() => linkHandler()}
                  >
                    <button className="button-white">
                      Hats, scarfs, gloves
                    </button>
                  </Link>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </CarouselStyles>
        <div className="four-cards"></div>
      </div>
    </WomanMainPageComponent>
  );
};

const WomanMainPageComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: Center;
  width: 100%;
  .items {
    width: 70%;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
    .four-cards {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;
      padding: 1rem 0rem;
    }
  }
`;
const CarouselStyles = styled.div`
  .carousel-caption {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    z-index: 2;
    h3 {
      font-size: 5rem;
      text-transform: upperCase;
      font-weight: bold;
      @media screen and (max-width: 1000px) {
        font-size: 1.5rem;
      }
    }
    button {
      width: fit-content;
      margin: 0rem 1rem;
      @media screen and (max-width: 1000px) {
        margin: 0rem 0.5rem;
      }
    }
    .carousel-control-next-icon,
    .carousel-control-prev-icon {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;
export default WomanMainPage;
