import { combineReducers } from "redux";
import clothesReducer from "./clothesReducer";
import favoritesReducer from "./favoritesReducer";

const rootReducer = combineReducers({
  clothes: clothesReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
