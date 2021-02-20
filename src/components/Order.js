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
import { loadSpecificOrder } from "../actions/ordersAction";
//redux
import { useDispatch, useSelector } from "react-redux";

const Order = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathId = location.pathname.split("/")[4];
  const adminPanel = location.pathname.split("/")[1];
  useEffect(() => {
    dispatch(loadSpecificOrder(pathId));
  }, [pathId, dispatch]);
  const { order, isLoading } = useSelector((state) => state.orders);
  const [orderStatus, setOrderStatus] = useState("");
  const ordersStatusHandler = (e) => {
    setOrderStatus(e.target.value);
  };
  const changeOrdersStatus = (id) => {
    if (orderStatus !== "") {
      axios
        .put(`http://localhost:3000/orders/${id}/`, {
          items: order.items,
          date: order.date,
          time: order.time,
          usersId: order.usersId,
          status: orderStatus,
          delivery: order.delivery,
          cartPrice: order.cartPrice,
          deliveryPrice: order.deliveryPrice,
          payment: order.payment,
          address: order.address,
        })
        .then((resp) => {
          dispatch(loadSpecificOrder(id));
        })
        .catch((error) => {});
    }
  };
  console.log(order);
  return (
    <OrdersComponent>
      {!isLoading && order.items && (
        <div className="specific-order">
          <div className="order-details">
            <h2>NR {order.id}</h2>
            <span>
              Ordered: {order.date} {order.time}
            </span>
            <h2>
              {order.items.length} Items {order.status}
            </h2>

            {adminPanel === "admin" && (
              <FormControl>
                <InputLabel className="sort-label">
                  Change orders status
                </InputLabel>
                <Select
                  value={orderStatus}
                  onChange={ordersStatusHandler}
                  className="sort-select"
                >
                  <MenuItem value="new">new</MenuItem>
                  <MenuItem value="packing">packing</MenuItem>
                  <MenuItem value="sent">sent</MenuItem>
                  <MenuItem value="received">received</MenuItem>
                </Select>
                <button
                  onClick={() => changeOrdersStatus(order.id)}
                  className="button-black"
                >
                  Change
                </button>
              </FormControl>
            )}
            {adminPanel === "admin" && (
              <span>
                Users-id: {order.usersId}{" "}
                <Link
                  to={`/admin/panel/users/${order.usersId}`}
                  className="link"
                >
                  details
                </Link>
              </span>
            )}
            <div className="items">
              {order.items.map((item) => (
                <div className="item" key={item.id}>
                  <div className="left-item">
                    <Link to={`/${item.gender}/${item.id}`}>
                      <img src={item.images[0].img} alt={item.name} />
                    </Link>
                    <div className="item-details">
                      <Link to={`/${item.gender}/${item.id}`} className="link">
                        <h3>{item.name}</h3>
                      </Link>
                      <span>size: {item.size}</span>
                    </div>
                  </div>
                  <div className="right-item">
                    <span
                      style={{
                        color: item.discount ? "red" : "black",
                      }}
                    >
                      {item.price} GBP
                    </span>
                    <span
                      style={{
                        display: item.discount ? "block" : "none",
                        textDecoration: "line-through",
                      }}
                    >
                      {item.beforeDiscount} GBP
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-price">
              <div className="payment">{order.payment}</div>
              <div className="price">
                <div className="cart-price">
                  <span>Price:</span>
                  <span>{order.cartPrice} GBP</span>
                </div>
                <div className="shipping-price">
                  <span>{order.delivery}:</span>
                  <span>{order.deliveryPrice} GBP</span>
                </div>
                <div className="full-price">
                  <span>Total with vat:</span>
                  <span>
                    {(order.cartPrice + order.deliveryPrice).toFixed(2)} GBP
                  </span>
                </div>
              </div>
            </div>
            <div className="order-address">
              <h2>Shipping address</h2>
              <span>
                {order.address[0].name} {order.address[0].surname}
              </span>
              <span>
                {order.address[0].street} {order.address[0].houseNr}
              </span>
              <span>
                {order.address[0].postalCode} {order.address[0].city}
              </span>
            </div>
          </div>
        </div>
      )}
    </OrdersComponent>
  );
};

const OrdersComponent = styled.div`
  .specific-order {
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    @media screen and (max-width: 1000px) {
      margin-left: 0;
    }
    .order-details {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
      .sort-select {
        @media screen and (max-width: 1000px) {
          width: 100%;
        }
      }
      .button-black {
        @media screen and (max-width: 1000px) {
          width: 100%;
          padding: 0.5rem;
        }
      }
      .items {
        margin: 1rem 0;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        .item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          .left-item {
            display: flex;
            img {
              height: 10rem;
              width: 8rem;
              @media screen and (max-width: 1000px) {
                height: 8rem;
                width: 6rem;
              }
            }
            .item-details {
              display: flex;
              flex-direction: column;
              margin-left: 5px;
              h3 {
                @media screen and (max-width: 1000px) {
                  font-size: 1rem;
                }
              }

              span {
                padding: 1rem 0;
                color: rgba(0, 0, 0, 0.6);
                @media screen and (max-width: 1000px) {
                  font-size: 0.8rem;
                }
              }
            }
          }
          .right-item {
            @media screen and (max-width: 1000px) {
              font-size: 1rem;
              margin: 0 4px;
            }
          }
        }
      }
      .order-price {
        display: flex;
        justify-content: space-between;
        margin: 1rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        .price {
          width: 50%;
          display: flex;
          justify-content: space-evenly;
          flex-direction: column;
          @media screen and (max-width: 1000px) {
            width: 60%;
            font-size: 1.1rem;
          }
          .cart-price {
            display: flex;
            justify-content: space-between;
          }
          .shipping-price {
            display: flex;
            justify-content: space-between;
          }
          .full-price {
            display: flex;
            justify-content: space-between;
          }
        }
      }
      .order-address {
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        span {
          padding: 0.5rem 0;
        }
      }
    }
  }
`;

export default Order;
