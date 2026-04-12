import React from 'react';
import { Search, Bell, DollarSign, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import './Layout.css';

interface TopbarProps {
  onOpenNotifications: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onOpenNotifications }) => {
  const { currency, setCurrency, notifications } = useAppStore();
  const { t, i18n } = useTranslation();
  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'so' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="topbar">
      <div className="search-bar">
        <Search size={18} color="#94a3b8" />
        <input type="text" placeholder={t('common.search')} />
      </div>

      <div className="user-profile">
        {/* Language Switcher */}
        <button 
          onClick={toggleLanguage}
          style={{ 
            background: 'white', 
            border: '1px solid #e2e8f0', 
            padding: '0.4rem 0.75rem', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginRight: '1rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Globe size={14} color="var(--primary)" />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
            {i18n.language === 'en' ? 'SOM' : 'ENG'}
          </span>
        </button>

        {/* Currency Switcher */}
        <div style={{ 
          display: 'flex', 
          background: '#e2e8f0', 
          padding: '2px', 
          borderRadius: '10px',
          marginRight: '1.5rem',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
        }}>
          <button 
            onClick={() => setCurrency('USD')}
            style={{ 
              padding: '0.4rem 1rem', 
              fontSize: '0.75rem', 
              fontWeight: 700,
              background: currency === 'USD' ? 'white' : 'transparent',
              boxShadow: currency === 'USD' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: currency === 'USD' ? 'var(--primary)' : '#64748b'
            }}
          >
            <DollarSign size={13} /> USD
          </button>
          <button 
            onClick={() => setCurrency('SOS')}
            style={{ 
              padding: '0.4rem 1rem', 
              fontSize: '0.75rem', 
              fontWeight: 700,
              background: currency === 'SOS' ? 'white' : 'transparent',
              boxShadow: currency === 'SOS' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: currency === 'SOS' ? 'var(--primary)' : '#64748b'
            }}
          >
            SOS
          </button>
        </div>

        <button 
          onClick={onOpenNotifications}
          style={{ 
            background: 'white', 
            padding: '0.6rem', 
            position: 'relative', 
            marginRight: '1rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Bell size={20} color="#0f172a" />
          {unreadCount > 0 && (
            <div style={{ 
              position: 'absolute', 
              top: '-4px', 
              right: '-4px', 
              background: 'var(--danger)', 
              color: 'white', 
              fontSize: '10px', 
              fontWeight: 800,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white'
            }}>
              {unreadCount}
            </div>
          )}
        </button>
        
        <div className="user-info" style={{ marginRight: '1rem' }}>
          <span className="user-name">Abdirahman Ali</span>
          <span className="user-role">Portfolio Director</span>
        </div>
        
        <div className="avatar" style={{ width: '44px', height: '44px' }}>AA</div>
      </div>
    </header>
  );
};

export default Topbar;

