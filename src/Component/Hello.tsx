import React, { FC, ReactElement } from 'react';

export interface HelloProps {
  name: string;
  enthusiasnLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
};

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}

const Hello: FC = ({name, enthusiasnLevel=1, onIncrement, onDecrement}: HelloProps): ReactElement => {
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

export default Hello;
