import { Column, Todo } from "@/components/mobx/kanban-board/class/Kanban.ts";
import { useKanban } from "@/components/mobx/kanban-board/context/KanbanContext.ts";
import TrashIcon from "@/icons/TrashIcon.tsx";

type Props = {
  column: Column;
  todos: Todo[];
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

const ColumnTitleView = ({ column, todos, editMode, setEditMode }: Props) => {
  const kanban = useKanban();
  let Title = <>{column.title}</>;
  if (editMode) {
    Title = (
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
    );
  }

  return (
    <div
      onClick={() => setEditMode(true)}
      className="flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 border-column bg-main p-3 text-base font-bold"
    >
      <div className="flex gap-2">
        <div className="flex items-center justify-center rounded-full bg-secondary px-2 py-1 text-sm">
          {todos.length}
        </div>
        {Title}
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
  );
};

export default ColumnTitleView;
