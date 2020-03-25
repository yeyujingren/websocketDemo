import {applyMiddleware, combineReducers, createStore, Action, compose} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';

const rootReducer = combineReducers({
  
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

function configureStore() {
  const composeFn = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = composeFn(applyMiddleware(thunk));
  return createStore(rootReducer, enhancers);
}

export default configureStore();
