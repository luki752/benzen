const initState = {
  items: [],
  item: [],
  AllItems: [],
  isLoading: true,
};

const itemsReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_ITEMS":
      return { ...state, items: action.payload.items, isLoading: false };
    case "LOADING_DETAIL":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ITEM":
      return { ...state, item: action.payload.item, isLoading: false };
    case "FETCH_ALL_ITEMS":
      return { ...state, AllItems: action.payload.AllItems, isLoading: false };
    default:
      return { ...state };
  }
};

export default itemsReducer;
