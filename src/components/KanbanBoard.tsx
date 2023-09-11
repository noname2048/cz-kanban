import ColumnContainer from "@/components/ColumnContainer";
import PlusIcon from "../icons/PlusIcon";
import { useState } from "react";
import { Column, Id } from "@/types";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  console.log(columns);

  return (
    <div
      className="
        m-auto flex min-h-screen
        w-full items-center overflow-x-auto overflow-y-hidden px-[40px]"
    >
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              deleteColumn={deleteColumn}
            />
          ))}
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
}

export default KanbanBoard;
