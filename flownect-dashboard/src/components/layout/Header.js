import React from 'react';
import { Bell, Search, Filter, Calendar, ChevronDown } from 'lucide-react';

const Header = ({ onFilterChange }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Dashboard</h1>
        <div className="live-indicator">
          <span className="pulse"></span>
          LIVE
        </div>
      </div>

      <div className="header-right">
        <button className="header-btn">
          <Search size={20} />
        </button>
        
        <button 
          className="header-btn"
          onClick={() => onFilterChange({ dateRange: 'today' })}
        >
          <Calendar size={20} />
          <span>Today</span>
        </button>

        <button className="header-btn">
          <Filter size={20} />
        </button>

        <button className="header-btn notification">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-info">
          <span className="user-name">Elias G.</span>
          <div className="user-avatar">EG</div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;