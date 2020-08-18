import React, { FC } from 'react';
import history from '../../utils/history';

const Logon: FC = () => {
  const goBackHandler:()=>void = () => {
    history.push('/login')
  }
  return(
    <div>
      <p>
      sry, its not support to login
      </p>
      <div onClick={goBackHandler}>go back</div>
    </div>
  )
}

export default Logon;
