import React from 'react'
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import './infoRevenus.scss'

const InfoRevenus = () => {
  return (
    <>
        <div className="info-revenus">
            <div className="info-wrapper">
                <div className="info-row">
                    <h2 className="info-h2">Ndoé</h2>
                    <div className="info-row-container">
                        <div className="info-row-left" style={{background: 'rgba(53, 52, 52, 0.137)'}}>
                            <VerticalAlignBottomOutlined className='info-icon' style={{color: 'rgba(53, 52, 52, 0.719)'}} />
                        </div>
                        <div className="info-row-right">
                            <h2 className="info-row-h2">1000$</h2>
                            <span className="info-span">Montant total de la vente</span>
                        </div>
                    </div>
                </div>
                <div className="info-row">
                    <h2 className="info-h2">Ndoé</h2>
                    <div className="info-row-container">
                        <div className="info-row-left" style={{background : 'rgba(255, 0, 0, 0.164)'}}>
                            <VerticalAlignTopOutlined className='info-icon' style={{color: 'red'}}/>
                        </div>
                        <div className="info-row-right">
                            <h2 className="info-row-h2">1000$</h2>
                            <span className="info-span">Montant total des dépenses</span>
                        </div>
                    </div>
                </div>
                <div className="info-row">
                    <h2 className="info-h2">Falcon</h2>
                    <div className="info-row-container">
                        <div className="info-row-left" style={{background: 'rgba(53, 52, 52, 0.137)'}}>
                            <VerticalAlignBottomOutlined className='info-icon' style={{color: 'rgba(53, 52, 52, 0.719)'}} />
                        </div>
                        <div className="info-row-right">
                            <h2 className="info-row-h2">1000$</h2>
                            <span className="info-span">Montant total des paiements</span>
                        </div>
                    </div>
                </div>
                <div className="info-row">
                    <h2 className="info-h2">Falcon</h2>
                    <div className="info-row-container">
                        <div className="info-row-left" style={{background : 'rgba(255, 0, 0, 0.164)'}}>
                            <VerticalAlignTopOutlined className='info-icon' style={{color: 'red'}}/>
                        </div>
                        <div className="info-row-right">
                            <h2 className="info-row-h2">1000$</h2>
                            <span className="info-span">Montant total des dépenses</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default InfoRevenus