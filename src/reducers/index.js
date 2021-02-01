import { combineReducers } from "redux";
import clothesReducer from "./clothesReducer";

const rootReducer = combineReducers({
  clothes: clothesReducer,
});

export default rootReducer;
