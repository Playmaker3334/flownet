import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Activity } from 'lucide-react';

const LiveTracking = ({ data = {}, selectedEmployee = 'María García' }) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 45, lng: 50 });
  const [locationHistory] = useState([
    { time: '8:00 AM', location: 'Office Building A', lat: 20, lng: 30, status: 'completed' },
    { time: '10:30 AM', location: 'Residential Complex B', lat: 40, lng: 25, status: 'completed' },
    { time: '1:00 PM', location: 'Mall Center', lat: 60, lng: 45, status: 'current' },
    { time: '3:30 PM', location: 'House #45', lat: 35, lng: 70, status: 'pending' },
    { time: '5:00 PM', location: 'Office Park C', lat: 75, lng: 80, status: 'pending' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation(prev => ({
        lat: Math.max(10, Math.min(90, prev.lat + (Math.random() - 0.5) * 5)),
        lng: Math.max(10, Math.min(90, prev.lng + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#34C759';
      case 'current': return '#007AFF';
      case 'pending': return '#FFB84D';
      default: return '#8E8E93';
    }
  };

  return (
    <div className="live-tracking" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="tracking-header">
        <h3>{selectedEmployee} - Live Location</h3>
        <div className="live-indicator">
          <span className="pulse"></span>
          LIVE
        </div>
      </div>
      
      <div className="map-container" style={{ flex: 1, minHeight: '250px', maxHeight: '300px' }}>
        {locationHistory.map((loc, index) => (
          <div
            key={index}
            className="employee-marker"
            style={{
              left: `${loc.lng}%`,
              top: `${loc.lat}%`,
              background: getStatusColor(loc.status),
              opacity: loc.status === 'completed' ? 0.5 : 1,
            }}
            title={`${loc.time} - ${loc.location}`}
          >
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{index + 1}</span>
          </div>
        ))}
      </div>

      <div className="tracking-stats">
        <div className="stat">
          <Activity size={16} color="#34C759" />
          <span className="stat-value">5.2km</span>
          <span className="stat-label">Distance</span>
        </div>
        <div className="stat">
          <Clock size={16} color="#007AFF" />
          <span className="stat-value">6.5h</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat">
          <MapPin size={16} color="#FF9500" />
          <span className="stat-value">3/5</span>
          <span className="stat-label">Locations</span>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;