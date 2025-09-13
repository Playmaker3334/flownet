import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Calendar, Briefcase, 
  Link2, UserCheck, Package, Calculator, Settings,
  ChevronRight, Menu, X
} from 'lucide-react';

const Sidebar = ({ collapsed, onToggle }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'clients', label: 'Clients', icon: Users, badge: 2 },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, badge: 3 },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: null },
    { id: 'connections', label: 'Connections', icon: Link2, badge: 2 },
    { id: 'employees', label: 'Employees', icon: UserCheck, badge: null },
    { id: 'providers', label: 'Providers', icon: Package, badge: null },
    { id: 'calculator', label: 'Calculator', icon: Calculator, badge: null }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">F</span>
          {!collapsed && <span className="logo-text">Flownect</span>}
        </div>
        <button className="collapse-btn" onClick={onToggle}>
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => setActiveItem(item.id)}
              title={collapsed ? item.label : ''}
            >
              <Icon size={20} />
              {!collapsed && (
                <>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={20} />
          {!collapsed && <span className="nav-label">Settings</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;