import { StoreProvider } from "@/components/mobx/movie-rate/Context.tsx";
import { RootStore } from "@/components/mobx/movie-rate/RootStore.ts";
import { ReactNode } from "react";

const rootStore = new RootStore();

export default function AppContainer({ children }: { children?: ReactNode }) {
  return <StoreProvider value={rootStore}>{children}</StoreProvider>;
}
