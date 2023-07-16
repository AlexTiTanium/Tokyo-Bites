import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice";
import { userApi } from "./services/user";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;
