import React, { useState, useEffect } from "react";
//styling
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
//actions
import { changeCartPrice, setDiscount } from "../actions/cartActions";
import { loginAction } from "../actions/loginAction";
import { loadUsersOrders } from "../actions/ordersAction";
//redux
import { useDispatch, useSelector } from "react-redux";
//material ui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import TextField from "@material-ui/core/TextField";
//icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CloseIcon from "@material-ui/icons/Close";
const CartPage = () => {
  const [discountInput, setDiscountInput] = useState("");
  const [discountErrorMsg, setDiscountErrorMsg] = useState("");
  const [discountError, setDiscountError] = useState(false);
  const [discountBanner, setDiscountBanner] = useState(true);
  const [PriceBeforeDiscounts, setPriceBeforeDiscounts] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction());
  }, [dispatch]);
  const { cart, cartPrice, discount } = useSelector((state) => state.cart);
  const { user, isLogged } = useSelector((state) => state.login);
  useEffect(() => {
    if (isLogged) {
      dispatch(loadUsersOrders(user.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const { userOrders } = useSelector((state) => state.orders);
  useEffect(() => {
    if (cart) {
      if (cart.length === 1) {
        dispatch(changeCartPrice(cart[0].price * cart[0].cartAmount));
      } else if (cart.length > 1) {
        dispatch(
          changeCartPrice(
            cart.reduce(function (a, s) {
              return (a += s.price * s.cartAmount);
            }, 0)
          )
        );
      } else {
        return;
      }
    }
  }, [cart, discount, dispatch]);
  useEffect(() => {
    setPriceBeforeDiscounts(
      cart.reduce(function (a, b) {
        return b.discount
          ? (a += b.beforeDiscount * b.cartAmount)
          : (a += b.price * b.cartAmount);
      }, 0)
    );
  }, [cart]);
  useEffect(() => {
    if (discount) {
      cart.forEach((item) =>
        !item.discount
          ? dispatch({
              type: "CHANGE_PRICE",
              payload: { id: item.id, size: item.size },
            })
          : ""
      );
    }
  }, [cart, discount, dispatch]);
  //handlers
  const amountHandler = (type, id, amount, size) => {
    dispatch({
      type: type,
      payload: {
        id: id,
        amount: amount,
        size: size,
      },
    });
  };
  const removeHandler = (id, size) => {
    dispatch({
      type: "REMOVE",
      payload: {
        id: id,
        size: size,
      },
    });
  };
  const discountHandler = () => {
    if (!discount) {
      if (discountInput === "DISCOUNT10" || discountInput === "discount10") {
        if (isLogged) {
          if (userOrders.length === 0) {
            cart.forEach((item) =>
              !item.discount
                ? dispatch({ type: "CHANGE_PRICE", payload: { id: item.id } })
                : ""
            );
            setDiscountError(false);
            dispatch(setDiscount(true));
          } else {
            setDiscountErrorMsg(`this coupon code was only for first order`);
            setDiscountError(true);
          }
        } else {
          setDiscountErrorMsg(`this coupon code works only for logged users`);
          setDiscountError(true);
        }
      } else {
        setDiscountErrorMsg(`coupon code ${discountInput} is not valid`);
        setDiscountError(true);
      }
    }
  };
  return (
    <CartPageComponent>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>continue shopping</p>
          <div className="buttons">
            <Link to="/woman">
              <button className="button-white">Women</button>
            </Link>
            <Link to="/man">
              <button className="button-white">Men</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {cart && (
            <div className="cart-with-items">
              {isLogged && discountBanner && (
                <div
                  className="discount-banner"
                  style={{
                    display: userOrders.length === 0 ? "flex" : "none",
                  }}
                >
                  <span>
                    enter a discount code "DISCOUNT10" and get 10% off your
                    first order
                  </span>
                  <p>doesn't work with other discounts</p>
                  <CloseIcon
                    className="close-banner-icon"
                    onClick={() => setDiscountBanner(!discountBanner)}
                  />
                </div>
              )}
              <div className="cart-view">
                <div className="itemsDisplay">
                  {cart.map((item, index) => (
                    <div className="item" key={item.id + index}>
                      <div className="item-info">
                        <Link to={`/${item.gender}/${item.id}`}>
                          <div className="image">
                            <img src={item.images[0].img} alt={item.name} />
                          </div>
                        </Link>
                        <div className="info">
                          <div className="info-details">
                            <h2>{item.name}</h2>
                            <span>
                              Size: <b>{item.size}</b>
                            </span>
                          </div>
                          <div className="amount">
                            <b
                              className="amount-change"
                              onClick={() =>
                                amountHandler(
                                  "DECREASE",
                                  item.id,
                                  item.cartAmount,
                                  item.size
                                )
                              }
                            >
                              -
                            </b>{" "}
                            {item.cartAmount}{" "}
                            <b
                              className="amount-change"
                              onClick={() =>
                                amountHandler(
                                  "INCREASE",
                                  item.id,
                                  item.cartAmount,
                                  item.size
                                )
                              }
                            >
                              +
                            </b>
                          </div>
                        </div>
                      </div>
                      <div className="item-remove">
                        <div className="remove">
                          <DeleteOutlineIcon
                            onClick={() => removeHandler(item.id, item.size)}
                          />
                        </div>
                        <div className="price">
                          <span
                            style={{ color: item.discount ? "red" : "black" }}
                          >
                            {(item.cartAmount * item.price).toFixed(2)} GBP
                          </span>
                          <span
                            style={{
                              display: item.discount ? "flex" : "none",
                              textDecoration: "line-through",
                            }}
                          >
                            {(item.cartAmount * item.beforeDiscount).toFixed(2)}{" "}
                            GBP
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-info">
                  <div className="full-price">
                    <span>products price:</span>
                    <div className="price">
                      <span style={{ color: discount ? "red" : "black" }}>
                        {cartPrice} GBP
                      </span>
                      <span
                        style={{
                          display: cart.find((i) => i.discount === true)
                            ? "block"
                            : "none",
                          textDecoration: "line-through",
                        }}
                      >
                        {PriceBeforeDiscounts.toFixed(2)}GBP
                      </span>{" "}
                    </div>
                  </div>
                  <div className="checkout-button">
                    <Link
                      to={
                        isLogged
                          ? "/checkout/order"
                          : "/customer/account/login/order"
                      }
                      className="link"
                    >
                      <button className="button-black">Go to checkout</button>
                    </Link>
                  </div>
                  <div className="coupon">
                    <Accordion className="accordion">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="accordion-header"
                      >
                        i have a coupon code
                      </AccordionSummary>
                      <AccordionDetails className="accordion-details">
                        <TextField
                          className="input"
                          value={discountInput}
                          error={discountError ? true : false}
                          onChange={(e) => setDiscountInput(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" ? discountHandler() : ""
                          }
                          helperText={discountError ? discountErrorMsg : ""}
                        />
                        <button
                          className="button-white"
                          onClick={() => discountHandler()}
                        >
                          Add
                        </button>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </CartPageComponent>
  );
};

const CartPageComponent = styled.div`
  min-height: 50vh;
  font-size: 1.5rem;
  .empty-cart {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;
    .buttons {
      border: 1px solid black;
    }
  }
  .cart-with-items {
    display: flex;
    flex-direction: column;
    .discount-banner {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.2);
      color: white;

      span {
        font-size: 1rem;
        @media screen and (max-width: 1000px) {
          font-size: 0.6rem;
        }
      }
      p {
        font-size: 0.6rem;
        @media screen and (max-width: 1000px) {
          font-size: 0.4rem;
        }
      }
      .close-banner-icon {
        position: absolute;
        right: 0;
        top: 0;
        margin: 0.5rem;
        color: white;
        transition: 0.3s ease-in all;
        @media screen and (max-width: 1000px) {
          font-size: 1rem;
        }
        &:hover {
          cursor: pointer;
          color: tomato;
        }
      }
    }
    .cart-view {
      display: flex;
      min-height: 50vh;
      @media screen and (max-width: 1000px) {
        flex-direction: column;
      }
      .itemsDisplay {
        width: 70%;
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        margin: 0rem 1rem;
        @media screen and (max-width: 1000px) {
          width: 100%;
        }
        .item {
          width: 90%;
          display: flex;
          justify-content: space-between;
          padding: 1rem 0rem;
          margin: 1rem 0rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          @media screen and (max-width: 1000px) {
            width: 100%;
          }
          .item-info {
            display: flex;
            h2 {
              font-size: 1rem;
              font-weight: bold;
            }
            span {
              font-size: 1rem;
              color: rgba(0, 0, 0, 0.6);
              b {
                text-transform: upperCase;
                font-weight: normal;
              }
            }
            .image {
              img {
                height: 9rem;
                width: 7rem;
                object-fit: cover;
              }
            }
            .info {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              margin: 0px 15px;
              .info-details {
              }
              .amount {
                .amount-change {
                  font-size: 2rem;
                  &:hover {
                    cursor: pointer;
                  }
                }
              }
            }
          }
          .item-remove {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            .remove {
              transition: 0.2s ease-in all;
              padding-right: 1px;
              &:hover {
                cursor: pointer;
                color: tomato;
              }
            }
            .price {
              display: flex;
              font-size: 1rem;
              span {
                margin-right: 20px;
              }
              @media screen and (max-width: 1000px) {
                font-size: 0.7rem;
                flex-direction: column;
              }
            }
          }
        }
      }
      .cart-info {
        width: 30%;
        background-color: #f3f3f5;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: Center;
        @media screen and (max-width: 1000px) {
          width: 100%;
        }
        .full-price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          width: 70%;
          font-size: 1.5rem;

          @media screen and (max-width: 1000px) {
            margin-top: 1rem;
            font-size: 1rem;
            width: 100%;
          }
          .price {
            margin-top: 1rem;
            display: flex;
            width: 100%;
            justify-content: space-evenly;
            @media screen and (max-width: 1000px) {
              margin-top: 0.5rem;
            }
          }
        }
        .checkout-button {
          width: 70%;
          @media screen and (max-width: 1000px) {
            font-size: 1rem;
            width: 100%;
          }
          .button-black {
            width: 100%;
            height: 4rem;
          }
        }
        .coupon {
          width: 70%;
          @media screen and (max-width: 1000px) {
            font-size: 1rem;
            width: 100%;
          }
          .accordion {
            width: 100%;
            font-size: 1rem;
            .accordion-details {
              display: flex;
              align-items: center;
              .input {
                width: 100%;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
  }
`;

export default CartPage;
