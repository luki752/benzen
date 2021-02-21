import React, { useEffect, useState, useLayoutEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadItems, loadAllItems } from "../actions/itemsAction";
import { loginAction } from "../actions/loginAction";
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
//scroll bottom
import { BottomScrollListener } from "react-bottom-scroll-listener";

const ClothesPreviewPage = ({ gender }) => {
  //state
  const [smallView, setSmallView] = useState(false);
  const [sort, setSort] = useState("");
  const [size, setSize] = useState([0, 0]);
  const [mv, setMV] = useState(false);
  const [cardWidth, setCardWidth] = useState();
  const [cardHeight, setCardHeight] = useState();
  const [limit, setLimit] = useState(20);
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
    setCardWidth(mv ? "24%" : "48%");
    setCardHeight(mv ? "30rem" : "20rem");
  }, [size, mv]);
  //dispatch data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      loadItems(gender, category, subItem ? subItem : item, sort, limit)
    );
    dispatch(loginAction(localStorage.getItem("userId")));
    dispatch(loadAllItems(gender));
  }, [dispatch, gender, category, item, sort, subItem, limit]);
  //get data back
  const { items, isLoading, AllItems } = useSelector((state) => state.item);
  //handlers
  const handleSort = (event) => {
    setSort(event.target.value);
  };
  const handleLimit = () => {
    setLimit(limit + 20);
  };
  return (
    <>
      {!isLoading && (
        <ClothesPreviewPageComponent>
          <BottomScrollListener onBottom={handleLimit} offset={700} />
          <div className="left-side">
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
                  <Link
                    to={`/${gender}/clothes/outerwear/coats`}
                    className="link"
                  >
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
                      {gender === "woman" && (
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
                      )}
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
                  {gender === "woman" && (
                    <Link to={`/${gender}/clothes/dresses`} className="link">
                      <li className={item === "dresses" ? "active-list" : ""}>
                        Dresses
                      </li>
                    </Link>
                  )}
                  {gender === "woman" && (
                    <Link to={`/${gender}/clothes/skirts`} className="link">
                      <li className={item === "skirts" ? "active-list" : ""}>
                        Skirts
                      </li>
                    </Link>
                  )}
                  {gender === "woman" && (
                    <Link to={`/${gender}/clothes/blouses`} className="link">
                      <li className={item === "blouses" ? "active-list" : ""}>
                        Blouses
                      </li>
                    </Link>
                  )}
                  <Link to={`/${gender}/clothes/shirts`} className="link">
                    <li className={item === "shirts" ? "active-list" : ""}>
                      Shirts
                    </li>
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
                  {gender === "man" && (
                    <Link to={`/${gender}/clothes/polos`} className="link">
                      <li className={item === "polos" ? "active-list" : ""}>
                        Polo shirts
                      </li>
                    </Link>
                  )}
                  <Link to={`/${gender}/clothes/t-shirts`} className="link">
                    <li className={item === "t-shirts" ? "active-list" : ""}>
                      T-shirts
                    </li>
                  </Link>
                  <Link to={`/${gender}/clothes/jeans`} className="link">
                    <li className={item === "jeans" ? "active-list" : ""}>
                      Jeans
                    </li>
                  </Link>
                  <Link to={`/${gender}/clothes/blazers`} className="link">
                    <li className={item === "blazers" ? "active-list" : ""}>
                      Blazers
                    </li>
                  </Link>
                  {gender === "man" && (
                    <Link to={`/${gender}/clothes/suits`} className="link">
                      <li className={item === "suits" ? "active-list" : ""}>
                        Suits
                      </li>
                    </Link>
                  )}
                  <Link to={`/${gender}/clothes/nightwear`} className="link">
                    <li className={item === "nightwear" ? "active-list" : ""}>
                      Nightwear
                    </li>
                  </Link>
                  {gender === "man" && (
                    <Link to={`/${gender}/clothes/underwear`} className="link">
                      <li className={item === "underwear" ? "active-list" : ""}>
                        Underwear
                      </li>
                    </Link>
                  )}
                  {gender === "woman" && (
                    <Link to={`/${gender}/clothes/lingerie`} className="link">
                      <li className={item === "lingerie" ? "active-list" : ""}>
                        Lingerie
                      </li>
                    </Link>
                  )}
                </ul>
              ) : (
                ""
              )}
              <Link to={`/${gender}/accessories/bags`} className="link">
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
                  <Link to={`/${gender}/accessories/bags`} className="link">
                    <li className={item === "bags" ? "active-list" : ""}>
                      Bags, toiletry bags
                    </li>
                  </Link>
                  {gender === "man" && (
                    <Link to={`/${gender}/accessories/shoes`} className="link">
                      <li className={item === "shoes" ? "active-list" : ""}>
                        Shoes
                      </li>
                    </Link>
                  )}
                  <Link to={`/${gender}/accessories/hats`} className="link">
                    <li className={item === "hats" ? "active-list" : ""}>
                      Hats
                    </li>
                  </Link>
                  <Link to={`/${gender}/accessories/scarves`} className="link">
                    <li className={item === "scarves" ? "active-list" : ""}>
                      scarves
                    </li>
                  </Link>
                  <Link to={`/${gender}/accessories/gloves`} className="link">
                    <li className={item === "gloves" ? "active-list" : ""}>
                      gloves
                    </li>
                  </Link>
                  {gender === "man" && (
                    <Link to={`/${gender}/accessories/socks`} className="link">
                      <li className={item === "socks" ? "active-list" : ""}>
                        Socks
                      </li>
                    </Link>
                  )}
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
                    <li className={item === "boots" ? "active-list" : ""}>
                      Boots
                    </li>
                  </Link>
                  <Link to="/woman/shoes/heels" className="link">
                    <li className={item === "heels" ? "active-list" : ""}>
                      Heels
                    </li>
                  </Link>
                  <Link to="/woman/shoes/flats" className="link">
                    <li className={item === "flats" ? "active-list" : ""}>
                      Flats
                    </li>
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
          </div>
          <div className="right-side">
            <div className="items-name">
              <span>{subItem ? subItem : item}</span>
            </div>
            <div className="options-component">
              <div className="sort">
                <FormControl>
                  <InputLabel className="sort-label">Sort price </InputLabel>
                  <Select
                    value={sort}
                    onChange={handleSort}
                    className="sort-select"
                  >
                    <MenuItem value="asc">Sort price low to high</MenuItem>
                    <MenuItem value="desc">Sort price high to low</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="display-info">
                {
                  AllItems.filter((specificItem) => specificItem.item === item)
                    .length
                }{" "}
                {AllItems.filter((specificItem) => specificItem.item === item)
                  .length === 1
                  ? "Product"
                  : "Products"}
                <ViewComfyIcon
                  className={smallView ? "view-icon" : "view-icon active-icon"}
                  onClick={() => {
                    setCardWidth(mv ? "24%" : "48%");
                    setCardHeight(mv ? "30rem" : "20rem");
                    setSmallView(false);
                  }}
                />
                <ViewColumnIcon
                  className={smallView ? "view-icon active-icon" : "view-icon"}
                  onClick={() => {
                    setCardWidth(mv ? "32%" : "90%");
                    setCardHeight(mv ? "40rem" : "24rem");
                    setSmallView(true);
                  }}
                />
              </div>
            </div>
            <div className="items-display">
              {items.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  id={item.id}
                  height={cardHeight}
                  width={cardWidth}
                  margin={mv ? "1.5rem 0.3rem" : "1rem 0.2rem"}
                  gender={gender}
                />
              ))}
            </div>
          </div>
        </ClothesPreviewPageComponent>
      )}
    </>
  );
};

const ClothesPreviewPageComponent = styled.div`
  width: 100%;
  min-height: 90vw;
  display: flex;
  margin-top: 2rem;

  .left-side {
    position: fixed;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 2rem;
    @media screen and (max-width: 1000px) {
      display: none;
    }
    ul {
      list-style: none;
      .link {
        font-size: 0.9rem;
      }
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
  }
  .right-side {
    width: 80%;
    margin-left: 20rem;
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

export default ClothesPreviewPage;
