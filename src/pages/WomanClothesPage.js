import React from "react";

import styled from "styled-components";

//components
import ClothesPreviewPage from "../components/ClothesPreviewPage";

const WomanClothesPage = () => {
  return (
    <WomanClothesPageComponent>
      <ClothesPreviewPage gender="woman" />
    </WomanClothesPageComponent>
  );
};

const WomanClothesPageComponent = styled.div``;

export default WomanClothesPage;
