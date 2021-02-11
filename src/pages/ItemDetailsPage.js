import React, { useState, useEffect, useLayoutEffect } from "react";
//styling
import styled from "styled-components";
//material ui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadSpecificItem, loadAllItems } from "../actions/itemsAction";
//router
import { useLocation } from "react-router-dom";
//icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import CloseIcon from "@material-ui/icons/Close";
//notistack
import { useSnackbar } from "notistack";
//components
import Card from "../components/Card";

const ItemDetailsPage = () => {
  //state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [ItemsSize, setItemsSize] = useState("");
  const dots = [];
  //location, id
  const location = useLocation();
  const gender = location.pathname.split("/")[1];
  const pathId = parseInt(location.pathname.split("/")[2], 10);
  //window size
  const [size, setSize] = useState([0, 0]);
  const [mv, setMV] = useState(false);
  //getting window size
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
  }, [size, mv]);
  //dispatch data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSpecificItem(gender, pathId));
    dispatch(loadAllItems(gender));
  }, [dispatch, gender, pathId]);
  //get data back
  const { item, isLoading, AllItems } = useSelector((state) => state.item);
  //snack bar
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //handlers
  const snackbarHandler = (snackbarMessage, snackVariant) => {
    enqueueSnackbar(snackbarMessage, { variant: snackVariant });
    closeSnackbar(500);
  };
  //handlers
  const activeImageHandler = (list) => {
    for (let i = 0; i < list; i++) {
      dots.push(i);
    }
  };
  const sizeHandler = (e) => {
    setItemsSize(e.target.value);
  };
  const cartHandler = () => {
    snackbarHandler("Added to card", "success");
    item.size = ItemsSize;
    item.cartAmount = 1;
    item.gender = gender;
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        item: item,
      },
    });
  };
  return (
    <>
      {!isLoading && item && (
        <ItemDetailsPageComponent>
          <div className="top-side">
            <div className="left-side">
              {item.images && (
                <div className="images-show">
                  {item.images.map((img, index) => (
                    <img
                      src={img.img}
                      alt={index}
                      key={index}
                      onClick={(e) => setCurrentIndex(index)}
                      className={index === currentIndex ? "active-image" : ""}
                    />
                  ))}
                </div>
              )}
              {item.images && (
                <div
                  className="main-image"
                  style={{
                    backgroundImage: `url(${item.images[currentIndex].img})`,
                  }}
                  onClick={() => setModal(!modal)}
                >
                  <ArrowBackIosIcon
                    className="arrows"
                    onClick={(e) => {
                      e.stopPropagation();
                      currentIndex - 1 === -1
                        ? setCurrentIndex(item.images.length - 1)
                        : setCurrentIndex(
                            (currentIndex - 1) % item.images.length
                          );
                    }}
                  />
                  <ArrowForwardIosIcon
                    className="arrows"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex((currentIndex + 1) % item.images.length);
                    }}
                  />
                  <div
                    className="image-count"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {activeImageHandler(item.images.length)}
                    {dots.map((item, index) => (
                      <div
                        key={index}
                        className={
                          index === currentIndex ? "dot active-dot" : "dot"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex(index);
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="right-side">
              <div className="info">
                <span className="name">{item.name}</span>
                <span className="price">{item.price} GBP</span>

                <div className="size">
                  <FormControl variant="outlined" className="select">
                    <InputLabel>Size</InputLabel>
                    <Select
                      value={ItemsSize}
                      onChange={(e) => sizeHandler(e)}
                      label="Size"
                    >
                      <MenuItem value="s">S</MenuItem>
                      <MenuItem value="m">M</MenuItem>
                      <MenuItem value="l">L</MenuItem>
                      <MenuItem value="xl">XL</MenuItem>
                      <MenuItem value="xxl">XXL</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <button className="button-white" onClick={() => cartHandler()}>
                  <LocalMallIcon style={{ color: "white" }} />
                  Add to bag
                </button>
              </div>
            </div>
          </div>
          <div className="bottom-side">
            <div className="accordions">
              {item.desc && (
                <Accordion className="accordion" defaultExpanded={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    className="accordion-header"
                  >
                    Description
                  </AccordionSummary>
                  <AccordionDetails> - {item.desc}.</AccordionDetails>
                </Accordion>
              )}
              {/* second accordion */}
              {item.material && (
                <Accordion className="accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    className="accordion-header"
                  >
                    Material and care
                  </AccordionSummary>

                  <AccordionDetails>Fabric:</AccordionDetails>
                  {item.material.map((material) => (
                    <AccordionDetails key={material.fabric}>
                      <span>
                        {" "}
                        - {material.percentage}% {material.fabric}
                      </span>
                    </AccordionDetails>
                  ))}
                </Accordion>
              )}
              {/* third accordion */}
              <Accordion className="accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className="accordion-header"
                >
                  delivery and returns
                </AccordionSummary>
                <AccordionDetails style={{ fontWeight: "bold" }}>
                  Shipping Policy:
                </AccordionDetails>
                <AccordionDetails className="shipping-details">
                  <div>Free delivery on all orders of £30 or more</div>
                  <div>Standard delivery: 3-9 working days, 3.90GBP</div>
                  <div>Pick up in store: 3-9 working days, free of charge</div>
                  <div>
                    Due to the current epidemiological situation, the delivery
                    time may be extended.
                  </div>
                </AccordionDetails>
                <AccordionDetails style={{ fontWeight: "bold" }}>
                  Returns Policy:
                </AccordionDetails>
                <AccordionDetails className="shipping-details">
                  <div>
                    If products are not what you expected you may return them
                    within 30 days of delivery.
                  </div>
                  <div>
                    - to our online store - fill in the online return form and
                    send the products back to us.
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <FullImageModal style={{ display: modal ? "flex" : "none" }}>
            <CloseIcon
              className="close-modal"
              onClick={() => setModal(!modal)}
            />
            <ArrowBackIosIcon
              className="arrows left-arrow"
              onClick={() =>
                currentIndex - 1 === -1
                  ? setCurrentIndex(item.images.length - 1)
                  : setCurrentIndex((currentIndex - 1) % item.images.length)
              }
            />
            {item.images && (
              <img src={item.images[currentIndex].img} alt={item.name} />
            )}
            <ArrowForwardIosIcon
              className="arrows right-arrow"
              onClick={() =>
                setCurrentIndex((currentIndex + 1) % item.images.length)
              }
            />
          </FullImageModal>
          <h1>Recommended</h1>
        </ItemDetailsPageComponent>
      )}
      <SimilarItems>
        {AllItems && (
          <>
            {AllItems.filter((similar) => similar.item === item.item)
              .filter((similar) => similar.id !== item.id)
              .slice(0, 9)
              .map((item) => (
                <div className="card" key={item.id}>
                  <Card
                    key={item.id}
                    height={mv ? "30rem" : "20rem"}
                    width={mv ? "20rem" : "10rem"}
                    id={item.id}
                    gender={gender}
                    category={item.category}
                    item={item}
                  />
                </div>
              ))}
          </>
        )}
      </SimilarItems>
    </>
  );
};

const ItemDetailsPageComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 70vh;
  margin: 1rem 0;
  h1 {
    margin-left: 10%;
    margin-top: 2rem;
    @media screen and (max-width: 1000px) {
      margin-left: 0rem;
      font-size: 1.5rem;
    }
  }
  .top-side {
    width: 100%;
    display: flex;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
    }
    .left-side {
      width: 50%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      @media screen and (max-width: 1000px) {
        width: 100%;
        justify-content: center;
      }
      .main-image {
        height: 70vh;
        width: 60vh;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        @media screen and (max-width: 1000px) {
          pointer-events: none;
        }
        &:hover {
          cursor: zoom-in;
        }
        .arrows {
          font-size: 2rem;
          margin: 1.5rem;
          @media screen and (max-width: 1000px) {
            pointer-events: auto;
          }
          &:hover {
            cursor: pointer;
          }
        }
        .image-count {
          position: absolute;
          bottom: 0;
          width: 100%;
          left: 50%;
          margin-left: -50%;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 2rem;
          font-size: 1.5rem;
          z-index: 10;
          display: none;
          @media screen and (max-width: 1000px) {
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: auto;
          }
          .dot {
            margin: 5px;
            height: 20px;
            width: 20px;
            padding: 5px;
            border-radius: 20px;
            background-color: rgba(0, 0, 0, 0.8);
            transition: 0.3s ease-in all;
          }
          .active-dot {
            width: 40px;
          }
        }
      }
      .images-show {
        height: 70vh;
        width: 15vh;
        overflow: auto;
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: white;
        }
        ::-webkit-scrollbar-thumb {
          background: black;
        }
        @media screen and (max-width: 1000px) {
          display: none;
        }
        img {
          height: 18vh;
          width: 100%;
          margin-bottom: 10px;
          &:hover {
            cursor: pointer;
          }
        }
        .active-image {
          filter: grayscale(100%);
          border-bottom: 2px solid black;
        }
      }
    }
    .right-side {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
      .info {
        display: flex;
        flex-direction: column;
        .name {
          font-size: 1rem;
        }
        .price {
          font-size: 1.5rem;
          font-weight: bold;
        }
        button {
          width: 20rem;
          background-color: black;
          color: white;
          margin: 1rem 0;
          @media screen and (max-width: 1000px) {
            font-size: 1rem;
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.8);
          }
        }
      }
      .size {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        span {
          margin: 1rem 0;
          color: rgba(0, 0, 0, 0.6);
        }
        .select {
          width: 20rem;
          height: 3rem;
          margin: 1rem 0rem;
          text-transform: upperCase;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
  .bottom-side {
    width: 100%;
    .accordions {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-top: 1rem;
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
      .accordion {
        width: 60vh;
        @media screen and (max-width: 1000px) {
          width: 100%;
        }
        span {
          text-transform: uppercase;
          color: black;
        }
        .accordion-header {
          font-weight: bold;
          text-transform: uppercase;
        }
        .shipping-details {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
`;
const FullImageModal = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  img {
    width: 80%;
    z-index: 4;
  }
  .close-modal {
    position: fixed;
    right: 0;
    top: 0;
    margin: 1rem;
    font-size: 2rem;
    font-size: 3rem;
    &:hover {
      cursor: pointer;
    }
  }
  .arrows {
    position: fixed;
    margin-top: 25%;
    font-size: 3rem;
    &:hover {
      cursor: pointer;
    }
  }
  .left-arrow {
    left: 0;
    margin-left: 2rem;
  }
  .right-arrow {
    right: 0;
    margin-right: 2rem;
  }
`;
const SimilarItems = styled.div`
  width: 90%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  margin-left: 10%;
  @media screen and (max-width: 1000px) {
    margin-left: 0rem;
    width: 100%;
  }
  .card {
    width: 21rem;
    flex: 0 0 auto;
    margin: 1.5rem 0;
    border: none;
    @media screen and (max-width: 1000px) {
      margin: 0.5rem 0;
      width: 11rem;
    }
  }
  ::-webkit-scrollbar {
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.6);
  }
`;
export default ItemDetailsPage;
