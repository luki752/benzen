import React, { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadClothes } from "../actions/clothesAction";
//styling
import styled from "styled-components";
//router
import { Link, useLocation } from "react-router-dom";
//components
import Card from "../components/Card";

const ManClothesPage = () => {
  const location = useLocation();
  const item = location.pathname.split("/")[3];
  const category = location.pathname.split("/")[2];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadClothes());
  }, [dispatch]);

  const { clothes } = useSelector((state) => state.clothes);

  return (
    <ManClothesPageComponent>
      <div className="left-side">
        <ul>
          <li className="category">Clothes</li>
          <li className={item === "new" ? "active-list" : ""}>New in</li>
          <Link to="/man/clothes/outerwear" className="link">
            <li className={item === "outerwear" ? "active-list" : ""}>
              Coats, jackets, puffer jackets
            </li>
          </Link>
          {item === "outerwear" ? (
            <ul>
              <Link to="/man/clothes/outerwear/coats" className="link">
                <li className="list-in-list">Coats</li>
              </Link>
              <li className="list-in-list">jackets</li>
              <li className="list-in-list">puffer jackets</li>
              <li className="list-in-list">vests</li>
              <li className="list-in-list">quilted jackets</li>
            </ul>
          ) : (
            ""
          )}
          <Link to="/man/clothes/sweaters" className="link">
            <li className={item === "sweaters" ? "active-list" : ""}>
              Jumpers, Cardigans
            </li>
          </Link>
          <Link to="/man/clothes/shirts" className="link">
            <li className={item === "shirts" ? "active-list" : ""}>Shirts</li>
          </Link>
          <Link to="/man/clothes/sweatshirts" className="link">
            <li className={item === "sweatshirts" ? "active-list" : ""}>
              Hoodies, sweatshirts
            </li>
          </Link>
          <Link to="/man/clothes/trousers" className="link">
            <li className={item === "trousers" ? "active-list" : ""}>
              Trousers
            </li>
          </Link>
          <Link to="/man/clothes/polos" className="link">
            <li className={item === "polos" ? "active-list" : ""}>
              Polo shirts
            </li>
          </Link>
          <Link to="/man/clothes/t-shirts" className="link">
            <li className={item === "t-shirts" ? "active-list" : ""}>
              T-shirts
            </li>
          </Link>
          <Link to="/man/clothes/jeans" className="link">
            <li className={item === "jeans" ? "active-list" : ""}>Jeans</li>
          </Link>
          <Link to="/man/clothes/blazers" className="link">
            <li className={item === "blazers" ? "active-list" : ""}>Blazers</li>
          </Link>
          <Link to="/man/clothes/suits" className="link">
            <li className={item === "suits" ? "active-list" : ""}>Suits</li>
          </Link>
          <Link to="/man/clothes/nightwear" className="link">
            <li className={item === "nightwear" ? "active-list" : ""}>
              Nightwear
            </li>
          </Link>
          <Link to="/man/clothes/underwear" className="link">
            <li className={item === "underwear" ? "active-list" : ""}>
              Underwear
            </li>
          </Link>

          <li className="category">Accessories</li>
          {category === "category" ? (
            <ul>
              <li>New In</li>
              <li>Shoes</li>
              <li>Bags, toiletry bags</li>
              <li>Hats, scarves, gloves</li>
              <li>Socks</li>
            </ul>
          ) : (
            ""
          )}

          <li className="category">Collections</li>
          {category === "collections" ? (
            <ul>
              <li>Athleisure</li>
              <li>Winter Accessories</li>
              <li>Premium quality</li>
              <li>Unisex collection</li>
              <li>Limited license</li>
              <li>Eco aware</li>
            </ul>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="right-side">
        <div className="options-component">
          <div className="sort"></div>
          <div className="display-info"></div>
        </div>
        {clothes && (
          <div className="items-display">
            {clothes.male.clothes
              .filter((cloth) => cloth.item === item)
              .map((cloth) => (
                <Card
                  key={cloth.id}
                  img={cloth.images[0].first}
                  secondImage={cloth.images[1].second}
                  name={cloth.name}
                  price={cloth.price}
                />
              ))}
          </div>
        )}
      </div>
    </ManClothesPageComponent>
  );
};

const ManClothesPageComponent = styled.div`
  width: 100%;
  min-height: 90vw;
  display: flex;

  .left-side {
    width: 20%;
    display: flex;
    align-items: center;
    flex-direction: column;
    ul {
      list-style: none;
      li {
        text-indent: 10px;
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
  }
  .right-side {
    width: 80%;
    .options-component {
      width: 100%;
      height: 4rem;
      display: flex;
      justify-content: Center;
      align-items: Center;
    }
    .items-display {
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

export default ManClothesPage;
