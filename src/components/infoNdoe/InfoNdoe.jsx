import React, { useCallback, useEffect, useState } from 'react';
import { VerticalAlignBottomOutlined, EllipsisOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../config';
import CountUp from 'react-countup';
import { InputNumber, Select } from 'antd';

const { Option } = Select;

const InfoNdoe = () => {
    const [venteTotal, setVenteTotal] = useState(0);
    const [depenses, setDepenses] = useState(0);
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [dateFilter, setDateFilter] = useState('today');
    const [year, setYear] = useState(new Date().getFullYear());

    const fetchData = useCallback(async (filter, year) => {
        try {
            const params = { filter };
            if (filter === 'year') params.year = year;

            const { data } = await axios.get(`${DOMAIN}/api/rapport/venteTotal/total`, { params });
            setVenteTotal(data[0]?.montant_total_vente || 0);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [DOMAIN]);

    const fetchDataDepense = useCallback(async (filter, year) => {
        try {
            const params = { filter };
            if (filter === 'year') params.year = year;

            const { data } = await axios.get(`${DOMAIN}/api/depenses/depenseCount`, { params });
            setDepenses(data[0]?.total_depense || 0);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [DOMAIN]);

    useEffect(() => {
        fetchData(dateFilter, year);
        fetchDataDepense(dateFilter, year);
    }, [fetchData, fetchDataDepense, dateFilter, year]);

    const handleDateFilterChange = (value) => {
        setDateFilter(value);
        fetchData(value, year);
        fetchDataDepense(value, year);
    };

    const handleYearChange = (value) => {
        setYear(value);
        if (dateFilter === 'year') {
            fetchData(dateFilter, value);
            fetchDataDepense(dateFilter, value);
        }
    };

    return (
        <>
            <div className="home-rapport">
                <div className="home-right">
                    <Select value={dateFilter} onChange={handleDateFilterChange} style={{ width: 200, paddingRight: '10px' }}>
                        <Option value="today">Aujourd'hui</Option>
                        <Option value="yesterday">Hier</Option>
                        <Option value="last7days">7 derniers jours</Option>
                        <Option value="last30days">30 derniers jours</Option>
                        <Option value="last1year">1 an</Option>
                        <Option value="year">Par année</Option>
                    </Select>
                    {dateFilter === 'year' && (
                        <InputNumber min={2000} max={new Date().getFullYear()} value={year} onChange={handleYearChange} />
                    )}
                </div>
            </div>
            <div className="info-revenus">
                <div className="info-wrapper">
                    <div className="info-row">
                        <div className="info_row_title">
                            <h2 className="info-h2">Ndoé</h2>
                            <EllipsisOutlined className='info-icon-elli' />
                        </div>
                        <div className="info-row-container">
                            <div className="info-row-left" style={{ background: 'rgba(0, 255, 0, 0.164)' }}>
                                <VerticalAlignBottomOutlined className='info-icon' style={{ color: 'green' }} />
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
                </div>
            </div>
        </>
    );
};

export default InfoNdoe;
