import React, { useState, useEffect, useLayoutEffect } from "react";
//styling
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadClothes } from "../actions/clothesAction";
//components
import Card from "../components/Card";
import ImageComponent from "../components/ImageComponent";
//bootstrap
import Carousel from "react-bootstrap/Carousel";

const ManMainPage = () => {
  //state
  const [size, setSize] = useState([0, 0]);
  const [mv, setMV] = useState(false);
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadClothes());
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
  const { clothes, isLoading } = useSelector((state) => state.clothes);
  return (
    <ManMainPageComponent>
      <div className="items">
        <CarouselStyles>
          <Carousel interval={5000}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/sliders/desktop/baner-full-SALE-on-1900x950px-231220.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3 style={{ color: "red" }}>sale</h3>
                <h3 style={{ color: "red" }}>up to 50% off</h3>
                <div className="buttons">
                  <button>for him</button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/sliders/desktop/baner-full-athleisure-on-1900x950px-220121.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>need warm clothes?</h3>
                <p>see our offer</p>
                <div className="buttons">
                  <Link to="/man/clothes/outerwear/coats" className="link">
                    <button>for him</button>
                  </Link>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </CarouselStyles>
        {!isLoading && (
          <div className="four-cards">
            {clothes.male.clothes
              .filter((cloth) => cloth.item === "puffer-jackets")
              .slice(0, 4)
              .map((cloth) => (
                <Card
                  key={cloth.id}
                  img={cloth.images[0].first}
                  secondImage={cloth.images[1].second}
                  name={cloth.name}
                  price={cloth.price}
                  hasDiscount={cloth.discount ? true : false}
                  beforeDiscount={cloth.beforeDiscount}
                  height={mv ? "40rem" : "20rem"}
                  width={mv ? "25%" : "50%"}
                  margin={mv ? "3rem 0" : "1rem 0"}
                  id={cloth.id}
                  gender={"male"}
                  category={"clothes"}
                />
              ))}
          </div>
        )}
        <div className="four-components">
          <ImageComponent
            text={"trousers"}
            textColor={"white"}
            img={
              "https://www.reserved.com/media/catalog/product/2/6/2675C-09M-003_5.jpg"
            }
            btnText={"for him"}
            width={"47%"}
            link={"man/clothes/trousers"}
          />
          <ImageComponent
            text={"jackets"}
            textColor={"white"}
            img={
              "https://www.reserved.com/media/catalog/product/Y/L/YL447-05X-030_2.jpg"
            }
            btnText={"for him"}
            width={"47%"}
            link={"/man/clothes/outerwear/jackets"}
          />
          <ImageComponent
            text={"sweatshirts"}
            textColor={"white"}
            img={
              "https://www.reserved.com/media/catalog/product/Y/Q/YQ304-82M-001_10.jpg"
            }
            btnText={"for him"}
            width={"47%"}
            link={"/man/clothes/sweatshirts"}
          />
          <ImageComponent
            text={"t-shirts"}
            textColor={"white"}
            img={
              "https://www.reserved.com/media/catalog/product/2/3/2326C-59X-001_3.jpg"
            }
            btnText={"for him"}
            width={"47%"}
            link={"/man/clothes/t-shirts"}
          />
        </div>

        <ImageComponent
          text={"winter accessories"}
          textColor={"white"}
          img={
            "https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/sliders/desktop/baner-full-zimowe-akcesoria-men-1900x950px-211020.jpg"
          }
          btnText={"Shoes"}
          btns={true}
          secondBtn={"Hats,scarfs,gloves"}
          width={"100%"}
          link={"/man/accessories/shoes"}
          secondLink={"/man/accessories/hats"}
        />
      </div>
    </ManMainPageComponent>
  );
};

const ManMainPageComponent = styled.div`
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
    }
    .four-components {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
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
    }
    .carousel-control-next-icon,
    .carousel-control-prev-icon {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

export default ManMainPage;
