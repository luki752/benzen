import React from "react";
//router
import { Link, useLocation } from "react-router-dom";
//styling
import styled from "styled-components";

const ManLinksComponent = ({ gender }) => {
  const location = useLocation();
  const item = location.pathname.split("/")[3];
  const subItem = location.pathname.split("/")[4];
  const category = location.pathname.split("/")[2];
  return (
    <ManView>
      <ul>
        <Link to={`/${gender}/clothes/outerwear/coats`} className="link">
          <li
            className={
              category === "clothes" ? "category active-list" : "category"
            }
          >
            Clothes
          </li>
        </Link>
        {category === "clothes" ? (
          <ul>
            <Link to={`/${gender}/clothes/outerwear/coats`} className="link">
              <li className={item === "outerwear" ? "active-list" : ""}>
                Coats, jackets, puffer jackets
              </li>
            </Link>
            {item === "outerwear" ? (
              <ul>
                <Link
                  to={`/${gender}/clothes/outerwear/coats`}
                  className="link"
                >
                  <li
                    className={
                      subItem === "coats"
                        ? "list-in-list active-list"
                        : "list-in-list"
                    }
                  >
                    Coats
                  </li>
                </Link>
                <Link
                  to={`/${gender}/clothes/outerwear/jackets`}
                  className="link"
                >
                  <li
                    className={
                      subItem === "jackets"
                        ? "list-in-list active-list"
                        : "list-in-list"
                    }
                  >
                    jackets
                  </li>
                </Link>
                <Link
                  to={`/${gender}/clothes/outerwear/puffer-jackets`}
                  className="link"
                >
                  <li
                    className={
                      subItem === "puffer-jackets"
                        ? "list-in-list active-list"
                        : "list-in-list"
                    }
                  >
                    puffer jackets
                  </li>
                </Link>

                {gender === "man" && (
                  <Link
                    to={`/${gender}/clothes/outerwear/vests`}
                    className="link"
                  >
                    <li
                      className={
                        subItem === "vests"
                          ? "list-in-list active-list"
                          : "list-in-list"
                      }
                    >
                      vests
                    </li>
                  </Link>
                )}
              </ul>
            ) : (
              ""
            )}

            <Link to={`/${gender}/clothes/sweaters`} className="link">
              <li className={item === "sweaters" ? "active-list" : ""}>
                Jumpers, Cardigans
              </li>
            </Link>
            <Link to={`/${gender}/clothes/shirts`} className="link">
              <li className={item === "shirts" ? "active-list" : ""}>Shirts</li>
            </Link>
            <Link to={`/${gender}/clothes/sweatshirts`} className="link">
              <li className={item === "sweatshirts" ? "active-list" : ""}>
                Hoodies, sweatshirts
              </li>
            </Link>
            <Link to={`/${gender}/clothes/trousers`} className="link">
              <li className={item === "trousers" ? "active-list" : ""}>
                Trousers
              </li>
            </Link>

            <Link to={`/${gender}/clothes/polos`} className="link">
              <li className={item === "polos" ? "active-list" : ""}>
                Polo shirts
              </li>
            </Link>

            <Link to={`/${gender}/clothes/t-shirts`} className="link">
              <li className={item === "t-shirts" ? "active-list" : ""}>
                T-shirts
              </li>
            </Link>
            <Link to={`/${gender}/clothes/jeans`} className="link">
              <li className={item === "jeans" ? "active-list" : ""}>Jeans</li>
            </Link>
            <Link to={`/${gender}/clothes/blazers`} className="link">
              <li className={item === "blazers" ? "active-list" : ""}>
                Blazers
              </li>
            </Link>

            <Link to={`/${gender}/clothes/suits`} className="link">
              <li className={item === "suits" ? "active-list" : ""}>Suits</li>
            </Link>

            <Link to={`/${gender}/clothes/nightwear`} className="link">
              <li className={item === "nightwear" ? "active-list" : ""}>
                Nightwear
              </li>
            </Link>

            <Link to={`/${gender}/clothes/underwear`} className="link">
              <li className={item === "underwear" ? "active-list" : ""}>
                Underwear
              </li>
            </Link>
          </ul>
        ) : (
          ""
        )}
        <Link to={`/${gender}/accessories/bags`} className="link">
          <li
            className={
              category === "accessories" ? "category active-list" : "category"
            }
          >
            Accessories
          </li>
        </Link>

        {category === "accessories" ? (
          <ul>
            <Link to={`/${gender}/accessories/bags`} className="link">
              <li className={item === "bags" ? "active-list" : ""}>
                Bags, toiletry bags
              </li>
            </Link>

            <Link to={`/${gender}/accessories/shoes`} className="link">
              <li className={item === "shoes" ? "active-list" : ""}>Shoes</li>
            </Link>

            <Link to={`/${gender}/accessories/hats`} className="link">
              <li className={item === "hats" ? "active-list" : ""}>Hats</li>
            </Link>
            <Link to={`/${gender}/accessories/scarves`} className="link">
              <li className={item === "scarves" ? "active-list" : ""}>
                scarves
              </li>
            </Link>
            <Link to={`/${gender}/accessories/gloves`} className="link">
              <li className={item === "gloves" ? "active-list" : ""}>gloves</li>
            </Link>

            <Link to={`/${gender}/accessories/socks`} className="link">
              <li className={item === "socks" ? "active-list" : ""}>Socks</li>
            </Link>
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
