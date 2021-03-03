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
//components
import Order from "../components/Order";

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
  //use
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  //pathName
  const pathName = location.pathname.split("/")[3];
  const orderDetails = location.pathname.split("/")[4];
  useEffect(() => {
    dispatch(loginAction(localStorage.getItem("userId")));
  }, [dispatch]);
  const { isLogged, user } = useSelector((state) => state.login);
  const [action, setAction] = useState("change");
  const appLink = `https://benzen-server.herokuapp.com`;

  useEffect(() => {
    if (isLogged && user) {
      dispatch(loadUsersOrders(user.id));
    }
  }, [dispatch, isLogged, user]);
  const { userOrders } = useSelector((state) => state.orders);
  //handlers
  //changes name, surname, email for user
  const userAccountHandler = () => {
    if (
      usersName !== "" &&
      usersSurname !== "" &&
      usersEmail !== "" &&
      usersEmail.includes("@")
    ) {
      axios
        .put(`${appLink}/users/${user.id}/`, {
          name: usersName,
          surname: usersSurname,
          email: usersEmail,
          password: user.password,
          favorites: user.favorites,
          addresses: user.addresses,
          accessibility: user.accessibility,
        })
        .then((resp) => {
          dispatch(loginAction(localStorage.getItem("userId")));
          setPasswordErrorMsg("success");
        })
        .catch((error) => {});
    } else {
      setAccountErrorMsg("Inputs cant be empty");
    }
  };
  //checks if inputs are empty, then it checks if password coded to sha512 matches user password then it checks if newPassword input matches  if so it changes user's password
  const passwordChangeHandler = () => {
    if (oldPassword !== "" && newPassword !== "" && confirmNewPassword !== "") {
      if (sha512(oldPassword).toString(Base64) === user.password) {
        if (newPassword === confirmNewPassword) {
          axios
            .put(`${appLink}/users/${user.id}/`, {
              name: user.name,
              surname: user.surname,
              email: user.email,
              password: sha512(newPassword).toString(Base64),
              favorites: user.favorites,
              addresses: user.addresses,
              accessibility: user.accessibility,
            })
            .then((resp) => {
              setPasswordErrorMsg("Password changed successfully");
              dispatch(loginAction(localStorage.getItem("userId")));
            })
            .catch((error) => {});
        } else {
          setPasswordErrorMsg("passwords don't match");
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
      .delete(`${appLink}/users/${user.id}/`)
      .then((resp) => {
        LogOutHandler();
      })
      .catch((error) => {});
  };
  //sets inputs value to users data
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

  //edits address
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
              id: addressId,
            })
          : location
      );
      axios
        .put(`${appLink}/users/${user.id}/`, {
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          favorites: user.favorites,
          addresses: newAddress,
          accessibility: user.accessibility,
        })
        .then((resp) => {
          dispatch(loginAction(localStorage.getItem("userId")));
          alert("address changed succesfully");
        })
        .catch((error) => {});
    } else {
      setAddressMsg("Inputs cant be empty");
    }
  };
  //adds address
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
  useEffect(() => {
    if (isLogged && user) {
      if (user.addresses.length === 0) {
        newAddressHandler();
      }
    }
  }, [user, isLogged]);
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
        .put(`${appLink}/users/${user.id}/`, {
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          favorites: user.favorites,
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
          dispatch(loginAction(localStorage.getItem("userId")));
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
    localStorage.removeItem("userId");
    history.push("/customer/account/login");
  };
  //deletes address
  const deleteAddressHandler = (id) => {
    axios
      .put(`${appLink}/users/${user.id}/`, {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        favorites: user.favorites,
        addresses: user.addresses.filter((info) => info.id !== id),
        orders: user.orders,
        accessibility: user.accessibility,
      })
      .then((resp) => {
        dispatch(loginAction(localStorage.getItem("userId")));
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
                        required
                        onChange={(e) => setUsersName(e.target.value)}
                      />
                    </span>
                    <span>
                      <TextField
                        label="Surname"
                        value={usersSurname}
                        required
                        className="input"
                        onChange={(e) => setUsersSurname(e.target.value)}
                      />
                    </span>
                    <span>
                      <TextField
                        label="Email"
                        type="email"
                        required
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
                        required
                        className="input"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <TextField
                        label="New password"
                        type="password"
                        value={newPassword}
                        required
                        className="input"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <TextField
                        label="Confirm password"
                        type="email"
                        value={confirmNewPassword}
                        required
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
                                  {(
                                    order.cartPrice + order.deliveryPrice
                                  ).toFixed(2)}{" "}
                                  GBP
                                </b>
                              </span>
                            </div>
                            <div className="items-image">
                              {order.items.map((item) => (
                                <img
                                  src={item.images[0].img}
                                  alt={item.name}
                                  key={item.id}
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
                  <Order />
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
      margin: 0rem 0.5rem;
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
      margin: 0rem 0.5rem;
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
          display: flex;
          text-transform: upperCase;
          justify-content: center;
          width: 100%;
          background-color: black;
          margin: 1rem 0;
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
        width: 90%;
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
    }
  }
`;
export default AccountPage;
