const initState = {
  items: [],
  isLoading: true,
};

const itemsReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_CLOTHES":
      return { ...state, items: action.payload.items, isLoading: false };
    case "LOADING_DETAIL":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return { ...state };
  }
};

export default itemsReducer;
