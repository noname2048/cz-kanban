import { Monitor } from "@/components/mobx/scratch/Monitor.ts";
import { createContext, useContext } from "react";

export const MonitorContext = createContext<Monitor | null>(null);
export const useMonitor = (): Monitor => {
  const monitor = useContext(MonitorContext);
  if (!monitor) throw new Error("MonitorContext not found");
  return monitor;
};
