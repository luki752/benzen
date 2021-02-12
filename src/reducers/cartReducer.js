const initState = {
  cart: [],
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log([...state.cart]);
      console.log(action.payload.item);
      return {
        ...state,
        cart: [...state.cart, action.payload.item],
      };
    case "INCREASE":
      let tempCart = state.cart.map((cartItem) =>
        cartItem.id === action.payload.id &&
        cartItem.size === action.payload.size
          ? (cartItem = { ...cartItem, cartAmount: cartItem.cartAmount + 1 })
          : cartItem
      );
      return { ...state, cart: tempCart };
    case "DECREASE":
      let tempCart2 = [];
      if (action.payload.amount === 1) {
        tempCart2 = state.cart.filter((item) =>
          item.size === action.payload.size && item.id === action.payload.id
            ? item.id !== action.payload.id
            : ""
        );
      } else {
        tempCart2 = state.cart.map((cartItem) =>
          cartItem.id === action.payload.id &&
          cartItem.size === action.payload.size
            ? (cartItem = { ...cartItem, cartAmount: cartItem.cartAmount - 1 })
            : cartItem
        );
      }

      return { ...state, cart: tempCart2 };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    default:
      return { ...state };
  }
};

export default cartReducer;
