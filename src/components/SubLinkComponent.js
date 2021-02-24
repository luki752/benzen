import React from "react";
//styled
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
const SubLinkComponent = ({
  gender,
  item,
  category,
  text,
  linkSubItem,
  subItem,
}) => {
  //handlers
  const linkHandler = () => {
    window.scrollTo(0, 0);
  };
  return (
    <SubLinkComponentView>
      <Link
        onClick={() => linkHandler()}
        to={`/${gender}/${category}/${item}/${linkSubItem}`}
        className="link"
      >
        <li
          className={
            subItem === linkSubItem
              ? "list-in-list active-list"
              : "list-in-list"
          }
        >
          {text}
        </li>
      </Link>
    </SubLinkComponentView>
  );
};

const SubLinkComponentView = styled.div``;

export default SubLinkComponent;
