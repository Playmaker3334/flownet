import React from 'react';
import { User, ChevronDown } from 'lucide-react';

const EmployeeSelector = ({ selectedEmployee, onSelectEmployee }) => {
  const employees = [
    'María García',
    'Juan Pérez', 
    'Ana Rodríguez',
    'Carlos Martínez',
    'Laura López'
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem 2rem',
      background: 'white',
      borderBottom: '1px solid #E5E5EA',
      position: 'sticky',
      top: '64px',
      zIndex: 40
    }}>
      <User size={20} color="#FF9500" />
      <span style={{ fontWeight: '500' }}>Viewing Employee:</span>
      <select 
        value={selectedEmployee}
        onChange={(e) => onSelectEmployee(e.target.value)}
        style={{
          padding: '0.5rem 2rem 0.5rem 1rem',
          border: '1px solid #D1D1D6',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '500',
          background: 'white',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23636366' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center'
        }}
      >
        {employees.map(emp => (
          <option key={emp} value={emp}>{emp}</option>
        ))}
      </select>
      
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
        <div>
          <span style={{ color: '#636366' }}>Status: </span>
          <span style={{ 
            padding: '0.25rem 0.75rem', 
            background: '#34C759', 
            color: 'white',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            Active
          </span>
        </div>
        <div>
          <span style={{ color: '#636366' }}>Battery: </span>
          <span style={{ fontWeight: '500' }}>85%</span>
        </div>
        <div>
          <span style={{ color: '#636366' }}>Last Update: </span>
          <span style={{ fontWeight: '500' }}>2 min ago</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSelector;