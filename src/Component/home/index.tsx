import React, { FC, useState, ReactElement, ReactHTMLElement } from 'react';
import { TabBar } from 'antd-mobile';

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
    <div style={fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={hidden}
      >
        <TabBar.Item
          title="Life"
          key="Life"
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
          }}
          />
          }
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
          }}
          />
          }
          selected={tab === 'blueTab'}
          badge={1}
          onPress={() => {
            steTab('blueTab');
          }}
          data-seed="logId"
        >
          {renderContent('Life')}
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          title="Koubei"
          key="Koubei"
          badge="new"
          selected={tab === 'redTab'}
          onPress={() => {
            steTab('redTab');
          }}
          data-seed="logId1"
        >
          {renderContent('Koubei')}
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          title="Friend"
          key="Friend"
          dot
          selected={tab === 'greenTab'}
          onPress={() => {
            steTab('greenTab');
          }}
        >
          {renderContent('Friend')}
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="My"
          key="my"
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
