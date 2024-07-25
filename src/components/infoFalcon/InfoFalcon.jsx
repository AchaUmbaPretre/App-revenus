import React, { useEffect, useState } from 'react';
import { VerticalAlignBottomOutlined,EllipsisOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../config';
import CountUp from 'react-countup';
import { Select } from 'antd';
const { Option } = Select;

const InfoFalcon = () => {
    const [paiement, setPaiement] = useState(0);
    const [depensesFalcon, setDepenseFalcon] = useState(0);
    const DOMAINFALCON = config.REACT_APP_SERVER_DOMAIN_FALCON;
    const [dateFilter, setDateFilter] = useState('today');

    const handleDateFilterChange = (value) => {
        setDateFilter(value);
/*         fetchData(value); */
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAINFALCON}/depense/count1an`);
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
                console.log('Paiements:', data);
                setPaiement(data[0]?.total_paiement || 0);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [DOMAINFALCON]);

    return (
        <>
            <div className="home-rapport">
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
            <div className="info-revenus">
                <div className="info-wrapper">
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
                </div>
            </div>
        </>
    );
}

export default InfoFalcon;
