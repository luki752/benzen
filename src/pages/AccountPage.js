import React, { useState, useLayoutEffect, useEffect } from "react";
//react router
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
//api
import { loginUrl } from "../api";
//redux
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../actions/loginAction";
//styling
import styled from "styled-components";
//material ui
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
//icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import DraftsIcon from "@material-ui/icons/Drafts";
import SearchIcon from "@material-ui/icons/Search";
//history
import HistoryIcon from "@material-ui/icons/History";
import axios from "axios";

const AccountPage = () => {
  //state
  const [size, setSize] = useState([0, 0]);
  const [mv, setMV] = useState(false);
  const [registerPassword, setRegisterPassword] = useState(true);
  const [loginPassword, setLoginPassword] = useState(true);
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [falseLogin, setFalseLogin] = useState(false);
  //location
  const location = useLocation();
  const pathName = location.pathname.split("/")[3];
  //history
  const history = useHistory();
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
  const { isLogged, user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  //handlers
  const successfulLogin = (x) => {
    dispatch(loginAction(x));
    history.push("/customer/account/orders");
  };
  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .get(loginUrl(emailInput, passwordInput))
      .then((res) =>
        res.data[0] ? successfulLogin(res.data[0]) : setFalseLogin(true)
      );
  };
  return (
    <>
      {isLogged ? (
        <LoggedInComponent>
          <div className="left-side">
            <ul>
              <Link to="/customer/account/orders" className="link">
                <li className={pathName === "orders" ? "active" : ""}>
                  Orders
                </li>
              </Link>
              <Link to="/customer/account/info" className="link">
                <li className={pathName === "info" ? "active" : ""}>
                  Account info
                </li>
              </Link>
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
                Log out
              </li>
            </ul>
          </div>
          {user && (
            <div className="right-side">
              {pathName === "info" ? (
                <div className="infoComponent">
                  <div className="info">
                    <span>
                      <b>Name:</b> {user.name}
                    </span>
                    <span>
                      <b>Surname:</b> {user.surname}
                    </span>
                    <span>
                      <b>Email:</b> {user.email}
                    </span>
                    <span>
                      <b>Password:</b> {user.password}
                    </span>
                  </div>
                </div>
              ) : (
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
            </div>
          )}
        </LoggedInComponent>
      ) : (
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
                display: pathName === "login" ? "block" : "none",
              }}
            >
              {falseLogin ? "Invalid login or password." : ""}
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
                    className="input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="password">
                  <TextField
                    className="input"
                    label="Password"
                    type={loginPassword ? "password" : ""}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <VisibilityIcon
                            onClick={() => setLoginPassword(!loginPassword)}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <p>I forgot my password</p>
              </div>

              <Link to="/customer/account/login">
                <button
                  type="submit"
                  onClick={(e) => (pathName === "login" ? loginHandler(e) : "")}
                >
                  Sign in
                </button>
              </Link>
            </form>
          </div>
          <div
            className="right-side"
            style={{ flex: pathName === "register" ? "1.2" : "1" }}
          >
            <div className="register">
              <h2>Is this your first visit?</h2>
              <form>
                <div
                  className="register-form"
                  style={{ display: pathName === "register" ? "flex" : "none" }}
                >
                  <div className="email">
                    <TextField label="Email" type="email" className="input" />
                  </div>
                  <div className="name">
                    <TextField className="input name-input" label="Name" />
                    <TextField className="input name-input" label="Surname" />
                  </div>
                  <div className="password">
                    <TextField
                      className="input"
                      label="Password"
                      type={registerPassword ? "password" : ""}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityIcon
                              onClick={() =>
                                setRegisterPassword(!registerPassword)
                              }
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <Link to="/customer/account/register">
                  <button type="submit">Create account</button>
                </Link>
              </form>
              <div className="info">
                <span>you'll gain</span>
              </div>
              <div className="info-gains">
                <h3>
                  <DraftsIcon className="icons" />
                  10% discount for newsletter sing up
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
      )}
    </>
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
      align-items: Center;
      .info {
        display: flex;
        flex-direction: column;
        text-align: left;
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
          margin: 0rem 1rem;
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
