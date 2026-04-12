import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, clearNotifications } = useAppStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle size={18} color="var(--warning)" />;
      case 'error': return <AlertCircle size={18} color="var(--danger)" />;
      case 'success': return <CheckCircle size={18} color="var(--success)" />;
      default: return <Info size={18} color="var(--info)" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(4px)',
              zIndex: 1100
            }}
          />

          {/* Sidenav */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '400px',
              height: '100vh',
              background: 'white',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
              zIndex: 1101,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Bell size={24} color="var(--primary)" />
                <h2 style={{ fontSize: '1.25rem' }}>System Alerts</h2>
              </div>
              <button onClick={onClose} style={{ background: 'transparent', padding: '0.5rem' }}>
                <X size={20} color="#64748b" />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
              {notifications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#94a3b8' }}>
                  <Bell size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                  <p>All caught up! No new notifications.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => markNotificationRead(n.id)}
                      style={{ 
                        padding: '1.25rem', 
                        borderRadius: 'var(--radius-md)', 
                        background: n.read ? 'white' : '#f8fafc',
                        border: '1px solid',
                        borderColor: n.read ? '#f1f5f9' : '#e2e8f0',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {!n.read && (
                        <div style={{ 
                          position: 'absolute', 
                          top: '1.25rem', 
                          right: '1.25rem', 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          background: 'var(--primary)' 
                        }} />
                      )}
                      
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ marginTop: '0.25rem' }}>{getIcon(n.type)}</div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{n.title}</div>
                          <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>{n.message}</p>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.75rem' }}>
                            {new Date(n.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
               <button 
                  onClick={clearNotifications}
                  style={{ width: '100%', background: '#f1f5f9', color: '#64748b', padding: '0.75rem' }}
               >
                 Clear All Notifications
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;
