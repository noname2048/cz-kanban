import { useStoresContext } from "@/components/mobx/kanban-board/stores-context.ts";
import {
  Column as ColumnType,
  Todo as TodoType,
} from "@/components/mobx/kanban-board/types.ts";
import { TodoCard } from "@/components/mobx/kanban-board/components/TodoCard.tsx";
import PlusIcon from "@/icons/PlusIcon.tsx";
import TrashIcon from "@/icons/TrashIcon.tsx";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { observer } from "mobx-react";
import { useMemo, useState } from "react";

const ColumnContainer = observer(
  ({ column, todos }: { column: ColumnType; todos: TodoType[] }) => {
    const {
      todoStore: { deleteColumn, updateColumnTitle, createTodo },
    } = useStoresContext();
    const taskIds = useMemo(() => todos.map((todo) => todo.id), [todos]);
    const [editMode, setEditMode] = useState(false);
    const {
      setNodeRef,
      attributes,
      listeners,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: column.id,
      data: {
        type: "Column",
        column,
      },
      disabled: editMode,
    });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
      return (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-rose-500 bg-main opacity-40"
        ></div>
      );
    }
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
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
                  updateColumnTitle(column.id, e.target.value);
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
              deleteColumn(column.id);
            }}
            className="rounded stroke-gray-500 px-1 py-2 hover:bg-column hover:stroke-white"
          >
            <TrashIcon />
          </button>
        </div>

        {/* Column task container */}
        <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
          <SortableContext items={taskIds}>
            {todos.map((task) => (
              <TodoCard key={task.id} todo={task} />
            ))}
          </SortableContext>
        </div>
        {/* Column footer */}
        <button
          onClick={() => {
            createTodo(column.id);
          }}
          className="flex items-center gap-2 rounded-md border-2 border-secondary border-x-secondary p-4 hover:bg-main hover:text-rose-500 active:bg-black"
        >
          <PlusIcon />
          Add task
        </button>
      </div>
    );
  },
);

export default ColumnContainer;
