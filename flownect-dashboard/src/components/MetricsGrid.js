import React from 'react';
import { Users, Briefcase, Clock, TrendingUp, DollarSign } from 'lucide-react';

const MetricsGrid = ({ data = {} }) => {
  const metrics = [
    {
      id: 'active-employees',
      label: 'Active Employees',
      value: data.activeEmployees || 12,
      change: '+2',
      trend: 'up',
      icon: Users,
      color: 'orange'
    },
    {
      id: 'jobs-today',
      label: 'Jobs Today',
      value: data.jobsToday || 28,
      change: '+15%',
      trend: 'up',
      icon: Briefcase,
      color: 'yellow'
    },
    {
      id: 'avg-time',
      label: 'Avg Time/Job',
      value: data.avgTime || '2.3h',
      change: '-12 min',
      trend: 'up',
      icon: Clock,
      color: 'blue'
    },
    {
      id: 'completion-rate',
      label: 'Completion Rate',
      value: data.completionRate || '94%',
      change: '-2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: 'revenue',
      label: 'Revenue Today',
      value: data.revenue || '$4,280',
      change: '+$520',
      trend: 'up',
      icon: DollarSign,
      color: 'orange'
    }
  ];

  return (
    <div className="metrics-grid">
      {metrics.map(metric => {
        const Icon = metric.icon;
        return (
          <div key={metric.id} className="metric-card">
            <div className="metric-header">
              <div className={`metric-icon ${metric.color}`}>
                <Icon size={24} />
              </div>
              <span className={`metric-trend ${metric.trend}`}>
                {metric.change}
              </span>
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsGrid;