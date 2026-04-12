import React from 'react';
import { 
  Wrench, 
  Clock, 
  Plus,
  Filter,
  MoreVertical,
  AlertOctagon,
  CheckCircle2,
  PlayCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';

const Maintenance: React.FC = () => {
  const { maintenance, properties } = useAppStore();

  const getPropertyName = (id: string) => properties.find(p => p.id === id)?.name || 'Property';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Maintenance Command</h1>
          <p>Task tracking and technical service requests across the registry.</p>
        </div>
        <button className="premium-gradient" style={{ 
          padding: '0.875rem 1.75rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.6rem' 
        }}>
          <Plus size={20} />
          Launch New Request
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* Kanban-style Columns */}
        {[
          { key: 'Open', icon: AlertOctagon, color: 'var(--danger)' },
          { key: 'In Progress', icon: PlayCircle, color: 'var(--warning)' },
          { key: 'Resolved', icon: CheckCircle2, color: 'var(--success)' }
        ].map((status) => (
          <div key={status.key} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingBottom: '0.5rem',
              borderBottom: `2px solid ${status.color}20`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: status.color }}><status.icon size={18} /></div>
                <h3 style={{ textTransform: 'uppercase', fontSize: '0.8125rem', letterSpacing: '0.1em', color: 'var(--text-main)', fontWeight: 800 }}>
                  {status.key} <span style={{ opacity: 0.5, marginLeft: '0.25rem' }}>({maintenance.filter(t => t.status === status.key).length})</span>
                </h3>
              </div>
              <Filter size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {maintenance.filter(t => t.status === status.key).map((ticket, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  key={ticket.id} 
                  className="card" 
                  style={{ padding: '1.5rem', border: '1px solid rgba(0,0,0,0.03)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ 
                      fontSize: '0.6875rem', 
                      fontWeight: 800, 
                      padding: '0.35rem 0.75rem', 
                      borderRadius: '20px',
                      background: ticket.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(14, 165, 233, 0.1)',
                      color: ticket.priority === 'High' ? 'var(--danger)' : 'var(--primary-light)',
                      letterSpacing: '0.02em'
                    }}>
                      {ticket.priority} PRIORITY
                    </span>
                    <button style={{ background: 'transparent', padding: 0 }}><MoreVertical size={18} color="#94a3b8" /></button>
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: '1.4' }}>{ticket.description}</h4>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    <div style={{ background: 'var(--bg-main)', padding: '0.4rem', borderRadius: '8px' }}>
                      <Wrench size={14} color="var(--primary)" />
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>{getPropertyName(ticket.propertyId)}</span>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: '1px solid #f1f5f9'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8' }}>
                      <Clock size={14} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{ticket.createdAt}</span>
                    </div>
                    <div className="avatar" style={{ width: '28px', height: '28px', fontSize: '0.75rem', border: '2px solid white' }}>SP</div>
                  </div>
                </motion.div>
              ))}
              
              {maintenance.filter(t => t.status === status.key).length === 0 && (
                <div style={{ 
                  background: 'rgba(255,255,255,0.4)',
                  border: '2px dashed #e2e8f0', 
                  borderRadius: 'var(--radius-lg)', 
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  color: '#94a3b8',
                  fontSize: '0.875rem',
                  backdropFilter: 'blur(4px)'
                }}>
                  <div style={{ marginBottom: '0.5rem', opacity: 0.5 }}><status.icon size={32} style={{ margin: '0 auto' }} /></div>
                  No active items in {status.key}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Maintenance;

