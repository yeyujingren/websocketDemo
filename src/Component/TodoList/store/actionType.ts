export interface TodoItem {
  message: string;
  level: number;
  cless: string;
};

export interface TodoList {
  lists: TodoItem[]
};

export const ADD_ITEM = 'add_item';
export const SUB_ITEM = 'sub_item';

interface AddItemAction {
  type: typeof ADD_ITEM
  payload: TodoItem
}

interface SubItemAction {
  type: typeof SUB_ITEM
  payload: TodoItem
}

export type TodoListAction = AddItemAction | SubItemAction;
