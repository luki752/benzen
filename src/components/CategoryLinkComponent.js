import React from "react";
//styled
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
const CategoryLinkComponent = ({
  gender,
  item,
  category,
  text,
  linkCategory,
}) => {
  //handlers
  const linkHandler = () => {
    window.scrollTo(0, 0);
  };
  return (
    <CategoryLinkView>
      <Link
        to={`/${gender}/${linkCategory}/${item}`}
        className="link"
        onClick={() => linkHandler()}
      >
        <li
          className={
            category === linkCategory ? "category active-list" : "category"
          }
        >
          {text}
        </li>
      </Link>
    </CategoryLinkView>
  );
};

const CategoryLinkView = styled.div``;

export default CategoryLinkComponent;
