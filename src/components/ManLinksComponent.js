import React from "react";
//router
import { Link, useLocation } from "react-router-dom";
//styling
import styled from "styled-components";
//components
import LinkComponent from "../components/LinkComponent";
import CategoryLinkComponent from "./CategoryLinkComponent";
import SubLinkComponent from "./SubLinkComponent";

const ManLinksComponent = ({ gender }) => {
  const location = useLocation();
  const item = location.pathname.split("/")[3];
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
              <li className={item === "outerwear" ? "active-list" : ""}>
                Coats, jackets, puffer jackets
              </li>
            </Link>

            {item === "outerwear" ? (
              <ul>
                <SubLinkComponent
                  gender={gender}
                  subItem={subItem}
                  category={"clothes"}
                  item={"outerwear"}
                  linkSubItem={"coats"}
                  text={"Coats"}
                />
                <SubLinkComponent
                  gender={gender}
                  subItem={subItem}
                  category={"clothes"}
                  item={"outerwear"}
                  linkSubItem={"jackets"}
                  text={"Jackets"}
                />
                <SubLinkComponent
                  gender={gender}
                  subItem={subItem}
                  category={"clothes"}
                  item={"outerwear"}
                  linkSubItem={"puffer-jackets"}
                  text={"puffer jackets"}
                />
                <SubLinkComponent
                  gender={gender}
                  subItem={subItem}
                  category={"clothes"}
                  item={"outerwear"}
                  linkSubItem={"vests"}
                  text={"Vests"}
                />
              </ul>
            ) : (
              ""
            )}

            <LinkComponent
              gender={gender}
              category={"clothes"}
              linkItem={"sweaters"}
              item={item}
              text={"Jumpers, Cardigans"}
            />
            <LinkComponent
              gender={gender}
              category={"clothes"}
              linkItem={"shirts"}
              item={item}
              text={"Shirts"}
            />
            <LinkComponent
              gender={gender}
              category={"clothes"}
              linkItem={"sweatshirts"}
              item={item}
              text={"Hoodies, sweatshirts"}
            />
            <LinkComponent
              gender={gender}
              category={"clothes"}
              linkItem={"trousers"}
              item={item}
              text={"Trousers"}
            />
            <LinkComponent
              gender={gender}
              category={"clothes"}
              linkItem={"polos"}
              item={item}
              text={"Polo shirts"}
            />
            <LinkComponent
              gender={gender}
              category={"clothes"}
              linkItem={"t-shirts"}
              item={item}
              text={"T-shirts"}
            />
            <LinkComponent
              gender={gender}
              category={"clothes"}
              linkItem={"jeans"}
              item={item}
              text={"Jeans"}
            />
            <LinkComponent
              gender={gender}
              category={"clothes"}
              linkItem={"blazers"}
              item={item}
              text={"Blazers"}
            />
            <LinkComponent
              gender={gender}
              category={"clothes"}
              linkItem={"suits"}
              item={item}
              text={"Suits"}
            />
            <LinkComponent
              gender={gender}
              category={"clothes"}
              linkItem={"nightwear"}
              item={item}
              text={"Nightwear"}
            />
            <LinkComponent
              gender={gender}
              category={"clothes"}
              linkItem={"underwear"}
              item={item}
              text={"Underwear"}
            />
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
            <LinkComponent
              gender={gender}
              category={"accessories"}
              linkItem={"bags"}
              item={item}
              text={"Bags, toiletry bags"}
            />
            <LinkComponent
              gender={gender}
              category={"accessories"}
              linkItem={"shoes"}
              item={item}
              text={"Shoes"}
            />
            <LinkComponent
              gender={gender}
              category={"accessories"}
              linkItem={"hats"}
              item={item}
              text={"Hats"}
            />
            <LinkComponent
              gender={gender}
              category={"accessories"}
              linkItem={"scarves"}
              item={item}
              text={"Scarves"}
            />
            <LinkComponent
              gender={gender}
              category={"accessories"}
              linkItem={"gloves"}
              item={item}
              text={"Gloves"}
            />
            <LinkComponent
              gender={gender}
              category={"accessories"}
              linkItem={"socks"}
              item={item}
              text={"Socks"}
            />
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
