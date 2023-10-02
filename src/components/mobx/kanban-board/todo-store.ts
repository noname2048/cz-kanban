import { Stores } from "@/components/mobx/kanban-board/stores.ts";
import { Column, Id, Todo } from "@/components/mobx/kanban-board/types.ts";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { faker } from "@faker-js/faker";
import { action, makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export class TodoStore {
  rootState: Stores;
  columns: Column[] = [];
  todos: Todo[] = [];
  activeTodo: Todo | null = null;
  activeColumn: Column | null = null;

  constructor(rootState: Stores, initialState?: TodoStore) {
    this.rootState = rootState;

    if (initialState) {
      this.columns = initialState.columns;
      this.todos = initialState.todos;
    }

    makeObservable(this, {
      // root
      rootState: false,
      // state
      columns: observable,
      todos: observable,
      activeTodo: observable,
      activeColumn: observable,
      // actions
      createColumn: action,
      deleteColumn: action,
      updateColumnTitle: action,
      createTodo: action,
      deleteTodo: action,
      updateTodoContent: action,
      // special actions
      onDragStart: action,
      onDragEnd: action,
      onDragOver: action,
    });
  }

  createColumn() {
    this.columns.push({
      id: uuidv4(),
      title: faker.animal.cat(),
    });
  }

  deleteColumn(columnId: Id) {
    this.columns = this.columns.filter((column) => column.id !== columnId);
  }

  updateColumnTitle(columnId: Id, title: string) {
    this.columns = this.columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          title,
        };
      }
      return column;
    });
  }

  createTodo = (columnId: Id) => {
    const newId = uuidv4();
    this.todos.push({
      id: newId,
      columnId,
      content: [newId, faker.animal.cat()].join("\n"),
    });
  };

  deleteTodo = (todoId: Id) => {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  };

  updateTodoContent = (todoId: Id, content: string) => {
    this.todos = this.todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          content,
        };
      }
      return todo;
    });
  };

  onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      this.activeColumn = event.active.data.current.column;
    } else if (event.active.data.current?.type === "Todo") {
      this.activeTodo = event.active.data.current.todo;
    }
  };

  onDragEnd = (event: DragEndEvent) => {
    this.activeColumn = null;
    this.activeTodo = null;

    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const columnsCopy = this.columns.slice();
    const activeColumnIndex = columnsCopy.findIndex(
      (column) => column.id === active.id,
    );
    const overColumnIndex = columnsCopy.findIndex(
      (column) => column.id === over.id,
    );
    if (activeColumnIndex < 0 || overColumnIndex < 0) return;

    this.columns = columnsCopy.splice(
      overColumnIndex,
      0,
      columnsCopy.splice(activeColumnIndex, 1)[0],
    );
  };

  onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    if (active.data.current?.type !== "Task") return;

    // if todo is dragged over todo
    if (over.data.current?.type === "Task") {
      const todosCopy = this.todos.slice();
      const sourceTodoIndex = todosCopy.findIndex(
        (todo) => todo.id === active.id,
      );
      const sourceTodo = todosCopy[sourceTodoIndex];
      const destinationTodoIndex = todosCopy.findIndex(
        (todo) => todo.id === over.id,
      );
      const destinationTodo = todosCopy[destinationTodoIndex];
      if (sourceTodoIndex < 0 || destinationTodoIndex < 0) return;

      const sourceTodoModified = {
        ...sourceTodo,
        columnId: destinationTodo.columnId,
      };
      todosCopy.splice(sourceTodoIndex, 1, sourceTodoModified);
      this.todos = todosCopy;
    }

    // if todo is dragged over column
    if (over.data.current?.type === "Column") {
      const todosCopy = this.todos.slice();
      const sourceTodoIndex = todosCopy.findIndex(
        (todo) => todo.id === active.id,
      );
      const sourceTodo = todosCopy[sourceTodoIndex];
      const destinationColumnIndex = this.columns.findIndex(
        (column) => column.id === over.id,
      );
      if (sourceTodoIndex < 0 || destinationColumnIndex < 0) return;

      const sourceTodoModified = {
        ...sourceTodo,
        columnId: over.id as string,
      };
      todosCopy.splice(sourceTodoIndex, 1, sourceTodoModified);
      this.todos = todosCopy;
    }
  };
}
