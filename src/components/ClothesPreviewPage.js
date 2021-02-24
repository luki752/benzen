import React, { useEffect, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadItems, loadAllItems } from "../actions/itemsAction";
import { loginAction } from "../actions/loginAction";
import {
  getScrollPosition,
  setPreviousPage,
  setGoBack,
} from "../actions/scrollAction";
//styling
import styled from "styled-components";
//router
import { useLocation } from "react-router-dom";
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
import WomanLinksComponent from "../components/WomanLinksComponent";
import ManLinksComponent from "../components/ManLinksComponent";
//scroll bottom
import { BottomScrollListener } from "react-bottom-scroll-listener";

const ClothesPreviewPage = ({ gender }) => {
  //state
  const [scrollPosition, setScrollPosition] = useState(0);
  const [smallView, setSmallView] = useState(false);
  const [sort, setSort] = useState("");
  const [limit, setLimit] = useState(20);
  const location = useLocation();
  const item = location.pathname.split("/")[3];
  const subItem = location.pathname.split("/")[4];
  const category = location.pathname.split("/")[2];
  //card height and width
  const [cardLgWidth, setCardLgWidth] = useState("24%");
  const [cardLgHeight, setCardLgHeight] = useState("32rem");
  const [cardSmWidth, setCardSmWidth] = useState("48%");
  const [cardSmHeight, setCardSmHeight] = useState("20rem");
  //dispatch data
  const dispatch = useDispatch();
  //dispatching
  useEffect(() => {
    dispatch(
      loadItems(gender, category, subItem ? subItem : item, sort, limit)
    );
    dispatch(loginAction(localStorage.getItem("userId")));
    dispatch(loadAllItems(gender, "", subItem ? subItem : item));
  }, [dispatch, gender, category, item, sort, subItem, limit]);
  //getting scroll position
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //dispatching
  useEffect(() => {
    dispatch(getScrollPosition(scrollPosition));
  }, [scrollPosition, dispatch]);

  useEffect(() => {
    dispatch(setPreviousPage(location.pathname));
    dispatch(setGoBack(true));
  }, [dispatch, location.pathname]);
  //get data back
  const { items, isLoading, AllItems } = useSelector((state) => state.item);
  //handlers
  const handleSort = (event) => {
    setSort(event.target.value);
  };
  const handleLimit = () => {
    setLimit(limit + 20);
  };
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  return (
    <>
      {!isLoading && (
        <ClothesPreviewPageComponent>
          <BottomScrollListener onBottom={handleLimit} offset={700} />
          <div className="left-side">
            {gender === "woman" && <WomanLinksComponent gender={gender} />}
            {gender === "man" && <ManLinksComponent gender={gender} />}
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
                {AllItems.length}{" "}
                {AllItems.length === 1 ? "Product" : "Products"}
                <ViewComfyIcon
                  className={smallView ? "view-icon" : "view-icon active-icon"}
                  onClick={() => {
                    setCardSmWidth("48%");
                    setCardLgWidth("24%");
                    setCardLgHeight("30rem");
                    setCardSmHeight("20rem");
                    setSmallView(false);
                  }}
                />
                <ViewColumnIcon
                  className={smallView ? "view-icon active-icon" : "view-icon"}
                  onClick={() => {
                    setCardLgWidth("32%");
                    setCardSmWidth("90%");
                    setCardLgHeight("40rem");
                    setCardSmHeight("24rem");
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
                  lgHeight={cardLgHeight}
                  smHeight={cardSmHeight}
                  lgWidth={cardLgWidth}
                  smWidth={cardSmWidth}
                  lgMargin={"1.5rem 0.3rem"}
                  smMargin={"1rem 0.2rem"}
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
  }
  .right-side {
    width: 80%;
    margin-left: 23rem;
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
