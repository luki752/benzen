import React, { useEffect, useState } from "react";
//styling
import styled from "styled-components";
//history
import { useHistory } from "react-router-dom";
//actions
import { loginAction } from "../actions/loginAction";
//redux
import { useDispatch, useSelector } from "react-redux";
//axios
import axios from "axios";
//material ui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
//icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//components
import AddressModal from "../components/AddressModal";
import NewAddressModal from "../components/NewAddressModal";
import EditAddressModal from "../components/EditAddressModal";
import AnonymousAddressModal from "../components/AnonymousAddressModal";

const CheckoutPage = () => {
  //state
  const dispatch = useDispatch();
  const history = useHistory();
  const { cartPrice, cart } = useSelector((state) => state.cart);
  //delivery state
  const [standard, setStandard] = useState(false);
  const [dhl, setDhl] = useState(false);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [addressModal, setModal] = useState(false);
  const [chosenAddress, setChosenAddress] = useState(false);
  const [delivery, setDelivery] = useState("");
  //payment state
  const [card, setCard] = useState(false);
  const [blik, setBlik] = useState(false);
  const [cash, setCash] = useState(false);
  const [chosenPayment, setChosenPayment] = useState(false);
  const [payment, setPayment] = useState("");
  //address state
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const [houseNr, setHouseNr] = useState("");
  const [addressId, setAddressId] = useState("");
  //new address state
  const [addAddressModal, setAddAddressModal] = useState(false);
  //edit modal
  const [editModal, setEditModal] = useState(false);
  //anonymous
  const [anonymousModal, setAnonymousModal] = useState(false);
  const [email, setEmail] = useState("");
  const appLink = `https://benzen-server.herokuapp.com`;
  //useEffect
  useEffect(() => {
    dispatch(loginAction(localStorage.getItem("userId")));
  }, [dispatch]);

  const { user, isLogged } = useSelector((state) => state.login);

  const dhlHandler = () => {
    setDhl(true);
    setStandard(false);
    setDeliveryPrice(2.99);
    isLogged ? setModal(true) : setAnonymousModal(true);
    setDelivery("dhl");
  };
  const standardHandler = () => {
    setStandard(true);
    setDhl(false);
    setDeliveryPrice(1.99);
    isLogged ? setModal(true) : setAnonymousModal(true);
    setDelivery("standard");
  };
  const cashHandler = () => {
    setCash(true);
    setCard(false);
    setBlik(false);
    setChosenPayment(true);
    setPayment("cash");
  };
  const cardHandler = () => {
    setCard(true);
    setCash(false);
    setBlik(false);
    setChosenPayment(true);
    setPayment("card");
  };
  const blikHandler = () => {
    setBlik(true);
    setCash(false);
    setCard(false);
    setChosenPayment(true);
    setPayment("blik");
  };
  const modalHandler = () => {
    setAddAddressModal(!addAddressModal);
    setModal(!addressModal);
  };
  const editModalHandler = () => {
    setModal(!addressModal);
    setEditModal(!editModal);
  };
  //this function checks if cart isn't empty and payment has been chosen
  //then if its true it decreases items amount
  //then function posts new order to database
  const finalizeOrderHandler = () => {
    if (cart.length !== 0 && chosenPayment) {
      cart.map((item) =>
        axios
          .put(`${appLink}/${item.gender}/${item.id}`, {
            name: item.name,
            item: item.item,
            amount: item.amount - item.cartAmount,
            category: item.category,
            discount: item.discount,
            beforeDiscount: item.beforeDiscount,
            price: item.price,
            desc: item.desc,
            material: item.material,
            images: item.images,
            id: item.id,
          })
          .then((resp) => {})
          .catch((error) => {})
      );
      let current = new Date();
      axios
        .post(`${appLink}/orders`, {
          items: cart,
          date: current.toLocaleDateString(),
          time: current.toLocaleTimeString(),
          usersId: isLogged ? user.id : "",
          status: "new",
          delivery: delivery,
          cartPrice: parseFloat(cartPrice),
          deliveryPrice: deliveryPrice,
          payment: payment,
          address: [
            {
              name: name,
              surname: surname,
              city: city,
              postalCode: postalCode,
              street: street,
              houseNr: houseNr,
              phone: phone,
              email: isLogged ? user.email : email,
            },
          ],
        })
        .then((resp) => {
          history.push("/checkout/order/finalized");
          window.location.reload();
        })
        .catch((error) => {});
    }
  };

  return (
    <CheckoutPageComponents>
      <div className="left-side">
        <h2>1. Delivery method</h2>
        <div className="delivery">
          <div
            className={dhl ? "delivery-option active" : "delivery-option"}
            onClick={() => dhlHandler()}
          >
            <div className="option">
              <div className="left-info">
                <div
                  className="checkbox"
                  style={{ backgroundColor: dhl ? "black" : "white" }}
                ></div>
                <img
                  src="https://jakimkurierem.pl/logo_kuriera/dhl_logo.svg"
                  alt="dhl"
                />
                <span>DHL Delivery</span>
              </div>
              <div className="right-info">
                <span>1-3 working days</span>
                <span>2.99 GBP</span>
              </div>
            </div>
            {chosenAddress && dhl && (
              <div className="address">
                <div className="address-info">
                  <div className="address-name">
                    {name} {surname}
                  </div>
                  <div className="address-name">
                    {street} {houseNr}, {postalCode} {city}
                  </div>
                  <div className="phone">{phone}</div>
                </div>
                <div className="edit">
                  <span>Edit</span>
                </div>
              </div>
            )}
          </div>
          <div
            className={standard ? "delivery-option active" : "delivery-option"}
            onClick={() => standardHandler()}
          >
            <div className="option">
              <div className="left-info">
                <div
                  className="checkbox"
                  style={{ backgroundColor: standard ? "black" : "white" }}
                ></div>
                <img
                  src="https://image.freepik.com/darmowe-wektory/kurier-z-paczka-na-tle-samochodu-dostawczego_165429-45.jpg"
                  alt="standard"
                />
                <span>Standard Delivery</span>
              </div>
              <div className="right-info">
                <span>1-5 working days</span>
                <span>1.99 GBP</span>
              </div>
            </div>
            {chosenAddress && standard && (
              <div className="address">
                <div className="address-info">
                  <div className="address-name">
                    {name} {surname}
                  </div>
                  <div className="address-name">
                    {street} {houseNr}, {postalCode} {city}
                  </div>
                  <div className="phone">{phone}</div>
                </div>
                <div className="edit">
                  <span>Edit</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <h2>2. Payment method</h2>
        <div
          className="payment"
          style={{ display: chosenAddress ? "block" : "none" }}
        >
          <div className="payment-option" onClick={() => cardHandler()}>
            <div
              className="checkbox"
              style={{ backgroundColor: card ? "black" : "white" }}
            ></div>
            <img
              src="https://krakowski-centus.pl/wp-content/uploads/2020/06/visa_mastercard_logo.jpg"
              alt="card"
            />
            <span>Card (3DSecure cards only)</span>
          </div>

          <div className="payment-option" onClick={() => blikHandler()}>
            <div
              className="checkbox"
              style={{ backgroundColor: blik ? "black" : "white" }}
            ></div>
            <img
              src="https://www.aliorbank.pl/dam/jcr:5950c2d4-7908-47b8-bd57-0229b44b4901/blik.png"
              alt="Blik"
            />
            <span>Blik</span>
          </div>

          <div className="payment-option" onClick={() => cashHandler()}>
            <div
              className="checkbox"
              style={{ backgroundColor: cash ? "black" : "white" }}
            ></div>
            <img
              src="https://static.vecteezy.com/system/resources/previews/001/269/599/non_2x/a-wallet-full-of-cash-vector.jpg"
              alt="Cash"
            />
            <span>Cash on delivery (cash, credit card, blik)</span>
          </div>
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
            <span>{deliveryPrice} GBP</span>
          </div>
          <div className="total-price">
            <span>
              <b>total</b> with vat:
            </span>
            <span>
              {(parseFloat(cartPrice) + deliveryPrice).toFixed(2)} GBP
            </span>
          </div>
        </div>
        <button
          className={chosenPayment ? "button-black" : "button-black disabled"}
          onClick={() => finalizeOrderHandler()}
        >
          Buy and pay
        </button>
        <p>
          When you click Shop and Pay you will create your order. When you order
          at benzen, you agree to our Terms and Conditions.
        </p>
        <div className="your-order">
          <Accordion className="accordion">
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
                  <div className="item-name">
                    <span>{item.name}</span>
                    {item.cartAmount > 1 && (
                      <span className="amount">amount: {item.cartAmount}</span>
                    )}
                  </div>
                  <div className="item-size">
                    <span>Size: {item.size}</span>
                    {item.discount === "true" || item.discount === true ? (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        {parseFloat(item.price * item.cartAmount).toFixed(2)}{" "}
                        GBP{" "}
                        <b
                          style={{
                            textDecoration: "line-through",
                            fontWeight: "normal",
                          }}
                        >
                          {(item.beforeDiscount * item.cartAmount).toFixed(2)}{" "}
                          GBP
                        </b>
                      </span>
                    ) : (
                      <span>
                        {(item.price * item.cartAmount).toFixed(2)} GBP
                      </span>
                    )}
                  </div>
                </div>
              </AccordionDetails>
            ))}
          </Accordion>
        </div>
      </div>
      <AddressModal
        addressModal={addressModal}
        setModal={setModal}
        modalHandler={modalHandler}
        editModalHandler={editModalHandler}
        name={name}
        surname={surname}
        phone={phone}
        city={city}
        street={street}
        houseNr={houseNr}
        postalCode={postalCode}
        setName={setName}
        setSurname={setSurname}
        setCity={setCity}
        setPostalCode={setPostalCode}
        setStreet={setStreet}
        setPhone={setPhone}
        setHouseNr={setHouseNr}
        setAddressId={setAddressId}
        setChosenAddress={setChosenAddress}
        addressId={addressId}
      />
      <NewAddressModal
        appLink={appLink}
        addAddressModal={addAddressModal}
        setAddAddressModal={setAddAddressModal}
        modalHandler={modalHandler}
      />

      <EditAddressModal
        editModal={editModal}
        setModal={setModal}
        editModalHandler={editModalHandler}
        setEditModal={setEditModal}
        name={name}
        surname={surname}
        street={street}
        houseNr={houseNr}
        postalCode={postalCode}
        city={city}
        phone={phone}
        setName={setName}
        setSurname={setSurname}
        setHouseNr={setHouseNr}
        setStreet={setStreet}
        setPostalCode={setPostalCode}
        setCity={setCity}
        setPhone={setPhone}
        addressId={addressId}
        appLink={appLink}
      />
      <AnonymousAddressModal
        name={name}
        surname={surname}
        street={street}
        houseNr={houseNr}
        postalCode={postalCode}
        city={city}
        phone={phone}
        setName={setName}
        setSurname={setSurname}
        setHouseNr={setHouseNr}
        setStreet={setStreet}
        setPostalCode={setPostalCode}
        setCity={setCity}
        setPhone={setPhone}
        email={email}
        anonymousModal={anonymousModal}
        setAnonymousModal={setAnonymousModal}
        setEmail={setEmail}
        setChosenAddress={setChosenAddress}
      />
    </CheckoutPageComponents>
  );
};

const CheckoutPageComponents = styled.div`
  display: flex;
  min-height: 80vh;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
  .left-side {
    width: 60%;
    padding-left: 10vh;
    h2 {
      padding: 1rem 0;
    }
    .delivery {
      .active {
        border: 1px solid black;
      }
      .delivery-option {
        border: 1px solid rgba(0, 0, 0, 0.1);
        &:hover {
          border: 1px solid rgba(0, 0, 0, 0.6);
          cursor: pointer;
        }
        .option {
          display: flex;
          width: 80%;
          font-size: 1rem;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          @media screen and (max-width: 1000px) {
            width: 100%;
            font-size: 0.7rem;
            padding: 0.5rem;
          }

          img {
            height: 5rem;
            width: 6rem;
            @media screen and (max-width: 1000px) {
              height: 3rem;
              width: 4rem;
            }
          }
          span {
            padding: 0 1rem;
            @media screen and (max-width: 1000px) {
              padding: 0 0.2rem;
            }
          }
          .left-info {
            display: flex;
            align-items: center;
          }
          .right-info {
            display: flex;
          }
          .checkbox {
            border: 1px solid rgba(0, 0, 0, 0.2);
            width: 2rem;
            height: 2rem;

            border-radius: 2rem;
            margin: 0 1rem;
            @media screen and (max-width: 1000px) {
              width: 1rem;
              height: 1rem;
              border-radius: 1rem;
              margin: 0 0.5rem;
            }
          }
        }
        .address {
          display: flex;
          justify-content: space-between;
          .address-info {
            padding: 1rem;
          }
          .edit {
            padding: 1rem;
          }
        }
      }
    }
    .payment {
      .payment-option {
        display: flex;
        width: 100%;
        font-size: 1rem;
        align-items: center;
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 1rem;
        @media screen and (max-width: 1000px) {
          width: 100%;
          font-size: 0.7rem;
          padding: 0.5rem;
        }
        &:hover {
          border: 1px solid rgba(0, 0, 0, 0.6);
          cursor: pointer;
        }
        img {
          height: 5rem;
          width: 6rem;
          @media screen and (max-width: 1000px) {
            height: 3rem;
            width: 4rem;
          }
        }
        span {
          padding: 0 1rem;
        }
        .checkbox {
          border: 1px solid rgba(0, 0, 0, 0.2);
          width: 2rem;
          height: 2rem;
          border-radius: 2rem;
          margin: 0 1rem;
          @media screen and (max-width: 1000px) {
            width: 1rem;
            height: 1rem;
            border-radius: 1rem;
            margin: 0 0.5rem;
          }
        }
      }
    }
    @media screen and (max-width: 1000px) {
      width: 100%;
      padding-left: 0;
    }
  }
  .right-side {
    display: flex;
    justify-content: center;
    align-items: Center;
    flex-direction: column;
    background-color: #f3f3f5;
    width: 40%;
    @media screen and (max-width: 1000px) {
      width: 100%;
      padding: 1rem 0rem;
    }
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
        @media screen and (max-width: 1000px) {
          width: 100%;
          padding: 8px;
        }
      }
      .total-price {
        padding: 5px 0;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        @media screen and (max-width: 1000px) {
          padding: 8px;
        }
      }
    }
    .button-black {
      width: 70%;
      font-size: 1.5rem;
      padding: 1rem;
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
    }
    .disabled {
      pointer-events: disabled;
      background-color: rgba(0, 0, 0, 0.2);
    }
    p {
      font-size: 0.8rem;
      width: 70%;
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
    }
    .your-order {
      width: 70%;
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
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
            padding: 5px 1rem;
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            .item-name {
              font-weight: bold;
              display: flex;
              justify-content: space-between;
              .amount {
                font-weight: normal;
              }
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
