import React from "react";
//router
import { Link, useLocation } from "react-router-dom";
//styling
import styled from "styled-components";

const WomanLinksComponent = ({ gender }) => {
  const location = useLocation();
  const item = location.pathname.split("/")[3];
  const subItem = location.pathname.split("/")[4];
  const category = location.pathname.split("/")[2];
  return (
    <WomanView>
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
                  to={`/${gender}/clothes/outerwear/biker-jackets`}
                  className="link"
                >
                  <li
                    className={
                      subItem === "biker-jackets"
                        ? "list-in-list active-list"
                        : "list-in-list"
                    }
                  >
                    Biker jackets
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
              </ul>
            ) : (
              ""
            )}

            <Link to={`/${gender}/clothes/sweaters`} className="link">
              <li className={item === "sweaters" ? "active-list" : ""}>
                Jumpers, Cardigans
              </li>
            </Link>

            <Link to={`/${gender}/clothes/dresses`} className="link">
              <li className={item === "dresses" ? "active-list" : ""}>
                Dresses
              </li>
            </Link>

            <Link to={`/${gender}/clothes/skirts`} className="link">
              <li className={item === "skirts" ? "active-list" : ""}>Skirts</li>
            </Link>

            <Link to={`/${gender}/clothes/blouses`} className="link">
              <li className={item === "blouses" ? "active-list" : ""}>
                Blouses
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
            <Link to={`/${gender}/clothes/nightwear`} className="link">
              <li className={item === "nightwear" ? "active-list" : ""}>
                Nightwear
              </li>
            </Link>

            <Link to={`/${gender}/clothes/lingerie`} className="link">
              <li className={item === "lingerie" ? "active-list" : ""}>
                Lingerie
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
          </ul>
        ) : (
          ""
        )}
        {gender === "woman" && (
          <Link to="/woman/shoes/boots" className="link">
            <li
              className={
                category === "shoes" ? "category active-list" : "category"
              }
            >
              Shoes
            </li>
          </Link>
        )}
        {category === "shoes" ? (
          <ul>
            <Link to="/woman/shoes/boots" className="link">
              <li className={item === "boots" ? "active-list" : ""}>Boots</li>
            </Link>
            <Link to="/woman/shoes/heels" className="link">
              <li className={item === "heels" ? "active-list" : ""}>Heels</li>
            </Link>
            <Link to="/woman/shoes/flats" className="link">
              <li className={item === "flats" ? "active-list" : ""}>Flats</li>
            </Link>
            <Link to="/woman/shoes/leather" className="link">
              <li className={item === "leather" ? "active-list" : ""}>
                Leather
              </li>
            </Link>
            <Link to="/woman/shoes/sneakers" className="link">
              <li className={item === "sneakers" ? "active-list" : ""}>
                Sneakers
              </li>
            </Link>
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
