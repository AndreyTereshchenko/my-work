import { createSlice } from "@reduxjs/toolkit";

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("patientsList")) || [];
}

const initialState = {
  list: getLocalStorage(),
};

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    addPatient: (state, action) => {
      const arr = [...state.list, { ...action.payload }];
      state.list = arr;
      localStorage.setItem("patientsList", JSON.stringify(arr));
    },
    deletePatient: (state, action) => {
      const arr = [...state.list];
      const name = action.payload;
      const index = state.list.findIndex((item) => item.name === name);
      if (index !== -1) {
        arr.splice(index, 1);
        state.list = arr;
        localStorage.setItem("patientsList", JSON.stringify(arr));
      }
    },
    changePatient: (state, action) => {
      const { name, data } = action.payload;
      const index = state.list.findIndex((item) => item.name === name);
      if (index !== -1) {
        const newList = [...state.list];
        newList[index] = { ...newList[index], ...data };
        state.list = newList;
        localStorage.setItem("patientsList", JSON.stringify(newList));
      }
    },
  },
});

export const { addPatient, deletePatient, changePatient } =
  patientsSlice.actions;

export default patientsSlice.reducer;
