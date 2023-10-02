import { faker } from "@faker-js/faker";
import { action, makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import type { Column, Id, Todo } from "./types";

export class Stores {
  todoStore: TodoStore;

  constructor() {
    this.todoStore = new TodoStore(this);
  }
}

export class TodoStore {
  rootState: Stores;
  columns: Column[] = [];
  todos: Todo[] = [];

  constructor(rootState: Stores, initialState?: TodoStore) {
    this.rootState = rootState;

    if (initialState) {
      this.columns = initialState.columns;
      this.todos = initialState.todos;
    }

    makeObservable(this, {
      columns: observable,
      todos: observable,
      createColumn: action,
      deleteColumn: action,
      updateColumnTitle: action,
      createTodo: action,
      deleteTodo: action,
      updateTodoContent: action,
      dragEndTodoToTodo: action,
      dragEndTodoToColumn: action,
    });
  }

  createColumn(title: string) {
    this.columns.push({
      id: uuidv4(),
      title,
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

  dragEndTodoToTodo = (sourceTodoId: Id, destinationTodoId: Id) => {
    const todosCopy = this.todos.slice();

    const sourceTodoIndex = todosCopy.findIndex(
      (todo) => todo.id === sourceTodoId,
    );
    const sourceTodo = todosCopy[sourceTodoIndex];
    const destinationTodoIndex = todosCopy.findIndex(
      (todo) => todo.id === destinationTodoId,
    );
    const destinationTodo = todosCopy[destinationTodoIndex];
    if (sourceTodoIndex < 0 || destinationTodoIndex < 0) return;

    const sourceTodoModified = {
      ...sourceTodo,
      columnId: destinationTodo.columnId,
    };
    todosCopy.splice(sourceTodoIndex, 1, sourceTodoModified);
    return todosCopy;
  };

  dragEndTodoToColumn = (sourceTodoId: Id, destinationColumnId: Id) => {
    const todosCopy = this.todos.slice();
    const sourceTodoIndex = todosCopy.findIndex(
      (todo) => todo.id === sourceTodoId,
    );
    const sourceTodo = todosCopy[sourceTodoIndex];
    const destinationColumnIndex = this.columns.findIndex(
      (column) => column.id === destinationColumnId,
    );
    if (sourceTodoIndex < 0 || destinationColumnIndex < 0) return;

    const sourceTodoModified = {
      ...sourceTodo,
      columnId: destinationColumnId,
    };
    todosCopy.splice(sourceTodoIndex, 1, sourceTodoModified);
    return todosCopy;
  };
}
