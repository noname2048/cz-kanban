import TrashIcon from "@/icons/TrashIcon";
import { Column, Id } from "@/types";
import { cn } from "@/libs/cn";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;
  return (
    <div
      className={cn(
        "flex h-[500px] max-h-[500px] w-[350px]",
        "flex-col rounded-md bg-column",
      )}
    >
      <div
        className={cn(
          "text-md flex h-[60px] cursor-grab items-center justify-between",
          "rounded-md rounded-b-none border-4 border-column bg-main p-3 font-bold",
        )}
      >
        <div className="flex gap-2">
          <div
            className={cn(
              "flex items-center justify-center",
              "rounded-full px-2 py-1 text-sm",
            )}
          >
            0
          </div>
          <div>{column.title}</div>
        </div>
        <button
          className="rounded stroke-gray-50 px-1 py-2 hover:bg-column hover:stroke-white"
          onClick={() => {
            deleteColumn(column.id);
          }}
        >
          <TrashIcon />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
}

export default ColumnContainer;
