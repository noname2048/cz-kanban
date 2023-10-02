export type Id = string;

export type Todo = {
  id: Id;
  columnId: Id;
  content: string;
};

export type Column = {
  id: Id;
  title: string;
};

export type KanbanBoard = {
  todos: Todo[];
  columns: Column[];
};
