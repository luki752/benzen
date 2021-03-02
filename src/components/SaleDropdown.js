import React from "react";
//styling
import styled from "styled-components";
//components
import SaleLinks from "./SaleLinks";

const SaleDropdown = ({ saleDropdownOpen, setSaleDropdown }) => {
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
          <SaleLinks gender={"woman"} />
        </ul>
        <ul>
          <li className="list-header">Men</li>
          <SaleLinks gender={"man"} />
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
    ul{
      list-style:none;
      margin-top:1rem;
      li{
      margin:0rem 2rem;
      }
    }
      .list-header {
        font-size: 1rem;
        padding: 1rem 0rem;
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
