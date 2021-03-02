import axios from "axios";
import {
  itemsUrl,
  specificItemUrl,
  allItemsUrl,
  questionUrl,
  discountUrl,
  fullQuestionLength,
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

export const loadFavorites = (gender, id) => async (dispatch) => {
  //fetch data
  const itemData = await axios.get(specificItemUrl(gender, id));
  dispatch({
    type: "FETCH_FAVORITE",
    payload: {
      favorite: itemData.data,
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

export const loadQuestion = (question) => async (dispatch) => {
  dispatch({
    type: "ASK",
    payload: {
      question: question,
    },
  });
};
export const loadSearched = (gender, question, sortOrder, limit) => async (
  dispatch
) => {
  //fetch data
  const answersData = await axios.get(
    questionUrl(gender, question, sortOrder, limit)
  );
  dispatch({
    type: "FETCH_ANSWER",
    payload: {
      answer: answersData.data,
    },
  });
};
export const loadAllSearched = (gender, question) => async (dispatch) => {
  //fetch data
  const answersData = await axios.get(fullQuestionLength(gender, question));
  dispatch({
    type: "FETCH_ALL_ANSWERS",
    payload: {
      answer: answersData.data,
    },
  });
};

export const loadSale = (gender, item, sortOrder, limit) => async (
  dispatch
) => {
  //fetch data
  const saleData = await axios.get(discountUrl(gender, item, sortOrder, limit));
  dispatch({
    type: "FETCH_SALE",
    payload: {
      sale: saleData.data,
    },
  });
};

export const changeLimit = (number) => async (dispatch) => {
  dispatch({
    type: "CHANGE_LIMIT",
    payload: {
      number: number,
    },
  });
};

export const changeSaleLimit = (number) => async (dispatch) => {
  dispatch({
    type: "CHANGE_SALE_LIMIT",
    payload: {
      number: number,
    },
  });
};
export const changeSearchLimit = (number) => async (dispatch) => {
  dispatch({
    type: "CHANGE_SEARCH_LIMIT",
    payload: {
      number: number,
    },
  });
};
