import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../components/user/reducer";
import cartReducer from "../components/cart/slice";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
