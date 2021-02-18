import React, { useEffect, useState } from "react";
//styling
import styled from "styled-components";
//router
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
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
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Pagination from "@material-ui/lab/Pagination";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
//icons
import SearchIcon from "@material-ui/icons/Search";
//components
import Order from "../components/Order";
import User from "../components/User";

const AdminPanel = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction());
  }, [dispatch]);
  //state
  const { orders } = useSelector((state) => state.orders);
  const { user, users, isLogged } = useSelector((state) => state.login);
  const location = useLocation();
  const history = useHistory();
  const pathName = location.pathname.split("/")[3];
  const details = location.pathname.split("/")[4];
  //orders state
  const [order, setOrder] = useState([]);
  const [ordersDate, setOrdersDate] = useState("");
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersPageIndex, setOrdersPageIndex] = useState(1);
  //users state
  const [userId, setUserId] = useState("");
  const [usersAccess, setUsersAccess] = useState("customer");
  const [usersSearch, setUsersSearch] = useState("");
  const [usersPage, setUsersPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  //useEffect
  useEffect(() => {
    if (isLogged) {
      dispatch(loadOrders(ordersDate, ordersPage));
      dispatch(loadUsers(usersAccess, usersSearch, usersPage));
    }
  }, [
    isLogged,
    dispatch,
    usersAccess,
    usersSearch,
    usersPage,
    ordersDate,
    ordersPage,
  ]);
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
  useEffect(() => {
    if (orders.header) {
      if (orders.header.link) {
        setOrdersPageIndex(
          users.headers.link
            .split(",")
            [users.headers.link.split(",").length - 1].split(";")[0]
            .split("&")[3]
            .split("=")[1]
            .split("")[0]
        );
      }
    }
  }, [users, setPageIndex, isLogged, orders.header]);
  //handlers
  const ordersSortHandler = (e) => {
    setOrdersDate(e.target.value);
  };
  const sortAccessHandler = (e) => {
    setUsersAccess(e.target.value);
  };
  const handleUsersPage = (e, v) => {
    setUsersPage(v);
    window.scrollTo(0, 0);
  };
  const handleOrdersPage = (e, v) => {
    setOrdersPage(v);
    window.scrollTo(0, 0);
  };
  const orderDetailsHandler = (id, order) => {
    history.push(`/admin/panel/orders/${id}`);
    setOrder(order);
    window.scrollTo(0, 0);
  };
  const userDetailsHandler = (id) => {
    history.push(`/admin/panel/users/${id}`);
    setUserId(id);
    window.scrollTo(0, 0);
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
        {pathName === "orders" && !details && (
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
            <div className="orders">
              <Breadcrumbs aria-label="breadcrumb">
                <span>Admin panel</span>
                <Link to="/admin/panel/orders" className="link">
                  orders
                </Link>
              </Breadcrumbs>
              {orders.data &&
                orders.data.length > 0 &&
                orders.data.map((order) => (
                  <div className="order" key={order.id}>
                    <div className="order-left">
                      <div className="price-info">
                        <span>Nr:{order.id}</span>
                        <span>
                          <b>{order.cartPrice + order.deliveryPrice} GBP</b>
                        </span>
                      </div>
                      <div className="items-image">
                        {order.items.map((item) => (
                          <img
                            src={item.images[0].img}
                            alt={item.name}
                            onClick={() => orderDetailsHandler(order.id, order)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="order-right">
                      <div className="time-info">
                        <span>
                          {order.date} {order.time}
                        </span>
                        <span>{order.status}</span>
                      </div>
                      <div className="details">
                        <span
                          className="details-button"
                          onClick={() => orderDetailsHandler(order.id, order)}
                        >
                          Details
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Pagination
              count={parseInt(ordersPageIndex)}
              page={ordersPage}
              onChange={handleOrdersPage}
              className="pagination"
            />
          </div>
        )}
        {details && pathName === "orders" && (
          <>
            <Breadcrumbs aria-label="breadcrumb">
              <span>Admin panel</span>
              <Link to="/admin/panel/orders" className="link">
                orders
              </Link>
              <span>{order.id}</span>
            </Breadcrumbs>
            <Order />
          </>
        )}
        {pathName === "users" &&
          !details &&
          user.accessibility === "headAdmin" && (
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
                    <div
                      className="span"
                      onClick={() => userDetailsHandler(user.id, user)}
                    >
                      Details
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
        {details && pathName === "users" && (
          <>
            <Breadcrumbs aria-label="breadcrumb">
              <span>Admin panel</span>
              <Link to="/admin/panel/orders" className="link">
                users
              </Link>
              <span>{userId}</span>
            </Breadcrumbs>
            <User />
          </>
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
    align-items: center;
    @media screen and (max-width: 1000px) {
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
    width: 70%;
    margin-left: 2rem;
    @media screen and (max-width: 1000px) {
      margin-left: 0;
      width: 100%;
    }
    .orders-component {
      width: 100%;
      display: flex;
      flex-direction: column;
      .sort-select {
        width: 10rem;
      }
      .orders {
        margin-left: 2rem;
        @media screen and (max-width: 1000px) {
          margin-left: 0;
        }
        .order {
          display: flex;
          justify-content: space-between;
          font-size: 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          padding: 1rem;

          .order-left {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price-info {
              display: flex;
              flex-direction: column;
              font-size: 1rem;
            }
            .items-image {
              display: flex;
              flex-wrap: wrap;
              img {
                margin: 0.5rem 0.5rem 0.5rem 0;
                height: 10rem;
                width: 8rem;
              }
            }
          }
          .order-right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .time-info {
              display: flex;
              flex-direction: column;
              font-size: 1rem;
              span {
                align-self: flex-end;
              }
            }
            .details {
              align-self: flex-end;
              span {
                padding: 0.6rem;
                font-size: 1rem;
                font-weight: bold;
                text-transform: upperCase;
                &:hover {
                  background-color: rgba(0, 0, 0, 0.2);
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .pagination {
        display: flex;
        justify-content: Center;
        align-items: Center;
        margin: 1rem;
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
