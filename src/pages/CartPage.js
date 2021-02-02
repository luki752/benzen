import React from "react";
//styling
import styled from "styled-components";

const CartPage = () => {

  return (
    <CartPageComponent>
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>continue shopping</p>
        <div className="buttons">
          <button>Women</button>
          <button>Men</button>
        </div>
      </div>
    </CartPageComponent>
  );
};

const CartPageComponent = styled.div`
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
