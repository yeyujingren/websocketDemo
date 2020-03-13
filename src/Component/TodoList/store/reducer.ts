import { TodoList, TodoListAction, ADD_ITEM, SUB_ITEM } from './actionType';

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
    case SUB_ITEM: {
      const newList = state.lists.filter((item) => {
        if(item.cless === action.payload.cless 
          && item.message === action.payload.message) {
          return false;
        } 
        return true
      })
      console.log(newList);
      return {
        ...state,
        lists: newList
      }
    }
    default:
      return {
        ...state
      }
  }
}
