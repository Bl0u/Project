import { createSlice } from "@reduxjs/toolkit";
import { initialProducts } from "./productsData";

const initialState = {
  items: initialProducts,
  discount: 0,
};

export const productsSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    addProduct: {
      reducer(state, action) {
        console.log("addProduct:", action.payload);

        state.items.push(action.payload);
      },

      prepare(title, price, image) {
        return {
          payload: {
            id: crypto.randomUUID(),
            title,
            price,
            image,
          },
        };
      },
    },

    deleteProduct: (state, action) => {
      console.log("deleteProduct:", action.payload);

      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    setDiscount: (state, action) => {
      console.log("setDiscount:", action.payload);

      state.discount = action.payload;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  setDiscount,
} = productsSlice.actions;

export default productsSlice.reducer;