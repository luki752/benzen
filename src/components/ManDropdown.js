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

const ManDropdown = ({
  manDropdownOpen,
  SetManDropdown,
  manSearch,
  setManSearch,
  manSearchHandler,
}) => {
  return (
    <ManDropdownComponent
      style={{ display: manDropdownOpen ? "flex" : "none" }}
    >
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
    </ManDropdownComponent>
  );
};

const ManDropdownComponent = styled.div`
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

export default ManDropdown;
