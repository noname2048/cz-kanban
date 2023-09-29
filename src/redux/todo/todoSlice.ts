import { Id, Todo } from "@/types/todo.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store.ts";

type TodoState = Todo[];
const initialState: TodoState = [];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state: TodoState, action: PayloadAction<Todo>) => {
      return [...state, action.payload];
    },
    updateTodo: (state: TodoState, action: PayloadAction<Todo>) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, ...action.payload };
        }
        return todo;
      });
    },
    removeTodo: (state: TodoState, action: PayloadAction<Id>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    load: (_: TodoState, action: PayloadAction<TodoState>) => {
      return action.payload;
    },
    deleteColumn: (state: TodoState, action: PayloadAction<Id>) => {
      return state.filter((todo) => todo.columnId !== action.payload);
    },
    overTodo: (
      state: TodoState,
      action: PayloadAction<{ activeIndex: number; overIndex: number }>,
    ) => {
      const { activeIndex, overIndex } = action.payload;
      const newState = state.slice();
      const newActive = {
        ...newState.splice(activeIndex, 1)[0],
        columnId: state[overIndex].columnId,
      };
      newState.splice(overIndex, 0, newActive);
      return newState;
    },
    overColumnTodo: (
      state: TodoState,
      action: PayloadAction<{ columnId: number; activeIndex: number }>,
    ) => {
      const { columnId, activeIndex } = action.payload;
      const newState = state.slice();
      const newActive = { ...newState.splice(activeIndex, 1)[0], columnId };
      newState.splice(activeIndex, 0, newActive);
      return newState;
    },
  },
});

export const {
  addTodo,
  updateTodo,
  removeTodo,
  deleteColumn,
  load,
  overTodo,
  overColumnTodo,
} = todoSlice.actions;
export const selectTodo = (state: RootState) => state.todo;
export { todoSlice };
