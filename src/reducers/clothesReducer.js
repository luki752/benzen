const initState = {
  jackets: [],
  hoodies: [],
};

const clothesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_CLOTHES":
      return { ...state, jackets: action.payload.jackets };
    default:
      return { ...state };
  }
};

export default clothesReducer;
