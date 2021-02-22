import axios from "axios";
import {
  itemsUrl,
  specificItemUrl,
  allItemsUrl,
  questionUrl,
  discountUrl,
} from "../api";

//action creator
export const loadItems = (gender, category, item, sortOrder, page) => async (
  dispatch
) => {
  dispatch({
    type: "LOADING_DETAIL",
  });
  //fetch axios
  const itemsData = await axios.get(
    itemsUrl(gender, category, item, sortOrder, page)
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

export const loadAllItems = (gender, search, item) => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAIL",
  });
  //fetch data
  const itemsData = await axios.get(allItemsUrl(gender, search, item));
  dispatch({
    type: "FETCH_ALL_ITEMS",
    payload: {
      AllItems: itemsData.data,
    },
  });
};

export const loadQuestion = (gender, question) => async (dispatch) => {
  //fetch data
  const answersData = await axios.get(questionUrl(gender, question));
  dispatch({
    type: "FETCH_ANSWER",
    payload: {
      answer: answersData.data,
    },
  });
};

export const loadSale = (gender, item, sortOrder) => async (dispatch) => {
  //fetch data
  const saleData = await axios.get(discountUrl(gender, item, sortOrder));
  dispatch({
    type: "FETCH_SALE",
    payload: {
      sale: saleData.data,
    },
  });
};
