const initState = {
  clothes: [],
  isLoading: true,
};

const clothesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_CLOTHES":
      return { ...state, clothes: action.payload.clothes, isLoading: false };
    case "LOADING_DETAIL":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return { ...state };
  }
};

export default clothesReducer;
