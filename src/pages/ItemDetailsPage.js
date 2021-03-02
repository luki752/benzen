import React, { useState, useEffect, useLayoutEffect } from "react";
//styling
import styled from "styled-components";
//motion
import { motion } from "framer-motion";
//material ui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
//axios
import axios from "axios";
//router
import { Link, useHistory } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadSpecificItem, loadAllItems } from "../actions/itemsAction";
import { loginAction } from "../actions/loginAction";
//router
import { useLocation } from "react-router-dom";
//icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import CloseIcon from "@material-ui/icons/Close";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import EditIcon from "@material-ui/icons/Edit";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

//components
import Card from "../components/Card";
import SmallImage from "../components/SmallImage";

const ItemDetailsPage = () => {
  //state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [itemsSize, setItemsSize] = useState("");
  const [proceedError, setProceedError] = useState(false);
  const [checkoutModalOpen, setCheckoutModal] = useState(false);
  const dots = [];
  //location, id
  const location = useLocation();
  const history = useHistory();
  const gender = location.pathname.split("/")[1];
  const pathId = parseInt(location.pathname.split("/")[2], 10);
  const adminPanel = location.pathname.split("/")[3];
  //window size
  const [size, setSize] = useState([0, 0]);
  const [mv, setMV] = useState(false);
  //edit items state
  const [editMode, setEditMode] = useState(false);
  const [itemsName, setItemsName] = useState("");
  const [itemsPrice, setItemsPrice] = useState("");
  const [itemsDiscount, setItemsDiscount] = useState("");
  const [itemsDescription, setItemsDescription] = useState("");
  const [itemsAmount, setItemsAmount] = useState("");
  const [editMsg, setEditMsg] = useState("");
  const appLink = `https://benzen-server.herokuapp.com`;
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

  //get data back
  const { item, isLoading, AllItems } = useSelector((state) => state.item);
  const { cart } = useSelector((state) => state.cart);
  const { user, isLogged } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(loadSpecificItem(gender, pathId));
    dispatch(loadAllItems(gender, "", item.item));
    dispatch(loginAction(localStorage.getItem("userId")));
  }, [dispatch, gender, pathId, item.item]);
  useEffect(() => {
    setItemsName(item.name);
    setItemsPrice(item.price);
    setItemsDiscount(item.discount ? true : false);
    setItemsDescription(item.desc);
    setItemsAmount(item.amount);
  }, [item]);
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
    if (itemsSize !== "") {
      setCheckoutModal(!checkoutModalOpen);
      setProceedError(false);
      item.cartAmount = 1;
      item.gender = gender;
      const found = cart.find((i) => i.id === item.id && i.size === itemsSize);
      item.size = itemsSize;
      if (found) {
        dispatch({
          type: "INCREASE",
          payload: {
            id: found.id,
            size: found.size,
            amount: found.cartAmount,
          },
        });
      } else {
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            item: { ...item, size: itemsSize },
          },
        });
      }
    } else {
      setProceedError(true);
    }
  };
  const discountHandler = (e) => {
    setItemsDiscount(e.target.value);
  };
  const changeItemHandler = () => {
    if (
      itemsName !== "" &&
      itemsPrice !== "" &&
      itemsDiscount !== "" &&
      itemsDescription !== ""
    ) {
      axios
        .put(`${appLink}/${gender}/${item.id}/`, {
          name: itemsName,
          beforeDiscount: itemsDiscount ? item.price : "",
          item: item.item,
          amount: itemsAmount,
          category: item.category,
          discount: parseFloat(itemsDiscount),
          price: parseFloat(itemsPrice),
          desc: itemsDescription,
          material: item.material,
          images: item.images,
          id: item.id,
        })
        .then((resp) => {
          dispatch(loadSpecificItem(gender, pathId));
          setEditMsg("success");
        })
        .catch((error) => {});
    } else {
      setEditMsg("Inputs cant be empty");
    }
  };
  const deleteItemHandler = () => {
    axios
      .delete(`${appLink}/${gender}/${item.id}/`)
      .then((resp) => {
        history.push(`/${gender}`);
      })
      .catch((error) => {});
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
                    <SmallImage
                      img={img}
                      index={index}
                      key={index}
                      setCurrentIndex={setCurrentIndex}
                      currentIndex={currentIndex}
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
              {isLogged && (
                <div
                  className="edit-button"
                  onClick={() => setEditMode(!editMode)}
                  style={{
                    display:
                      user.accessibility === "admin" ||
                      user.accessibility === "headAdmin"
                        ? "block"
                        : "none",
                  }}
                >
                  {editMode ? (
                    <span>
                      Stop editing <CloseIcon />
                    </span>
                  ) : (
                    <span>
                      Edit <EditIcon className="edit-icon" />
                    </span>
                  )}
                </div>
              )}
              <div className="info">
                {adminPanel && (
                  <Link to="/admin/panel/items" className="link">
                    <button className="button-black">
                      <ArrowLeftIcon />
                      Go back to admins panel
                    </button>
                  </Link>
                )}
                <span className="name">{item.name}</span>
                <span className="price">
                  {item.discount ? (
                    <>
                      <b
                        style={{
                          color: item.discount ? "tomato" : "black",
                        }}
                      >
                        {item.price} GBP
                      </b>
                      <p
                        style={{
                          color: "#b3b3b3",
                          textDecoration: "line-through",
                        }}
                      >
                        {item.beforeDiscount} GBP
                      </p>
                    </>
                  ) : (
                    item.price
                  )}{" "}
                </span>
                {proceedError && (
                  <span className="error">You need to choose size first</span>
                )}
                <div className="size">
                  <FormControl variant="outlined" className="select">
                    <InputLabel>Size</InputLabel>

                    {item.category === "shoes" || item.item === "shoes" ? (
                      <Select
                        value={itemsSize}
                        onChange={(e) => sizeHandler(e)}
                        label="Size"
                        error={proceedError ? true : false}
                      >
                        <MenuItem value="36">36</MenuItem>
                        <MenuItem value="37">37</MenuItem>
                        <MenuItem value="38">38</MenuItem>
                        <MenuItem value="39">39</MenuItem>
                        <MenuItem value="40">40</MenuItem>
                        <MenuItem value="41">41</MenuItem>
                        <MenuItem value="42">42</MenuItem>
                        <MenuItem value="43">43</MenuItem>
                        <MenuItem value="44">44</MenuItem>
                      </Select>
                    ) : (
                      <Select
                        value={itemsSize}
                        onChange={(e) => sizeHandler(e)}
                        label="Size"
                        error={proceedError ? true : false}
                      >
                        <MenuItem value="s">S</MenuItem>
                        <MenuItem value="m">M</MenuItem>
                        <MenuItem value="l">L</MenuItem>
                        <MenuItem value="xl">XL</MenuItem>
                        <MenuItem value="xxl">XXL</MenuItem>
                      </Select>
                    )}
                  </FormControl>
                </div>
                <button className="button-white" onClick={() => cartHandler()}>
                  <LocalMallIcon style={{ color: "white" }} />
                  Add to bag
                </button>
                {isLogged && (
                  <div
                    className="edit-item"
                    style={{
                      display:
                        (user.accessibility === "admin" && editMode) ||
                        (user.accessibility === "headAdmin" && editMode)
                          ? "flex"
                          : "none",
                    }}
                  >
                    <span>{editMsg}</span>
                    <span>
                      <TextField
                        label="Name"
                        value={itemsName}
                        className="input"
                        onChange={(e) => setItemsName(e.target.value)}
                      />
                    </span>
                    <span>
                      <TextField
                        label="amount"
                        value={itemsAmount}
                        className="input"
                        type="number"
                        onChange={(e) => setItemsAmount(e.target.value)}
                      />
                    </span>
                    <span>
                      <TextField
                        label="price"
                        value={itemsPrice}
                        className="input"
                        type="number"
                        onChange={(e) => setItemsPrice(e.target.value)}
                      />
                    </span>
                    <span>
                      <FormControl variant="outlined" className="select">
                        <InputLabel>Discount</InputLabel>
                        <Select
                          value={itemsDiscount}
                          onChange={(e) => discountHandler(e)}
                          label="discount"
                        >
                          <MenuItem value="true">true</MenuItem>
                          <MenuItem value="false">false</MenuItem>
                        </Select>
                      </FormControl>
                    </span>
                    <span>
                      <TextField
                        label="description"
                        value={itemsDescription}
                        multiline
                        className="input"
                        onChange={(e) => setItemsDescription(e.target.value)}
                      />
                    </span>
                    <button
                      className="button-black"
                      onClick={() => changeItemHandler()}
                    >
                      Save changes
                    </button>
                    <span
                      style={{ color: "tomato", fontWeight: "bold" }}
                      onClick={() => deleteItemHandler()}
                    >
                      DELETE ITEM
                    </span>
                  </div>
                )}
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
            {AllItems.slice(0, 9).map((item) => (
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
      {item && (
        <CheckoutModal
          onClick={() => setCheckoutModal(!checkoutModalOpen)}
          style={{ display: checkoutModalOpen ? "flex" : "none" }}
        >
          <div className="modal">
            <div className="header">
              <CheckBoxIcon
                className="success-icon"
                style={{ color: "green" }}
              />
              <span>Product was added to your shopping cart</span>
              <CloseIcon
                className="close-icon"
                onClick={() => setCheckoutModal(!checkoutModalOpen)}
              />
            </div>
            {item.images && <img src={item.images[0].img} alt={item.name} />}
            <span>
              Size: <b>{itemsSize}</b>
            </span>
            <span>{item.price} GBP</span>
            <div className="buttons">
              <Link
                to="/checkout/cart"
                className="link"
                onClick={() => window.scrollTo(0, 0)}
              >
                <button className="button-black">Go to your bag</button>
              </Link>

              <span onClick={() => setCheckoutModal(!checkoutModalOpen)}>
                Continue Shopping
              </span>
            </div>
          </div>
        </CheckoutModal>
      )}
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
      }
    }
    .right-side {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;
      .edit-item {
        display: flex;
        flex-direction: column;
        .input,
        .select {
          width: 15rem;
          margin: 0.5rem 0;
        }
      }
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
      .edit-button {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0 2rem;
        font-size: 1.5rem;
        &:hover {
          cursor: pointer;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        @media screen and (max-width: 1000px) {
          margin-top: 2rem;
          text-align: center;
        }
        .name {
          font-size: 1rem;
        }
        .price {
          font-size: 1.5rem;
          font-weight: bold;
          display: flex;
          p {
            padding-left: 10px;
          }
          @media screen and (max-width: 1000px) {
            justify-content: center;
          }
        }
        .error {
          color: Red;
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
  height: fit-content;
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
const CheckoutModal = styled(motion.div)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 160vh;
  top: 0;
  left: 0;
  .modal {
    margin-left: 35%;
    margin-top: 5%;
    background-color: white;
    width: 28rem;
    height: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media screen and (max-width: 1000px) {
      width: 100%;
      margin: 0;
    }
    .header {
      width: 100%;
      display: flex;
      align-items: Center;
      justify-content: center;
      .success-icon {
        font-size: 2rem;
        margin: 5px;
      }
      .close-icon {
        font-size: 2rem;
        margin: 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    img {
      height: 25rem;
      width: 20rem;
      margin: 1rem 0;
    }
    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      button {
        padding: 0.5rem;
        width: 20rem;
      }
      span {
        border-bottom: 1px solid black;
        font-weight: bold;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;
export default ItemDetailsPage;
