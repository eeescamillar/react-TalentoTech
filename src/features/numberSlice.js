import { createSlice } from "@reduxjs/toolkit";

// crear el slice
const numberSlice = createSlice({
  // nombre del slice
  name: 'number',

  // estado inicial de la variable
  initialState: {
    value: 0
  },
  reducers: {
    // Funciones que cambiaran el estado de la variable
    increaseNumber: (state) => {
      state.value += 1;
    },
    decreaseNumber: (state) => {
      state.value -= 1;
    }
  }
});

// exportar las dos funciones
export const { increaseNumber, decreaseNumber } = numberSlice.actions;
export default numberSlice.reducer;
