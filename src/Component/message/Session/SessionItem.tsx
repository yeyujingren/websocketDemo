import React, { FC } from 'react';
import history from '../../../utils/history'

const SessionItem: FC = () => {
  const dialogueDetailHandler: () => void = () => {
    history.push('/dialogue/2')
  }
  return(
    <div onClick={dialogueDetailHandler} className="sessionItemWrapper">
      <img src="https://upload.jianshu.io/users/upload_avatars/3633751/ce034174-a744-42b7-a0c6-84cb20efd964.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt=""/>
      <div className="right">
        <div className="top">
          <span className="title">
            夜语惊人
          </span>
          <span className="sendTime">
            17:59
          </span>
        </div>
        <div className="lastMsg">
          aha, its a sunnly day, isn&apos;t it?
        </div>
      </div>
    </div>
  )
}

export default SessionItem;
