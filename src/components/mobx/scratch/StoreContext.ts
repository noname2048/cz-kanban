import { Store } from "@/components/mobx/scratch/Store.ts";
import { createContext, useContext } from "react";

export const StoreContext = createContext<Store | null>(null);
export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("StoreContext not found");
  return store;
};
