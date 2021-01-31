import React from "react";
//styling
import styled from "styled-components";
//bootstrap
import Carousel from "react-bootstrap/Carousel";

const CarouselComponent = () => {
  return (
    <CarouselStyles>
      <Carousel interval={5000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/sliders/desktop/baner-full-SALE-ona-1900x950px-130121.jpg"
            alt="First slide"
          />
          <Carousel.Caption className="carousel-caption first-slide">
            <h3>sale</h3>
            <h3>up to 50% off</h3>
            <div className="buttons">
              <button>Woman</button>
              <button>Men</button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/sliders/desktop/baner-full-newin-ona-1900x950px-040121.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>age of aquarius</h3>
            <p>new collection</p>
            <div className="buttons">
              <button>for her</button>
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
            <p>Athleisure</p>
            <div className="buttons">
              <button>for him</button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </CarouselStyles>
  );
};

const CarouselStyles = styled.div`
  .carousel-caption {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    z-index: 2;

    h3,
    p {
      font-size: 5rem;
      text-transform: upperCase;
      font-weight: bold;
      @media screen and (max-width: 1000px) {
        font-size: 1.5rem;
      }
    }
    p {
      font-size: 1.5rem;
      @media screen and (max-width: 1000px) {
        font-size: 0.5rem;
        margin: 0.25;
      }
    }
    .buttons {
      button {
        background-color: white;
        padding: 1rem;
        width: 7rem;
        margin: 1rem;
        border: none;
        transition: 0.3s ease-in all;
        &:hover {
          background-color: black;
          color: white;
        }
        @media screen and (max-width: 1000px) {
          padding: 0.5rem;
          width: 3rem;
          font-size: 0.5rem;
          margin: 0rem 0.5rem;
        }
      }
    }
  }
  .first-slide {
    color: red;
  }
  .carousel-control-next-icon,
  .carousel-control-prev-icon {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default CarouselComponent;
