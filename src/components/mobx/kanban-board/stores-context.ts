import { createContext, useContext } from "react";
import { Stores } from "./stores";

const StoresContext = createContext<Stores>(new Stores());
export const StoresContextProvider = StoresContext.Provider;
export const useStoresContext = () => useContext(StoresContext);
