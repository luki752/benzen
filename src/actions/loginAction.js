//action creator
export const loginAction = (user) => async (dispatch) => {
  console.log(user);
  dispatch({
    type: "LOG_IN",
    payload: {
      login: true,
      user: user,
    },
  });
};
