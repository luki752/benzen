import React from "react";
//styling
import styled from "styled-components";
//components
import ClothesPreviewPage from "../components/ClothesPreviewPage";

const ManClothesPage = () => {
  return (
    <ManClothesPageComponent>
      <ClothesPreviewPage gender="man" />
    </ManClothesPageComponent>
  );
};

const ManClothesPageComponent = styled.div``;

export default ManClothesPage;
