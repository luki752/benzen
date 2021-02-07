const initState = {
  favorites: [],
};

const favoritesReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      return { ...state, favorites: action.payload.item };
    default:
      return { ...state };
  }
};

export default favoritesReducer;
