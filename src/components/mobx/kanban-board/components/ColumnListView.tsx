import { Column, Todo } from "@/components/mobx/kanban-board/class/Kanban.ts";
import TodoView from "@/components/mobx/kanban-board/components-dev/TodoView.tsx";
import { useKanban } from "@/components/mobx/kanban-board/context/KanbanContext.ts";
import PlusIcon from "@/icons/PlusIcon.tsx";
import TrashIcon from "@/icons/TrashIcon.tsx";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { observer } from "mobx-react";
import { useMemo, useState } from "react";

interface Props {
  column: Column;
  todos: Todo[];
}

const ColumnListView = observer(({ column, todos }: Props) => {
  const kanban = useKanban();
  const taskIds = useMemo<string[]>(
    () => todos.map((todo) => todo.id),
    [todos],
  );
  const [editMode, setEditMode] = useState(false);

  const sortable = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition: sortable.transition,
    transform: CSS.Transform.toString(sortable.transform),
  };

  if (sortable.isDragging) {
    return (
      <div
        ref={sortable.setNodeRef}
        style={style}
        {...sortable.attributes}
        {...sortable.listeners}
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-rose-500 bg-main opacity-40"
      ></div>
    );
  }

  return (
    <div
      ref={sortable.setNodeRef}
      style={style}
      {...sortable.attributes}
      {...sortable.listeners}
      className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md bg-main"
    >
      {/* Column title */}
      <div
        onClick={() => setEditMode(true)}
        className="flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 border-column bg-main p-3 text-base font-bold"
      >
        <div className="flex gap-2">
          <div className="flex items-center justify-center rounded-full bg-secondary px-2 py-1 text-sm">
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="roudned border-2 bg-black px-2 outline-none focus:border-rose-500"
              value={column.title}
              onChange={(e) => {
                kanban.updateColumn({ ...column, title: e.target.value });
              }}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEditMode(false);
                }
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            kanban.deleteColumn(column);
          }}
          className="rounded stroke-gray-500 px-1 py-2 hover:bg-column hover:stroke-white"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={taskIds}>
          {todos.map((todo) => (
            <TodoView key={todo.id} todo={todo} />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <button
        onClick={() => {
          kanban.createTodo(column.id);
        }}
        className="flex items-center gap-2 rounded-md border-2 border-secondary border-x-secondary p-4 hover:bg-main hover:text-rose-500 active:bg-black"
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  );
});

export default ColumnListView;
