import React from "react";
//styling
import styled from "styled-components";

const PaymentOption = ({ logo, name }) => {
  return (
    <PaymentOptionComponent>
      <div className="checkbox"></div>
      <img src={logo} alt={name} />
      <span>{name}</span>
    </PaymentOptionComponent>
  );
};

const PaymentOptionComponent = styled.div`
  display: flex;
  width: 80%;
  font-size: 1rem;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  img {
    height: 5rem;
    width: 6rem;
  }
  span {
    padding: 0 1rem;
  }
`;

export default PaymentOption;
