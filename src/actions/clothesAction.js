import axios from "axios";
import { clothesUrl } from "../api";

//action creator

export const loadClothes = () => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAIL",
  });
  //fetch axios
  const clothesData = await axios.get(clothesUrl());
  dispatch({
    type: "FETCH_CLOTHES",
    payload: {
      clothes: clothesData.data,
    },
  });
};
