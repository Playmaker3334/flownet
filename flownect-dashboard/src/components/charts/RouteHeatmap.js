import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const RouteHeatmap = ({ data = {} }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      const hours = ['8am', '10am', '12pm', '2pm', '4pm', '6pm'];
      
      // Generate heatmap data
      const heatmapData = [];
      days.forEach((day, dayIndex) => {
        hours.forEach((hour, hourIndex) => {
          heatmapData.push({
            x: hourIndex,
            y: dayIndex,
            v: Math.floor(Math.random() * 100)
          });
        });
      });

      chartInstance.current = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Route Efficiency',
            data: heatmapData.map(point => ({
              x: point.x,
              y: point.y,
              r: point.v / 5
            })),
            backgroundColor: heatmapData.map(point => {
              const intensity = point.v / 100;
              if (intensity > 0.8) return 'rgba(52, 199, 89, 0.8)';
              if (intensity > 0.6) return 'rgba(255, 204, 0, 0.8)';
              if (intensity > 0.4) return 'rgba(255, 149, 0, 0.8)';
              return 'rgba(255, 59, 48, 0.8)';
            })
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Route Efficiency Heatmap',
              font: { size: 16, weight: '600' }
            },
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const point = heatmapData[context.dataIndex];
                  return `Efficiency: ${point.v}%`;
                }
              }
            }
          },
          scales: {
            x: {
              type: 'category',
              labels: hours,
              title: { display: true, text: 'Hour of Day' }
            },
            y: {
              type: 'category',
              labels: days,
              title: { display: true, text: 'Day of Week' }
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

export default RouteHeatmap;