const initState = {
  orders: [],
  order: [],
  userOrders: [],
  isLoading: true,
};

const ordersReducer = (state = initState, action) => {
  switch (action.type) {
    case "ALL_ORDERS":
      return {
        ...state,
        orders: action.payload.orders,
      };
    case "FETCH_ORDER":
      return {
        ...state,
        order: action.payload.order,
      };
    case "USER_ORDERS":
      return {
        ...state,
        userOrders: action.payload.userOrders,
        isLoading: false,
      };
    case "LOADING_DETAIL":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default ordersReducer;
