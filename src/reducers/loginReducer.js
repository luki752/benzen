const initState = {
  isLogged: false,
  user: {
    favorites: [],
  },
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLogged: action.payload.login,
        user: action.payload.user,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLogged: action.payload.login,
        user: action.payload.user,
      };
    default:
      return { ...state };
  }
};

export default loginReducer;
