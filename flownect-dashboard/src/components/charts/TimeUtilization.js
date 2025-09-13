import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const TimeUtilization = ({ data = {} }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Active Work', 'Transit', 'Break', 'Idle', 'Admin'],
          datasets: [{
            data: [68, 18, 8, 4, 2],
            backgroundColor: [
              'rgba(52, 199, 89, 0.8)',
              'rgba(0, 122, 255, 0.8)',
              'rgba(255, 204, 0, 0.8)',
              'rgba(255, 59, 48, 0.8)',
              'rgba(142, 142, 147, 0.8)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Time Utilization Breakdown',
              font: { size: 16, weight: '600' }
            },
            legend: {
              position: 'bottom',
              labels: {
                padding: 15,
                font: { size: 11 }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.label + ': ' + context.parsed + '%';
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

export default TimeUtilization;