import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Balck", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    countUp(state, action) {
      console.log(action.payload.id);
      let arrayIdx = Number(action.payload.id);
      console.log(arrayIdx);
      let result = state.find(function (item) {
        return item.id === arrayIdx;
      });
      console.log((result.count += 1));
      return state;
    },
    cartAdd(state, action) {
      console.log(action.payload.cart);
      state.push({
        id: 3,
        name: "threeessssss",
        count: 33,
      });
    },
    addItem(state, action) {
      console.log(state[0]);
      console.log(action.payload);
      state.push(action.payload);
    },
  },
});

export let { countUp, cartAdd, addItem } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
