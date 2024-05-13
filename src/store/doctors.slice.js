import { createSlice } from "@reduxjs/toolkit";

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("list")) || [];
}

const initialState = {
  list: getLocalStorage(),
};

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    addDoctor: (state, action) => {
      const arr = [...state.list, { ...action.payload }];
      state.list = arr;
      localStorage.setItem("list", JSON.stringify(arr));
    },

    deleteDoctor: (state, action) => {
      const arr = [...state.list];
      const name = action.payload;
      const index = state.list.findIndex((item) => item.name === name);
      if (index !== -1) {
        arr.splice(index, 1);
        state.list = arr;
        localStorage.setItem("list", JSON.stringify(arr));
      }
    },

    changeDoctor: (state, action) => {
      const { name, data } = action.payload;
      const index = state.list.findIndex((item) => item.name === name);
      if (index !== -1) {
        const newList = [...state.list];
        newList[index] = { ...newList[index], ...data };
        state.list = newList;
        localStorage.setItem("list", JSON.stringify(newList));
      }
    },
  },
});

export const { addDoctor, deleteDoctor, changeDoctor } = doctorsSlice.actions;

export default doctorsSlice.reducer;
