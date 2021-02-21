import React, { useState, useEffect } from "react";
//styling
import styled from "styled-components";
//router
import { Link, useHistory } from "react-router-dom";
//axios
import axios from "axios";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { loadQuestion } from "../actions/itemsAction";
//material ui
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
//icons
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

const Nav = () => {
  //state
  const [navOpen, setNavOpen] = useState(false);
  const [manDropdownOpen, SetManDropdown] = useState(false);
  const [womanDropdownOpen, SetWomanDropdown] = useState(false);
  const [loginDropdownOpen, setLoginDropdown] = useState(false);
  const [saleDropdownOpen, setSaleDropdown] = useState(false);
  const [manSearch, setManSearch] = useState("");
  const [womanSearch, setWomanSearch] = useState("");
  const [menDiscountsList, setMenDiscountsList] = useState([]);
  const [womenDiscountsList, setWomenDiscountsList] = useState([]);
  const mv = window.matchMedia("(min-width: 1000px)");
  const { isLogged, user } = useSelector((state) => state.login);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  //handlers
  const linkHandler = () => {
    window.scrollTo(0, 0);
    setNavOpen(!navOpen);
  };
  const manSearchHandler = () => {
    dispatch(loadQuestion("man", manSearch));
    history.push("/answer/man");
    setNavOpen(false);
  };
  const womanSearchHandler = () => {
    dispatch(loadQuestion("woman", womanSearch));
    history.push("/answer/woman");
    setNavOpen(false);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/woman?discount=true")
      .then((res) =>
        setWomenDiscountsList([...new Set(res.data.map((a) => a.item))])
      );
    axios
      .get("http://localhost:3000/man?discount=true")
      .then((res) =>
        setMenDiscountsList([...new Set(res.data.map((a) => a.item))])
      );
  }, [dispatch]);
  const LogOutHandler = () => {
    localStorage.removeItem("userId");
    history.push("/customer/account/login");
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
      <HamburgerMenu style={{ display: navOpen ? "flex" : "none" }}>
        <div className="component-close-icon">
          <CloseIcon
            className="close-icon"
            onClick={() => setNavOpen(!navOpen)}
          />
        </div>
        <div className="accordion">
          {/* MAN ACCORDION */}

          {/* Whole accordion */}
          <Accordion className="one-accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h1 style={{ color: "red" }}>Sale up to 50%</h1>
            </AccordionSummary>
            <AccordionDetails>
              {/* men sale */}
              <Accordion className="accordion-within">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h1 style={{ color: "red" }}>Men</h1>
                </AccordionSummary>
                {menDiscountsList.map((item) => (
                  <Link to={`/sale/man/${item}`} className="link" key={item}>
                    <AccordionDetails
                      onClick={() => linkHandler()}
                      style={{ color: "red" }}
                    >
                      {item}
                    </AccordionDetails>
                  </Link>
                ))}
              </Accordion>
              <AccordionDetails></AccordionDetails>
            </AccordionDetails>
            {/* women sale */}
            <AccordionDetails>
              <Accordion className="accordion-within" style={{ color: "red" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h1>Women</h1>
                </AccordionSummary>
                {womenDiscountsList.map((item) => (
                  <Link to={`/sale/woman/${item}`} className="link" key={item}>
                    <AccordionDetails
                      onClick={() => linkHandler()}
                      style={{ color: "red" }}
                    >
                      {item}
                    </AccordionDetails>
                  </Link>
                ))}
              </Accordion>
              <AccordionDetails></AccordionDetails>
            </AccordionDetails>
          </Accordion>
          <Accordion className="one-accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h1>Man</h1>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="search"
                value={manSearch}
                className="accordion-input"
                onChange={(e) => setManSearch(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? manSearchHandler() : "")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      onClick={() => manSearchHandler()}
                    >
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </AccordionDetails>
            {/* accordion within main accordion */}
            <AccordionDetails>
              <Accordion className="accordion-within">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h1>Clothes</h1>
                </AccordionSummary>
                <Link to="/man/clothes/outerwear/coats" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Coats
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/outerwear/jackets" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    jackets
                  </AccordionDetails>
                </Link>
                <Link
                  to="/man/clothes/outerwear/puffer-jackets"
                  className="link"
                >
                  <AccordionDetails onClick={() => linkHandler()}>
                    puffer jackets
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/outerwear/vests" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    vests
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/sweaters" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Jumpers, Cardigans
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/shirts" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Shirts
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/sweatshirts" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Hoodies, sweatshirts
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/trousers" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Trousers
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/polos" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Polo shirts
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/t-shirts" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    T-shirts
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/jeans" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Jeans
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/blazers" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Blazers
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/suits" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Suits
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/nightwear" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Nightwear
                  </AccordionDetails>
                </Link>
                <Link to="/man/clothes/underwear" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Underwear
                  </AccordionDetails>
                </Link>
              </Accordion>
            </AccordionDetails>

            {/* accordion within main accordion */}
            <AccordionDetails>
              <Accordion className="accordion-within">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h1>Accessories</h1>
                </AccordionSummary>
                <Link to="/man/accessories/shoes" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Shoes
                  </AccordionDetails>
                </Link>
                <Link to="/man/accessories/bags" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Bags, toiletry bags
                  </AccordionDetails>
                </Link>
                <Link to="/man/accessories/hats" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Hats
                  </AccordionDetails>
                </Link>
                <Link to="/man/accessories/scarves" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    scarves
                  </AccordionDetails>
                </Link>
                <Link to="/man/accessories/gloves" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    gloves
                  </AccordionDetails>
                </Link>
                <Link to="/man/accessories/socks" className="link">
                  <AccordionDetails onClick={() => linkHandler()}>
                    Socks
                  </AccordionDetails>
                </Link>
              </Accordion>
            </AccordionDetails>
          </Accordion>

          {/* Whole accordion */}
          <Accordion className="one-accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Link to="/woman" className="link">
                <h1>Woman</h1>
              </Link>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="search"
                className="accordion-input"
                value={womanSearch}
                onChange={(e) => setWomanSearch(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" ? womanSearchHandler() : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      onClick={() => womanSearchHandler()}
                    >
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </AccordionDetails>

            {/* accordion within main accordion */}
            <AccordionDetails>
              <Accordion className="accordion-within">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h1>Clothes</h1>
                </AccordionSummary>
                <Link
                  to="/woman/clothes/outerwear/coats"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Coats</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/outerwear/jackets"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>jackets</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/outerwear/puffer-jackets"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>puffer jackets</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/outerwear/biker-jackets"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>biker jackets</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/outerwear/coats"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>
                    Coats, jackets, puffer jackets
                  </AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/dresses"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>dresses, jumpsuits</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/sweaters"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Jumpers, Cardigans</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/shirts"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Shirts</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/blouses"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Blouses</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/sweatshirts"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Hoodies, sweatshirts</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/trousers"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Trousers</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/skirts"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Skirts</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/t-shirts"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>T-shirts, tops</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/jeans"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Jeans</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/blazers"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Blazers</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/nightwear"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Nightwear</AccordionDetails>
                </Link>
                <Link
                  to="/woman/clothes/lingerie"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>lingerie</AccordionDetails>
                </Link>
              </Accordion>
            </AccordionDetails>

            {/* accordion within main accordion */}
            <AccordionDetails>
              <Accordion className="accordion-within">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h1>Shoes</h1>
                </AccordionSummary>
                <Link
                  to="/woman/shoes/boots"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Boots</AccordionDetails>
                </Link>
                <Link
                  to="/woman/shoes/heels"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Heels</AccordionDetails>
                </Link>
                <Link
                  to="/woman/shoes/flats"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Flats</AccordionDetails>
                </Link>
                <Link
                  to="/woman/shoes/leather"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Leather</AccordionDetails>
                </Link>
                <Link
                  to="/woman/shoes/sneakers"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Sneakers</AccordionDetails>
                </Link>
              </Accordion>
            </AccordionDetails>

            {/* accordion within main accordion */}
            <AccordionDetails>
              <Accordion className="accordion-within">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h1>Accessories</h1>
                </AccordionSummary>
                <Link
                  to="/woman/accessories/bags"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Bags, toiletry bags</AccordionDetails>
                </Link>
                <Link
                  to="/woman/accessories/hats"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>Hats</AccordionDetails>
                </Link>
                <Link
                  to="/woman/accessories/scarves"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>scarves</AccordionDetails>
                </Link>
                <Link
                  to="/woman/accessories/gloves"
                  className="link"
                  onClick={() => linkHandler()}
                >
                  <AccordionDetails>gloves</AccordionDetails>
                </Link>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        </div>
      </HamburgerMenu>
      <ManDropdown style={{ display: manDropdownOpen ? "flex" : "none" }}>
        <div
          className="dropdown-menu"
          onMouseEnter={() => SetManDropdown(true)}
          onMouseLeave={() => SetManDropdown(false)}
        >
          <ul>
            <li className="list-header">Clothes</li>
            <Link to="/man/clothes/outerwear/coats" className="link">
              <li>Coats, jackets, puffer jackets</li>
            </Link>
            <Link to="/man/clothes/sweaters" className="link">
              <li>Jumpers, Cardigans</li>
            </Link>
            <Link to="/man/clothes/shirts" className="link">
              <li>Shirts</li>
            </Link>
            <Link to="/man/clothes/sweatshirts" className="link">
              <li>Hoodies, sweatshirts</li>
            </Link>
            <Link to="/man/clothes/trousers" className="link">
              <li>Trousers</li>
            </Link>
            <Link to="/man/clothes/polos" className="link">
              <li>Polo shirts</li>
            </Link>
            <Link to="/man/clothes/t-shirts" className="link">
              <li>T-shirts</li>
            </Link>
            <Link to="/man/clothes/jeans" className="link">
              <li>Jeans</li>
            </Link>
            <Link to="/man/clothes/blazers" className="link">
              <li>Blazers</li>
            </Link>
            <Link to="/man/clothes/suits" className="link">
              <li>Suits</li>
            </Link>
            <Link to="/man/clothes/nightwear" className="link">
              <li>Nightwear</li>
            </Link>
            <Link to="/man/clothes/underwear" className="link">
              <li>Underwear</li>
            </Link>
          </ul>
          <ul>
            <li className="list-header">Accessories</li>
            <Link to="/man/accessories/shoes" className="link">
              <li>Shoes</li>
            </Link>
            <Link to="/man/accessories/bags" className="link">
              <li>Bags, toiletry bags</li>
            </Link>
            <Link to="/man/accessories/hats" className="link">
              <li>Hats</li>
            </Link>
            <Link to="/man/accessories/scarves" className="link">
              <li>Scarves</li>
            </Link>
            <Link to="/man/accessories/gloves" className="link">
              <li>Gloves</li>
            </Link>
            <Link to="/man/accessories/socks" className="link">
              <li>Socks</li>
            </Link>
          </ul>
          <ul>
            <li>
              <TextField
                label="search"
                value={manSearch}
                className="dropdown-input"
                onChange={(e) => setManSearch(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? manSearchHandler() : "")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      onClick={() => manSearchHandler()}
                    >
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </li>
          </ul>
        </div>
      </ManDropdown>
      <WomanDropdown style={{ display: womanDropdownOpen ? "flex" : "none" }}>
        <div
          className="dropdown-menu"
          onMouseEnter={() => SetWomanDropdown(true)}
          onMouseLeave={() => SetWomanDropdown(false)}
        >
          <ul>
            <li className="list-header">Clothes</li>
            <Link to="/woman/clothes/outerwear/coats" className="link">
              <li>Coats, jackets, puffer jackets</li>
            </Link>
            <Link to="/woman/clothes/dresses" className="link">
              <li>Dresses, jumpsuits</li>
            </Link>
            <Link to="/woman/clothes/sweaters" className="link">
              <li>Jumpers, Cardigans</li>
            </Link>
            <Link to="/woman/clothes/shirts" className="link">
              <li>Shirts</li>
            </Link>
            <Link to="/woman/clothes/blouses" className="link">
              <li>Blouses</li>
            </Link>
            <Link to="/woman/clothes/sweatshirts" className="link">
              <li>Hoodies, sweatshirts</li>
            </Link>
            <Link to="/woman/clothes/trousers" className="link">
              <li>Trousers</li>
            </Link>
            <Link to="/woman/clothes/skirts" className="link">
              <li>Skirts</li>
            </Link>
            <Link to="/woman/clothes/t-shirts" className="link">
              <li>T-shirts, tops</li>
            </Link>
            <Link to="/woman/clothes/jeans" className="link">
              <li>Jeans</li>
            </Link>
            <Link to="/woman/clothes/blazers" className="link">
              <li>Blazers</li>
            </Link>
            <Link to="/woman/clothes/nightwear" className="link">
              <li>Nightwear</li>
            </Link>
            <Link to="/woman/clothes/lingerie" className="link">
              <li>Lingerie</li>
            </Link>
          </ul>
          <ul>
            <li className="list-header">Shoes</li>
            <Link to="/woman/shoes/boots" className="link">
              <li>Boots</li>
            </Link>
            <Link to="/woman/shoes/heels" className="link">
              <li>Heels</li>
            </Link>
            <Link to="/woman/shoes/flats" className="link">
              <li>Flats</li>
            </Link>
            <Link to="/woman/shoes/leather" className="link">
              <li>Leather</li>
            </Link>
            <Link to="/woman/shoes/sneakers" className="link">
              <li>Sneakers</li>
            </Link>
          </ul>
          <ul>
            <li className="list-header">Accessories</li>
            <Link to="/woman/accessories/bags" className="link">
              <li>Bags, toiletry bags</li>
            </Link>
            <Link to="/woman/accessories/hats" className="link">
              <li>Hats</li>
            </Link>
            <Link to="/woman/accessories/scarves" className="link">
              <li>Scarves</li>
            </Link>
            <Link to="/woman/accessories/gloves" className="link">
              <li>Gloves</li>
            </Link>
          </ul>
          <ul>
            <li>
              <TextField
                label="search"
                value={womanSearch}
                className="dropdown-input"
                onChange={(e) => setWomanSearch(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" ? womanSearchHandler() : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon onClick={() => womanSearchHandler()} />
                    </InputAdornment>
                  ),
                }}
              />
            </li>
          </ul>
        </div>
      </WomanDropdown>
      <LoginDropdown
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
      </LoginDropdown>
      <SaleDropdown style={{ display: saleDropdownOpen ? "flex" : "none" }}>
        <div
          className="dropdown-menu"
          onMouseEnter={() => setSaleDropdown(true)}
          onMouseLeave={() => setSaleDropdown(false)}
        >
          <ul>
            <li className="list-header">Women</li>
            {womenDiscountsList.map((item) => (
              <Link
                to={`/sale/woman/${item}`}
                className="link"
                style={{ color: "red" }}
                key={item}
              >
                <li>{item}</li>
              </Link>
            ))}
          </ul>
          <ul>
            <li className="list-header">Men</li>
            {menDiscountsList.map((item) => (
              <Link
                to={`/sale/man/${item}`}
                className="link"
                style={{ color: "red" }}
                key={item}
              >
                <li>{item}</li>
              </Link>
            ))}
          </ul>
        </div>
      </SaleDropdown>
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

const HamburgerMenu = styled.div`
  width: 100%;
  height: 200vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  z-index: 15;
  .component-close-icon {
    width: 100%;
    height: 3rem;
    z-index: 3;
    transition: 0.3s ease-in all;
  }
  .close-icon {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    font-size: 4rem;
    color: black;
    &:hover {
      cursor: pointer;
      color: tomato;
    }
  }
  .accordion-input {
    width: 100%;
    font-size: 1.5rem;
  }
  .one-accordion {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    .accordion-within {
      width: 100%;
      height: 100%;
    }
  }
`;
const ManDropdown = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.2rem;
  z-index: 50;
  .dropdown-menu {
    position: absolute;
    top: 0;
    left: 50%;
    width: 70%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    display: flex;
    background-color: white;
    padding: 0 5rem;
    border: none;
    justify-content: Center;
    ul {
      padding: 3rem;
      font-size: 1rem;
      font-weight: bold;
      @media screen and (max-width: 1200px) {
        padding: 1rem;
      }
      li {
        list-style: none;
        padding: 0.4rem 0rem;
        font-size: 0.8rem;
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
        .dropdown-input {
          .Mui-focused {
            color: black;
          }
        }
      }
      .list-header {
        font-size: 1rem;
        padding-bottom: 1rem;
        text-transform: upperCase;
        &:hover {
          text-decoration: none;
          cursor: default;
        }
      }
    }
  }
`;
const WomanDropdown = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.2rem;
  z-index: 50;

  .dropdown-menu {
    position: absolute;
    top: 0;
    left: 50%;
    width: 70%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    display: flex;
    background-color: white;
    padding: 0 5rem;
    border: none;
    justify-content: Center;
    ul {
      padding: 3rem;
      font-size: 1rem;
      font-weight: bold;
      @media screen and (max-width: 1200px) {
        padding: 1rem;
      }
      li {
        list-style: none;
        padding: 0.4rem 0rem;
        font-size: 0.8rem;
        .dropdown-input {
          .Mui-focused {
            color: black;
          }
        }
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .list-header {
        font-size: 1rem;
        padding-bottom: 1rem;
        text-transform: upperCase;
        &:hover {
          text-decoration: none;
          cursor: default;
        }
      }
    }
  }
`;
const LoginDropdown = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 2.4rem;
  width: 40vh;
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

const SaleDropdown = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
  z-index: 50;
  .dropdown-menu {
    position: absolute;
    top: 0;
    left: 50%;
    width: 70%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    display: flex;
    background-color: white;
    padding: 0 5rem;
    border: none;
    justify-content: Center;
    color: red;
    ul {
      padding: 3rem;
      font-size: 1rem;
      font-weight: bold;
      @media screen and (max-width: 1200px) {
        padding: 1rem;
      }
      li {
        list-style: none;
        padding: 0.4rem 0rem;
        font-size: 0.8rem;
        &:first-letter {
          text-transform: upperCase;
        }
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .list-header {
        font-size: 1rem;
        padding-bottom: 1rem;
        text-transform: upperCase;
        &:hover {
          text-decoration: none;
          cursor: default;
        }
      }
    }
  }
`;
export default Nav;
