import React, { useState, useEffect } from "react";
//react router
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loginAction } from "../actions/loginAction";
import { loadUsersOrders } from "../actions/ordersAction";
//styling
import styled from "styled-components";
//material ui
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
//icons
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import HomeIcon from "@material-ui/icons/Home";
//axios
import axios from "axios";
//encrypting password
import sha512 from "crypto-js/sha512";
import Base64 from "crypto-js/enc-base64";

const AccountPage = () => {
  const [deleteInfo, setDeleteInfo] = useState(false);
  //users State
  const [usersName, setUsersName] = useState("");
  const [usersAddressName, setUsersAddressName] = useState("");
  const [usersAddressSurname, setUsersAddressSurname] = useState("");
  const [usersSurname, setUsersSurname] = useState("");
  const [usersEmail, setUsersEmail] = useState("");
  const [usersPhone, setUsersPhone] = useState("");
  const [usersStreet, setUsersStreet] = useState("");
  const [usersHouseNr, setUsersHouseNr] = useState("");
  const [usersCity, setUsersCity] = useState("");
  const [usersPostalCode, setUsersPostalCode] = useState("");
  const [addressMsg, setAddressMsg] = useState("");
  const [newAddressCheckbox, setNewAddressCheckbox] = useState(false);
  const [addressId, setAddressId] = useState(1);
  const [order, setOrder] = useState([]);
  //account state
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [accountErrorMsg, setAccountErrorMsg] = useState("");
  const [action, setAction] = useState("change");
  //use
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  //pathName
  const pathName = location.pathname.split("/")[3];
  const orderDetails = location.pathname.split("/")[4];

  useEffect(() => {
    dispatch(loginAction());
  }, [dispatch]);
  const { isLogged, user } = useSelector((state) => state.login);
  useEffect(() => {
    if (isLogged && user) {
      dispatch(loadUsersOrders(user.id));
    }
  }, [dispatch, isLogged, user]);
  const { userOrders } = useSelector((state) => state.orders);
  //handlers
  const userAccountHandler = () => {
    if (
      usersName !== "" &&
      usersSurname !== "" &&
      usersEmail !== "" &&
      usersEmail.includes("@")
    ) {
      axios
        .put(`http://localhost:3000/users/${user.id}/`, {
          name: usersName,
          surname: usersSurname,
          email: usersEmail,
          password: user.password,
          favorites: user.favorites,
          addresses: user.addresses,
          isLogged: user.isLogged,
          accessibility: user.accessibility,
        })
        .then((resp) => {
          dispatch(loginAction());
          setPasswordErrorMsg("success");
        })
        .catch((error) => {});
    } else {
      setAccountErrorMsg("Inputs cant be empty");
    }
  };
  const passwordChangeHandler = () => {
    if (oldPassword !== "" && newPassword !== "" && confirmNewPassword !== "") {
      if (sha512(oldPassword).toString(Base64) === user.password) {
        if (newPassword === confirmNewPassword) {
          axios
            .put(`http://localhost:3000/users/${user.id}/`, {
              name: user.name,
              surname: user.surname,
              email: user.email,
              password: sha512(newPassword).toString(Base64),
              favorites: user.favorites,
              addresses: user.addresses,
              isLogged: user.isLogged,
              accessibility: user.accessibility,
            })
            .then((resp) => {
              setPasswordErrorMsg("Password changed successfully");
              dispatch(loginAction());
            })
            .catch((error) => {});
        } else {
          setPasswordErrorMsg("passwords dont match");
        }
      } else {
        setPasswordErrorMsg("wrong password");
      }
    } else {
      setPasswordErrorMsg("Inputs cant be empty");
    }
  };
  const deleteAccountHandler = () => {
    axios
      .delete(`http://localhost:3000/users/${user.id}/`)
      .then((resp) => {
        LogOutHandler();
      })
      .catch((error) => {});
  };
  useEffect(() => {
    if (isLogged) {
      setUsersName(user.name);
      setUsersSurname(user.surname);
      setUsersAddressName(user.name);
      setUsersAddressSurname(user.surname);
      setUsersEmail(user.email);

      if (user.addresses[0]) {
        setUsersPhone(user.addresses[0].phone);
        setUsersHouseNr(user.addresses[0].houseNr);
        setUsersStreet(user.addresses[0].street);
        setUsersCity(user.addresses[0].city);
        setUsersPostalCode(user.addresses[0].postalCode);
      }
    }
  }, [user, isLogged]);
  const addressHandler = () => {
    if (
      usersAddressName !== "" &&
      usersAddressSurname !== "" &&
      usersPhone !== "" &&
      usersPhone.length === 9 &&
      usersHouseNr !== "" &&
      usersStreet !== "" &&
      usersCity !== "" &&
      usersPostalCode !== ""
    ) {
      const newAddress = user.addresses.map((location) =>
        location.id === addressId
          ? (location = {
              name: usersAddressName,
              surname: usersAddressSurname,
              phone: usersPhone,
              houseNr: usersHouseNr,
              street: usersStreet,
              city: usersCity,
              postalCode: usersPostalCode,
              isLogged: user.isLogged,
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
          accessibility: user.accessibility,
        })
        .then((resp) => {
          dispatch(loginAction());
          alert("address changed succesfully");
        })
        .catch((error) => {});
    } else {
      setAddressMsg("Inputs cant be empty");
    }
  };
  const newAddressHandler = () => {
    setNewAddressCheckbox(true);
    setAddressId(0);
    setAction("add");
    setUsersAddressName("");
    setUsersAddressSurname("");
    setUsersEmail("");
    setUsersPhone("");
    setUsersHouseNr("");
    setUsersStreet("");
    setUsersCity("");
    setUsersPostalCode("");
  };
  const addAddress = () => {
    if (
      usersAddressName !== "" &&
      usersAddressSurname !== "" &&
      usersPhone !== "" &&
      usersPhone.length === 9 &&
      usersHouseNr !== "" &&
      usersStreet !== "" &&
      usersCity !== "" &&
      usersPostalCode !== ""
    ) {
      axios
        .put(`http://localhost:3000/users/${user.id}/`, {
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          favorites: user.favorites,
          isLogged: user.isLogged,
          accessibility: user.accessibility,
          addresses: [
            ...user.addresses,
            {
              name: usersAddressName,
              surname: usersAddressSurname,
              phone: usersPhone,
              houseNr: usersHouseNr,
              street: usersStreet,
              city: usersCity,
              postalCode: usersPostalCode,
              id: user.addresses.length !== 0 ? user.addresses.length + 1 : 1,
            },
          ],
        })
        .then((resp) => {
          dispatch(loginAction());
          alert("Address added successfully");
        })
        .catch((error) => {});
    } else {
      alert("inputs cant be empty");
    }
  };
  const checkboxHandler = (e) => {
    setNewAddressCheckbox(e.target.checked);
    if (newAddressCheckbox === false) {
      newAddressHandler();
    }
  };
  const LogOutHandler = () => {
    axios
      .put(`http://localhost:3000/users/${user.id}/`, {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        favorites: user.favorites,
        orders: user.orders,
        addresses: user.addresses,
        isLogged: false,
        accessibility: user.accessibility,
      })
      .then((resp) => {
        dispatch(loginAction());
        history.push("/customer/account/login");
      })
      .catch((error) => {});
  };
  const deleteAddressHandler = (id) => {
    axios
      .put(`http://localhost:3000/users/${user.id}/`, {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        favorites: user.favorites,
        addresses: user.addresses.filter((info) => info.id !== id),
        orders: user.orders,
        isLogged: user.isLogged,
        accessibility: user.accessibility,
      })
      .then((resp) => {
        dispatch(loginAction());
        alert("Address deleted successfully");
      })
      .catch((error) => {});
  };
  const chooseAddressHandler = (
    name,
    surname,
    city,
    phone,
    houseNr,
    street,
    postalCode,
    id
  ) => {
    setUsersAddressName(name);
    setUsersAddressSurname(surname);
    setUsersCity(city);
    setUsersPhone(phone);
    setUsersHouseNr(houseNr);
    setUsersStreet(street);
    setUsersPostalCode(postalCode);
    setAction("change");
    setAddressId(id);
    setNewAddressCheckbox(false);
  };
  const orderDetailsHandler = (id, order) => {
    history.push(`/customer/account/orders/${id}`);
    setOrder(order);
    window.scrollTo(0, 0);
  };
  return (
    <>
      {isLogged && (
        <LoggedInComponent>
          <div className="left-side">
            <ul>
              <Link to="/customer/account/orders" className="link">
                <li className={pathName === "orders" ? "active" : ""}>
                  <ShoppingBasketIcon /> Orders
                </li>
              </Link>
              <Link to="/customer/account/address" className="link">
                <li className={pathName === "address" ? "active" : ""}>
                  <HomeIcon /> Address data
                </li>
              </Link>

              <Link to="/customer/account/info" className="link">
                <li className={pathName === "info" ? "active" : ""}>
                  <AccountBoxIcon /> Account info
                </li>
              </Link>
              <li className="log-out" onClick={() => LogOutHandler()}>
                <MeetingRoomIcon /> Log out
              </li>
            </ul>
          </div>
          {user && (
            <div className="right-side">
              {pathName === "info" && (
                <div className="infoComponent">
                  <div className="info">
                    <span>My account</span>
                    <div className="line"></div>
                    <span>{accountErrorMsg}</span>

                    <span>
                      <TextField
                        label="Name"
                        value={usersName}
                        className="input"
                        onChange={(e) => setUsersName(e.target.value)}
                      />
                    </span>
                    <span>
                      <TextField
                        label="Surname"
                        value={usersSurname}
                        className="input"
                        onChange={(e) => setUsersSurname(e.target.value)}
                      />
                    </span>
                    <span>
                      <TextField
                        label="Email"
                        type="email"
                        value={usersEmail}
                        className="input"
                        onChange={(e) => setUsersEmail(e.target.value)}
                      />
                    </span>
                    <button onClick={() => userAccountHandler()}>
                      Save Changes
                    </button>
                    <div className="line"></div>
                    <div className="password-change">
                      <span>Password change</span>
                      <span>{passwordErrorMsg}</span>
                      <TextField
                        label="Your Password"
                        type="password"
                        value={oldPassword}
                        className="input"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <TextField
                        label="New password"
                        type="password"
                        value={newPassword}
                        className="input"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <TextField
                        label="Confirm password"
                        type="email"
                        value={confirmNewPassword}
                        className="input"
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                      <button onClick={() => passwordChangeHandler()}>
                        Change
                      </button>
                    </div>
                    <div className="line"></div>
                    <div className="delete-acc">
                      <span onClick={() => setDeleteInfo(true)}>
                        Delete account
                      </span>
                      <div
                        style={{ display: deleteInfo ? "block" : "none" }}
                        className="delete-confirmation"
                      >
                        <span>Are you sure you want to delete account?</span>
                        <div className="buttons">
                          <button onClick={() => deleteAccountHandler()}>
                            Yes
                          </button>
                          <button onClick={() => setDeleteInfo(false)}>
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="line"></div>
                  </div>
                </div>
              )}
              {pathName === "orders" && !orderDetails && (
                <div className="orders">
                  {userOrders.length > 0 ? (
                    <>
                      <Breadcrumbs aria-label="breadcrumb">
                        <span>My account</span>
                        <Link to="/customer/account/orders" className="link">
                          My orders
                        </Link>
                      </Breadcrumbs>
                      {userOrders.map((order) => (
                        <div className="order" key={order.id}>
                          <div className="order-left">
                            <div className="price-info">
                              <span>Nr:{order.id}</span>
                              <span>
                                <b>
                                  {order.cartPrice + order.deliveryPrice} GBP
                                </b>
                              </span>
                            </div>
                            <div className="items-image">
                              {order.items.map((item) => (
                                <img
                                  src={item.images[0].img}
                                  alt={item.name}
                                  onClick={() =>
                                    orderDetailsHandler(order.id, order)
                                  }
                                />
                              ))}
                            </div>
                          </div>
                          <div className="order-right">
                            <div className="time-info">
                              <span>
                                {order.date} {order.time}
                              </span>
                              <span>{order.status}</span>
                            </div>
                            <div className="details">
                              <span
                                className="details-button"
                                onClick={() =>
                                  orderDetailsHandler(order.id, order)
                                }
                              >
                                Details
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="no-orders">
                      <h2>You didnt order anything</h2>
                      <span>Go and explore</span>
                      <div className="buttons">
                        <Link to="/woman">
                          <button>Women</button>
                        </Link>
                        <Link to="/man">
                          <button>Men</button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {orderDetails && (
                <div className="specific-order">
                  <Breadcrumbs aria-label="breadcrumb">
                    <span>My account</span>
                    <Link to="/customer/account/orders" className="link">
                      My orders
                    </Link>
                    <span>{order.id}</span>
                  </Breadcrumbs>
                  <div className="order-details">
                    <h2>NR {order.id}</h2>
                    <span>
                      Ordered: {order.date} {order.time}
                    </span>
                    <h2>
                      {order.items.length} Items {order.status}
                    </h2>
                    <div className="items">
                      {order.items.map((item) => (
                        <div className="item" key={item.id}>
                          <div className="left-item">
                            <Link to={`/${item.gender}/${item.id}`}>
                              <img src={item.images[0].img} alt={item.name} />
                            </Link>
                            <div className="item-details">
                              <Link
                                to={`/${item.gender}/${item.id}`}
                                className="link"
                              >
                                <h3>{item.name}</h3>
                              </Link>
                              <span>size: {item.size}</span>
                            </div>
                          </div>
                          <div className="right-item">
                            <span
                              style={{
                                color: item.discount ? "red" : "black",
                              }}
                            >
                              {item.price} GBP
                            </span>
                            <span
                              style={{
                                display: item.discount ? "block" : "none",
                                textDecoration: "line-through",
                              }}
                            >
                              {item.beforeDiscount} GBP
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="order-price">
                      <div className="payment">{order.payment}</div>
                      <div className="price">
                        <div className="cart-price">
                          <span>Price:</span>
                          <span>{order.cartPrice} GBP</span>
                        </div>
                        <div className="shipping-price">
                          <span>{order.delivery}:</span>
                          <span>{order.deliveryPrice} GBP</span>
                        </div>
                        <div className="full-price">
                          <span>Total with vat:</span>
                          <span>
                            {order.cartPrice + order.deliveryPrice} GBP
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="order-address">
                      <h2>Shipping address</h2>
                      <span>
                        {order.address[0].name} {order.address[0].surname}
                      </span>
                      <span>
                        {order.address[0].street} {order.address[0].houseNr}
                      </span>
                      <span>
                        {order.address[0].postalCode} {order.address[0].city}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {pathName === "address" && (
                <div className="addressComponent">
                  <h2>My account</h2>
                  <div className="line"></div>
                  <h2>Addresses</h2>
                  <div className="choose-address">
                    {user.addresses.map((info, index) => (
                      <div
                        key={info.id}
                        className={
                          index + 1 === addressId
                            ? "single-address active-address"
                            : "single-address"
                        }
                        onClick={() =>
                          chooseAddressHandler(
                            info.name,
                            info.surname,
                            info.city,
                            info.phone,
                            info.houseNr,
                            info.street,
                            info.postalCode,
                            info.id
                          )
                        }
                      >
                        <div className="checkbox"></div>
                        <div className="address-info">
                          <span>
                            {info.name} {info.surname}
                          </span>
                          <span>
                            {info.street} {info.houseNr}
                          </span>
                          <span>
                            {info.postalCode} {info.city}
                          </span>
                          <span> Tel. {info.phone}</span>
                          <p onClick={() => deleteAddressHandler(info.id)}>
                            Delete address
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="address">
                      <Checkbox
                        checked={newAddressCheckbox}
                        onChange={checkboxHandler}
                        color="primary"
                      />
                      <span
                        style={{ fontSize: "0.8rem", padding: "1rem 0" }}
                        onClick={() => newAddressHandler()}
                      >
                        Add new address
                      </span>
                    </div>
                  </div>
                  <span>{addressMsg}</span>
                  <div className="line"></div>
                  <div className="two-inputs">
                    <TextField
                      label="name"
                      value={usersAddressName}
                      required
                      className="input"
                      onChange={(e) => setUsersAddressName(e.target.value)}
                    />
                    <TextField
                      label="surname"
                      value={usersAddressSurname}
                      required
                      className="input"
                      onChange={(e) => setUsersAddressSurname(e.target.value)}
                    />
                  </div>
                  <TextField
                    label="phone"
                    value={usersPhone}
                    type="tel"
                    required
                    className="phone-input"
                    onChange={(e) => setUsersPhone(e.target.value)}
                  />
                  <div className="two-inputs">
                    <TextField
                      label="street"
                      value={usersStreet}
                      required
                      className="input"
                      onChange={(e) => setUsersStreet(e.target.value)}
                    />
                    <TextField
                      label="house nr"
                      value={usersHouseNr}
                      required
                      className="input"
                      onChange={(e) => setUsersHouseNr(e.target.value)}
                    />
                  </div>
                  <div className="two-inputs">
                    <TextField
                      label="city"
                      value={usersCity}
                      required
                      className="input"
                      onChange={(e) => setUsersCity(e.target.value)}
                    />
                    <TextField
                      label="postal-code"
                      value={usersPostalCode}
                      required
                      className="input"
                      onChange={(e) => setUsersPostalCode(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" ? addressHandler() : ""
                      }
                    />
                  </div>

                  <button
                    className="button-white"
                    style={{ display: action === "add" ? "flex" : "none" }}
                    onClick={() => addAddress()}
                  >
                    Add
                  </button>

                  <button
                    className="button-white"
                    style={{ display: action === "change" ? "flex" : "none" }}
                    onClick={() => addressHandler()}
                  >
                    Save changes
                  </button>
                </div>
              )}
            </div>
          )}
        </LoggedInComponent>
      )}
    </>
  );
};

const LoggedInComponent = styled.div`
  display: flex;
  margin-top: 2rem;
  min-height: 70vh;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
  .left-side {
    width: 20%;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    font-size: 1.5rem;
    @media screen and (max-width: 1000px) {
      width: 100%;
      align-items: flex-start;
      margin: 0rem 1rem;
    }
    .active {
      font-weight: bold;
    }
    ul {
      list-style: none;
      li {
        &:hover {
          color: rgba(0, 0, 0, 0.6);
        }
      }
      .log-out {
        &:hover {
          cursor: pointer;
          color: #e0431c;
        }
      }
    }
  }
  .right-side {
    width: 60%;
    justify-content: center;
    align-items: Center;

    @media screen and (max-width: 1000px) {
      width: 100%;
      margin: 0rem 1rem;
    }
    .infoComponent {
      display: flex;
      flex-direction: column;
      margin-left: 2rem;
      @media screen and (max-width: 1000px) {
        margin: 0rem;
      }
      .info {
        display: flex;
        flex-direction: column;
        text-align: left;
        button {
          margin: 1rem 0rem;
        }
        .input {
          width: 15rem;
        }
        .password-change {
          display: flex;
          flex-direction: column;
          button {
            margin: 1rem 0rem;
          }
        }
        button {
          width: fit-content;
          background-color: black;
          color: White;
          border: 1px solid black;
          font-size: 1.5rem;
          &:hover {
            background-color: white;
            color: black;
          }
        }
        .delete-acc {
          .delete-confirmation {
            display: flex;
            flex-direction: column;
            margin: 1rem 0rem;
            .buttons {
              button {
                margin: 0.5rem 1rem;
              }
            }
          }
        }
      }
    }
    .addressComponent {
      display: flex;
      flex-direction: column;
      margin-left: 2rem;
      @media screen and (max-width: 1000px) {
        margin: 0;
      }
      .choose-address {
        display: flex;
        align-items: start;
        .active-address {
          .checkbox {
            background-color: black;
          }
        }
        .single-address {
          display: flex;
          font-size: 0.8rem;
          &:hover {
            cursor: pointer;
          }
          .checkbox {
            border: 1px solid rgba(0, 0, 0, 0.2);
            width: 1rem;
            height: 1rem;
            margin: 0 1rem;
            @media screen and (max-width: 1000px) {
              width: 1rem;
              height: 1rem;
              border-radius: 1rem;
              margin: 0 0.5rem;
            }
          }
          .address-info {
            display: flex;
            flex-direction: column;
            p {
              margin: 5px 0;
              font-weight: bold;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
      .two-inputs {
        display: flex;
        justify-content: space-between;
        .input {
          width: 100%;
          margin-right: 10px;
        }
      }
      .button-white {
        @media screen and (max-width: 1000px) {
          width: 100%;
          background-color: black;
          margin: 0;
          padding: 0;
          font-size: 1.5rem;
          color: White;
        }
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: black;
      margin: 2rem 0rem;
      @media screen and (max-width: 1000px) {
        margin: 1rem 0;
      }
    }
    .no-orders {
      display: flex;
      flex-direction: column;
      text-align: center;
      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          font-size: 1.5rem;
          width: 8rem;
          background-color: black;
          color: White;
          margin: 1rem;
          &:hover {
            background-color: rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
    font-size: 2rem;
    .orders {
      margin-left: 2rem;
      @media screen and (max-width: 1000px) {
        margin-left: 0;
      }
      .order {
        display: flex;
        justify-content: space-between;
        font-size: 1.5rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding: 1rem;

        .order-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .price-info {
            display: flex;
            flex-direction: column;
            font-size: 1rem;
          }
          .items-image {
            display: flex;
            flex-wrap: wrap;
            img {
              margin: 0.5rem 0.5rem 0.5rem 0;
              height: 10rem;
              width: 8rem;
            }
          }
        }
        .order-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .time-info {
            display: flex;
            flex-direction: column;
            font-size: 1rem;
            span {
              align-self: flex-end;
            }
          }
          .details {
            align-self: flex-end;
            span {
              padding: 0.6rem;
              font-size: 1rem;
              font-weight: bold;
              text-transform: upperCase;
              &:hover {
                background-color: rgba(0, 0, 0, 0.2);
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .specific-order {
      margin-left: 2rem;
      display: flex;
      flex-direction: column;
      font-size: 1.5rem;
      @media screen and (max-width: 1000px) {
        margin-left: 0;
      }
      .order-details {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        .items {
          margin: 1rem 0;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          .item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            .left-item {
              display: flex;
              img {
                height: 10rem;
                width: 8rem;
                @media screen and (max-width: 1000px) {
                  height: 8rem;
                  width: 6rem;
                }
              }
              .item-details {
                display: flex;
                flex-direction: column;
                margin-left: 5px;
                h3 {
                  @media screen and (max-width: 1000px) {
                    font-size: 1rem;
                  }
                }

                span {
                  padding: 1rem 0;
                  color: rgba(0, 0, 0, 0.6);
                  @media screen and (max-width: 1000px) {
                    font-size: 0.8rem;
                  }
                }
              }
            }
            .right-item {
              @media screen and (max-width: 1000px) {
                font-size: 1rem;
                margin: 0 4px;
              }
            }
          }
        }
        .order-price {
          display: flex;
          justify-content: space-between;
          margin: 1rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          .price {
            width: 50%;
            display: flex;
            justify-content: space-evenly;
            flex-direction: column;
            @media screen and (max-width: 1000px) {
              width: 60%;
              font-size: 1.1rem;
            }
            .cart-price {
              display: flex;
              justify-content: space-between;
            }
            .shipping-price {
              display: flex;
              justify-content: space-between;
            }
            .full-price {
              display: flex;
              justify-content: space-between;
            }
          }
        }
        .order-address {
          display: flex;
          flex-direction: column;
          font-size: 1rem;
          span {
            padding: 0.5rem 0;
          }
        }
      }
    }
  }
`;
export default AccountPage;
