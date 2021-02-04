import React, { useState, useLayoutEffect, useEffect } from "react";
//react router
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
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

const AccountPage = () => {
  //state
  const [size, setSize] = useState([0, 0]);
  const [mv, setMV] = useState(false);
  const [registerPassword, setRegisterPassword] = useState(true);
  const [loginPassword, setLoginPassword] = useState(true);
  //useEffects
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

  const location = useLocation();
  const pathName = location.pathname.split("/")[3];
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
        <div
          className="login"
          style={{ display: pathName === "login" ? "flex" : "none" }}
        >
          <div className="email">
            <TextField label="Email" type="email" className="input" />
          </div>
          <div className="password">
            <TextField
              className="input"
              label="Password"
              type={loginPassword ? "password" : ""}
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
          <button>Sign in</button>
        </Link>
      </div>
      <div
        className="right-side"
        style={{ flex: pathName === "register" ? "1.2" : "1" }}
      >
        <div className="register">
          <h2>Is this your first visit?</h2>
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
                        onClick={() => setRegisterPassword(!registerPassword)}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <Link to="/customer/account/register">
            <button>Create account</button>
          </Link>
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
