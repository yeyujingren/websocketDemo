
import {EnthusiasmAction} from './actions';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from './actionType'

export interface StoreState {
  languageName: string;
  enthusiasnLevel: number;
}


export function enthusiasm(state : StoreState, action: EnthusiasmAction): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM: {
      let {enthusiasnLevel} = state;
      enthusiasnLevel += 1;
      return {
        ...state,
        enthusiasnLevel
      }
    }
    case DECREMENT_ENTHUSIASM:
      return {
        ...state, enthusiasnLevel: Math.max(1, state.enthusiasnLevel - 1)
      }
    default:
      return {
        ...state
      }
  }
}


