import React from "react";
//styling
import styled from "styled-components";
//router
import { Link } from "react-router-dom";

const SaleDropdown = ({
  saleDropdownOpen,
  setSaleDropdown,
  menDiscountsList,
  womenDiscountsList,
}) => {
  return (
    <SaleDropdownComponent
      style={{ display: saleDropdownOpen ? "flex" : "none" }}
    >
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
    </SaleDropdownComponent>
  );
};

const SaleDropdownComponent = styled.div`
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

export default SaleDropdown;
