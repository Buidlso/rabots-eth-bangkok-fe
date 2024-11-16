import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { store } from "@/redux/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLayoutStore = () => useAppSelector((state) => state.layout);
export const useWalletStore = () => useAppSelector((state) => state.wallet);
export const useUserStore = () => useAppSelector((state) => state.user);
export const useRabotsStore = () => useAppSelector((state) => state.rabots);