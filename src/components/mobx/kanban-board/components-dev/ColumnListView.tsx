import ColumnView from "@/components/mobx/kanban-board/components-dev/ColumnView.tsx";
import { useKanban } from "@/components/mobx/kanban-board/context/KanbanContext.ts";
import PlusIcon from "@/icons/PlusIcon.tsx";
import { SortableContext } from "@dnd-kit/sortable";
import { observer } from "mobx-react";
import { useMemo } from "react";

const ColumnListView = observer(() => {
  const kanban = useKanban();
  const columnsId = useMemo(
    () => kanban.columns.map((col) => col.id),
    [kanban.columns],
  );

  return (
    <div className="m-auto flex gap-4">
      <div className="flex gap-4">
        <SortableContext items={columnsId}>
          {kanban.columns.map((col) => (
            <ColumnView
              key={col.id}
              column={col}
              todos={kanban.todos.filter((todo) => todo.columnId === col.id)}
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
  );
});

export default ColumnListView;
