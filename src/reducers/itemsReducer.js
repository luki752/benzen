const initState = {
  items: [],
  item: [],
  AllItems: [],
  answer: [],
  sale: [],
  favorites: [],
  limit: 20,
  isLoading: true,
};

const itemsReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_ITEMS":
      return { ...state, items: action.payload.items, isLoading: false };
    case "LOADING_DETAIL":
      return {
        ...state,
        isLoading: false,
      };
    case "FETCH_ITEM":
      return { ...state, item: action.payload.item, isLoading: false };
    case "FETCH_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload.favorite],
      };
    case "FETCH_ALL_ITEMS":
      return { ...state, AllItems: action.payload.AllItems, isLoading: false };
    case "FETCH_ANSWER":
      return { ...state, answer: action.payload.answer };
    case "FETCH_SALE":
      return { ...state, sale: action.payload.sale };
    case "CHANGE_LIMIT":
      return { ...state, limit: state.limit + action.payload.number };
    default:
      return { ...state };
  }
};

export default itemsReducer;
