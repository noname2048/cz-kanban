import TrashIcon from "@/icons/TrashIcon.tsx";
import { Column, Id } from "@/types.ts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;

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
      <div className="flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 border-column bg-main p-3 text-base font-bold">
        <div className="flex gap-2">
          <div className="bg-secondary flex items-center justify-center rounded-full px-2 py-1 text-sm">
            0
          </div>
          {column.title}
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
      <div className="flex flex-grow">Content</div>
      {/* Column footer */}
      <div>Footer</div>
    </div>
  );
}

export default ColumnContainer;
