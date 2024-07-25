import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import './chartNdoe.scss';
import config from '../../config';

const ChartNdoe = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [venteData, setVenteData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportVenteMois/total`);
                const ventesData = data.map(({ mois, total_vente }) => ({
                    x: monthLabels[mois - 1],
                    y: total_vente,
                }));
                setVenteData(ventesData);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [DOMAIN]);

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // Les labels pour les mois

    const chartOptions = {
        series: [{
            name: 'Ventes',
            data: venteData // exemple de données, remplacez-les par vos données réelles
        }],
        options: {
            chart: {
                type: 'line', // choisissez le type de graphique que vous voulez, par exemple 'line', 'bar', etc.
                height: 350
            },
            title: {
                text: 'Historique',
                align: 'center'
            },
            xaxis: {
                categories: monthLabels.slice(0, venteData.length) // exemple de catégories, remplacez-les par vos catégories réelles
            },
            yaxis: {
                title: {
                    text: 'Montant des Ventes'
                }
            }
        }
    };

    return (
        <div className="chartNdoe">
            <div className="chartNdoe-title">
                <h2 className="chartNdoe-h2">Ndoe vente</h2>
            </div>
            <div className="chartNdoe-chart">
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

export default ChartNdoe;
