const initState = {
  items: [],
  item: [],
  AllItems: [],
  question: "",
  answer: [],
  allAnswers: [],
  sale: [],
  favorites: [],
  limit: 20,
  saleLimit: 20,
  searchLimit: 20,
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
    case "ASK":
      return { ...state, question: action.payload.question };
    case "FETCH_ANSWER":
      return { ...state, answer: action.payload.answer };
    case "FETCH_ALL_ANSWERS":
      return { ...state, allAnswers: action.payload.answer };
    case "FETCH_SALE":
      return { ...state, sale: action.payload.sale };
    case "CHANGE_LIMIT":
      return { ...state, limit: state.limit + action.payload.number };
    case "CHANGE_SALE_LIMIT":
      return { ...state, saleLimit: state.saleLimit + action.payload.number };
    case "CHANGE_SEARCH_LIMIT":
      return {
        ...state,
        searchLimit: state.searchLimit + action.payload.number,
      };
    default:
      return { ...state };
  }
};

export default itemsReducer;
