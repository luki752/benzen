import React, { useEffect } from "react";
//styling
import styled from "styled-components";
//components
import ImageComponent from "../components/ImageComponent";
//actions
import { loginAction } from "../actions/loginAction";
//redux
import { useDispatch } from "react-redux";
const SaleMainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction());
  }, [dispatch]);
  return (
    <SaleMainPageComponent>
      <ImageComponent
        width="100%"
        text="sale up to 70%"
        textColor="red"
        img="https://www.reserved.com/media/SHARED/stronywizerunkowe/reserved/home/content/img/sliders/desktop/baner-full-SALE-ona-1900x950px-130121.jpg"
        btnText="Woman"
        btns="true"
        secondBtn="Men"
        link="/sale/woman/puffer-jackets"
        secondLink="/sale/man/suits"
      />
    </SaleMainPageComponent>
  );
};

const SaleMainPageComponent = styled.div`
  min-height: 50vh;
  width: 100%;
`;

export default SaleMainPage;
