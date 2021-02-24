export const getScrollPosition = (position) => async (dispatch) => {
  dispatch({
    type: "GET_POSITION",
    payload: {
      position: position,
    },
  });
};

export const setPreviousPage = (previousPage) => async (dispatch) => {
  dispatch({
    type: "SET_PAGE",
    payload: {
      previousPage: previousPage,
    },
  });
};
export const setGoBack = (boolean) => async (dispatch) => {
  dispatch({
    type: "GO_BACK",
    payload: {
      goBack: boolean,
    },
  });
};
