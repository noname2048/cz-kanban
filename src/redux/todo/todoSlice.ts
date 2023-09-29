import { Id, Todo, Column } from "@/types/todo.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store.ts";
import store from "store2";

type TodoState = {
  todos: Todo[];
  columns: Column[];
};

const initialState: TodoState = {
  todos: [],
  columns: [],
} as TodoState;

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state: TodoState, action: PayloadAction<Todo>) => {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    },
    removeTodo: (state: TodoState, action: PayloadAction<Id>) => {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    },
    updateTodo: (state: TodoState, action: PayloadAction<Todo>) => {
      const target: Todo = action.payload;
      const { todos } = state;
      const newTodos = todos.map((todo) => {
        if (todo.id === target.id) return target;
        return todo;
      });
      return { ...state, todos: newTodos };
    },
    createColumn: (state: TodoState, action: PayloadAction<Column>) => {
      return {
        ...state,
        columns: [...state.columns, action.payload],
      };
    },
    deleteColumn: (state: TodoState, action: PayloadAction<Id>) => {
      const { todos, columns } = state;
      const deleteId = action.payload;
      const newColumns = columns.filter((column) => column.id !== deleteId);
      const newTodos = todos.filter((todo) => todo.columnId !== deleteId);
      return { ...state, todos: newTodos, columns: newColumns };
    },
    updateColumn(state: TodoState, action: PayloadAction<Column>) {
      const { columns } = state;
      const columnUpdate = action.payload;
      const newColumns = columns.map((column) => {
        if (column.id === columnUpdate.id) return columnUpdate;
        return column;
      });
      return { ...state, columns: newColumns };
    },
    overTodoToTodo: (
      state: TodoState,
      action: PayloadAction<{ activeIndex: number; overIndex: number }>,
    ) => {
      const { activeIndex, overIndex } = action.payload;
      const newTodos = state.todos.slice();
      const overTodo = newTodos[overIndex];
      const newActive = {
        ...newTodos.splice(activeIndex, 1)[0],
        columnId: overTodo.columnId,
      };
      newTodos.splice(overIndex, 0, newActive);
      return { ...state, todos: newTodos };
    },
    overTodoToColumn: (
      state: TodoState,
      action: PayloadAction<{ columnId: number; activeIndex: number }>,
    ) => {
      const { columnId, activeIndex } = action.payload;
      const newTodos = state.todos.slice();
      const newActive = { ...newTodos.splice(activeIndex, 1)[0], columnId };
      newTodos.splice(activeIndex, 0, newActive);
      return { ...state, todos: newTodos };
    },
    swapColumn: (
      state: TodoState,
      action: PayloadAction<{ activeIndex: number; overIndex: number }>,
    ) => {
      const { activeIndex, overIndex } = action.payload;
      const newColumns = state.columns.slice();
      const newActive = newColumns.splice(activeIndex, 1)[0];
      newColumns.splice(overIndex, 0, newActive);
      return { ...state, columns: newColumns };
    },
    loadTodo: (state: TodoState) => {
      const stateLoad = JSON.parse(store.namespace("state").get("default"));
      console.log("LOAD");
      return { ...state, ...stateLoad };
    },
    saveTodo: (state: TodoState) => {
      store.namespace("state").set("default", JSON.stringify(state));
      console.log("SAVE");
    },
  },
});

export const {
  addTodo,
  removeTodo,
  updateTodo,
  createColumn,
  deleteColumn,
  updateColumn,
  overTodoToTodo,
  overTodoToColumn,
  swapColumn,
  loadTodo,
  saveTodo,
} = todoSlice.actions;
export const selectTodo = (state: RootState) => state.todo;
export { todoSlice };
