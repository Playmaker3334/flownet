import { JOB_STATUS, EMPLOYEE_STATUS } from './constants';

export const generateMockData = () => {
  return {
    metrics: {
      activeEmployees: 12,
      jobsToday: 28,
      avgTime: '2.3h',
      completionRate: '94%',
      revenue: '$4,280'
    },
    
    employees: [
      {
        id: 1,
        name: 'María García',
        status: EMPLOYEE_STATUS.WORKING,
        efficiency: 95,
        speed: 3.2,
        jobsCompleted: 28,
        satisfaction: 98,
        location: { lat: 19.4326, lng: -99.1332 }
      },
      {
        id: 2,
        name: 'Juan Pérez',
        status: EMPLOYEE_STATUS.TRANSIT,
        efficiency: 88,
        speed: 2.8,
        jobsCompleted: 24,
        satisfaction: 92,
        location: { lat: 19.4356, lng: -99.1412 }
      },
      {
        id: 3,
        name: 'Ana Rodríguez',
        status: EMPLOYEE_STATUS.WORKING,
        efficiency: 92,
        speed: 3.5,
        jobsCompleted: 30,
        satisfaction: 95,
        location: { lat: 19.4286, lng: -99.1372 }
      }
    ],
    
    jobs: [
      {
        id: 1,
        client: 'Office Building A',
        address: '123 Main St',
        status: JOB_STATUS.IN_PROGRESS,
        assignedTo: 1,
        startTime: '08:00',
        estimatedDuration: 120
      },
      {
        id: 2,
        client: 'Residential Complex B',
        address: '456 Oak Ave',
        status: JOB_STATUS.PENDING,
        assignedTo: 2,
        startTime: '10:30',
        estimatedDuration: 90
      }
    ],
    
    alerts: [
      {
        id: 1,
        type: 'warning',
        title: 'Inactive Employee',
        description: 'Carlos M. - 25 min without movement',
        timestamp: new Date(Date.now() - 120000)
      },
      {
        id: 2,
        type: 'danger',
        title: 'Delayed Job',
        description: 'House #45 - 40 min late',
        timestamp: new Date(Date.now() - 300000)
      }
    ]
  };
};

export const getMockEmployee = (id) => {
  const employees = generateMockData().employees;
  return employees.find(emp => emp.id === id);
};

export const getMockJobs = (status = null) => {
  const jobs = generateMockData().jobs;
  if (status) {
    return jobs.filter(job => job.status === status);
  }
  return jobs;
};