import React, { FC } from 'react';
import SessionItem from './SessionItem';

import './style.less'

const SessionList: FC = () => {
  return (
    <div className="sessionListWrapper">
      {
        Array(4).fill(0).map((i,index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <SessionItem key={index} />
        })
      }
    </div>
  )
}

export default SessionList;
