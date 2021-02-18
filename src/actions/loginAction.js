import { allUsersUrl, allUsersFilteredUrl, specificUser } from "../api";
import axios from "axios";

//action creator
export const loginAction = () => async (dispatch) => {
  const usersData = await axios.get(allUsersUrl());
  const user = usersData.data.filter((user) => user.isLogged === true);
  const isLogged = usersData.data.find((user) => user.isLogged === true);
  dispatch({
    type: "LOG_IN",
    payload: {
      login: isLogged,
      user: user[0],
    },
  });
};

export const loadUsers = (access, query, page) => async (dispatch) => {
  const usersData = await axios.get(allUsersFilteredUrl(access, query, page));
  dispatch({
    type: "FETCH_USERS",
    payload: {
      users: usersData,
    },
  });
};

export const loadUser = (id) => async (dispatch) => {
  const userData = await axios.get(specificUser(id));
  dispatch({
    type: "FETCH_USER",
    payload: {
      userDetails: userData.data,
    },
  });
};
