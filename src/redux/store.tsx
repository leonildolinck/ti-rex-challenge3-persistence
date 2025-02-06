import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/user/reducer";
import cartReducer from "../components/cart/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;