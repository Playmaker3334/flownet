import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import EmployeeSelector from './components/EmployeeSelector';
import MetricsGrid from './components/MetricsGrid';
import ChartsContainer from './components/ChartsContainer';
import AlertsPanel from './components/AlertsPanel';
import { fetchDashboardData } from './services/api';
import './styles/App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('María García');
  const [filters, setFilters] = useState({
    dateRange: 'today',
    team: 'all',
    employee: 'María García'
  });

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [filters, selectedEmployee]);

  const loadData = async () => {
    try {
      const dashboardData = await fetchDashboardData({ ...filters, employee: selectedEmployee });
      setData(dashboardData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const handleEmployeeChange = (employee) => {
    setSelectedEmployee(employee);
    setFilters(prev => ({ ...prev, employee }));
  };

  return (
    <div className="app">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`main-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header onFilterChange={setFilters} />
        <EmployeeSelector 
          selectedEmployee={selectedEmployee}
          onSelectEmployee={handleEmployeeChange}
        />
        <div className="content">
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <span>Loading dashboard...</span>
            </div>
          ) : (
            <>
              <MetricsGrid data={data?.metrics} selectedEmployee={selectedEmployee} />
              <ChartsContainer data={data} selectedEmployee={selectedEmployee} />
              <AlertsPanel alerts={data?.alerts} selectedEmployee={selectedEmployee} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;