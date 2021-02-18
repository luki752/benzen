import React, { useState, useEffect } from "react";
//styling
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
//material ui
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//axios
import axios from "axios";
//actions
import { loadUser } from "../actions/loginAction";
import { loadUsersOrders } from "../actions/ordersAction";
//redux
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathId = location.pathname.split("/")[4];
  useEffect(() => {
    dispatch(loadUser(pathId));
    dispatch(loadUsersOrders(pathId));
  }, [pathId, dispatch]);
  const { userDetails } = useSelector((state) => state.login);
  const { userOrders } = useSelector((state) => state.orders);
  const [changeAccess, setChangeAccess] = useState("");

  const usersAccessHandler = (e) => {
    setChangeAccess(e.target.value);
  };
  const changeUsersAccessHandler = (
    id,
    name,
    surname,
    email,
    password,
    favorites,
    orders,
    addresses,
    isLogged
  ) => {
    if (changeAccess !== "") {
      axios
        .put(`http://localhost:3000/users/${id}/`, {
          name: name,
          surname: surname,
          email: email,
          password: password,
          favorites: favorites,
          orders: orders,
          addresses: addresses,
          isLogged: isLogged,
          accessibility: changeAccess,
        })
        .then((resp) => {
          dispatch(loadUser(pathId));
        })
        .catch((error) => {});
    }
  };
  console.log(userOrders);
  console.log(userDetails);
  return (
    <UserComponent>
      {userDetails && (
        <div className="user-details">
          <div className="user-info">
            <span>ID: {userDetails.id}</span>
            <span>Name: {userDetails.name}</span>
            <span>Surname: {userDetails.surname}</span>
            <span>Email: {userDetails.email}</span>
            <span>Accessibility: {userDetails.accessibility}</span>
          </div>
          <div className="change-access">
            <FormControl>
              <InputLabel className="sort-label">
                Change accessibility
              </InputLabel>
              <Select
                value={changeAccess}
                onChange={usersAccessHandler}
                className="sort-select"
              >
                <MenuItem value="customer">customer</MenuItem>
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="headAdmin">Head admin</MenuItem>
              </Select>
            </FormControl>
            <button
              className="button-white"
              onClick={() =>
                changeUsersAccessHandler(
                  userDetails.id,
                  userDetails.name,
                  userDetails.surname,
                  userDetails.email,
                  userDetails.password,
                  userDetails.favorites,
                  userDetails.orders,
                  userDetails.addresses,
                  userDetails.isLogged
                )
              }
            >
              change
            </button>
          </div>
          <div className="orders">
            <h2>User orders</h2>
            {userOrders.map((order) => (
              <div className="order">
                <span>
                  {order.time} {order.date}
                </span>
                <span>ID: {order.id}</span>
                <span>{order.cartPrice + order.deliveryPrice} GBP</span>
                <Link to={`/admin/panel/orders/${order.id}`} className="link">
                  <span>Details</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </UserComponent>
  );
};

const UserComponent = styled.div`
  .user-details {
    display: flex;
    flex-direction: column;
    .user-info {
      display: flex;
      justify-content: space-between;
      align-self: center;
      width: 90%;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 1rem;
      margin: 1rem;
      @media screen and (max-width: 1000px) {
        width: 100%;
        margin: 1rem 0;
        padding: 1rem 0;
        flex-direction: column;
        background-color: white;
        color: black;
        text-align: center;
      }
    }
    .change-access {
      display: flex;
      justify-content: center;
      align-items: Center;
      .button-white {
        @media screen and (max-width: 1000px) {
          font-size: 1rem;
        }
      }
      .sort-select {
        align-self: start;
        width: 15rem;
      }
    }
    .orders {
      display: flex;
      flex-direction: column;

      .order {
        display: flex;
        justify-content: space-evenly;
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 1rem;
        @media screen and (max-width: 1000px) {
          width: 100%;
        }
      }
    }
  }
`;

export default User;
