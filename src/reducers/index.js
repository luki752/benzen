import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  items: itemsReducer,
  item: itemsReducer,
  category: itemsReducer,
  answer: itemsReducer,
  login: loginReducer,
});

export default rootReducer;
