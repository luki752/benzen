import axios from "axios";
import { itemsUrl } from "../api";

//action creator

export const loadItems = (gender) => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAIL",
  });
  //fetch axios
  const itemsData = await axios.get(itemsUrl(gender));
  dispatch({
    type: "FETCH_CLOTHES",
    payload: {
      items: itemsData.data,
    },
  });
};
