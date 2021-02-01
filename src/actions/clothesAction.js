import axios from "axios";
import { clothesUrl } from "../api";

//action creator

export const loadClothes = () => async (dispatch) => {
  //fetch axios
  const clothesData = await axios.get(clothesUrl());
  dispatch({
    type: "FETCH_CLOTHES",
    payload: {
      jackets: clothesData,
    },
  });
};
