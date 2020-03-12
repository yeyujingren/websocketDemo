import { createStore, applyMiddleware, combineReducers, compose, Action } from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';

const rootReducer = combineReducers({});

const configureStore = (initialState = {}) => {
  const composeFn = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = composeFn(applyMiddleware(thunk));
  return createStore(rootReducer, initialState, enhancers);
}

const store = configureStore();

export type RootReducer = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootReducer,
  unknown,
  Action<string>
>
export default store;
