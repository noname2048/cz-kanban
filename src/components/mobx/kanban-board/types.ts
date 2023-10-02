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
