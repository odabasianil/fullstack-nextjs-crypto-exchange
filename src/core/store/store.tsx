import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "./reducers/auth.slice";
import { userReducer } from "./reducers/user.slice";
import { preferenceReducer } from "./reducers/preference.slice";

export const store = configureStore({
  reducer: { 
    auth: authReducer,
    user: userReducer,
    preference: preferenceReducer
   },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;