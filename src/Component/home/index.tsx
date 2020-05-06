import React, { FC, useState, Suspense } from 'react';
import { TabBar } from 'antd-mobile';
import {LazyComponent, Message, Friends, Persional} from './LazyImport';

import './index.less';

interface RenderContentProps {
  (a: string): JSX.Element
}

const Home: FC = () => {

  const [tab, steTab] = useState('Msg');

  // 根据不同的标签render不同的页面
  const switchComponentHandler: RenderContentProps = (tags: string) => {
    switch (tags) {
      case 'Msg':
        return <Message />
      case 'Fri':
        return <Friends />
      case 'Per':
        return <Persional />
      default:
        return <Message />
    }
  }

  // 异步加载tab对应页面
  const renderContent: RenderContentProps = (flag: string) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        {switchComponentHandler(flag)}
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
          selected={tab === 'Msg'}
          badge={100}
          onPress={() => {
            steTab('Msg');
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
          selected={tab === 'Fri'}
          onPress={() => {
            steTab('Fri');
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
          selected={tab === 'Per'}
          onPress={() => {
            steTab('Per');
          }}
        >
          {renderContent('Per')}
        </TabBar.Item>
      </TabBar>
    </div>
  )
}

export default Home;
