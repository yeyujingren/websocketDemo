import { createStore } from 'redux';
import { enthusiasm, StoreState } from './reducer';


const store = createStore<StoreState>(enthusiasm, {
  languageName: 1,
  enthusiasnLevel: 2,
})

export default store;
