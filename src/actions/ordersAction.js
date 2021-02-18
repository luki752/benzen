import { allOrders, usersOrders, specificOrder } from "../api";
import axios from "axios";

export const loadOrders = (sortOrder, page) => async (dispatch) => {
  const ordersData = await axios.get(allOrders(sortOrder, page));
  dispatch({
    type: "ALL_ORDERS",
    payload: {
      orders: ordersData,
    },
  });
};

export const loadUsersOrders = (id) => async (dispatch) => {
  const userOrdersData = await axios.get(usersOrders(id));
  dispatch({
    type: "USER_ORDERS",
    payload: {
      userOrders: userOrdersData.data,
    },
  });
};

export const loadSpecificOrder = (id) => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAIL",
  });
  const orderData = await axios.get(specificOrder(id));
  dispatch({
    type: "FETCH_ORDER",
    payload: {
      order: orderData.data,
    },
  });
};
