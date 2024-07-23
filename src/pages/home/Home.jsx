import React from 'react'
import './home.scss'
import InfoRevenus from '../../components/infoRevenus/InfoRevenus'

const Home = () => {
  return (
    <>
        <div className="home">
            <div className="home-wrapper">
                <InfoRevenus/>
            </div>
        </div>
    </>
  )
}

export default Home