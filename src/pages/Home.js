import React from "react";
//styling
import styled from "styled-components";
//components
import CarouselComponent from "../components/Carousel";
const Home = () => {
  return (
    <HomeComponent>
      <div className="home-carousel">
        <CarouselComponent />
      </div>
    </HomeComponent>
  );
};

const HomeComponent = styled.div`
  width: 100%;
`;

export default Home;
