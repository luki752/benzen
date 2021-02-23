import React from "react";
//styling
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
//material ui
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
//icons
import SearchIcon from "@material-ui/icons/Search";

const WomanDropdown = ({
  womanDropdownOpen,
  SetWomanDropdown,
  womanSearchHandler,
  setWomanSearch,
  womanSearch,
}) => {
  return (
    <WomanDropdownComponent
      style={{ display: womanDropdownOpen ? "flex" : "none" }}
    >
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
              onKeyDown={(e) => (e.key === "Enter" ? womanSearchHandler() : "")}
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
    </WomanDropdownComponent>
  );
};

const WomanDropdownComponent = styled.div`
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

export default WomanDropdown;
