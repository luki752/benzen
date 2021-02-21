import React, { useState, useLayoutEffect, useEffect } from "react";
//react router
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
//api
import { loginUrl, registerUrl } from "../api";
//redux
import { useDispatch } from "react-redux";
import { loginAction } from "../actions/loginAction";
//styling
import styled from "styled-components";
//material ui
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
//icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
//history
import HistoryIcon from "@material-ui/icons/History";
import axios from "axios";
//encrypting password
import sha512 from "crypto-js/sha512";
import Base64 from "crypto-js/enc-base64";

const AccountPage = () => {
  //state
  const [size, setSize] = useState([0, 0]);
  const [mv, setMV] = useState(false);
  //login state
  const [loginPasswordView, setLoginPasswordView] = useState(true);
  const [loginEmailInput, setLoginEmail] = useState("");
  const [loginPasswordInput, setLoginPassword] = useState("");
  const [falseLogin, setFalseLogin] = useState(false);
  const [falseEmail, setFalseEmail] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState(false);
  //register state
  const [registerPasswordView, setRegisterPasswordView] = useState(true);
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmailInput, setRegisterEmail] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerSurname, setRegisterSurname] = useState("");
  const [registerError, setRegisterError] = useState(false);
  const [registerErrorMsg, setRegisterErrorMsg] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  //location
  const location = useLocation();
  const dispatch = useDispatch();
  const pathName = location.pathname.split("/")[3];
  const order = location.pathname.split("/")[4];
  //history
  const history = useHistory();
  useEffect(() => {
    dispatch(loginAction(localStorage.getItem("userId")));
  }, [dispatch]);
  //getting width
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
  }, [size]);
  //handlers
  const loginHandler = (e) => {
    e.preventDefault();
    axios.get(loginUrl(loginEmailInput)).then((res) => {
      if (res.data[0]) {
        if (
          res.data[0].password === sha512(loginPasswordInput).toString(Base64)
        ) {
          axios
            .put(`http://localhost:3000/users/${res.data[0].id}/`, {
              name: res.data[0].name,
              surname: res.data[0].surname,
              email: res.data[0].email,
              password: res.data[0].password,
              favorites: res.data[0].favorites,
              addresses: res.data[0].addresses,
              accessibility: res.data[0].accessibility,
            })
            .then((resp) => {
              localStorage.setItem("userId", res.data[0].id);
              dispatch(loginAction(localStorage.getItem("userId")));
              history.push(
                order ? "/checkout/order" : "/customer/account/orders"
              );
            })
            .catch((error) => {});
        } else {
          setLoginErrorMsg("incorrect password");
          setFalseLogin(true);
          setFalseEmail(false);
        }
      } else {
        setFalseEmail(true);
        setFalseLogin(false);
        setLoginErrorMsg("Theres no account with this email");
      }
    });
  };
  const registerHandler = (e) => {
    e.preventDefault();
    axios.get(registerUrl(registerEmailInput)).then((res) => {
      if (res.data[0]) {
        setRegisterSuccess(false);
        setRegisterError(true);
        setRegisterErrorMsg("Theres already an account with that email");
      } else {
        if (
          registerEmailInput !== "" &&
          registerEmailInput.includes("@") &&
          registerPassword !== "" &&
          registerName !== "" &&
          registerSurname !== ""
        ) {
          axios
            .post("http://localhost:3000/users", {
              name: registerName,
              surname: registerSurname,
              email: registerEmailInput,
              password: sha512(registerPassword).toString(Base64),
              accessibility: "customer",
              favorites: [],
              addresses: [],
            })
            .then((resp) => {
              setRegisterSuccess(true);
              setRegisterError(false);
              setRegisterEmail("");
              setRegisterName("");
              setRegisterPassword("");
              setRegisterEmail("");
              dispatch(loginAction());
            })
            .catch((error) => {});
        } else {
          setRegisterSuccess(false);
          setRegisterError(true);
          setRegisterErrorMsg("Inputs cant be empty");
        }
      }
    });
  };
  return (
    <AccountPageComponent
      style={{
        flexDirection: mv ? "row" : "column",
      }}
    >
      <div
        className="left-side"
        style={{ flex: pathName === "login" ? "1.2" : "1" }}
      >
        <h2>Are you a user?</h2>
        <span
          style={{
            color: "rgba(245, 66, 66,0.7)",
            display:
              (pathName === "login" && falseLogin) ||
              (pathName === "login" && falseEmail)
                ? "block"
                : "none",
          }}
        >
          {loginErrorMsg}
        </span>
        <form>
          <div
            className="login"
            style={{ display: pathName === "login" ? "flex" : "none" }}
          >
            <div className="email">
              <TextField
                label="Email"
                type="email"
                required
                value={loginEmailInput}
                error={falseEmail ? true : false}
                className="input"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="password">
              <TextField
                className="input"
                label="Password"
                required
                value={loginPasswordInput}
                error={falseLogin ? true : false}
                type={loginPasswordView ? "password" : ""}
                onChange={(e) => setLoginPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <VisibilityIcon
                        onClick={() => setLoginPasswordView(!loginPasswordView)}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <Link to="/customer/account/login">
            <button
              type="submit"
              onClick={(e) => (pathName === "login" ? loginHandler(e) : "")}
            >
              Sign in
            </button>
          </Link>
          {order && (
            <div className="anonymous-order">
              <span>
                <Link to="/checkout/order" className="link">
                  I want to purchase without logging in
                </Link>
              </span>
            </div>
          )}
        </form>
      </div>
      <div
        className="right-side"
        style={{ flex: pathName === "register" ? "1.2" : "1" }}
      >
        <div className="register">
          <h2>Is this your first visit?</h2>
          <span
            style={{
              display: registerError ? "block" : "none",
              color: "red",
            }}
          >
            {registerErrorMsg}
          </span>
          <span
            style={{
              display: registerSuccess ? "block" : "none",
              color: "green",
            }}
          >
            Registration was successful
          </span>
          <form>
            <div
              className="register-form"
              style={{ display: pathName === "register" ? "flex" : "none" }}
            >
              <div className="email">
                <TextField
                  label="Email"
                  type="email"
                  required
                  value={registerEmailInput}
                  className="input"
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </div>
              <div className="name">
                <TextField
                  className="input name-input"
                  label="Name"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
                <TextField
                  className="input name-input"
                  label="Surname"
                  required
                  value={registerSurname}
                  onChange={(e) => setRegisterSurname(e.target.value)}
                />
              </div>
              <div className="password">
                <TextField
                  className="input"
                  label="Password"
                  required
                  value={registerPassword}
                  type={registerPasswordView ? "password" : ""}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <VisibilityIcon
                          onClick={() =>
                            setRegisterPasswordView(!registerPasswordView)
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <Link to="/customer/account/register">
              <button
                type="submit"
                onClick={(e) =>
                  pathName === "register" ? registerHandler(e) : ""
                }
              >
                Create account
              </button>
            </Link>
          </form>
          <div className="info">
            <span>you'll gain</span>
          </div>
          <div className="info-gains">
            <h3>
              <FavoriteIcon className="icons" />
              Favorite clothes
            </h3>
            <h3>
              <SearchIcon className="icons" />
              Convenient way to track your order
            </h3>
            <h3>
              <HistoryIcon className="icons" />
              Easy access to order history
            </h3>
          </div>
        </div>
      </div>
    </AccountPageComponent>
  );
};

const AccountPageComponent = styled.div`
  display: flex;
  min-height: 70vh;
  justify-content: center;
  align-items: center;
  .left-side {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    transform: 0.3s ease-in all;
    padding: 1rem 0rem;
    .login {
      flex-direction: column;
    }
    h2 {
      font-weight: bold;
      font-size: 1.5rem;
    }
    .input {
      width: 20rem;
      padding: 1rem 0rem;
    }
    button {
      border: 1px solid black;
      padding: 0.5rem;
      width: 20rem;
      margin: 1rem 0rem;
      background-color: black;
      font-weight: bold;
      color: white;
      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
    p {
      font-size: 1rem;
      font-weight: bold;
      text-decoration: underline;
    }
  }
  .right-side {
    background-color: #f3f3f5;
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    transform: 0.3s ease-in all;
    h2 {
      padding: 2rem 0rem;
      font-weight: bold;
      font-size: 1.5rem;
    }
    button {
      border: 1px solid black;
      padding: 0.5rem;
      width: 20rem;
      margin: 1rem 0rem;
      background-color: transparent;
      font-weight: bold;
      color: black;
      &:hover {
        background-color: black;
        color: white;
      }
    }
    .info {
      text-align: left;
      padding: 1rem 2rem;
      font-size: 0.9rem;
      text-transform: upperCase;
    }
    .info-gains {
      text-align: left;
      padding: 1rem;
      h3 {
        font-size: 1rem;
        padding: 0.8rem 0rem;
      }

      .icons {
        color: rgba(0, 0, 0, 0.6);
        margin: 0rem 1rem;
      }
    }
  }
  .register {
    .register-form {
      flex-direction: column;
    }
    .email,
    .password {
      .input {
        width: 42vh;
      }
    }
    .name {
      display: flex;
      .name-input {
        flex: 1;
        margin-right: 1rem;
      }
    }
  }
`;
export default AccountPage;
