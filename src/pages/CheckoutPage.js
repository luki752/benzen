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
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
//icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
  const [addressChoosed, setAddressChoosed] = useState(false);
  const [delivery, setDelivery] = useState("");
  //payment state
  const [card, setCard] = useState(false);
  const [blik, setBlik] = useState(false);
  const [cash, setCash] = useState(false);
  const [paymentChoosed, setPaymentChoosed] = useState(false);
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
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newHouseNr, setNewHouseNr] = useState("");
  const [newPostalCode, setNewPostalCode] = useState("");
  const [newCity, setNewCity] = useState("");
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  //anonymous
  const [anonymousModal, setAnonymousModal] = useState(false);
  const [email, setEmail] = useState("");
  //useEffect
  useEffect(() => {
    dispatch(loginAction());
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
    setPaymentChoosed(true);
    setPayment("cash");
  };
  const cardHandler = () => {
    setCard(true);
    setCash(false);
    setBlik(false);
    setPaymentChoosed(true);
    setPayment("card");
  };
  const blikHandler = () => {
    setBlik(true);
    setCash(false);
    setCard(false);
    setPaymentChoosed(true);
    setPayment("blik");
  };
  const addressChooseHandler = (
    id,
    name,
    surname,
    city,
    postalCode,
    street,
    phone,
    houseNr
  ) => {
    setName(name);
    setSurname(surname);
    setCity(city);
    setPostalCode(postalCode);
    setStreet(street);
    setPhone(phone);
    setHouseNr(houseNr);
    setAddressId(id);
  };
  const chooseButton = () => {
    setAddressChoosed(true);
    setModal(false);
  };
  const modalHandler = () => {
    setAddAddressModal(!addAddressModal);
    setModal(!addressModal);
  };
  const editModalHandler = () => {
    setModal(!addressModal);
    setEditModal(!editModal);
  };
  const addAddressHandler = () => {
    if (
      newName !== "" &&
      newSurname !== "" &&
      newPhone !== "" &&
      newPhone.length >= 9 &&
      newCity !== "" &&
      newStreet !== "" &&
      newHouseNr !== "" &&
      newPostalCode !== ""
    ) {
      axios
        .put(`http://localhost:3000/users/${user.id}/`, {
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          favorites: user.favorites,
          isLogged: user.isLogged,
          addresses: [
            ...user.addresses,
            {
              name: newName,
              surname: newSurname,
              phone: newPhone,
              houseNr: newHouseNr,
              street: newStreet,
              city: newCity,
              postalCode: newPostalCode,
              id: user.addresses.length !== 0 ? user.addresses.length + 1 : 1,
            },
          ],
        })
        .then((resp) => {
          dispatch(loginAction());
          modalHandler();
        })
        .catch((error) => {});
    } else {
      alert("inputs cant be empty");
    }
  };

  const editAddressHandler = (addressId) => {
    if (
      name !== "" &&
      surname !== "" &&
      phone !== "" &&
      phone.length === 9 &&
      houseNr !== "" &&
      street !== "" &&
      city !== "" &&
      postalCode !== ""
    ) {
      const newAddress = user.addresses.map((location) =>
        location.id === addressId
          ? (location = {
              name: name,
              surname: surname,
              phone: phone,
              houseNr: houseNr,
              street: street,
              city: city,
              postalCode: postalCode,
              id: addressId,
            })
          : location
      );
      axios
        .put(`http://localhost:3000/users/${user.id}/`, {
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          favorites: user.favorites,
          addresses: newAddress,
          isLogged: user.isLogged,
        })
        .then((resp) => {
          dispatch(loginAction());
          editModalHandler();
        })
        .catch((error) => {});
    } else {
      alert("inputs cant be empty");
    }
  };
  const finalizeOrderHandler = () => {
    if (cart.length !== 0 && paymentChoosed) {
      let current = new Date();
      axios
        .post("http://localhost:3000/orders", {
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
  const anonymousAddressHandler = () => {
    setAnonymousModal(!anonymousModal);
    setName(name);
    setSurname(surname);
    setCity(city);
    setPostalCode(postalCode);
    setStreet(street);
    setPhone(phone);
    setHouseNr(houseNr);
    setAddressChoosed(true);
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
            {addressChoosed && dhl && (
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
            {addressChoosed && standard && (
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
          style={{ display: addressChoosed ? "block" : "none" }}
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
          className={paymentChoosed ? "button-black" : "button-black disabled"}
          onClick={() => finalizeOrderHandler()}
        >
          Buy and pay
        </button>
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
                        {item.price.toFixed(2)} GBP{" "}
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
      <AddressModal style={{ display: addressModal ? "block" : "none" }}>
        <div className="address-info">
          <div className="address-header">
            <span>Delivery address</span>
            <CloseIcon
              className="close-modal"
              onClick={() => setModal(!addressModal)}
            />
          </div>
          {isLogged && (
            <>
              {user.addresses.map((address, index) => (
                <div
                  key={address.id}
                  className={
                    index + 1 === addressId
                      ? "single-address active-address"
                      : "single-address"
                  }
                  onClick={() =>
                    addressChooseHandler(
                      address.id,
                      address.name,
                      address.surname,
                      address.city,
                      address.postalCode,
                      address.street,
                      address.phone,
                      address.houseNr
                    )
                  }
                >
                  <div className="checkbox"></div>
                  <div className="address-data">
                    <span>
                      {address.name} {address.surname}
                    </span>
                    <span>
                      {address.street} {address.houseNr}, {address.postalCode}{" "}
                      {address.city}
                    </span>
                    <span>{address.phone}</span>
                    <p onClick={() => editModalHandler()}>Edit</p>
                  </div>
                </div>
              ))}
              <div
                className="button-add-address"
                onClick={() => modalHandler()}
              >
                <AddCircleOutlineIcon /> Add new address
              </div>
              <div className="choose-button">
                <button className="button-black" onClick={() => chooseButton()}>
                  Choose
                </button>
              </div>
            </>
          )}
        </div>
      </AddressModal>
      <NewAddressModal style={{ display: addAddressModal ? "block" : "none" }}>
        <div className="new-address">
          <div className="header">
            <span onClick={() => modalHandler()}>
              {" "}
              <ArrowBackIosIcon />
              Go back
            </span>
            <CloseIcon
              className="close-modal"
              onClick={() => setAddAddressModal(!addAddressModal)}
            />
          </div>
          <div className="inputs">
            <TextField
              value={newName}
              label="Name"
              onChange={(e) => setNewName(e.target.value)}
              className="input"
            />
            <TextField
              value={newSurname}
              label="Surname"
              onChange={(e) => setNewSurname(e.target.value)}
              className="input"
            />
            <TextField
              value={newStreet}
              label="Street"
              onChange={(e) => setNewStreet(e.target.value)}
              className="input"
            />
            <TextField
              value={newHouseNr}
              label="House Nr"
              onChange={(e) => setNewHouseNr(e.target.value)}
              className="input"
            />
            <div className="two-inputs">
              <TextField
                value={newPostalCode}
                label="Postal Code"
                onChange={(e) => setNewPostalCode(e.target.value)}
                className="postal input"
              />
              <TextField
                value={newCity}
                label="City"
                onChange={(e) => setNewCity(e.target.value)}
                className="input"
              />
            </div>
            <TextField
              value={newPhone}
              label="Phone"
              onChange={(e) => setNewPhone(e.target.value)}
              className="input"
            />
          </div>
          <div className="button-black" onClick={() => addAddressHandler()}>
            Save
          </div>
        </div>
      </NewAddressModal>
      <EditAddressModal style={{ display: editModal ? "block" : "none" }}>
        <div className="edit-address">
          <div className="header">
            <span onClick={() => editModalHandler()}>
              {" "}
              <ArrowBackIosIcon />
              Go back
            </span>
            <CloseIcon
              className="close-modal"
              onClick={() => setEditModal(!editModal)}
            />
          </div>
          <div className="inputs">
            <TextField
              value={name}
              label="Name"
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            <TextField
              value={surname}
              label="Surname"
              onChange={(e) => setSurname(e.target.value)}
              className="input"
            />
            <TextField
              value={street}
              label="Street"
              onChange={(e) => setStreet(e.target.value)}
              className="input"
            />
            <TextField
              value={houseNr}
              label="House Nr"
              onChange={(e) => setHouseNr(e.target.value)}
              className="input"
            />
            <div className="two-inputs">
              <TextField
                value={postalCode}
                label="Postal Code"
                onChange={(e) => setPostalCode(e.target.value)}
                className="postal input"
              />
              <TextField
                value={city}
                label="City"
                onChange={(e) => setCity(e.target.value)}
                className="input"
              />
            </div>
            <TextField
              value={phone}
              label="Phone"
              onChange={(e) => setPhone(e.target.value)}
              className="input"
            />
          </div>
          <div
            className="button-black"
            onClick={() => editAddressHandler(addressId)}
          >
            Save
          </div>
        </div>
      </EditAddressModal>
      <AnonymousAddressModal
        style={{ display: anonymousModal ? "block" : "none" }}
      >
        <div className="anonymous-address">
          <div className="header">
            <span>Add</span>
            <CloseIcon
              className="close-modal"
              onClick={() => setAnonymousModal(!anonymousModal)}
            />
          </div>
          <div className="inputs">
            <TextField
              value={name}
              label="Name"
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            <TextField
              value={surname}
              label="Surname"
              onChange={(e) => setSurname(e.target.value)}
              className="input"
            />
            <TextField
              value={email}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <TextField
              value={street}
              label="Street"
              onChange={(e) => setStreet(e.target.value)}
              className="input"
            />
            <TextField
              value={houseNr}
              label="House Nr"
              onChange={(e) => setHouseNr(e.target.value)}
              className="input"
            />
            <div className="two-inputs">
              <TextField
                value={postalCode}
                label="Postal Code"
                onChange={(e) => setPostalCode(e.target.value)}
                className="postal input"
              />
              <TextField
                value={city}
                label="City"
                onChange={(e) => setCity(e.target.value)}
                className="input"
              />
            </div>
            <TextField
              value={phone}
              label="Phone"
              onChange={(e) => setPhone(e.target.value)}
              className="input"
            />
          </div>
          <div
            className="button-black"
            onClick={() => anonymousAddressHandler()}
          >
            Save
          </div>
        </div>
      </AnonymousAddressModal>
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
    width: 70%;
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
            font-size: 0.6rem;
          }

          img {
            height: 5rem;
            width: 6rem;
            @media screen and (max-width: 1000px) {
              height: 2rem;
              width: 3rem;
            }
          }
          span {
            padding: 0 1rem;
            @media screen and (max-width: 1000px) {
              padding: 0 0.5rem;
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
          font-size: 0.6rem;
        }
        &:hover {
          border: 1px solid rgba(0, 0, 0, 0.6);
          cursor: pointer;
        }
        img {
          height: 5rem;
          width: 6rem;
          @media screen and (max-width: 1000px) {
            height: 2rem;
            width: 3rem;
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
    width: 30%;
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
const AddressModal = styled.div`
  position: absolute;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .address-info {
    background-color: white;
    margin-left: 40%;
    margin-top: 10%;
    width: 25%;
    .address-header {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      .close-modal {
        &:hover {
          cursor: pointer;
        }
      }
    }
    .active-address {
      .checkbox {
        background-color: black;
      }
    }
    .single-address {
      display: flex;
      align-items: center;
      border: 1px solid rgba(0, 0, 0, 0.4);
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.8);
        cursor: pointer;
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
      .address-data {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        p {
          margin: 10px 0;
          font-weight: bold;
        }
      }
    }
    .button-add-address {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 0;
      &:hover {
        cursor: pointer;
      }
    }
    .choose-button {
      width: 100%;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .button-black {
        width: 100%;
        margin: 1rem;
        padding: 1rem;
      }
    }
  }
`;
const NewAddressModal = styled.div`
  position: absolute;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .new-address {
    background-color: white;
    margin-left: 40%;
    margin-top: 10%;
    width: 25%;
    justify-content: center;
    padding: 1rem;
    .header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 1rem;
      span {
        &:hover {
          cursor: pointer;
        }
      }
    }
    .inputs {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 1rem;
      .input {
        width: 100%;
      }
      .two-inputs {
        width: 100%;
        display: flex;
      }
      .postal {
        margin-right: 10px;
      }
    }
    .button-black {
      width: 100%;
      padding: 1rem;
      font-size: 1.5rem;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
const EditAddressModal = styled.div`
  position: absolute;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .edit-address {
    background-color: white;
    margin-left: 40%;
    margin-top: 10%;
    width: 25%;
    justify-content: center;
    padding: 1rem;
    .header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 1rem;
      span {
        &:hover {
          cursor: pointer;
        }
      }
    }
    .inputs {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 1rem;
      .input {
        width: 100%;
      }
      .two-inputs {
        width: 100%;
        display: flex;
      }
      .postal {
        margin-right: 10px;
      }
    }
    .button-black {
      width: 100%;
      padding: 1rem;
      font-size: 1.5rem;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
const AnonymousAddressModal = styled.div`
  position: absolute;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .anonymous-address {
    background-color: white;
    margin-left: 40%;
    margin-top: 10%;
    width: 25%;
    justify-content: center;
    padding: 1rem;
    .header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 1rem;
      span {
        &:hover {
          cursor: pointer;
        }
      }
    }
    .inputs {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 1rem;
      .input {
        width: 100%;
      }
      .two-inputs {
        width: 100%;
        display: flex;
      }
      .postal {
        margin-right: 10px;
      }
    }
    .button-black {
      width: 100%;
      padding: 1rem;
      font-size: 1.5rem;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
export default CheckoutPage;
