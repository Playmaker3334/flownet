import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SatisfactionRadar = ({ data = {} }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Punctuality', 'Quality', 'Communication', 'Price', 'Reliability'],
          datasets: [
            {
              label: 'Current',
              data: [92, 88, 85, 78, 90],
              backgroundColor: 'rgba(255, 149, 0, 0.2)',
              borderColor: 'rgba(255, 149, 0, 1)',
              pointBackgroundColor: 'rgba(255, 149, 0, 1)'
            },
            {
              label: 'Target',
              data: [95, 92, 90, 80, 93],
              backgroundColor: 'rgba(52, 199, 89, 0.1)',
              borderColor: 'rgba(52, 199, 89, 0.5)',
              borderDash: [5, 5]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Client Satisfaction Metrics',
              font: { size: 16, weight: '600' }
            },
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            r: {
              min: 60,
              max: 100,
              ticks: { stepSize: 10 }
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

export default SatisfactionRadar;