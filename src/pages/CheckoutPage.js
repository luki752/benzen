import React, { useEffect } from "react";
//styling
import styled from "styled-components";
//components
import DeliveryOption from "../components/deliveryOption";
import PaymentOption from "../components/paymentOption";
//actions
import { loginAction } from "../actions/loginAction";
//redux
import { useDispatch, useSelector } from "react-redux";
//material ui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
//icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { red } from "@material-ui/core/colors";

const CheckoutPage = () => {
  //state
  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    dispatch(loginAction());
  }, [dispatch]);
  const { user, isLogged } = useSelector((state) => state.login);
  const { cartPrice, cart } = useSelector((state) => state.cart);
  return (
    <CheckoutPageComponents>
      <div className="left-side">
        <h2>1. Delivery method</h2>
        <div className="delivery">
          <DeliveryOption
            logo={
              "https://www.jakimkurierem.pl/wp-content/uploads/2018/03/logo-inpost-kurier.jpg"
            }
            name={"Inpost Delivery"}
            price={"1.99 GBP"}
            time={"1-5 working days"}
          />
          <DeliveryOption
            logo={
              "https://image.freepik.com/darmowe-wektory/kurier-z-paczka-na-tle-samochodu-dostawczego_165429-45.jpg"
            }
            name={"Inpost Delivery"}
            price={"1.99 GBP"}
            time={"1-5 working days"}
          />
        </div>
        <h2>2. Payment method</h2>
        <div className="payment">
          <PaymentOption
            logo={
              "https://krakowski-centus.pl/wp-content/uploads/2020/06/visa_mastercard_logo.jpg"
            }
            name={"Card (3DSecure cards only)"}
          />
          <PaymentOption
            logo={
              "https://www.aliorbank.pl/dam/jcr:5950c2d4-7908-47b8-bd57-0229b44b4901/blik.png"
            }
            name={"Blik"}
          />
          <PaymentOption
            logo={
              "https://static.vecteezy.com/system/resources/previews/001/269/599/non_2x/a-wallet-full-of-cash-vector.jpg"
            }
            name={"Cash on delivery(cash, credit card, blik)"}
          />
        </div>
      </div>
      <div className="right-side">
        <div className="price-info">
          <div className="items-price">
            <span>products price:</span>
            <span>{cartPrice} GBP</span>
          </div>
          <div className="delivery-price">
            <span>delivery price:</span>
            <span>9.99 GBP</span>
          </div>
          <div className="total-price">
            <span>
              <b>total</b> with vat:
            </span>
            <span>{parseInt(cartPrice) + 9.99} GBP</span>
          </div>
        </div>
        <button className="button-black">Shop and pay</button>
        <p>
          When you click Shop and Pay you will create your order. When you order
          at reserved.com, you agree to our Terms and Conditions.
        </p>
        <div className="your-order">
          <Accordion className="accordion" defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className="accordion-header"
            >
              Your Order <span className="cart-length">{cart.length} QTY</span>
            </AccordionSummary>
            {cart.map((item) => (
              <AccordionDetails key={item.id} className="accordion-detail">
                <img src={item.images[0].img} alt={item.name} />
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-size">
                    <span>Size: {item.size}</span>
                    {item.discount ? (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        {item.price} GBP{" "}
                        <b
                          style={{
                            textDecoration: "line-through",
                            fontWeight: "normal",
                          }}
                        >
                          {item.beforeDiscount} GBP
                        </b>
                      </span>
                    ) : (
                      <span>{item.price} GBP</span>
                    )}
                  </div>
                </div>
              </AccordionDetails>
            ))}
          </Accordion>
        </div>
      </div>
    </CheckoutPageComponents>
  );
};

const CheckoutPageComponents = styled.div`
  display: flex;
  min-height: 50vh;
  .left-side {
    width: 70%;
    padding-left: 10vh;
  }
  .right-side {
    display: flex;
    justify-content: center;
    align-items: Center;
    flex-direction: column;
    width: 30%;
    background-color: #f3f3f5;
    .price-info {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      .items-price,
      .delivery-price,
      .total-price {
        width: 70%;
        display: flex;
        justify-content: space-between;
      }
      .total-price {
        padding: 5px 0;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
    .button-black {
      width: 70%;
      font-size: 1.5rem;
      padding: 1rem;
    }
    p {
      font-size: 0.8rem;
      width: 70%;
    }
    .your-order {
      width: 70%;
      .accordion {
        background-color: #f3f3f5;
        .accordion-header {
          font-weight: bold;
          .cart-length {
            font-weight: normal;
            margin: 0 5px;
            background-color: white;
          }
        }
        .accordion-detail {
          display: flex;
          width: 100%;
          img {
            height: 8rem;
            width: 6rem;
          }
          .item-info {
            padding: 0 1rem;
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .item-name {
              font-weight: bold;
            }
            .item-size {
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
`;

export default CheckoutPage;
