const initState = {
  orders: [],
  userOrders: [],
};

const ordersReducer = (state = initState, action) => {
  switch (action.type) {
    case "ALL_ORDERS":
      return {
        ...state,
        orders: action.payload.orders,
      };
    case "USER_ORDERS":
      return {
        ...state,
        userOrders: action.payload.userOrders,
      };
    default:
      return { ...state };
  }
};

export default ordersReducer;
