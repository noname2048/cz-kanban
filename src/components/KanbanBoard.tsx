import ColumnContainer from "@/components/ColumnContainer";
import { cn } from "@/libs/cn";
import { createPortal } from "react-dom";
import PlusIcon from "../icons/PlusIcon";
import { useState, useMemo } from "react";
import { Column, Id } from "@/types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  return (
    <div
      className={cn(
        "m-auto flex min-h-screen w-full items-center",
        "overflow-x-auto overflow-y-hidden px-[40px]",
      )}
    >
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
          </div>
          <button
            className="
            flex h-[60px] w-[350px] min-w-[350px]
            cursor-pointer gap-2 rounded-lg border-2 border-column bg-main p-4
            ring-rose-500 hover:ring-2"
            onClick={() => {
              createColumn();
            }}
          >
            <PlusIcon />
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );

  function createColumn() {
    const newColumn: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  }

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  function deleteColumn(id: Id) {
    const filteredColumn = columns.filter((col) => col.id !== id);
    setColumns(filteredColumn);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activateColumnId = active.id;
    const overColumnId = over.id;

    if (activateColumnId === overColumnId) return;

    setColumns((prev) => {
      const activeColumnIndex = prev.findIndex(
        (col) => col.id === activateColumnId,
      );

      const overColumnIndex = prev.findIndex((col) => col.id === overColumnId);

      return arrayMove(prev, activeColumnIndex, overColumnIndex);
    });
  }
}

export default KanbanBoard;
