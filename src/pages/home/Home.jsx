import React from 'react';
import './home.scss';
import InfoRevenus from '../../components/infoRevenus/InfoRevenus';
import ChartFalcon from '../../components/chartFalcon/ChartFalcon';
import ChartNdoe from '../../components/chartNdoe/ChartNdoe';
import { ShopOutlined, BarChartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import InfoNdoe from '../../components/infoNdoe/InfoNdoe';
import InfoFalcon from '../../components/infoFalcon/InfoFalcon';

const { TabPane } = Tabs;

const Home = () => {
  return (
    <div className="home">
      <Tabs defaultActiveKey="0" tabBarStyle={{ background: '#f0f2f5', padding: '10px 15px' }}>
        <TabPane
          tab={<span><ShopOutlined /> NDOE</span>}
          key="0"
        >
          <div className="home-wrapper">
            <InfoNdoe />
          </div>
          <div className="home-rows">
            <ChartNdoe />
          </div>
        </TabPane>
        <TabPane
          tab={<span><BarChartOutlined /> FALCON</span>}
          key="1"
        >
          <div className="home-wrapper">
            <InfoFalcon />
          </div>
          <div className="home-rows">
            <ChartFalcon />
          </div>
        </TabPane>
        <TabPane
          tab={<span><InfoCircleOutlined /> GENERAL</span>}
          key="2"
        >
          <div className="home-wrapper">
            <InfoRevenus />
          </div>
          <div className="home-rows">
            <ChartNdoe />
            <ChartFalcon />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Home;
