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
//components
import {
  WomanClothesLinks,
  WomanClothesSubLinks,
  WomanAccessoriesLinks,
  WomanShoesLinks,
} from "./Links";

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
          {WomanClothesSubLinks.map((item) => (
            <Link to={item.path} className="link" key={item.path}>
              <li>{item.title}</li>
            </Link>
          ))}
          {WomanClothesLinks.map((item) => (
            <Link to={item.path} className="link" key={item.path}>
              <li>{item.title}</li>
            </Link>
          ))}
        </ul>
        <ul>
          <li className="list-header">Shoes</li>
          {WomanShoesLinks.map((shoe) => (
            <Link to={shoe.path} className="link" key={shoe.path}>
              <li>{shoe.title}</li>
            </Link>
          ))}
        </ul>
        <ul>
          <li className="list-header">Accessories</li>
          {WomanAccessoriesLinks.map((accessory) => (
            <Link to={accessory.path} className="link" key={accessory.path}>
              <li>{accessory.title}</li>
            </Link>
          ))}
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
