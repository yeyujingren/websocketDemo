import React, { FC, useState, Suspense, useEffect } from 'react';
import { TabBar } from 'antd-mobile';
import {TabsTyps, RenderContentProps} from './type';

import { Message, Friends, Persional} from './LazyImport';

import './index.less';

const Home: FC = () => {

  const [tab, steTab] = useState(TabsTyps.Msg);

  // 根据不同的标签render不同的页面
  const switchComponentHandler: RenderContentProps = (tags: TabsTyps) => {
    switch (tags) {
      case TabsTyps.Msg:
        return <Message />
      case TabsTyps.Fri:
        return <Friends />
      case TabsTyps.Per:
        return <Persional />
      default:
        return <Message />
    }
  }

  // 异步加载tab对应页面
  const renderContent: RenderContentProps = (flag: TabsTyps) => {
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
          key={TabsTyps.Msg}
          icon={
            <div className="iconfont">&#xe631;</div>
          }
          selectedIcon={
            <div className="iconfont selected">&#xe631;</div>
          }
          selected={tab === TabsTyps.Msg}
          badge={100}
          onPress={() => {
            steTab(TabsTyps.Msg);
          }}
          data-seed="logId"
        >
          {renderContent(TabsTyps.Msg)}
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div className="iconfont">&#xe609;</div>
          }
          selectedIcon={
            <div className="iconfont selected">&#xe609;</div>
          }
          title="Fri"
          key={TabsTyps.Fri}
          badge={3}
          selected={tab === TabsTyps.Fri}
          onPress={() => {
            steTab(TabsTyps.Fri);
          }}
        >
          {renderContent(TabsTyps.Fri)}
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div className="iconfont">&#xe7e4;</div>
          }
          selectedIcon={
            <div className="iconfont selected">&#xe7e4;</div>
          }
          title="Per"
          key= {TabsTyps.Per}
          dot
          selected={tab === TabsTyps.Per}
          onPress={() => {
            steTab(TabsTyps.Per);
          }}
        >
          {renderContent(TabsTyps.Per)}
        </TabBar.Item>
      </TabBar>
    </div>
  )
}

export default Home;
