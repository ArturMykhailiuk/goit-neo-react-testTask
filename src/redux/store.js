import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import campersReducer from "./campers/slice";
import filtersReducer from "./filters/slice";
import favoritesReducer from "./favorites/slice";
import bookingReducer from "./bookings/slice";

const campersPersistConfig = { key: "campers", storage, whitelist: ["items"] };

const filtersPersistConfig = { key: "filters", storage };

const favoritesPersistConfig = { key: "favorites", storage };

const bookingPersistConfig = { key: "bookings", storage };

const persistedCampersReducer = persistReducer(
  campersPersistConfig,
  campersReducer
);
const persistedFiltersReducer = persistReducer(
  filtersPersistConfig,
  filtersReducer
);

const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer
);

const persistedBookingReducer = persistReducer(
  bookingPersistConfig,
  bookingReducer
);

const store = configureStore({
  reducer: {
    campers: persistedCampersReducer,
    filters: persistedFiltersReducer,
    favorites: persistedFavoritesReducer,
    bookings: persistedBookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
