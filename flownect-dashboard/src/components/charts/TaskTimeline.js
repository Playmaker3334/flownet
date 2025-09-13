import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const TaskTimeline = ({ data = {}, selectedEmployee = 'María García' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      const todayTasks = {
        completed: 12,
        inProgress: 2,
        pending: 3,
        total: 17
      };
      
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'In Progress', 'Pending'],
          datasets: [{
            data: [todayTasks.completed, todayTasks.inProgress, todayTasks.pending],
            backgroundColor: [
              'rgba(52, 199, 89, 0.8)',
              'rgba(0, 122, 255, 0.8)',
              'rgba(255, 149, 0, 0.5)'
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
              text: `${selectedEmployee} - Tasks Today`,
              font: { size: 16, weight: '600' }
            },
            legend: {
              position: 'bottom'
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
      <canvas ref={chartRef} height="350"></canvas>
    </div>
  );
};

export default TaskTimeline;