import { Kanban } from "@/components/mobx/kanban-board/class/Kanban.ts";
import ColumnListView from "@/components/mobx/kanban-board/components/ColumnListView.tsx";
import ColumnView from "@/components/mobx/kanban-board/components/ColumnView.tsx";
import TodoView from "@/components/mobx/kanban-board/components/TodoView.tsx";
import {
  KanbanContext,
  useKanban,
} from "@/components/mobx/kanban-board/context/KanbanContext.ts";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";

export default function KanbanBoard() {
  return (
    <KanbanContext.Provider value={new Kanban()}>
      <KanbanBoardView />
    </KanbanContext.Provider>
  );
}

function KanbanBoardView() {
  const kanban = useKanban();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={kanban.onDragStart}
      onDragEnd={kanban.onDragEnd}
      onDragOver={kanban.onDragOver}
    >
      <ColumnListView />
      {createPortal(
        <DragOverlay>
          {/* if column active*/}
          {kanban.activeColumn && (
            <ColumnView
              column={kanban.activeColumn}
              todos={kanban.todos.filter(
                (todo) => todo.columnId === kanban.activeColumn?.id,
              )}
            />
          )}
          {/* if task active*/}
          {kanban.activeTodo && <TodoView todo={kanban.activeTodo} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}
