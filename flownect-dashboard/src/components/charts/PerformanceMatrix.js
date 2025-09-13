import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PerformanceMatrix = ({ data = [], selectedEmployee = 'María García' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      const weeklyPerformance = [
        { day: 'Mon', efficiency: 92, tasks: 8 },
        { day: 'Tue', efficiency: 88, tasks: 7 },
        { day: 'Wed', efficiency: 95, tasks: 9 },
        { day: 'Thu', efficiency: 90, tasks: 8 },
        { day: 'Fri', efficiency: 93, tasks: 8 },
        { day: 'Sat', efficiency: 85, tasks: 5 }
      ];
      
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: weeklyPerformance.map(d => d.day),
          datasets: [
            {
              label: 'Efficiency %',
              data: weeklyPerformance.map(d => d.efficiency),
              borderColor: 'rgba(255, 149, 0, 1)',
              backgroundColor: 'rgba(255, 149, 0, 0.1)',
              tension: 0.3,
              yAxisID: 'y'
            },
            {
              label: 'Tasks Completed',
              data: weeklyPerformance.map(d => d.tasks),
              borderColor: 'rgba(0, 122, 255, 1)',
              backgroundColor: 'rgba(0, 122, 255, 0.1)',
              tension: 0.3,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: `${selectedEmployee} - Weekly Performance`,
              font: { size: 16, weight: '600' }
            },
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Efficiency %'
              },
              min: 70,
              max: 100
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Tasks'
              },
              grid: {
                drawOnChartArea: false,
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
  }, [data, selectedEmployee]);

  return (
    <div className="chart-wrapper">
      <canvas ref={chartRef} height="400"></canvas>
    </div>
  );
};

export default PerformanceMatrix;