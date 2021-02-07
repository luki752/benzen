import React, { useState, useEffect } from "react";
//styling
import styled from "styled-components";
//material ui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadItems } from "../actions/itemsAction";
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

const ItemDetailsPage = () => {
  //state
  const [item, setItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modal, setModal] = useState(false);
  //location, id
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const gender = location.pathname.split("/")[1];
  const pathId = parseInt(location.pathname.split("/")[3], 10);
  //dispatch data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadItems(gender));
  }, [dispatch, gender]);
  //get data back
  const { items, isLoading } = useSelector((state) => state.items);
  useEffect(() => {
    if (!isLoading) {
      if (category === "clothes") {
        setItem(items.clothes.filter((cloth) => cloth.id === pathId));
      } else if (category === "accessories") {
        setItem(items.accessories.filter((cloth) => cloth.id === pathId));
      } else if (category === "shoes") {
        setItem(items.shoes.filter((cloth) => cloth.id === pathId));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  //snack bar
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //handlers
  const snackbarHandler = (snackbarMessage, snackVariant) => {
    enqueueSnackbar(snackbarMessage, { variant: snackVariant });
    closeSnackbar(500);
  };
  return (
    <>
      {item && (
        <ItemDetailsPageComponent>
          <div className="top-side">
            <div className="left-side">
              <div className="images-show">
                {item[0].images.map((img, index) => (
                  <img
                    src={img.img}
                    alt={index}
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={index === currentIndex ? "active-image" : ""}
                  />
                ))}
              </div>
              <div
                className="main-image"
                style={{
                  backgroundImage: `url(${item[0].images[currentIndex].img})`,
                }}
                onClick={() => setModal(!modal)}
              >
                <ArrowBackIosIcon
                  className="arrows"
                  onClick={(e) => {
                    e.stopPropagation();
                    currentIndex - 1 === -1
                      ? setCurrentIndex(item[0].images.length - 1)
                      : setCurrentIndex(
                          (currentIndex - 1) % item[0].images.length
                        );
                  }}
                />
                <ArrowForwardIosIcon
                  className="arrows"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((currentIndex + 1) % item[0].images.length);
                  }}
                />
                <div className="image-count">
                  {currentIndex + 1}/{item[0].images.length}
                </div>
              </div>
            </div>

            <div className="right-side">
              <div className="info">
                <span className="name">{item[0].name}</span>
                <span className="price">{item[0].price} GBP</span>

                <div className="size">
                  <span>Size</span>
                  <select name="" id="">
                    <option value="s" className="option">
                      S
                    </option>
                    <option value="m" className="option">
                      M
                    </option>
                    <option value="l" className="option">
                      L
                    </option>
                    <option value="xl" className="option">
                      XL
                    </option>
                    <option value="xll" className="option">
                      XLL
                    </option>
                  </select>
                </div>
                <button
                  onClick={() => snackbarHandler("Added to card", "success")}
                >
                  <LocalMallIcon style={{ color: "white" }} />
                  Add to bag
                </button>
              </div>
            </div>
          </div>
          <div className="bottom-side">
            <div className="accordions">
              <Accordion className="accordion" defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className="accordion-header"
                >
                  Description
                </AccordionSummary>
                <AccordionDetails> - {item[0].desc}.</AccordionDetails>
              </Accordion>
              {/* second accordion */}
              <Accordion className="accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className="accordion-header"
                >
                  Material and care
                </AccordionSummary>
                <AccordionDetails>Fabric:</AccordionDetails>
                {item[0].material.map((material) => (
                  <AccordionDetails key={material.fabric}>
                    <span>
                      {" "}
                      - {material.percentage}% {material.fabric}
                    </span>
                  </AccordionDetails>
                ))}
              </Accordion>
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
                  ? setCurrentIndex(item[0].images.length - 1)
                  : setCurrentIndex((currentIndex - 1) % item[0].images.length)
              }
            />
            <img src={item[0].images[currentIndex].img} alt={item[0].name} />

            <ArrowForwardIosIcon
              className="arrows right-arrow"
              onClick={() =>
                setCurrentIndex((currentIndex + 1) % item[0].images.length)
              }
            />
          </FullImageModal>
        </ItemDetailsPageComponent>
      )}
    </>
  );
};

const ItemDetailsPageComponent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  margin: 1rem 0;
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
          color: black;
          bottom: 0;
          left: 58%;
          margin-left: -50px;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 2rem;
          font-size: 1.5rem;
          z-index: 10;
          display: none;
          @media screen and (max-width: 1000px) {
            display: block;
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
        select {
          width: 20rem;
          height: 3rem;
          padding: 0.5rem;
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
export default ItemDetailsPage;
