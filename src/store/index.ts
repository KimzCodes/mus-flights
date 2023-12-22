import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import auth from "./auth/authSlice";
import flights from "./flights/flightsSlice";
import darkMode from "./darkmode/darkModeSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["darkMode"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["isAuthenticated", "user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  flights,
  darkMode,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
