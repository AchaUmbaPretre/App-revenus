import React from 'react'
import './home.scss'
import InfoRevenus from '../../components/infoRevenus/InfoRevenus'
import ChartFalcon from '../../components/chartFalcon/ChartFalcon'
import ChartNdoe from '../../components/chartNdoe/ChartNdoe'

const Home = () => {
  return (
    <>
        <div className="home">
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