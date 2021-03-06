import React, { useEffect } from "react";
//styling
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
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

const ManMainPage = () => {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction(localStorage.getItem("userId")));
    dispatch(loadAllItems("man", "", "puffer-jackets"));
  }, [dispatch]);
  //get data back
  const { AllItems, isLoading } = useSelector((state) => state.item);
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
                  <Link to="/sale/man/coats" className="link">
                    <button className="button-white">for him</button>
                  </Link>
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
                    <button className="button-white">for him</button>
                  </Link>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </CarouselStyles>
        {!isLoading && (
          <div className="four-cards">
            {AllItems.slice(0, 4).map((cloth) => (
              <Card
                key={cloth.id}
                item={cloth}
                id={cloth.id}
                lgHeight={"25rem"}
                smHeight={"18rem"}
                smWidth={"48%"}
                lgWidth={"23%"}
                lgMargin={"3rem 0.5rem"}
                smMargin={"0.5rem 0.5"}
                gender={"man"}
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
          width={"99%"}
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
      padding: 0rem 0rem 1rem 0rem;
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
