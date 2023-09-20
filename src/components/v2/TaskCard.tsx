import TrashIcon from "@/icons/TrashIcon.tsx";
import { Id, Task } from "@/types";
import { useState } from "react";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
}

function TaskCard({ task, deleteTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className="bg-primary relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
    >
      {task.content}
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="bg-secondary absolute right-4 top-1/2 -translate-y-1/2 rounded stroke-white p-2 opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
