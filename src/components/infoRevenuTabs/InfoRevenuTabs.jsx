import { Tabs } from 'antd'
import React from 'react'

const InfoRevenuTabs = () => {
  return (
    <>
        <div className="infoRevenuTabs">
            <div className="infoRevenu-wrapper">
            <Tabs defaultActiveKey="0" tabBarStyle={{ background: '#f0f2f5', padding: '10px 15px' }}>
                <Tabs.TabPane tab='Ndoé' key={0}>
                </Tabs.TabPane>
                <Tabs.TabPane tab='Falcon' key={1}>
                </Tabs.TabPane>
            </Tabs>
            </div>
        </div>
    </>
  )
}

export default InfoRevenuTabs