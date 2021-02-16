import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
import loginReducer from "./loginReducer";
import cartReducer from "./cartReducer";
import ordersReducer from "./ordersReducer";

const rootReducer = combineReducers({
  items: itemsReducer,
  item: itemsReducer,
  cart: cartReducer,
  discount: cartReducer,
  cartPrice: cartReducer,
  category: itemsReducer,
  answer: itemsReducer,
  sale: itemsReducer,
  login: loginReducer,
  orders: ordersReducer,
});

export default rootReducer;
