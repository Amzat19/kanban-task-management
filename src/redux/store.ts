import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./features/boards";
import { modalsSlice } from "./features/modals";

export const store = configureStore({
    reducer: {
        boards: boardSlice.reducer,
        modals: modalsSlice.reducer
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;