const initState = {
  clothes: [],
};

const clothesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_CLOTHES":
      return { ...state, clothes: action.payload.clothes };
    default:
      return { ...state };
  }
};

export default clothesReducer;
