import React from 'react';
import { AlertTriangle, AlertCircle, Battery, Clock } from 'lucide-react';

const AlertsPanel = ({ alerts = [] }) => {
  const defaultAlerts = [
    {
      id: 1,
      type: 'warning',
      icon: AlertTriangle,
      title: 'Inactive Employee',
      description: 'Carlos M. - 25 min without movement',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'danger',
      icon: AlertCircle,
      title: 'Delayed Job',
      description: 'House #45 - 40 min late',
      time: '5 minutes ago'
    },
    {
      id: 3,
      type: 'info',
      icon: Battery,
      title: 'Low Battery',
      description: 'Ana R. device - 15%',
      time: '10 minutes ago'
    },
    {
      id: 4,
      type: 'warning',
      icon: Clock,
      title: 'Overtime Risk',
      description: 'Juan P. - Approaching 10 hours',
      time: '15 minutes ago'
    }
  ];

  const displayAlerts = alerts.length > 0 ? alerts : defaultAlerts;

  return (
    <div className="alerts-panel">
      <div className="panel-header">
        <h3>Real-time Alerts</h3>
        <span className="alert-count">{displayAlerts.length} active</span>
      </div>
      <div className="alerts-container">
        {displayAlerts.map(alert => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className={`alert-card ${alert.type}`}>
              <div className="alert-icon">
                <Icon size={20} />
              </div>
              <div className="alert-content">
                <div className="alert-title">{alert.title}</div>
                <div className="alert-description">{alert.description}</div>
              </div>
              <div className="alert-time">{alert.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPanel;