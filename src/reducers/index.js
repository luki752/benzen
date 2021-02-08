import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  items: itemsReducer,
  login: loginReducer,
});

export default rootReducer;
