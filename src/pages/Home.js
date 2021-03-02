import React, { useEffect } from "react";
//styling
import styled from "styled-components";
//bootstrap
import Carousel from "react-bootstrap/Carousel";
//router
import { Link } from "react-router-dom";
//actions
import { loginAction } from "../actions/loginAction";
//redux
import { useDispatch } from "react-redux";
const Home = () => {
  const linkHandler = () => {
    window.scrollTo(0, 0);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction(localStorage.getItem("userId")));
  }, [dispatch]);
  return (
    <HomeComponent>
      <div className="home-carousel">
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
                  <Link to="/sale/woman/puffer-jackets" className="link">
                    <button className="button-white">Woman</button>
                  </Link>
                  <Link to="/sale/man/puffer-jackets" className="link">
                    <button className="button-white">Men</button>
                  </Link>
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
                <h3>It's cold outside</h3>
                <p>get a jacket</p>
                <div className="buttons">
                  <Link to="/women/clothes/jackets" className="link">
                    <button className="button-white">for her</button>
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
        <div className="images">
          <Link to="/man" onClick={() => linkHandler()}>
            <img
              src="https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/bricks/Re-men-kafel-minisite-newin-737x737px-040121_EN.jpg"
              alt="man"
            />
          </Link>
          <Link to="/woman" onClick={() => linkHandler()}>
            <img
              src="https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/bricks/Re-ladies-kafel-minisite-newin-737x737px-040121_EN.jpg"
              alt="woman"
            />
          </Link>
        </div>
      </div>
    </HomeComponent>
  );
};

const HomeComponent = styled.div`
  width: 100%;
  .images {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 1000px) {
      display: none;
    }
    img {
      width: 100%;
      height: 25rem;
      object-fit: cover;
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
    button {
      margin: 0rem 1rem;
      @media screen and (max-width: 1000px) {
        margin: 0rem 0.5rem;
      }
    }

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
  }
  .first-slide {
    color: red;
  }
  .carousel-control-next-icon,
  .carousel-control-prev-icon {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
export default Home;
