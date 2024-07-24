import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import './chartFalcon.scss';
import config from '../../config';

const ChartFalcon = () => {
    const DOMAINFALCON = config.REACT_APP_SERVER_DOMAIN_FALCON;
    const [paiementData, setPaiementData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [depenses, setDepenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // Les labels pour les mois

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paiementResponse = await axios.get(`${DOMAINFALCON}/depense/paiementMois`);
                const depenseResponse = await axios.get(`${DOMAINFALCON}/depense/depenseMois`);

                const paiementDataFormatted = labels.map((label, index) => {
                    const data = paiementResponse.data.find(item => item.mois - 1 === index);
                    return data ? data.paiement_total : 0;
                });

                const depenseDataFormatted = labels.map((label, index) => {
                    const data = depenseResponse.data.find(item => item.mois - 1 === index);
                    return data ? data.total_depense : 0;
                });

                setPaiementData(paiementDataFormatted);
                setDepenses(depenseDataFormatted);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [DOMAINFALCON]);

    const chartOptions = {
        series: [
            {
                name: 'Paiements',
                data: paiementData // données réelles des paiements
            },
            {
                name: 'Dépenses',
                data: depenses // données réelles des dépenses
            }
        ],
        options: {
            chart: {
                type: 'line', // choisissez le type de graphique que vous voulez, par exemple 'line', 'bar', etc.
                height: 320
            },
            title: {
                text: 'Historique des Paiements et Dépenses',
                align: 'center'
            },
            xaxis: {
                categories: labels // les labels pour les mois
            },
            yaxis: {
                title: {
                    text: 'Montant en $'
                }
            }
        }
    };

    return (
        <div className="chartFalcon">
            <div className="chartFalcon-title">
                <h2 className="chartFalcon-h2">Falcon Paiements et Dépenses</h2>
            </div>
            <div className="chartFalcon-chart">
                <ReactApexChart 
                    options={chartOptions.options} 
                    series={chartOptions.series} 
                    type="line" 
                    height={320} 
                />
            </div>
        </div>
    );
}

export default ChartFalcon;
