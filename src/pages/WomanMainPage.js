import React from "react";
//styling
import styled from "styled-components";
//components
import Card from "../components/Card";
import ImageComponent from "../components/ImageComponent";
//bootstrap
import Carousel from "react-bootstrap/Carousel";

const WomanMainPage = () => {
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
          width={"100%"}
        />
        <div className="four-cards">
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/Y/S/YS164-MLC-001_1.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/Y/S/YS164-MLC-002_1.jpg"
            }
            name={"Floral skirt"}
            price={"24.99"}
            hasDiscount={true}
            discountPrice={"15.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/Z/Q/ZQ881-55J-001_4.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/Z/Q/ZQ881-55J-002_4.jpg"
            }
            name={"Denim dress"}
            price={"39.99"}
            hasDiscount={true}
            discountPrice={"19.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/Z/R/ZR884-MLC-001_8.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/Z/R/ZR884-MLC-002_8.jpg"
            }
            name={"Floral dress"}
            price={"29.99"}
            hasDiscount={true}
            discountPrice={"12.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/Y/S/YS165-MLC-001.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/Y/S/YS165-MLC-002.jpg"
            }
            name={"Ladies` skirt"}
            price={"24.99"}
            hasDiscount={true}
            discountPrice={"15.99"}
          />
        </div>
        <ImageComponent
          text={"home hub"}
          textColor={"white"}
          img={
            "https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/sliders/desktop/baner-full-mix&match-ona-1900x950px-200121.jpg"
          }
          secondImage={
            "https://www.reserved.com/media/catalog/product/Y/S/YS164-MLC-002_1.jpg"
          }
          btnText={"For Her"}
          width={"100%"}
        />
        <div className="four-cards">
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/1/6/1664C-01X-030_2.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/1/6/1664C-01X-040_2.jpg"
            }
            name={"Quilted jacket with collar"}
            price={"59.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/1/9/1905C-04X-030_7.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/1/9/1905C-04X-040_5.jpg"
            }
            name={"Ribbed jersey body"}
            price={"14.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/0/5/0533C-01X-030_7.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/0/5/0533C-01X-040_4.jpg"
            }
            name={"Oversize hoodie"}
            price={"24.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/0/5/0533C-04X-030_5.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/0/5/0533C-04X-002_5.jpg"
            }
            name={"Oversize hoodie2"}
            price={"24.99"}
          />
        </div>
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
                  <button>for her</button>
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
                  <button>Shoes</button>
                  <button>Hats, scarfs, gloves</button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </CarouselStyles>
        <div className="four-cards">
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/0/5/0516C-04X-030_3.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/0/5/0516C-04X-001_3.jpg"
            }
            name={"Quilted jacket with collar2"}
            price={"29.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/9/1/9170D-MLC-002_2.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/9/1/9170D-MLC-001_2.jpg"
            }
            name={"Thick-soled shoes"}
            price={"39.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/0/5/0516C-12X-030_3.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/0/5/0516C-12X-031_3.jpg"
            }
            name={"Quilted jacket with collar3"}
            price={"29.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/2/9/2915E-02X-040_2.jpg"
            }
            secondImage={
              "https://www.reserved.com/media/catalog/product/2/9/2915E-02X-001_3.jpg"
            }
            name={"Bucket hat"}
            price={"15.99"}
          />
        </div>
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
      padding: 3rem 0rem;
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
export default WomanMainPage;
