import { TodoList, TodoListAction, ADD_ITEM } from './actionType';

const defaultState: TodoList = {
  lists: [{
    message: 'aaa',
    level: 1,
    cless: 'lg'
  }]
}

export default function todoListReducer(
  state = defaultState,
  action: TodoListAction
): TodoList {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        lists: [...state.lists, action.payload]
      }
  
    default:
      return {
        ...state
      }
  }
}
