import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './chartNdoe.scss';

const ChartNdoe = () => {
  const chartOptions = {
    series: [{
      name: 'Ventes',
      data: [30, 40, 35, 50, 49, 60, 70, 91] // exemple de données, remplacez-les par vos données réelles
    }],
    options: {
      chart: {
        type: 'line', // choisissez le type de graphique que vous voulez, par exemple 'line', 'bar', etc.
        height: 350
      },
      title: {
        text: 'Historique des Ventes',
        align: 'center'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] // exemple de catégories, remplacez-les par vos catégories réelles
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
          height={350} 
        />
      </div>
    </div>
  );
}

export default ChartNdoe;
