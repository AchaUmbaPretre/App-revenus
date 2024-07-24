import React, { useEffect, useState } from 'react'
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import './infoRevenus.scss'
import axios from 'axios';
import config from '../../config';
import CountUp from 'react-countup';

const InfoRevenus = () => {
    const [venteTotal, setVenteTotal] = useState([]);
    const [produitTotalAchats, setProduitTotalAchats] = useState([]);
    const [depenses, setDepenses] = useState([]);
    const [depensesFalcon, setDepenseFalcon] = useState([]);
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const DOMAINFALCON = config.REACT_APP_SERVER_DOMAIN_FALCON;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/rapport/venteTotal/total`);
            setVenteTotal(data[0]?.montant_total_vente);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/depenses/depenseCount`);
            setDepenses(data[0]?.total_depense);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAINFALCON}/depense/count1an`);
            setDepenseFalcon(data[0]?.total_depense);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAINFALCON]);

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
                            <h2 className="info-row-h2"><CountUp end={venteTotal}/>$</h2>
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
                            <h2 className="info-row-h2"><CountUp end={depenses}/>$</h2>
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
                            <h2 className="info-row-h2"><CountUp end={1000}/>$</h2>
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
                            <h2 className="info-row-h2"><CountUp end={depensesFalcon}/>$</h2>
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