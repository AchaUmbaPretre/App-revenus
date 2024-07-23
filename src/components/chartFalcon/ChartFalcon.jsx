import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './chartFalcon.scss';

const ChartFalcon = () => {
  const chartOptions = {
    series: [{
      name: 'Paiements',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148] // exemple de données, remplacez-les par vos données réelles
    }],
    options: {
      chart: {
        type: 'line', // choisissez le type de graphique que vous voulez, par exemple 'line', 'bar', etc.
        height: 350
      },
      title: {
        text: 'Historique des Paiements',
        align: 'center'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] // exemple de catégories, remplacez-les par vos catégories réelles
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
        <h2 className="chartFalcon-h2">Falcon paiement</h2>
      </div>
      <div className="chartFalcon-chart">
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

export default ChartFalcon;
