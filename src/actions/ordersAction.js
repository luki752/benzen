import { allOrders, usersOrders } from "../api";
import axios from "axios";

export const loadOrders = (sortOrder) => async (dispatch) => {
  const ordersData = await axios.get(allOrders(sortOrder));
  dispatch({
    type: "ALL_ORDERS",
    payload: {
      orders: ordersData.data,
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
