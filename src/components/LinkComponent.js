import React from "react";
//styled
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
const LinkComponent = ({ gender, item, category, text, linkItem }) => {
  //handlers
  const linkHandler = () => {
    window.scrollTo(0, 0);
  };
  return (
    <LinkComponentView>
      <Link
        to={`/${gender}/${category}/${linkItem}`}
        className="link"
        onClick={() => linkHandler()}
      >
        <li className={item === linkItem ? "active-list" : ""}>{text}</li>
      </Link>
    </LinkComponentView>
  );
};

const LinkComponentView = styled.div``;

export default LinkComponent;
