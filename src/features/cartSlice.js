import { createSlice } from "@reduxjs/toolkit";
import productData from "../productData";

const initialState = {
  cart: [],
  items: productData,
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.cart[index].quantity = action.payload.quantity;
      } else {
        state.cart.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    increaseQty: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload);
      if (index >= 0) {
        state.cart[index].quantity += 1;
      }
    },
    decreaseQty: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload);
      if (index >= 0 && state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      }
    },
    setTotals: (state) => {
      state.totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  }
});

export const { addToCart, increaseQty, decreaseQty, setTotals } = cartSlice.actions;

export const getCartTotal = () => (dispatch, getState) => {
  dispatch(setTotals());
};

export default cartSlice.reducer;
