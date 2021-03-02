import React, { useEffect } from "react";
//styling
import styled from "styled-components";
//icons
import DoneAllIcon from "@material-ui/icons/DoneAll";
//actions
import { loginAction } from "../actions/loginAction";
//redux
import { useDispatch } from "react-redux";
const FinalizedOrderPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction(localStorage.getItem("userId")));
  }, [dispatch]);
  return (
    <FinalizedComponent>
      <h2>
        Your payment was <b>successful</b>
      </h2>
      <span>We are packing your order!</span>
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
