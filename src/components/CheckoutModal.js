import React from "react";
//styled
import styled from "styled-components";
//icons
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CloseIcon from "@material-ui/icons/Close";
//link
import { Link } from "react-router-dom";

const CheckoutModal = ({
  item,
  checkoutModalOpen,
  setCheckoutModal,
  itemsSize,
}) => {
  return (
    <ModalComponent
      onClick={() => setCheckoutModal(!checkoutModalOpen)}
      style={{ display: checkoutModalOpen ? "flex" : "none" }}
    >
      <div className="modal">
        <div className="header">
          <CheckBoxIcon className="success-icon" style={{ color: "green" }} />
          <span>Product was added to your shopping cart</span>
          <CloseIcon
            className="close-icon"
            onClick={() => setCheckoutModal(!checkoutModalOpen)}
          />
        </div>
        {item.images && <img src={item.images[0].img} alt={item.name} />}
        <span>
          Size: <b>{itemsSize}</b>
        </span>
        <span>{item.price} GBP</span>
        <div className="buttons">
          <Link
            to="/checkout/cart"
            className="link"
            onClick={() => window.scrollTo(0, 0)}
          >
            <button className="button-black">Go to your bag</button>
          </Link>

          <span onClick={() => setCheckoutModal(!checkoutModalOpen)}>
            Continue Shopping
          </span>
        </div>
      </div>
    </ModalComponent>
  );
};

const ModalComponent = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 160vh;
  top: 0;
  left: 0;
  .modal {
    margin-left: 35%;
    margin-top: 5%;
    background-color: white;
    width: 28rem;
    height: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media screen and (max-width: 1000px) {
      width: 100%;
      margin: 0;
    }
    .header {
      width: 100%;
      display: flex;
      align-items: Center;
      justify-content: center;
      .success-icon {
        font-size: 2rem;
        margin: 5px;
      }
      .close-icon {
        font-size: 2rem;
        margin: 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    img {
      height: 25rem;
      width: 20rem;
      margin: 1rem 0;
    }
    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      button {
        padding: 0.5rem;
        width: 20rem;
      }
      span {
        border-bottom: 1px solid black;
        font-weight: bold;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

export default CheckoutModal;
