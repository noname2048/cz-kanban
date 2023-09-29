import ColumnContainer from "@/components/origin/ColumnContainer.tsx";
import TaskCard from "@/components/origin/TaskCard.tsx";
import DocumentsArrowDown from "@/icons/DocumentArrowDown.tsx";
import DocumentText from "@/icons/DocumentText.tsx";
import PlusIcon from "@/icons/PlusIcon.tsx";
import { useAppDispatch, useAppSelector } from "@/redux/hook.ts";
import {
  addTodo,
  createColumn as createColumnAction,
  deleteColumn as deleteColumnAction,
  loadTodo,
  overTodoToColumn,
  overTodoToTodo,
  removeTodo,
  saveTodo,
  swapColumn,
  updateColumn as updateColumnAction,
  updateTodo,
} from "@/redux/todo/todoSlice.ts";
import { Column, Id, Task } from "@/types.ts";
import { Todo } from "@/types/todo.ts";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import store from "store2";

function StateKanbanBoard() {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todo);
  const { todos, columns } = todoState;

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  return (
    <div className="flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={todos.filter((tasks) => tasks.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={createNewColumn}
              className=" flex h-[60px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-secondary bg-primary p-4 ring-rose-500 hover:ring-2"
            >
              <PlusIcon />
              Add Column
            </button>
            <button
              onClick={() => {
                dispatch(saveTodo());
              }}
              className="flex h-[60px] w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-secondary bg-primary p-4 ring-rose-500 hover:ring-2"
            >
              <DocumentsArrowDown />
              Save
            </button>
            <button
              onClick={() => {
                const data = JSON.parse(store.namespace("todo").get("default"));
                dispatch(loadTodo(data));
              }}
              className="flex h-[60px] w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-secondary bg-primary p-4 ring-rose-500 hover:ring-2"
            >
              <DocumentText />
              Load
            </button>
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={todos.filter(
                  (tasks) => tasks.columnId === activeColumn.id,
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    dispatch(createColumnAction(columnToAdd));
  }
  function generateId() {
    /* Generate a random id between 0 to 10000 */
    return Math.floor(Math.random() * 10001);
  }
  function deleteColumn(id: Id) {
    dispatch(deleteColumnAction(id));
  }
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    } else if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }
  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    const activeColumnIndex = columns.findIndex(
      (col) => col.id === activeColumnId,
    );
    const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);
    dispatch(
      swapColumn({
        activeIndex: activeColumnIndex,
        overIndex: overColumnIndex,
      }),
    );
  }
  function updateColumn(id: Id, title: string) {
    const newColumns = { id, title };
    dispatch(updateColumnAction(newColumns));
  }
  function createTask(columnId: Id) {
    const newTask: Todo = {
      id: generateId(),
      columnId,
      content: `Task ${todos.length + 1}`,
    };
    dispatch(addTodo(newTask));
  }
  function deleteTask(id: Id) {
    dispatch(removeTodo(id));
  }
  function updateTask(id: Id, content: string) {
    const task = todos.find((task) => task.id === id);
    if (task) {
      const taskUpdate: Todo = { ...task, content };
      dispatch(updateTodo(taskUpdate));
    }
  }
  function onDragOver(event: DragOverEvent) {
    console.log("DRAG OVER", event);
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverAtTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    // Dropping a Task over another Task
    if (isActiveTask && isOverAtTask) {
      const activeIndex = todos.findIndex((task) => task.id === activeId);
      const overIndex = todos.findIndex((task) => task.id === overId);
      dispatch(overTodoToTodo({ activeIndex, overIndex }));
    }

    const isOverAtColumn = over.data.current?.type === "Column";
    // Dropping a Task over a Column
    if (isActiveTask && isOverAtColumn) {
      const activeIndex = todos.findIndex((task) => task.id === activeId);
      const columnId = over.data.current?.column.id;
      dispatch(overTodoToColumn({ columnId, activeIndex }));
    }
  }
}

export default StateKanbanBoard;
