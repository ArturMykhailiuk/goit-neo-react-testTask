export const selectCampers = (state) => state.campers.items;
export const selectTotal = (state) => state.campers.total;
export const selectCamperById = (state, id) =>
  state.campers.items.find((camper) => camper.id === id);
export const selectVisibleCount = (state) => state.campers.visibleCount;

export const selectLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;
