import { RootStore } from "@/components/mobx/movie-rate/RootStore.ts";
import { createContext, useContext } from "react";

export const StoreContext = createContext(new RootStore());
export const StoreProvider = StoreContext.Provider;
export const useStores = () => useContext(StoreContext);
