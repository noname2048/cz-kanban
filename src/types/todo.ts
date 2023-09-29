export type Id = string | number;

export type Todo = {
  id: Id;
  columnId: Id;
  content: string;
};

export type Column = {
  id: Id;
  title: string;
};
