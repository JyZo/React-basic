import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 30 },

  reducers: {
    changeName(state) {
      return "john kim" + state;
    },
    ageUp(state, a) {
      state.age += a.payload;
    },
  },
});

export let { changeName, ageUp } = user.actions;

export default user;
