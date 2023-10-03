import { Kanban } from "@/components/mobx/kanban-board/class/Kanban.ts";
import { createContext, useContext } from "react";

export const KanbanContext = createContext<Kanban | null>(null);
export const useKanban = (): Kanban => {
  const kanban = useContext(KanbanContext);
  if (!kanban) throw new Error("KanbanContext is null");
  return kanban;
};
