import ColumnContainer from "@/components/mobx/kanban-board/components/ColumnContainer.tsx";
import { TodoCard } from "@/components/mobx/kanban-board/components/TodoCard.tsx";
import {
  StoresContextProvider,
  useStoresContext,
} from "@/components/mobx/kanban-board/stores-context.ts";
import { Stores } from "@/components/mobx/kanban-board/stores.ts";
import PlusIcon from "@/icons/PlusIcon.tsx";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { createPortal } from "react-dom";

export default function KanbanBoard() {
  return (
    <StoresContextProvider value={new Stores()}>
      <Root></Root>
    </StoresContextProvider>
  );
}

function Root() {
  const {
    todoStore: {
      columns,
      todos,
      createColumn,
      onDragStart,
      onDragEnd,
      onDragOver,
      activeColumn,
      activeTodo,
    },
  }: Stores = useStoresContext();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  return (
    <div className="flex min-h-screen w-full flex-row items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  todos={todos.filter((todo) => todo.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => createColumn()}
            className=" flex h-[60px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-secondary bg-primary p-4 ring-rose-500 hover:ring-2"
          >
            <PlusIcon />
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {/* if column active*/}
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                todos={todos.filter(
                  (todo) => todo.columnId === activeColumn?.id,
                )}
              />
            )}
            {/* if task active*/}
            {activeTodo && <TodoCard todo={activeTodo} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}
