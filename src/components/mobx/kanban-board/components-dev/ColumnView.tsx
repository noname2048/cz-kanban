import ColumnBackground from "@/components/mobx/kanban-board/components-dev/ColumnBackground.tsx";
import ColumnTitleView from "@/components/mobx/kanban-board/components-dev/ColumnTitleView.tsx";
import TodoView from "@/components/mobx/kanban-board/components-dev/TodoView.tsx";
import { useKanban } from "@/components/mobx/kanban-board/context/KanbanContext.ts";
import PlusIcon from "@/icons/PlusIcon.tsx";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { observer } from "mobx-react";
import { Column, Todo } from "@/components/mobx/kanban-board/class/Kanban.ts";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  column: Column;
  todos: Todo[];
};

const ColumnView = observer(({ column, todos }: Props) => {
  const kanban = useKanban();
  const [editMode, setEditMode] = useState(false);
  const todoIds = todos.map((todo) => todo.id);

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

  let content = null;
  if (!sortable.isDragging)
    content = (
      <>
        {/* Column title */}
        <ColumnTitleView
          column={column}
          todos={todos}
          setEditMode={setEditMode}
          editMode={editMode}
        />
        {/* Column task container */}
        <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
          <SortableContext items={todoIds}>
            {todos.map((task) => (
              <TodoView key={task.id} todo={task} />
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
      </>
    );

  return (
    <ColumnBackground
      ref={sortable.setNodeRef}
      style={style}
      attributes={sortable.attributes}
      listeners={sortable.listeners}
    >
      {content}
    </ColumnBackground>
  );
});

export default ColumnView;
