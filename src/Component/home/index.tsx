import React, { FC, useState } from 'react';
import { TabBar } from 'antd-mobile';

import './index.less';

interface Props {

}

const Home: FC = (props: Props) => {

  const [tab, steTab] = useState('redTab');
  const [hidden, setHidden] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const renderContent: (a: string) => JSX.Element = (pageText: string) => (
    <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
      <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
      <div style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
        onClick={(e) => {
          e.preventDefault();
          setHidden(!hidden);
        }}
      >
        Click to show/hide tab-bar
      </div>
      <div style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
        onClick={(e) => {
          e.preventDefault()
          setFullScreen(!fullScreen);
        }}
      >
        Click to switch fullscreen
      </div>
    </div>
  )
  return (
    <div className="homeWapper">
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={hidden}
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
          dot
          selected={tab === 'greenTab'}
          onPress={() => {
            steTab('greenTab');
          }}
        >
          {renderContent('Friend')}
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
          {renderContent('My')}
        </TabBar.Item>
      </TabBar>
    </div>
  )
}

export default Home;
