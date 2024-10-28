import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  equipments: {
    AC: false,
    transmission: "",
    TV: false,
    kitchen: false,
    bathroom: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  },
  forms: {
    panelTruck: false,
    fullyIntegrated: false,
    alcove: false,
  },
  location: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action) {
      return { ...state, ...action.payload };
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setFilters } = filtersSlice.actions;
export const { resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
