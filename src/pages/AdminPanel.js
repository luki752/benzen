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
//axios
import axios from "axios";
//material ui
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Pagination from "@material-ui/lab/Pagination";
//icons
import SearchIcon from "@material-ui/icons/Search";

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
  const [usersAccess, setUsersAccess] = useState("customer");
  const [changeAccess, setChangeAccess] = useState("");
  const [usersSearch, setUsersSearch] = useState("");
  const [usersPage, setUsersPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  //useEffect
  useEffect(() => {
    if (isLogged) {
      dispatch(loadOrders(ordersDate));
      dispatch(loadUsers(usersAccess, usersSearch, usersPage));
    }
  }, [isLogged, dispatch, usersAccess, usersSearch, usersPage, ordersDate]);
  useEffect(() => {
    if (users.header) {
      if (users.header.link) {
        setPageIndex(
          users.headers.link
            .split(",")
            [users.headers.link.split(",").length - 1].split(";")[0]
            .split("&")[3]
            .split("=")[1]
            .split("")[0]
        );
      }
    }
  }, [users, setPageIndex, isLogged]);
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
          dispatch(loadUsers(usersAccess, usersSearch));
        })
        .catch((error) => {});
    }
  };
  const handleUsersPage = (e, v) => {
    setUsersPage(v);
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
              <div className="search-users">
                <TextField
                  label="search"
                  value={usersSearch}
                  className="users-input"
                  onChange={(e) => setUsersSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>

            {users.data &&
              users.data.length > 0 &&
              users.data.map((user, index) => (
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
                  <div className="change-access">
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
                    <button
                      className="button-white"
                      onClick={() =>
                        changeUsersAccessHandler(
                          user.id,
                          user.name,
                          user.surname,
                          user.email,
                          user.password,
                          user.favorites,
                          user.orders,
                          user.addresses,
                          user.isLogged
                        )
                      }
                    >
                      change
                    </button>
                  </div>
                </div>
              ))}

            <Pagination
              count={parseInt(pageIndex)}
              page={usersPage}
              onChange={handleUsersPage}
              className="pagination"
            />
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
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
  .left-side {
    width: 20%;
    display: flex;
    flex-direction: Column;
    align-items: flex-end;
    @media screen and (max-width: 1000px) {
      align-items: center;
      width: 100%;
    }
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
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
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
    .sort-select {
      width: 10rem;
      @media screen and (max-width: 1000px) {
        width: 7rem;
        font-size: 1rem;
      }
    }
    .users-component {
      width: 100%;
      display: flex;
      flex-direction: column;
      .sort-users {
        display: flex;

        .search-users {
          margin: 0 1rem;
        }
      }
      .user {
        display: flex;
        justify-content: space-evenly;
        align-items: Center;
        @media screen and (max-width: 1000px) {
          font-size: 1rem;
          flex-wrap: wrap;
          padding: 1rem;
        }
        .button-white {
          background-color: transparent;
          @media screen and (max-width: 1000px) {
            font-size: 1rem;
          }
          &:hover {
            color: black;
            text-decoration: underline;
          }
        }
        .change-access {
          .sort-label {
            @media screen and (max-width: 1000px) {
              font-size: 1rem;
            }
          }
        }
      }
      .pagination {
        display: flex;
        justify-content: Center;
        align-items: center;
        margin: 1rem 0;
      }
    }
  }
`;

export default AdminPanel;
