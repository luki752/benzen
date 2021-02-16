import React from "react";
//styling
import styled from "styled-components";
//icons
import DoneAllIcon from "@material-ui/icons/DoneAll";
const FinalizedOrderPage = () => {
  return (
    <FinalizedComponent>
      <h2>
        Your Payment was <b>successfull</b>
      </h2>
      <span>Order is on your way!</span>
      <DoneAllIcon className="icon" />
    </FinalizedComponent>
  );
};

const FinalizedComponent = styled.div`
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    font-size: 2rem;
    b {
      font-weight: bold;
      color: green;
    }
  }
  .icon {
    font-size: 3rem;
    color: green;
  }
`;

export default FinalizedOrderPage;
