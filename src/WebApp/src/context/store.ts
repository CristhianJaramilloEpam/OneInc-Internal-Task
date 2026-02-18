import { configureStore } from "@reduxjs/toolkit";
import { encodeApi } from "./api/encode-api";
import { encodeSlice } from "./encode-slice";

export const store = configureStore({
  reducer: {
    [encodeSlice.name]: encodeSlice.reducer,
    [encodeApi.reducerPath]: encodeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(encodeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
