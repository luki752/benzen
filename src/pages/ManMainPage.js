import React from "react";
//styling
import styled from "styled-components";
//components
import Card from "../components/Card";
import ImageComponent from "../components/ImageComponent";
//bootstrap
import Carousel from "react-bootstrap/Carousel";

const ManMainPage = () => {
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
                <h3>new collection</h3>
                <h3>athleisure</h3>
                <div className="buttons">
                  <button>for him</button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </CarouselStyles>
        <div className="four-cards">
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/4/8/4845C-59X-030_1.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/4/8/4845C-59X-001_3.jpg"
            }
            name={"Quilted jacket"}
            price={"24.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/Y/L/YL447-05X-030_2.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/Y/L/YL447-05X-001_3.jpg"
            }
            name={"Cotton rich sweatpants"}
            price={"19.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/3/2/3209C-05X-030_1.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/3/2/3209C-05X-004_4.jpg"
            }
            name={"Hoodie"}
            price={"29.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/2/6/2675C-09M-030_2.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/2/6/2675C-09M-002_5.jpg"
            }
            name={"Melange sweatpants"}
            price={"19.99"}
          />
        </div>
        <div className="four-components">
          <ImageComponent
            text={"trousers"}
            textColor={"white"}
            img={
              "https://www.reserved.com/media/catalog/product/2/6/2675C-09M-003_5.jpg"
            }
            btnText={"for him"}
            width={"47%"}
          />
          <ImageComponent
            text={"jackets"}
            textColor={"white"}
            img={
              "https://www.reserved.com/media/catalog/product/Y/L/YL447-05X-030_2.jpg"
            }
            btnText={"for him"}
            width={"47%"}
          />
          <ImageComponent
            text={"sweatshirts"}
            textColor={"white"}
            img={
              "https://www.reserved.com/media/catalog/product/Y/Q/YQ304-82M-001_10.jpg"
            }
            btnText={"for him"}
            width={"47%"}
          />
          <ImageComponent
            text={"t-shirts"}
            textColor={"white"}
            img={
              "https://www.reserved.com/media/catalog/product/2/3/2326C-59X-001_3.jpg"
            }
            btnText={"for him"}
            width={"47%"}
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
      padding: 3rem 0rem;
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
