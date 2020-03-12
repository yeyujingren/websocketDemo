import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from './actionType';

export interface Message {
  user: string;
  messge: string;
  timestamp: number;
}
export interface IncrementEnthusiasm {
  type: INCREMENT_ENTHUSIASM,
  payLoad?: Message

}
export interface DecrementEnthusiasm {
  type: DECREMENT_ENTHUSIASM
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm

export function incrementEnthusiasm(): IncrementEnthusiasm {
  return {
    type: INCREMENT_ENTHUSIASM,
  }
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
  return {
    type: DECREMENT_ENTHUSIASM
  }
}
