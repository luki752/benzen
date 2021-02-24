const initState = {
  scrollPosition: [],
  previousPage: [],
  goBack: false,
};

const scrollReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_POSITION":
      return {
        ...state,
        scrollPosition: action.payload.position,
      };
    case "SET_PAGE":
      return {
        ...state,
        previousPage: action.payload.previousPage,
      };
    case "GO_BACK":
      return {
        ...state,
        goBack: action.payload.goBack,
      };
    default:
      return { ...state };
  }
};

export default scrollReducer;
