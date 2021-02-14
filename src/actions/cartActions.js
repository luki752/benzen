export const changeCartPrice = (price) => async (dispatch) => {
  dispatch({
    type: "CART_PRICE",
    payload: {
      price: price,
    },
  });
};

export const setDiscount = (boolean) => async (dispatch) => {
  dispatch({
    type: "DISCOUNT",
    payload: {
      boolean: boolean,
    },
  });
};
