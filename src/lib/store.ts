import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/provider/redux/cart.slice";
import { fakeStoreAPISlice } from "@/provider/redux/query";
import { thunk } from "redux-thunk";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice,
      [fakeStoreAPISlice.reducerPath]: fakeStoreAPISlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([fakeStoreAPISlice.middleware, thunk]),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
