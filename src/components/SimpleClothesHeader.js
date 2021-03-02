import React from "react";
//styling
import styled from "styled-components";
//components
import SortPrice from "../components/SortPrice";

const SimpleClothesHeader = ({ sort, setSort, length }) => {
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  return (
    <HeaderComponent>
      <div className="sort">
        <SortPrice sort={sort} handleSort={handleSort} />
      </div>
      <div className="list-length">{length} results</div>
    </HeaderComponent>
  );
};

const HeaderComponent = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: Center;
  .sort-select {
    width: 15rem;
  }
  @media screen and (max-width: 1000px) {
    width: 98%;
  }
`;

export default SimpleClothesHeader;
