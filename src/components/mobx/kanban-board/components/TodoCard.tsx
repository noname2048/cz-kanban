import { useStoresContext } from "@/components/mobx/kanban-board/stores-context.ts";
import { Todo } from "@/components/mobx/kanban-board/types.ts";
import TrashIcon from "@/icons/TrashIcon.tsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { observer } from "mobx-react";

type Props = {
  todo: Todo;
};

export const TodoCard = observer(({ todo }: Props) => {
  const {
    todoStore: { updateTodoContent, deleteTodo },
  } = useStoresContext();

  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    data: {
      type: "Task",
      todo,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-rose-500 bg-primary p-2.5 text-left opacity-30"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-primary p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
      >
        <textarea
          className="h-[90%] w-full resize-none rounded border-none bg-transparent text-white focus:outline-none"
          value={todo.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) toggleEditMode();
          }}
          onChange={(e) => updateTodoContent(todo.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className="task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-primary p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
    >
      <p className="m-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {todo.content}
      </p>
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTodo(todo.id);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-secondary stroke-white p-2 opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
});
