import React from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Wrench, 
  Settings, 
  HelpCircle,
  LogOut,
  Map
} from 'lucide-react';
import './Layout.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'districts', label: 'Districts', icon: Map },
    { id: 'tenants', label: 'Tenants', icon: Users },
    { id: 'finance', label: 'Finance', icon: Wallet },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Building2 size={32} color="#14b8a6" />
        <span>M-PRMS</span>
      </div>

      <nav className="nav-group">
        <span className="nav-label">Main Menu</span>
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item.id);
            }}
          >
            <item.icon size={20} />
            {item.label}
          </a>
        ))}
      </nav>

      <nav className="nav-group" style={{ marginTop: 'auto' }}>
        <span className="nav-label">System</span>
        <a href="#settings" className="nav-item">
          <Settings size={20} />
          Settings
        </a>
        <a href="#help" className="nav-item">
          <HelpCircle size={20} />
          Help Center
        </a>
        <a href="#logout" className="nav-item" style={{ color: 'var(--danger)' }}>
          <LogOut size={20} />
          Sign Out
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
