import React, { useEffect, useState } from "react";
//styling
import styled from "styled-components";
//router
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
//actions
import { loginAction, loadUsers } from "../actions/loginAction";
import { loadOrders } from "../actions/ordersAction";
//redux
import { useDispatch, useSelector } from "react-redux";
//material ui
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const AdminPanel = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction());
  }, [dispatch]);
  //state
  const { orders } = useSelector((state) => state.orders);
  const { user, users, isLogged } = useSelector((state) => state.login);
  const location = useLocation();
  const pathName = location.pathname.split("/")[3];
  //orders state
  const [ordersDate, setOrdersDate] = useState("");
  //users state
  const [usersAccess, setUsersAccess] = useState("");
  const [changeAccess, setChangeAccess] = useState("");
  const [usersSearch, setUsersSearch] = useState("");
  //useEffect
  useEffect(() => {
    if (isLogged) {
      dispatch(loadOrders());
      dispatch(loadUsers(" ", "asia"));
    }
  }, [isLogged, dispatch, usersAccess, usersSearch]);
  console.log(users);
  //handlers
  const ordersSortHandler = (e) => {
    setOrdersDate(e.target.value);
  };
  const sortAccessHandler = (e) => {
    setUsersAccess(e.target.value);
  };
  const usersChangeAccessHandler = (e) => {
    setChangeAccess(e.target.value);
  };
  return (
    <AdminPanelComponent>
      <div className="left-side">
        <ul>
          <Link to="/admin/panel/orders" className="link">
            <li>Manage Orders</li>
          </Link>
          {user.accessibility === "headAdmin" && (
            <Link to="/admin/panel/users" className="link">
              <li>Manage users</li>
            </Link>
          )}
          <Link to="/add-item" className="link">
            <li>Add Item</li>
          </Link>
        </ul>
      </div>
      <div className="right-side">
        {pathName === "orders" && (
          <div className="orders-component">
            <div className="orders-sort">
              <FormControl>
                <InputLabel className="sort-label">Sort orders</InputLabel>
                <Select
                  value={ordersDate}
                  onChange={ordersSortHandler}
                  className="sort-select"
                >
                  <MenuItem value="asc">Sort date new to old</MenuItem>
                  <MenuItem value="desc">Sort date old to new</MenuItem>
                </Select>
              </FormControl>
            </div>
            {orders.map((order) => (
              <div className="order" key={order.id}>
                {order.time}
              </div>
            ))}
          </div>
        )}
        {pathName === "users" && (
          <div className="users-component">
            <div className="sort-users">
              <FormControl>
                <InputLabel className="sort-label">Show only</InputLabel>
                <Select
                  value={usersAccess}
                  onChange={sortAccessHandler}
                  className="sort-select"
                >
                  <MenuItem value="customer">customer</MenuItem>
                  <MenuItem value="admin">admin</MenuItem>
                  <MenuItem value="headAdmin">Head admin</MenuItem>
                </Select>
              </FormControl>
            </div>
            {users.map((user, index) => (
              <div
                className="user"
                key={user.id}
                style={{
                  backgroundColor: index % 2 ? "rgba(0,0,0,0.4)" : "white",
                }}
              >
                <div className="personal-info">
                  <span>{user.name}</span> <span>{user.surname}</span>
                </div>
                <div className="email">email: {user.email}</div>
                <div className="accessibility">
                  accessibility: {user.accessibility}
                </div>
                <FormControl>
                  <InputLabel className="sort-label">
                    Change accessibility
                  </InputLabel>
                  <Select
                    value={changeAccess}
                    onChange={usersChangeAccessHandler}
                    className="sort-select"
                  >
                    <MenuItem value="customer">customer</MenuItem>
                    <MenuItem value="admin">admin</MenuItem>
                    <MenuItem value="headAdmin">Head admin</MenuItem>
                  </Select>
                </FormControl>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminPanelComponent>
  );
};

const AdminPanelComponent = styled.div`
  display: flex;
  min-height: 50rem;
  margin-top: 2rem;
  .left-side {
    width: 20%;
    display: flex;
    flex-direction: Column;
    align-items: flex-end;
    ul {
      list-style: none;
      li {
        padding: 1rem 0;
      }
    }
  }
  .right-side {
    width: 80%;
    margin-left: 2rem;
    .orders-component {
      width: 100%;
      display: flex;
      flex-direction: column;
      .sort-select {
        width: 10rem;
      }
      .order {
      }
    }
    .users-component {
      width: 100%;
      display: flex;
      flex-direction: column;
      .sort-select {
        width: 10rem;
      }
      .user {
        display: flex;
        justify-content: space-evenly;
        align-items: Center;
      }
    }
  }
`;

export default AdminPanel;
