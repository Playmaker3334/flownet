import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const RevenueAnalysis = ({ data = {} }) => {
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
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Revenue',
              data: [12000, 14500, 13800, 15200],
              borderColor: 'rgba(255, 149, 0, 1)',
              backgroundColor: 'rgba(255, 149, 0, 0.1)',
              tension: 0.3
            },
            {
              label: 'Costs',
              data: [8000, 9200, 8800, 9500],
              borderColor: 'rgba(255, 59, 48, 1)',
              backgroundColor: 'rgba(255, 59, 48, 0.1)',
              tension: 0.3
            },
            {
              label: 'Profit',
              data: [4000, 5300, 5000, 5700],
              borderColor: 'rgba(52, 199, 89, 1)',
              backgroundColor: 'rgba(52, 199, 89, 0.1)',
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Revenue Analysis',
              font: { size: 16, weight: '600' }
            },
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
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

export default RevenueAnalysis;