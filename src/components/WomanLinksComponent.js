import React from "react";
//router
import { Link, useLocation } from "react-router-dom";
//styling
import styled from "styled-components";
//components
import LinkComponent from "../components/LinkComponent";
import CategoryLinkComponent from "./CategoryLinkComponent";
import SubLinkComponent from "./SubLinkComponent";
//components
import {
  WomanClothesLinks,
  WomanClothesSubLinks,
  WomanAccessoriesLinks,
  WomanShoesLinks,
} from "./Links";

const WomanLinksComponent = ({ gender }) => {
  const location = useLocation();
  const pathItem = location.pathname.split("/")[3];
  const subItem = location.pathname.split("/")[4];
  const category = location.pathname.split("/")[2];
  //handlers
  const linkHandler = () => {
    window.scrollTo(0, 0);
  };
  return (
    <WomanView>
      <ul>
        <CategoryLinkComponent
          gender={gender}
          category={category}
          item={"dresses"}
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
                {WomanClothesSubLinks.map((item) => (
                  <SubLinkComponent
                    gender={gender}
                    subItem={subItem}
                    category={"clothes"}
                    item={item.item}
                    linkSubItem={item.subItem}
                    text={item.title}
                    key={item.path}
                  />
                ))}
              </ul>
            ) : (
              ""
            )}
            {WomanClothesLinks.map((item) => (
              <LinkComponent
                gender={gender}
                category={"clothes"}
                linkItem={item.item}
                item={pathItem}
                text={item.title}
                key={item.path}
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
            {WomanAccessoriesLinks.map((accessory) => (
              <LinkComponent
                gender={gender}
                category={"accessories"}
                linkItem={accessory.item}
                item={pathItem}
                text={accessory.title}
                key={accessory.path}
              />
            ))}
          </ul>
        ) : (
          ""
        )}
        <CategoryLinkComponent
          gender={gender}
          category={category}
          item={"boots"}
          linkCategory={"shoes"}
          text={"Shoes"}
        />

        {category === "shoes" ? (
          <ul>
            {WomanShoesLinks.map((shoe) => (
              <LinkComponent
                gender={gender}
                category={"shoes"}
                linkItem={shoe.item}
                item={pathItem}
                text={shoe.title}
                key={shoe.path}
              />
            ))}
          </ul>
        ) : (
          ""
        )}
      </ul>
    </WomanView>
  );
};
const WomanView = styled.div`
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
export default WomanLinksComponent;
