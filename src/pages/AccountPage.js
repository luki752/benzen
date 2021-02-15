import React, { useState, useEffect } from "react";
//react router
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loginAction } from "../actions/loginAction";
//styling
import styled from "styled-components";
//material ui
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
//icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import HomeIcon from "@material-ui/icons/Home";
//components
import Address from "../components/address";
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
  //account state
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [accountErrorMsg, setAccountErrorMsg] = useState("");
  const [action, setAction] = useState("change");
  //location
  const location = useLocation();
  const pathName = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction());
  }, [dispatch]);
  const { isLogged, user } = useSelector((state) => state.login);
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
          orders: user.orders,
          addresses: user.addresses,
        })
        .then((resp) => {
          setPasswordErrorMsg("Password changed successfully");
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
              orders: user.orders,
              addresses: user.addresses,
            })
            .then((resp) => {
              setPasswordErrorMsg("Password changed successfully");
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
        dispatch({
          type: "LOG_OUT",
          payload: {
            login: false,
            user: [],
          },
        });
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
      usersEmail !== "" &&
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
            })
          : location
      );
      axios
        .put(`http://localhost:3000/users/${user.id}/`, {
          name: usersName,
          surname: usersSurname,
          email: usersEmail,
          password: user.password,
          favorites: user.favorites,
          orders: user.orders,
          addresses: newAddress,
        })
        .then((resp) => {
          window.scrollTo(0, 0);
          alert("address changed succesfully");
        })
        .catch((error) => {});
    } else {
      setAddressMsg("Inputs cant be empty");
    }
  };

  const newAddressHandler = () => {
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
    axios
      .put(`http://localhost:3000/users/${user.id}/`, {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        favorites: user.favorites,
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
          },
        ],
        orders: user.orders,
      })
      .then((resp) => {
        alert("Address deleted successfully");
      })
      .catch((error) => {});
  };
  const checkboxHandler = (e) => {
    setNewAddressCheckbox(e.target.checked);
    if (newAddressCheckbox === false) {
      newAddressHandler();
    }
  };
  console.log(user);

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
              {user.email === "admin@admin.com" && (
                <Link to="/add-item" className="link">
                  <li>
                    <AddCircleOutlineIcon className="icon" /> Add Item
                  </li>
                </Link>
              )}
              <li
                className="log-out"
                onClick={() =>
                  dispatch({
                    type: "LOG_OUT",
                    payload: {
                      login: false,
                      user: [],
                    },
                  })
                }
              >
                <MeetingRoomIcon /> Log out
              </li>
            </ul>
          </div>
          {user && (
            <div className="right-side">
              {pathName === "info" && (
                <div className="infoComponent">
                  <div className="info">
                    <span>Your account</span>
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
              {pathName === "orders" && (
                <div className="orders">
                  {user.orders.length > 0 ? (
                    <>
                      {user.orders.map((item) => (
                        <div className="order">{item.name}</div>
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
              {pathName === "address" && (
                <div className="addressComponent">
                  <h2>My account</h2>
                  <div className="line"></div>
                  <h2>Address</h2>
                  <div className="choose-address">
                    {user.addresses.map((info) => (
                      <Address
                        key={info.id}
                        name={info.name}
                        surname={info.surname}
                        street={info.street}
                        houseNr={info.houseNr}
                        postalCode={info.postalCode}
                        phone={info.phone}
                        city={info.city}
                        id={info.id}
                        usersId={user.id}
                        setUsersAddressName={setUsersAddressName}
                        setUsersAddressSurname={setUsersAddressSurname}
                        setUsersCity={setUsersCity}
                        setUsersPhone={setUsersPhone}
                        setUsersHouseNr={setUsersHouseNr}
                        setUsersStreet={setUsersStreet}
                        setUsersPostalCode={setUsersPostalCode}
                        setAction={setAction}
                        usersAddressName={usersAddressName}
                        usersAddressSurname={usersAddressSurname}
                        usersCity={usersCity}
                        usersPhone={usersPhone}
                        usersStreet={usersStreet}
                        usersPostalCode={usersPostalCode}
                        setNewAddressCheckbox={setNewAddressCheckbox}
                        setAddressId={setAddressId}
                      />
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
                  <div className="line"></div>

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
  }
`;
export default AccountPage;
