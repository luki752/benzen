import React from "react";
//styling
import styled from "styled-components";
//router
import { Link, useHistory } from "react-router-dom";
//redux
import { useSelector } from "react-redux";

const LoginDropdown = ({ loginDropdownOpen, setLoginDropdown, mv }) => {
  //state
  const history = useHistory();
  const { isLogged, user } = useSelector((state) => state.login);
  //handlers
  const LogOutHandler = () => {
    localStorage.removeItem("userId");
    history.push("/customer/account/login");
  };
  return (
    <LoginDropdownComponent
      style={{ display: loginDropdownOpen && mv.matches ? "flex" : "none" }}
      onMouseEnter={() => setLoginDropdown(true)}
      onMouseLeave={() => setLoginDropdown(false)}
    >
      {isLogged ? (
        <>
          <div className="upper-login">
            <span style={{ fontWeight: "bold" }}>
              {user.name},
              <div className="greetings">
                <div style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                  nice to have you with us
                </div>{" "}
                <div className="log-out" onClick={() => LogOutHandler()}>
                  log out
                </div>
              </div>
            </span>
          </div>

          <div className="bottom-login">
            <Link to="/customer/account/orders" className="link">
              <span>orders</span>
            </Link>
            <Link to="/customer/account/info" className="link">
              <span>account info</span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="upper-login">
            <span>Do you have an account?</span>
            <Link to="/customer/account/login">
              <button>Log in</button>
            </Link>
          </div>

          <div className="bottom-login">
            <span>Is this your first visit?</span>
            <p>
              It'll take a short time and you'll gain access to multiple
              features
            </p>
            <Link to="/customer/account/register">
              <button className="button-white">Register</button>
            </Link>
          </div>
        </>
      )}
    </LoginDropdownComponent>
  );
};

const LoginDropdownComponent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 2.4rem;
  width: 30vh;
  z-index: 10;
  display: flex;
  flex-direction: column;
  .upper-login {
    padding: 2rem;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    .greetings {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      .log-out {
        color: black;
        &:hover {
          cursor: pointer;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
    span {
      padding: 1rem 0rem;
      font-weight: bold;

      &:first-letter {
        text-transform: upperCase;
      }
    }

    button {
      padding: 1rem;
      width: 7rem;
      font-size: 1rem;
      background-color: black;
      color: white;
      transition: 0.3s ease-in all;
      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
        cursor: pointer;
      }
    }
  }
  .bottom-login {
    padding: 2rem;
    font-size: 1rem;
    background-color: #f3f3f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      padding: 1rem 0rem;
      font-weight: bold;
      &:hover {
        color: rgba(0, 0, 0, 0.6);
      }
    }
    p {
      font-size: 0.8rem;
    }
    button {
      color: black;
      border: 1px solid black;
      &:hover {
        background-color: rgba(0, 0, 0, 1);
        cursor: pointer;
        color: white;
      }
    }
  }
`;

export default LoginDropdown;
