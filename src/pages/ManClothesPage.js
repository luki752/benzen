import React, { useEffect, useState, useLayoutEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadClothes } from "../actions/clothesAction";
//styling
import styled from "styled-components";
//router
import { Link, useLocation } from "react-router-dom";
//material ui
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//icons
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
//components
import Card from "../components/Card";

const ManClothesPage = () => {
  //state
  const [smallView, setSmallView] = useState(true);
  const [sort, setSort] = useState("");
  const [size, setSize] = useState([0, 0]);
  const [mv, setMV] = useState(false);
  const [cardWidth, setCardWidth] = useState(mv ? "33%" : "50%");
  const [cardHeight, setCardHeight] = useState(mv ? "70vh" : "50vh");

  const location = useLocation();
  const item = location.pathname.split("/")[3];
  const subItem = location.pathname.split("/")[4];
  const category = location.pathname.split("/")[2];
  //useEffects
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  useEffect(() => {
    setMV(window.matchMedia("(min-width: 1000px)").matches);
  }, [size]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadClothes());
  }, [dispatch]);

  const { clothes, isLoading } = useSelector((state) => state.clothes);
  //handlers
  const handleSort = (event) => {
    setSort(event.target.value);
  };
  return (
    <>
      {!isLoading && (
        <ManClothesPageComponent>
          <div className="left-side">
            <ul>
              <Link to="/man/clothes/outerwear/coats" className="link">
                <li
                  className={
                    category === "clothes" ? "category active-list" : "category"
                  }
                >
                  Clothes
                </li>
              </Link>
              <Link to="/man/clothes/outerwear/coats" className="link">
                <li className={item === "outerwear" ? "active-list" : ""}>
                  Coats, jackets, puffer jackets
                </li>
              </Link>
              {item === "outerwear" ? (
                <ul>
                  <Link to="/man/clothes/outerwear/coats" className="link">
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
                  <Link to="/man/clothes/outerwear/jackets" className="link">
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
                    to="/man/clothes/outerwear/puffer-jackets"
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
                  <Link to="/man/clothes/outerwear/vests" className="link">
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
                <li className={item === "shirts" ? "active-list" : ""}>
                  Shirts
                </li>
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
                <li className={item === "blazers" ? "active-list" : ""}>
                  Blazers
                </li>
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
              <Link to="/man/accessories/shoes" className="link">
                <li
                  className={
                    category === "accessories"
                      ? "category active-list"
                      : "category"
                  }
                >
                  Accessories
                </li>
              </Link>
              {category === "accessories" ? (
                <ul>
                  <Link to="/man/accessories/shoes" className="link">
                    <li className={item === "shoes" ? "active-list" : ""}>
                      Shoes
                    </li>
                  </Link>
                  <Link to="/man/accessories/bags" className="link">
                    <li className={item === "bags" ? "active-list" : ""}>
                      Bags, toiletry bags
                    </li>
                  </Link>
                  <Link to="/man/accessories/hats" className="link">
                    <li className={item === "hats" ? "active-list" : ""}>
                      Hats
                    </li>
                  </Link>
                  <Link to="/man/accessories/scarves" className="link">
                    <li className={item === "scarves" ? "active-list" : ""}>
                      scarves
                    </li>
                  </Link>
                  <Link to="/man/accessories/gloves" className="link">
                    <li className={item === "gloves" ? "active-list" : ""}>
                      gloves
                    </li>
                  </Link>
                  <Link to="/man/accessories/socks" className="link">
                    <li className={item === "socks" ? "active-list" : ""}>
                      Socks
                    </li>
                  </Link>
                </ul>
              ) : (
                ""
              )}
            </ul>
          </div>
          <div className="right-side">
            <div className="items-name">
              <span>{subItem ? subItem : item}</span>
            </div>
            <div className="options-component">
              <div className="sort">
                <FormControl>
                  <InputLabel className="sort-label">Sort price by</InputLabel>
                  <Select
                    value={sort}
                    onChange={handleSort}
                    className="sort-select"
                  >
                    <MenuItem value="asc">ASC</MenuItem>
                    <MenuItem value="desc">DESC</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="display-info">
                {category === "clothes" ? (
                  <span>
                    {
                      clothes.male.clothes.filter((cloth) =>
                        subItem ? cloth.item === subItem : cloth.item === item
                      ).length
                    }{" "}
                    Products
                  </span>
                ) : (
                  <span>
                    {
                      clothes.male.accessories.filter((cloth) =>
                        subItem ? cloth.item === subItem : cloth.item === item
                      ).length
                    }{" "}
                    Products
                  </span>
                )}
                <ViewComfyIcon
                  className={smallView ? "view-icon" : "view-icon active-icon"}
                  onClick={() => {
                    setCardWidth(mv ? "33%" : "50%");
                    setCardHeight(mv ? "70vh" : "50vh");
                    setSmallView(!smallView);
                  }}
                />
                <ViewColumnIcon
                  className={smallView ? "view-icon active-icon" : "view-icon"}
                  onClick={() => {
                    setCardWidth(mv ? "50%" : "90%");
                    setCardHeight(mv ? "90vh" : "70vh");
                    setSmallView(!smallView);
                  }}
                />
              </div>
            </div>
            <div className="items-display">
              {category === "clothes" ? (
                <>
                  {clothes.male.clothes
                    .filter((cloth) =>
                      subItem ? cloth.item === subItem : cloth.item === item
                    )
                    .sort(function (a, b) {
                      if (sort === "asc") {
                        return a.price - b.price;
                      } else if (sort === "desc") {
                        return b.price - a.price;
                      } else {
                        return "";
                      }
                    })
                    .map((cloth) => (
                      <Card
                        key={cloth.id}
                        img={cloth.images[0].first}
                        secondImage={cloth.images[1].second}
                        name={cloth.name}
                        price={cloth.price}
                        hasDiscount={cloth.discount ? true : false}
                        beforeDiscount={cloth.beforeDiscount}
                        height={cardHeight}
                        width={cardWidth}
                        margin="1.5rem 0"
                      />
                    ))}
                </>
              ) : (
                <>
                  {clothes.male.accessories
                    .filter((cloth) =>
                      subItem ? cloth.item === subItem : cloth.item === item
                    )
                    .sort(function (a, b) {
                      if (sort === "asc") {
                        return a.price - b.price;
                      } else if (sort === "desc") {
                        return b.price - a.price;
                      } else {
                        return "";
                      }
                    })
                    .map((cloth) => (
                      <Card
                        key={cloth.id}
                        img={cloth.images[0].first}
                        secondImage={cloth.images[1].second}
                        name={cloth.name}
                        price={cloth.price}
                        hasDiscount={cloth.discount ? true : false}
                        beforeDiscount={cloth.beforeDiscount}
                        height={cardHeight}
                        width={cardWidth}
                        margin="1.5rem 0"
                      />
                    ))}
                </>
              )}
            </div>
          </div>
        </ManClothesPageComponent>
      )}
    </>
  );
};

const ManClothesPageComponent = styled.div`
  width: 100%;
  min-height: 90vw;
  display: flex;

  .left-side {
    width: 20%;
    position: fixed;
    display: flex;
    align-items: center;
    flex-direction: column;
    @media screen and (max-width: 1000px) {
      display: none;
    }
    ul {
      list-style: none;
      li {
        text-indent: 10px;
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
  }
  .right-side {
    width: 80%;
    margin-left: 25rem;
    @media screen and (max-width: 1000px) {
      margin: 0;
      width: 100%;
    }
    .items-name {
      font-weight: Bold;
      letter-spacing: 2px;
      @media screen and (max-width: 1000px) {
        text-align: Center;
      }
    }
    .options-component {
      width: 100%;
      height: 4rem;
      display: flex;
      justify-content: space-between;
      align-items: Center;
      .sort {
        .sort-label {
          text-transform: upperCase;
          @media screen and (max-width: 1000px) {
            font-size: 0.6rem;
          }
        }
        .sort-select {
          width: 10rem;
          @media screen and (max-width: 1000px) {
            width: 6rem;
            margin-left: 10px;
          }
        }
      }
      .display-info {
        padding: 0rem 2rem;
        .view-icon {
          margin: 0rem 1rem;
          font-size: 1.5rem;
          @media screen and (max-width: 1000px) {
            margin: 0rem 0.5rem;
          }
        }
        .active-icon {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 1rem;
        }
      }
    }
    .items-display {
      display: flex;
      flex-wrap: wrap;
      @media screen and (max-width: 1000px) {
        justify-content: center;
      }
    }
  }
`;

export default ManClothesPage;
