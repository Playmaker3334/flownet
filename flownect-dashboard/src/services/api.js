const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const fetchDashboardData = async (filters = {}) => {
  // Mock data - replace with actual API calls
  return {
    metrics: {
      activeEmployees: 12,
      jobsToday: 28,
      avgTime: '2.3h',
      completionRate: '94%',
      revenue: '$4,280'
    },
    performance: [],
    tracking: {},
    routes: {},
    tasks: {},
    satisfaction: {},
    revenue: {},
    alerts: []
  };
};

export const updateEmployeeStatus = async (employeeId, status) => {
  try {
    const response = await fetch(`${API_URL}/employees/${employeeId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.json();
  } catch (error) {
    console.error('Error updating employee status:', error);
    return null;
  }
};

export const fetchRealTimeData = async () => {
  try {
    const response = await fetch(`${API_URL}/realtime`);
    return response.json();
  } catch (error) {
    console.error('Error fetching real-time data:', error);
    return null;
  }
};