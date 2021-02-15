import React from "react";
//styling
import styled from "styled-components";

const DeliveryOption = ({ logo, name, time, price }) => {
  return (
    <DeliveryOptionComponent>
      <div className="left-info">
        <div className="checkbox"></div>
        <img src={logo} alt={name} />
        <span>{name}</span>
      </div>
      <div className="right-info">
        <span>{time}</span>
        <span>{price}</span>
      </div>
    </DeliveryOptionComponent>
  );
};

const DeliveryOptionComponent = styled.div`
  display: flex;
  width: 80%;
  font-size: 1rem;
  align-items: center;
  justify-content: space-between;
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

export default DeliveryOption;
