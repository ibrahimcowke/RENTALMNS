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
import { useTranslation } from 'react-i18next';
import './Layout.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();

  const menuItems = [
    { id: 'dashboard', label: t('common.dashboard'), icon: LayoutDashboard },
    { id: 'properties', label: t('common.properties'), icon: Building2 },
    { id: 'districts', label: t('common.districts'), icon: Map },
    { id: 'tenants', label: t('common.tenants'), icon: Users },
    { id: 'finance', label: t('common.finance'), icon: Wallet },
    { id: 'maintenance', label: t('common.maintenance'), icon: Wrench },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Building2 size={32} color="#14b8a6" />
        <span>M-PRMS</span>
      </div>

      <nav className="nav-group">
        <span className="nav-label">{t('sidebar.command_center')}</span>
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
        <span className="nav-label">{t('sidebar.system')}</span>
        <a href="#settings" className="nav-item">
          <Settings size={20} />
          {t('common.edit')} Settings
        </a>
        <a href="#help" className="nav-item">
          <HelpCircle size={20} />
          Help Center
        </a>
        <a href="#logout" className="nav-item" style={{ color: 'var(--danger)' }}>
          <LogOut size={20} />
          {t('sidebar.logout')}
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
