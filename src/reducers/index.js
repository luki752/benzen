import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
import favoritesReducer from "./favoritesReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  items: itemsReducer,
  favorites: favoritesReducer,
  login: loginReducer,
});

export default rootReducer;
