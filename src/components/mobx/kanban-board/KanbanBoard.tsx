import { ReactNode } from "react";

export default function KanbanBoard() {
  return <div>KanbanBoard</div>;
}

function Outer({ children }: { children?: ReactNode }) {
  return <div className="h-min-screen w-full">{children}</div>;
}
