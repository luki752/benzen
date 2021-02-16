import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
import loginReducer from "./loginReducer";
import cartReducer from "./cartReducer";
import ordersReducer from "./ordersReducer";

const rootReducer = combineReducers({
  item: itemsReducer,
  sale: itemsReducer,
  cart: cartReducer,
  login: loginReducer,
  orders: ordersReducer,
});

export default rootReducer;
