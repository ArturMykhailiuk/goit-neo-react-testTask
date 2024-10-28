import { createSlice } from "@reduxjs/toolkit";
import { fetchCamperById, fetchCampers } from "./operations";

const initialState = {
  items: [],
  total: 0,
  isLoading: false,
  error: null,
  visibleCount: 4, // Кількість видимих карток
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    resetCampers(state) {
      state.items = [];
      state.total = 0;
    },
    resetVisibleCount(state) {
      state.visibleCount = 4; // Скидання кількості видимих карток до 4
    },
    incrementVisibleCount(state) {
      state.visibleCount += 2; // Збільшення кількості видимих карток на 2
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, handlePending)
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchCampers.rejected, handleRejected)

      .addCase(fetchCamperById.pending, handlePending)
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchCamperById.rejected, handleRejected);
  },
});

export const { resetCampers, resetVisibleCount, incrementVisibleCount } =
  campersSlice.actions;
export default campersSlice.reducer;
