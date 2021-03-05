import React from "react";
//router
import { Link, useLocation } from "react-router-dom";
//styling
import styled from "styled-components";
//components
import LinkComponent from "../components/LinkComponent";
import CategoryLinkComponent from "./CategoryLinkComponent";
import SubLinkComponent from "./SubLinkComponent";
import {
  ManClothesLinks,
  ManClothesSubLinks,
  ManAccessoriesLinks,
} from "./Links";

const ManLinksComponent = ({ gender }) => {
  const location = useLocation();
  const pathItem = location.pathname.split("/")[3];
  const subItem = location.pathname.split("/")[4];
  const category = location.pathname.split("/")[2];
  //handlers
  const linkHandler = () => {
    window.scrollTo(0, 0);
  };
  return (
    <ManView>
      <ul>
        <CategoryLinkComponent
          gender={gender}
          category={category}
          item={"t-shirts"}
          linkCategory={"clothes"}
          text={"Clothes"}
        />
        {category === "clothes" ? (
          <ul>
            <Link
              to={`/${gender}/clothes/outerwear/coats`}
              className="link"
              onClick={() => linkHandler()}
            >
              <li className={pathItem === "outerwear" ? "active-list" : ""}>
                Coats, jackets, puffer jackets
              </li>
            </Link>

            {pathItem === "outerwear" ? (
              <ul>
                {ManClothesSubLinks.map((item) => (
                  <SubLinkComponent
                    gender={"man"}
                    subItem={subItem}
                    category={"clothes"}
                    item={item.item}
                    linkSubItem={item.subItem}
                    text={item.title}
                    key={item.title}
                  />
                ))}
              </ul>
            ) : (
              ""
            )}
            {ManClothesLinks.map((item) => (
              <LinkComponent
                gender={"man"}
                category={"clothes"}
                linkItem={item.item}
                item={pathItem}
                text={item.title}
                key={item.title}
              />
            ))}
          </ul>
        ) : (
          ""
        )}
        <CategoryLinkComponent
          gender={gender}
          category={category}
          item={"bags"}
          linkCategory={"accessories"}
          text={"Accessories"}
        />
        {category === "accessories" ? (
          <ul>
            {ManAccessoriesLinks.map((accessory) => (
              <LinkComponent
                gender={gender}
                category={"accessories"}
                linkItem={accessory.item}
                item={pathItem}
                text={accessory.title}
                key={accessory.title}
              />
            ))}
          </ul>
        ) : (
          ""
        )}
      </ul>
    </ManView>
  );
};

const ManView = styled.div`
  ul {
    list-style: none;
    li {
      text-indent: 10px;
      letter-spacing: 2px;
      &:hover {
        text-decoration: underline;
      }
    }
    .active-list {
      font-weight: bold;
    }
    .list-in-list {
      text-indent: 30px;
    }
    .category {
      font-size: 1.5rem;
      text-indent: -5px;
    }
  }
`;

export default ManLinksComponent;
