import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { faker } from "@faker-js/faker";
import { makeObservable, observable, action } from "mobx";
import { v4 as uuidv4 } from "uuid";

export type Todo = {
  id: string;
  columnId: string;
  content: string;
};

export type Column = {
  id: string;
  title: string;
};

export class Kanban {
  todos: Todo[];
  columns: Column[];
  activeTodo: Todo | null;
  activeColumn: Column | null;

  constructor() {
    this.todos = [];
    this.columns = [];
    this.activeTodo = null;
    this.activeColumn = null;
    makeObservable(this, {
      todos: observable,
      columns: observable,
      activeTodo: observable,
      activeColumn: observable,

      createColumn: action,
      updateColumn: action,
      deleteColumn: action,

      createTodo: action,
      updateTodo: action,
      deleteTodo: action,

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
  updateColumn(column: Column) {
    this.columns = this.columns.map((c) => {
      if (c.id === column.id) {
        return column;
      }
      return c;
    });
  }
  deleteColumn(column: Column) {
    this.columns = this.columns.filter((c) => c.id !== column.id);
  }

  createTodo(columnId: string) {
    this.todos.push({
      id: uuidv4(),
      columnId: columnId,
      content: faker.lorem.sentence(),
    });
  }
  updateTodo(todo: Todo) {
    this.todos = this.todos.map((t) => {
      if (t.id === todo.id) {
        return todo;
      }
      return t;
    });
  }
  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter((t) => t.id !== todo.id);
  }

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
