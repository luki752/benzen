const initState = {
  cart: [],
  cartPrice: 0,
  discount: false,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
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
        tempCart2 = state.cart.filter(
          (item) =>
            !(
              item.id === action.payload.id && item.size === action.payload.size
            )
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
        cart: state.cart.filter(
          (item) =>
            !(
              item.id === action.payload.id && item.size === action.payload.size
            )
        ),
      };
    case "DISCOUNT":
      return {
        ...state,
        discount: action.payload.boolean,
      };
    case "CART_PRICE":
      return {
        ...state,
        cartPrice: action.payload.price.toFixed(2),
      };
    case "CHANGE_PRICE":
      const newCart = state.cart.map((item) =>
        item.id === action.payload.id && item.size === action.payload.size
          ? (item = {
              ...item,
              discount: true,
              beforeDiscount: item.price,
              price: item.price * 0.9,
            })
          : item
      );
      return {
        ...state,
        cart: newCart,
      };

    default:
      return { ...state };
  }
};

export default cartReducer;
