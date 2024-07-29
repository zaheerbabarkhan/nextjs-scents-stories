import { CartI } from "@/types/cart";
import { createSlice } from "@reduxjs/toolkit";

const loadStateFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState: CartI = loadStateFromSessionStorage() || {
  date: new Date().toISOString(),
  userId: undefined,
  products: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { productId, quantity, price } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.productId === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.products.push(action.payload);
      }

      state.totalPrice += price * quantity;
      sessionStorage.setItem("cart", JSON.stringify(state)); // Update session storage
    },
    removeProduct: (state, action) => {
      const { productId, price } = action.payload;
      const removedProduct = state.products.find(
        (product) => product.productId === productId
      );
      if (removedProduct) {
        state.totalPrice -= price * removedProduct.quantity;
        state.products = state.products.filter(
          (product) => product.productId !== productId
        );
        sessionStorage.setItem("cart", JSON.stringify(state)); // Update session storage
      }
    },
    removeProductQuantity: (state, action) => {
      const { productId, price } = action.payload;
      const product = state.products.find((p) => p.productId === productId);
      if (product) {
        state.totalPrice -= price;
        product.quantity -= 1;
        if (product.quantity === 0) {
          state.products = state.products.filter(
            (product) => product.productId !== productId
          );
        }
        sessionStorage.setItem("cart", JSON.stringify(state)); // Update session storage
      }
    },
    attachUserToCart: (state, action) => {
      state.userId = action.payload.userId;
    },
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      sessionStorage.removeItem("cart"); // Update session storage
    },
  },
});

export const {
  addProduct,
  removeProduct,
  removeProductQuantity,
  attachUserToCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
