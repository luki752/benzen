import React from "react";
//styled
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
//material ui
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
//icons
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
//components
import SaleLinks from "./SaleLinks";

const HamburgerMenu = ({
  navOpen,
  setNavOpen,
  manSearch,
  setManSearch,
  manSearchHandler,
  womanSearch,
  womanSearchHandler,
  setWomanSearch,
}) => {
  //handlers
  const linkHandler = () => {
    window.scrollTo(0, 0);
    setNavOpen(!navOpen);
  };
  return (
    <HamburgerMenuComponent style={{ display: navOpen ? "flex" : "none" }}>
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
              <SaleLinks
                gender={"man"}
                hamburger
                setNavOpen={setNavOpen}
                navOpen={navOpen}
              />
            </Accordion>
            <AccordionDetails></AccordionDetails>
          </AccordionDetails>
          {/* women sale */}
          <AccordionDetails>
            <Accordion className="accordion-within" style={{ color: "red" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h1>Women</h1>
              </AccordionSummary>
              <SaleLinks
                gender={"woman"}
                hamburger
                setNavOpen={setNavOpen}
                navOpen={navOpen}
              />
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
              <Link to="/man/clothes/outerwear/puffer-jackets" className="link">
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
              onKeyDown={(e) => (e.key === "Enter" ? womanSearchHandler() : "")}
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
    </HamburgerMenuComponent>
  );
};

const HamburgerMenuComponent = styled.div`
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

export default HamburgerMenu;
