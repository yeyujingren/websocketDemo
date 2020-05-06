import React, { FC, useState, Suspense } from 'react';
import { TabBar } from 'antd-mobile';
import {LazyComponent, Message} from './LazyImport';

import './index.less';

interface RenderContentProps {
  (a: string): JSX.Element
}

const Home: FC = () => {

  const [tab, steTab] = useState('redTab');

  const renderContent: RenderContentProps = (flag: string) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Message />
      </Suspense>
    )
  }
  return (
    <div className="homeWapper">
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          title="Msg"
          key="Msg"
          icon={
            <div className="iconfont">&#xe631;</div>
          }
          selectedIcon={
            <div className="iconfont selected">&#xe631;</div>
          }
          selected={tab === 'blueTab'}
          badge={100}
          onPress={() => {
            steTab('blueTab');
          }}
          data-seed="logId"
        >
          {renderContent('msg')}
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div className="iconfont">&#xe609;</div>
          }
          selectedIcon={
            <div className="iconfont selected">&#xe609;</div>
          }
          title="Fri"
          key="Fri"
          badge={3}
          selected={tab === 'greenTab'}
          onPress={() => {
            steTab('greenTab');
          }}
        >
          {renderContent('Fri')}
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div className="iconfont">&#xe7e4;</div>
          }
          selectedIcon={
            <div className="iconfont selected">&#xe7e4;</div>
          }
          title="Per"
          key="Per"
          dot
          selected={tab === 'yellowTab'}
          onPress={() => {
            steTab('yellowTab');
          }}
        >
          {renderContent('Per')}
        </TabBar.Item>
      </TabBar>
    </div>
  )
}

export default Home;
