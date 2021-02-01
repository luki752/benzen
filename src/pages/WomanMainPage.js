import React from "react";
//styling
import styled from "styled-components";
//components
import CarouselComponent from "../components/Carousel";
import Card from "../components/Card";
import ImageComponent from "../components/ImageComponent";

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
        />
        <div className="four-cards">
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/Y/S/YS164-MLC-001_1.jpg"
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
            name={"Denim dress"}
            price={"39.99"}
            hasDiscount={true}
            discountPrice={"19.99"}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/Z/R/ZR884-MLC-001_8.jpg"
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
          btnText={"For Her"}
        />
        <div className="four-cards">
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/1/6/1664C-01X-030_2.jpg"
            }
            name={"Quilted jacket with collar"}
            price={"59.99"}
            hasDiscount={false}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/1/9/1905C-04X-030_7.jpg"
            }
            name={"Ribbed jersey body"}
            price={"14.99"}
            hasDiscount={false}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/0/5/0533C-01X-030_7.jpg"
            }
            name={"Oversize hoodie"}
            price={"24.99"}
            hasDiscount={false}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/0/5/0533C-04X-030_5.jpg"
            }
            name={"Oversize hoodie2"}
            price={"24.99"}
            hasDiscount={false}
          />
        </div>
        <CarouselComponent />
        <div className="four-cards">
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/0/5/0516C-04X-030_3.jpg"
            }
            name={"Quilted jacket with collar2"}
            price={"29.99"}
            hasDiscount={false}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/9/1/9170D-MLC-001_2.jpg"
            }
            name={"Thick-soled shoes"}
            price={"39.99"}
            hasDiscount={false}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/0/5/0516C-12X-030_3.jpg"
            }
            name={"Quilted jacket with collar3"}
            price={"29.99"}
            hasDiscount={false}
          />
          <Card
            img={
              "https://www.reserved.com/media/catalog/product/2/9/2915E-02X-001_3.jpg"
            }
            name={"Bucket hat"}
            price={"15.99"}
            hasDiscount={false}
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
    .four-cards {
      display: flex;
    }
  }
`;

export default WomanMainPage;
