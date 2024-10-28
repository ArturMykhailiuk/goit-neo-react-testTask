import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
  },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
