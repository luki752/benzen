import axios from "axios";
import { itemsUrl, specificItemUrl, allItemsUrl } from "../api";

//action creator
export const loadItems = (gender, category, item, sortOrder) => async (
  dispatch
) => {
  dispatch({
    type: "LOADING_DETAIL",
  });
  //fetch axios
  const itemsData = await axios.get(
    itemsUrl(gender, category, item, sortOrder)
  );
  dispatch({
    type: "FETCH_ITEMS",
    payload: {
      items: itemsData.data,
    },
  });
};

export const loadSpecificItem = (gender, id) => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAIL",
  });
  //fetch data
  const itemData = await axios.get(specificItemUrl(gender, id));
  dispatch({
    type: "FETCH_ITEM",
    payload: {
      item: itemData.data,
    },
  });
};

export const loadAllItems = (gender) => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAIL",
  });
  //fetch data
  const itemsData = await axios.get(allItemsUrl(gender));
  dispatch({
    type: "FETCH_ALL_ITEMS",
    payload: {
      AllItems: itemsData.data,
    },
  });
};
