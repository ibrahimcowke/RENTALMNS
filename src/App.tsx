import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import NotificationCenter from './components/NotificationCenter';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Finance from './pages/Finance';
import Maintenance from './pages/Maintenance';
import Districts from './pages/Districts';
import './index.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        return <Properties />;
      case 'tenants':
        return <Tenants />;
      case 'finance':
        return <Finance />;
      case 'maintenance':
        return <Maintenance />;
      case 'districts':
        return <Districts />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Topbar onOpenNotifications={() => setIsNotificationOpen(true)} />
        <div style={{ marginTop: 'var(--header-height)', minHeight: 'calc(100vh - var(--header-height) - 4rem)' }}>
          {renderContent()}
        </div>
      </div>
      <NotificationCenter 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />
    </div>
  );
};

export default App;
