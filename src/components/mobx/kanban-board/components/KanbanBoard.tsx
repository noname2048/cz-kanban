import { Kanban } from "@/components/mobx/kanban-board/class/Kanban.ts";
import TodoView from "@/components/mobx/kanban-board/components-dev/TodoView.tsx";
import ColumnListView from "@/components/mobx/kanban-board/components/ColumnListView.tsx";
import {
  KanbanContext,
  useKanban,
} from "@/components/mobx/kanban-board/context/KanbanContext.ts";
import PlusIcon from "@/icons/PlusIcon.tsx";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { observer } from "mobx-react";
import { createPortal } from "react-dom";

const kanban = new Kanban();

const KanbanBoard = () => {
  return (
    <KanbanContext.Provider value={kanban}>
      <KanbanBoardView />
    </KanbanContext.Provider>
  );
};

const KanbanBoardView = observer(() => {
  const kanban = useKanban();
  const columnsId = kanban.columns.map((col) => col.id);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  return (
    <div className="flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={kanban.onDragStart}
        onDragEnd={kanban.onDragEnd}
        onDragOver={kanban.onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {kanban.columns.map((col) => (
                <ColumnListView
                  key={col.id}
                  column={col}
                  todos={kanban.todos.filter(
                    (tasks) => tasks.columnId === col.id,
                  )}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              kanban.createColumn();
            }}
            className=" flex h-[60px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-secondary bg-primary p-4 ring-rose-500 hover:ring-2"
          >
            <PlusIcon />
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {kanban.activeColumn && (
              <ColumnListView
                column={kanban.activeColumn}
                todos={kanban.todos.filter(
                  (tasks) => tasks.columnId === kanban.activeColumn?.id,
                )}
              />
            )}
            {kanban.activeTodo && <TodoView todo={kanban.activeTodo} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
});

export default KanbanBoard;
