import React from "react";
//styled
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
const LinkComponent = ({
  gender,
  item,
  subItem,
  category,
  text,
  LinkItem,
  LinkSubitem,
  header,
}) => {
  return (
    <LinkComponentView>
      <Link
        to={
          subItem
            ? `/${gender}/${category}/${LinkItem}/${LinkSubitem}`
            : `/${gender}/${category}/${LinkItem}`
        }
        className="link"
      >
        <li
          style={{ fontSize: header ? "1.2rem" : "0.9rem" }}
          className={
            subItem
              ? subItem === LinkSubitem
                ? "active-list"
                : ""
              : item === LinkItem
              ? "active-list"
              : ""
          }
        >
          {text}
        </li>
      </Link>
    </LinkComponentView>
  );
};

const LinkComponentView = styled.div``;

export default LinkComponent;
