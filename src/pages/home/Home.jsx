import React, { useState } from 'react'
import './home.scss'
import InfoRevenus from '../../components/infoRevenus/InfoRevenus'
import ChartFalcon from '../../components/chartFalcon/ChartFalcon'
import ChartNdoe from '../../components/chartNdoe/ChartNdoe'
import { HomeOutlined } from '@ant-design/icons';
import { Select } from 'antd'
const { Option } = Select;

const Home = () => {
    const [dateFilter, setDateFilter] = useState('today');

    const handleDateFilterChange = (value) => {
        setDateFilter(value);
/*         fetchData(value); */
      };

  return (
    <>
        <div className="home">
            <div className="home-rapport">
                <div className="home-left">
                    <HomeOutlined className='icon-home' />
                    <span className="home-span">ACCUEIL</span>
                </div>
                <div className="home-right">
                    <Select value={dateFilter} onChange={handleDateFilterChange} style={{ width: 200 }}>
                        <Option value="today">Aujourd'hui</Option>
                        <Option value="yesterday">Hier</Option>
                        <Option value="last7days">7 derniers jours</Option>
                        <Option value="last30days">30 derniers jours</Option>
                        <Option value="last1year">1 an</Option>
                    </Select>
                </div>
            </div>
            <div className="home-wrapper">
                <InfoRevenus/>
            </div>
            <div className='home-rows'>
                <ChartNdoe/>
                <ChartFalcon/>
            </div>
        </div>
    </>
  )
}

export default Home