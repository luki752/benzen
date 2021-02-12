import React, { useState, useEffect } from "react";
//styling
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
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
const CartPage = () => {
  const [fullPrice, setFullPrice] = useState(0);
  const [discountInput, setDiscountInput] = useState("");
  const [discount, setDiscount] = useState(false);
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState("");
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (cart) {
      if (cart.length === 1) {
        setFullPrice(cart[0].price * cart[0].cartAmount);
      } else if (cart.length > 1) {
        setFullPrice(
          cart.reduce(function (a, s) {
            return (a += s.price * s.cartAmount);
          }, 0)
        );
      } else {
        return;
      }
    }
  }, [cart]);
  console.log(cart);
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
      if (discountInput === "DISCOUNT10") {
        setPriceBeforeDiscount(fullPrice);
        setFullPrice(fullPrice - fullPrice * 0.1);
        setDiscount(true);
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
              <div className="itemsDisplay">
                {cart.map((item) => (
                  <div className="item" key={item.id}>
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
                        {(item.cartAmount * item.price).toFixed(2)} GBP
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-info">
                <div className="full-price">
                  <span>products price</span>
                  <div className="price">
                    <span style={{ color: discount ? "red" : "black" }}>
                      {fullPrice.toFixed(2)}
                    </span>
                    <span
                      style={{
                        display: discount ? "block" : "none",
                        textDecoration: "line-through",
                      }}
                    >
                      {priceBeforeDiscount}
                    </span>{" "}
                    GBP
                  </div>
                </div>
                <div className="checkout-button">
                  <button className="button-black">Go to checkout</button>
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
                        onChange={(e) => setDiscountInput(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" ? discountHandler() : ""
                        }
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
    margin-top: 2rem;
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
        width: 80%;
        display: flex;
        justify-content: space-between;
        padding: 1rem 0rem;
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
          margin-right: 1rem;
          .remove {
            transition: 0.2s ease-in all;
            &:hover {
              cursor: pointer;
              color: tomato;
            }
          }
          .price {
            font-size: 1rem;
            @media screen and (max-width: 1000px) {
              font-size: 0.7rem;
              width: 60px;
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
        width: 70%;
        @media screen and (max-width: 1000px) {
          margin-top: 1rem;
          font-size: 1rem;
          width: 90%;
        }
        .price {
          display: flex;
          width: 10rem;
          span {
            margin-left: 20px;
          }
        }
      }
      .checkout-button {
        width: 70%;
        @media screen and (max-width: 1000px) {
          font-size: 1rem;
          width: 90%;
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
          width: 90%;
        }
        .accordion {
          width: 100%;
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
`;

export default CartPage;
