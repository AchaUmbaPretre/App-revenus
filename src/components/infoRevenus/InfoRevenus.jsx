import React, { useEffect, useState } from 'react';
import { VerticalAlignBottomOutlined,EllipsisOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import './infoRevenus.scss';
import axios from 'axios';
import config from '../../config';
import CountUp from 'react-countup';

const InfoRevenus = () => {
    const [venteTotal, setVenteTotal] = useState(0);
    const [paiement, setPaiement] = useState(0);
    const [depenses, setDepenses] = useState(0);
    const [depensesFalcon, setDepenseFalcon] = useState(0);
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const DOMAINFALCON = config.REACT_APP_SERVER_DOMAIN_FALCON;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/rapport/venteTotal/total`);
                console.log('Vente total:', data); // Vérifier les données
                setVenteTotal(data[0]?.montant_total_vente || 0);
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
                console.log('Dépenses:', data); // Vérifier les données
                setDepenses(data[0]?.total_depense || 0);
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
                console.log('Dépenses Falcon:', data); // Vérifier les données
                setDepenseFalcon(data[0]?.total_depense || 0);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [DOMAINFALCON]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAINFALCON}/paiement/paimentTout`);
                console.log('Paiements:', data); // Vérifier les données
                setPaiement(data[0]?.total_paiement || 0);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [DOMAINFALCON]);

    // Calculs
    const totalDepenses = depenses + depensesFalcon;
    const totalVentesEtPaiements = venteTotal + paiement;
    const benefice = totalVentesEtPaiements - totalDepenses;
    const pertes = totalDepenses > totalVentesEtPaiements ? totalDepenses - totalVentesEtPaiements : 0;

    return (
        <div className="info-revenus">
            <div className="info-wrapper">
                <div className="info-row">
                    <div className="info_row_title">
                        <h2 className="info-h2">Ndoé</h2>
                        <EllipsisOutlined className='info-icon-elli' />
                    </div>
                    <div className="info-row-container">
                        <div className="info-row-left" style={{ background: 'rgba(0, 255, 0, 0.164)' }}>
                            <VerticalAlignBottomOutlined className='info-icon'style={{ color: 'green' }} />
                        </div>
                        <div className="info-row-right">
                            <h2 className="info-row-h2"><CountUp end={venteTotal} />$</h2>
                            <span className="info-span">Montant total de la vente</span>
                        </div>
                    </div>
                </div>
                <div className="info-row">
                    <div className="info_row_title">
                        <h2 className="info-h2">Ndoé</h2>
                        <EllipsisOutlined className='info-icon-elli' />
                    </div>
                    <div className="info-row-container">
                        <div className="info-row-left" style={{ background: 'rgba(255, 0, 0, 0.164)' }}>
                            <VerticalAlignTopOutlined className='info-icon' style={{ color: 'red' }} />
                        </div>
                        <div className="info-row-right">
                            <h2 className="info-row-h2"><CountUp end={depenses} />$</h2>
                            <span className="info-span">Montant total des dépenses</span>
                        </div>
                    </div>
                </div>
                <div className="info-row">
                    <div className="info_row_title">
                        <h2 className="info-h2">Falcon</h2>
                        <EllipsisOutlined className='info-icon-elli' />
                    </div>
                    <div className="info-row-container">
                        <div className="info-row-left" style={{ background: 'rgba(0, 255, 0, 0.164)' }}>
                            <VerticalAlignBottomOutlined className='info-icon' style={{ color: 'green' }} />
                        </div>
                        <div className="info-row-right">
                            <h2 className="info-row-h2"><CountUp end={paiement} />$</h2>
                            <span className="info-span">Montant total des paiements</span>
                        </div>
                    </div>
                </div>
                <div className="info-row">
                    <div className="info_row_title">
                        <h2 className="info-h2">Falcon</h2>
                        <EllipsisOutlined className='info-icon-elli' />
                    </div>
                    <div className="info-row-container">
                        <div className="info-row-left" style={{ background: 'rgba(255, 0, 0, 0.164)' }}>
                            <VerticalAlignTopOutlined className='info-icon' style={{ color: 'red' }} />
                        </div>
                        <div className="info-row-right">
                            <h2 className="info-row-h2"><CountUp end={depensesFalcon} />$</h2>
                            <span className="info-span">Montant total des dépenses</span>
                        </div>
                    </div>
                </div>
                <div className="info-row">
                    <div className="info_row_title">
                        <h2 className="info-h2">Total</h2>
                        <EllipsisOutlined className='info-icon-elli' />
                    </div>
                    <div className="info-row-container">
                        <div className="info-row-left" style={{ background: 'rgba(0, 255, 0, 0.164)' }}>
                            <VerticalAlignBottomOutlined className='info-icon' style={{ color: 'green' }}  />
                        </div>
                        <div className="info-row-right">
                            <h2 className="info-row-h2"><CountUp end={totalDepenses} />$</h2>
                            <span className="info-span">Dépenses totales (Ndoé + Falcon)</span>
                        </div>
                    </div>
                </div>
                <div className="info-row">
                    <div className="info_row_title">
                        <h2 className="info-h2">Total</h2>
                        <EllipsisOutlined className='info-icon-elli' />
                    </div>
                    <div className="info-row-container">
                        <div className="info-row-left" style={{ background: 'rgba(0, 255, 0, 0.164)' }}>
                            <VerticalAlignBottomOutlined className='info-icon' style={{ color: 'green' }}  />
                        </div>
                        <div className="info-row-right">
                            <h2 className="info-row-h2"><CountUp end={totalVentesEtPaiements} />$</h2>
                            <span className="info-span">Ventes totales et paiements (Ndoé + Falcon)</span>
                        </div>
                    </div>
                </div>
                <div className="info-row">
                    <div className="info_row_title">
                        <h2 className="info-h2">Bénéfice</h2>
                        <EllipsisOutlined className='info-icon-elli' />
                    </div>
                    <div className="info-row-container">
                        <div className="info-row-left" style={{ background: 'rgba(0, 255, 0, 0.164)' }}>
                            <VerticalAlignBottomOutlined className='info-icon' style={{ color: 'green' }} />
                        </div>
                        <div className="info-row-right">
                            <h2 className="info-row-h2"><CountUp end={benefice} />$</h2>
                            <span className="info-span">Bénéfice total (Ventes + Paiements - Dépenses)</span>
                        </div>
                    </div>
                </div>
                { pertes > 0 && (
                <div className="info-row">
                    <h2 className="info-h2">Perte</h2>
                    <div className="info-row-container">
                        <div className="info-row-left" style={{ background: 'rgba(255, 0, 0, 0.164)' }}>
                            <VerticalAlignTopOutlined className='info-icon' style={{ color: 'red' }} />
                        </div>
                        <div className="info-row-right">
                            <h2 className="info-row-h2"><CountUp end={pertes} />$</h2>
                            <span className="info-span">Perte totale (Dépenses - Ventes - Paiements)</span>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}

export default InfoRevenus;
