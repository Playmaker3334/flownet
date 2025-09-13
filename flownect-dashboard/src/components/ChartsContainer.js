import React from 'react';
import PerformanceMatrix from './charts/PerformanceMatrix';
import LiveTracking from './charts/LiveTracking';
import RouteHeatmap from './charts/RouteHeatmap';
import TaskTimeline from './charts/TaskTimeline';
import SatisfactionRadar from './charts/SatisfactionRadar';
import RevenueAnalysis from './charts/RevenueAnalysis';

const ChartsContainer = ({ data = {}, selectedEmployee }) => {
  return (
    <div className="charts-container">
      <div className="chart-card span-8">
        <PerformanceMatrix data={data.performance} selectedEmployee={selectedEmployee} />
      </div>
      
      <div className="chart-card span-4">
        <LiveTracking data={data.tracking} selectedEmployee={selectedEmployee} />
      </div>
      
      <div className="chart-card span-6">
        <RouteHeatmap data={data.routes} selectedEmployee={selectedEmployee} />
      </div>
      
      <div className="chart-card span-6">
        <TaskTimeline data={data.tasks} selectedEmployee={selectedEmployee} />
      </div>
      
      <div className="chart-card span-6">
        <SatisfactionRadar data={data.satisfaction} selectedEmployee={selectedEmployee} />
      </div>
      
      <div className="chart-card span-6">
        <RevenueAnalysis data={data.revenue} selectedEmployee={selectedEmployee} />
      </div>
    </div>
  );
};

export default ChartsContainer;