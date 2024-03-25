import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cartItems: [],
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    showLoading: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    hideLoading: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    addToCart: (state, action) => {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    },
    updateCart: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems?.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, quantity: action.payload.quantity };
          } else {
            return item;
          }
        }),
      };
    },
  },
});

export const { showLoading, hideLoading, addToCart, updateCart } =
  itemSlice.actions;
export default itemSlice.reducer;
