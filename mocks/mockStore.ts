import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/provider/redux/cart.slice";
import { fakeStoreAPISlice } from "@/provider/redux/query";
import { thunk } from "redux-thunk";
import { setupListeners } from "@reduxjs/toolkit/query";

const mockRootReducer = {
  cart: cartSlice,
  [fakeStoreAPISlice.reducerPath]: fakeStoreAPISlice.reducer,
};

const mockStore = configureStore({
  reducer: mockRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([fakeStoreAPISlice.middleware, thunk]),
});

export type MockAppDispatch = typeof mockStore.dispatch;
export type MockRootState = ReturnType<typeof mockStore.getState>;

setupListeners(mockStore.dispatch);

export default mockStore;
