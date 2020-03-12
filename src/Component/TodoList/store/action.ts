import {TodoItem, ADD_ITEM, SUB_ITEM, TodoListAction} from './actionType';

export function addItemAction(payload: TodoItem): TodoListAction {
  return {
    type: ADD_ITEM,
    payload
  }
}

export function subItemAction(payload: TodoItem): TodoListAction {
  return {
    type: SUB_ITEM,
    payload
  }
}
