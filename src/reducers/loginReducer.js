const initState = {
  isLogged: false,
  user: [],
  users: [],
  userDetails: [],
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
    case "FETCH_USERS":
      return {
        ...state,
        users: action.payload.users,
      };
    case "FETCH_USER":
      return {
        ...state,
        userDetails: action.payload.userDetails,
      };
    default:
      return { ...state };
  }
};

export default loginReducer;
