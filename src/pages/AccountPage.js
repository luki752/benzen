import React, { useState, useLayoutEffect, useEffect } from "react";
//react router
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
//api
import { loginUrl, registerUrl } from "../api";
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
  //users State
  const [usersName, setUsersName] = useState("");
  const [usersSurname, setUsersSurname] = useState("");
  const [usersEmail, setUsersEmail] = useState("");
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
  const loginHandler = (e) => {
    e.preventDefault();
    axios.get(loginUrl(loginEmailInput)).then((res) => {
      if (res.data[0]) {
        if (
          res.data[0].password === sha512(loginPasswordInput).toString(Base64)
        ) {
          dispatch(loginAction(res.data[0]));
          setUsersName(res.data[0].name);
          setUsersSurname(res.data[0].surname);
          setUsersEmail(res.data[0].email);
          history.push("/customer/account/orders");
        } else {
          setLoginErrorMsg("incorrect password");
          setFalseLogin(true);
        }
      } else {
        setFalseLogin(true);
        setLoginErrorMsg("incorrect email");
      }
    });
  };
  const registerHandler = (e) => {
    e.preventDefault();
    axios.get(registerUrl(registerEmailInput)).then((res) => {
      console.log(res.data[0]);
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
              favorites: [],
              orders: [],
            })
            .then((resp) => {
              setRegisterSuccess(true);
              setRegisterError(false);
              setRegisterEmail("");
              setRegisterName("");
              setRegisterPassword("");
              setRegisterEmail("");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setRegisterSuccess(false);
          setRegisterError(true);
          setRegisterErrorMsg("Inputs cant be empty");
        }
      }
    });
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
                    <span>Your account</span>
                    <div className="line"></div>
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
                        onChange={(e) => setUsersName(e.target.value)}
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
                    <div className="line"></div>
                    <div className="password-change">
                      <span>Password change</span>
                      <TextField
                        label="Your Password"
                        type="password"
                        className="input"
                        onChange={(e) => setUsersEmail(e.target.value)}
                      />
                      <TextField
                        label="New password"
                        type="password"
                        className="input"
                        onChange={(e) => setUsersEmail(e.target.value)}
                      />
                      <TextField
                        label="Confirm password"
                        type="email"
                        className="input"
                        onChange={(e) => setUsersEmail(e.target.value)}
                      />
                    </div>
                    <div className="line"></div>
                    <div className="delete-acc">
                      <span>Delete account</span>
                    </div>
                    <div className="line"></div>
                    <div className="save-button">
                      <button>Save Changes</button>
                    </div>
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
                display: pathName === "login" && falseLogin ? "block" : "none",
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
                    className="input"
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="password">
                  <TextField
                    className="input"
                    label="Password"
                    type={loginPasswordView ? "password" : ""}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <VisibilityIcon
                            onClick={() =>
                              setLoginPasswordView(!loginPasswordView)
                            }
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
                      className="input"
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>
                  <div className="name">
                    <TextField
                      className="input name-input"
                      label="Name"
                      onChange={(e) => setRegisterName(e.target.value)}
                    />
                    <TextField
                      className="input name-input"
                      label="Surname"
                      onChange={(e) => setRegisterSurname(e.target.value)}
                    />
                  </div>
                  <div className="password">
                    <TextField
                      className="input"
                      label="Password"
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
      margin-left: 2rem;
      @media screen and (max-width: 1000px) {
        margin: 0rem;
      }
      .info {
        display: flex;
        flex-direction: column;
        text-align: left;
        .input {
          width: 15rem;
        }
        .password-change {
          display: flex;
          flex-direction: column;
        }
        button {
          width: fit-content;
          background-color: black;
          color: White;
          border: 1px solid black;
          &:hover {
            background-color: white;
            color: black;
          }
          @media screen and (max-width: 1000px) {
            font-size: 2rem;
          }
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
