import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PredictiveAnalytics = ({ data = {} }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
          datasets: [
            {
              label: 'Actual Jobs',
              data: [120, 125, 130, 128, null, null, null, null],
              borderColor: 'rgb(255, 149, 0)',
              backgroundColor: 'rgba(255, 149, 0, 0.1)',
              borderWidth: 2,
              tension: 0.3
            },
            {
              label: 'Predicted',
              data: [118, 123, 128, 132, 135, 138, 140, 142],
              borderColor: 'rgb(0, 122, 255)',
              backgroundColor: 'rgba(0, 122, 255, 0.1)',
              borderWidth: 2,
              borderDash: [5, 5],
              tension: 0.3
            },
            {
              label: 'Upper Bound',
              data: [126, 131, 136, 140, 143, 146, 148, 150],
              borderColor: 'rgba(0, 122, 255, 0.3)',
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderDash: [2, 2],
              fill: false,
              pointRadius: 0
            },
            {
              label: 'Lower Bound',
              data: [110, 115, 120, 124, 127, 130, 132, 134],
              borderColor: 'rgba(0, 122, 255, 0.3)',
              backgroundColor: 'rgba(0, 122, 255, 0.05)',
              borderWidth: 1,
              borderDash: [2, 2],
              fill: '-1',
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: 'index'
          },
          plugins: {
            title: {
              display: true,
              text: 'Predictive Analytics & Trends',
              font: { size: 16, weight: '600' }
            },
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: 'Number of Jobs'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Week'
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="chart-wrapper">
      <canvas ref={chartRef} height="350"></canvas>
    </div>
  );
};

export default PredictiveAnalytics;