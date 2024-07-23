import React from 'react'
import './topbar.scss'
import { MenuFoldOutlined, BellOutlined, MailOutlined } from '@ant-design/icons';
import users from './../../assets/user.png'

const Topbar = () => {


  const handleClick = () => {

  };
  return (
    <>
      <div className="topbar">
        <div className="topbar-wrapper">
          <div className="topbar_left">
            <MenuFoldOutlined onClick={handleClick} />
          </div>
          <div className="topbar_right">
            <div className="topbar_icons topbarOne">
              <MailOutlined className='topbar_icon'/>
            </div>
            <div className="topbar_icons topbarOne">
              <BellOutlined className='topbar_icon' />
            </div>
            <div className="topbar_icons">
              <img src={users} alt="" className='topbar_user'/>
              <span className='topbar_username'>Tite</span>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Topbar