import { TodoStore } from "@/components/mobx/kanban-board/todo-store.ts";

export class Stores {
  todoStore: TodoStore;

  constructor() {
    this.todoStore = new TodoStore(this);
  }
}
