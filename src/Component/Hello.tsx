import React from 'react';
// eslint-disable-next-line no-unused-vars
import {StoreState} from '../store/reducer'
// eslint-disable-next-line no-unused-vars
import { connect, Dispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import {EnthusiasmAction, incrementEnthusiasm, decrementEnthusiasm} from '../store/actions'

export interface HelloProps {
  name: string;
  enthusiasnLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
};

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}

const Hello = ({name, enthusiasnLevel=1, onIncrement, onDecrement}: HelloProps) => {
  if (enthusiasnLevel <= 0) {
    throw new Error('U could be a little more enthusiastic. :D');
  }
  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasnLevel)}
      </div>
      <div>
        <button type="button" onClick={onDecrement}>-</button>
        <button type="button" onClick={onIncrement}>+</button>
      </div>
    </div>
  )
}

export const mapStateToProps = ({enthusiasnLevel, languageName }: StoreState) => {
  return {
    enthusiasnLevel,
    name: languageName
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<EnthusiasmAction>) => {
  return {
    onIncrement: () => dispatch(incrementEnthusiasm()),
    onDecrement: () => dispatch(decrementEnthusiasm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello)
