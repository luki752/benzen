import React from "react";
//styling
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
const CartPage = () => {
  return (
    <CartPageComponent>
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>continue shopping</p>
        <div className="buttons">
          <Link to="/woman">
            <button className="button-white">Women</button>
          </Link>
          <Link to="/man">
            <button className="button-white">Men</button>
          </Link>
        </div>
      </div>
    </CartPageComponent>
  );
};

const CartPageComponent = styled.div`
  min-height: 50vh;
  .empty-cart {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 2rem 0rem;
    .buttons {
      border: 1px solid black;
    }
  }
`;

export default CartPage;
