import React, { useState } from "react";
//styling
import styled from "styled-components";
//router
import { Link, useHistory } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadQuestion } from "../actions/itemsAction";
//material ui
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
//icons
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import MenuIcon from "@material-ui/icons/Menu";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
//components
import SaleDropdown from "./SaleDropdown";
import WomanDropdown from "../components/WomanDropdown";
import ManDropdown from "../components/ManDropdown";
import LoginDropdown from "../components/LoginDropdown";
import HamburgerMenu from "../components/HamburgerMenu";
const Nav = () => {
  //open dropdown
  const [navOpen, setNavOpen] = useState(false);
  const [manDropdownOpen, SetManDropdown] = useState(false);
  const [womanDropdownOpen, SetWomanDropdown] = useState(false);
  const [loginDropdownOpen, setLoginDropdown] = useState(false);
  const [saleDropdownOpen, setSaleDropdown] = useState(false);
  //search
  const [manSearch, setManSearch] = useState("");
  const [womanSearch, setWomanSearch] = useState("");
  //size
  const mv = window.matchMedia("(min-width: 1000px)");
  //selector etc
  const { isLogged, user } = useSelector((state) => state.login);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const manSearchHandler = () => {
    dispatch(loadQuestion(manSearch));
    history.push("/answer/man");
    setNavOpen(false);
    SetManDropdown(false);
    setManSearch("");
  };
  const womanSearchHandler = () => {
    dispatch(loadQuestion(womanSearch));
    history.push("/answer/woman");
    SetWomanDropdown(false);
    setWomanSearch("");
  };
  return (
    <NavComponent>
      <div className="nav-left-menu">
        <ul>
          <li>
            <MenuIcon onClick={() => setNavOpen(!navOpen)} />
          </li>
          <li className="nav-logo">
            <Link to="/" className="link">
              benzen
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav-middle-menu">
        <ul>
          <li>
            <Link to="/sale" className="link">
              <Button
                className="gender-button"
                style={{
                  textDecoration: saleDropdownOpen ? "underline" : "none",
                  color: "red",
                }}
                onMouseEnter={() => setSaleDropdown(true)}
                onMouseLeave={() => setSaleDropdown(false)}
              >
                sale up to 50%
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/woman" className="link">
              <Button
                className="gender-button"
                style={{
                  textDecoration: womanDropdownOpen ? "underline" : "none",
                }}
                onMouseEnter={() => SetWomanDropdown(true)}
                onMouseLeave={() => SetWomanDropdown(false)}
              >
                women
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/man" className="link">
              <Button
                className="gender-button"
                style={{
                  textDecoration: manDropdownOpen ? "underline" : "none",
                }}
                onMouseEnter={() => SetManDropdown(true)}
                onMouseLeave={() => SetManDropdown(false)}
              >
                men
              </Button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav-right-menu">
        <ul>
          <li>
            {" "}
            {isLogged && (
              <Link
                to="/admin/panel/orders"
                className="link icon-link"
                style={{
                  display:
                    user.accessibility === "admin" ||
                    user.accessibility === "headAdmin"
                      ? "block"
                      : "none",
                }}
              >
                <Tooltip title="admin panel">
                  <IconButton>
                    <AssignmentIndIcon className="nav-icon" />{" "}
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </li>

          <li>
            {" "}
            <Link
              to="/favorites"
              className="link icon-link"
              style={{ display: isLogged ? "block" : "none" }}
            >
              <Tooltip title="favorites">
                <IconButton>
                  <FavoriteIcon className="nav-icon" />{" "}
                </IconButton>
              </Tooltip>
            </Link>
          </li>
          <li>
            {" "}
            {cart && (
              <Link to="/checkout/cart" className="link icon-link">
                <Tooltip title="cart">
                  <IconButton>
                    <LocalMallIcon className="nav-icon" />({cart.length})
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </li>

          <li>
            {" "}
            <Link
              to={
                isLogged
                  ? "/customer/account/orders"
                  : "/customer/account/login"
              }
              className="link icon-link"
            >
              <Tooltip title="account">
                <IconButton>
                  <AccountCircleIcon
                    onMouseEnter={() => setLoginDropdown(true)}
                    onMouseLeave={() => setLoginDropdown(false)}
                    className="nav-icon"
                  />
                </IconButton>
              </Tooltip>
            </Link>{" "}
          </li>
        </ul>
      </div>
      <HamburgerMenu
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        setManSearch={setManSearch}
        manSearchHandler={manSearchHandler}
        womanSearch={womanSearch}
        setWomanSearch={setWomanSearch}
        womanSearchHandler={womanSearchHandler}
      />
      <ManDropdown
        manDropdownOpen={manDropdownOpen}
        SetManDropdown={SetManDropdown}
        manSearch={manSearch}
        setManSearch={setManSearch}
        manSearchHandler={manSearchHandler}
        navOpen={navOpen}
      />
      <WomanDropdown
        womanDropdownOpen={womanDropdownOpen}
        SetWomanDropdown={SetWomanDropdown}
        womanSearch={womanSearch}
        setWomanSearch={setWomanSearch}
        womanSearchHandler={womanSearchHandler}
        navOpen={navOpen}
      />
      <LoginDropdown
        setLoginDropdown={setLoginDropdown}
        loginDropdownOpen={loginDropdownOpen}
        mv={mv}
      />
      <SaleDropdown
        saleDropdownOpen={saleDropdownOpen}
        setSaleDropdown={setSaleDropdown}
      />
    </NavComponent>
  );
};

const NavComponent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .nav-left-menu {
    ul {
      display: flex;
      list-style: none;
      align-items: center;
      margin: 0;
      .nav-logo {
        text-transform: upperCase;
        font-size: 1.5rem;
        padding: 0rem 1rem;
        letter-spacing: 4px;
        font-weight: bold;
        @media screen and (max-width: 1000px) {
          font-size: 1.5rem;
          letter-spacing: 1px;
          padding: 0rem 0.2rem;
        }
      }
      li {
        padding: 0rem 1rem;
        @media screen and (max-width: 1000px) {
          padding: 0rem 0.5rem;
        }
        &:hover {
          cursor: pointer;
        }
        &:first-child {
          display: none;
          @media screen and (max-width: 1000px) {
            display: block;
          }
        }
      }
    }
  }

  .nav-middle-menu {
    ul {
      display: flex;
      list-style: none;
      align-items: center;
      margin: 0;
      @media screen and (max-width: 1000px) {
        display: none;
      }
      li {
        .gender-button {
          font-family: "Raleway", sans-serif;
          font-size: 1rem;
          padding: 0rem 1rem;
        }
      }
    }
  }

  .nav-right-menu {
    ul {
      display: flex;
      list-style: none;
      align-items: center;
      margin: 0;
      li {
        padding: 0rem 0.25rem;
        @media screen and (max-width: 1000px) {
          padding: 0rem 0rem;
          .MuiButtonBase-root,
          .MuiIconButton-root {
            padding: 0;
            margin: 0;
          }
        }
        .icon-link {
          @media screen and (max-width: 1000px) {
            margin: 0rem 0.5rem;
          }
        }
        .nav-icon {
          color: black;
          padding: 0;
          margin: 0;
          &:hover {
            cursor: pointer;
          }
          @media screen and (max-width: 1000px) {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
`;

export default Nav;
