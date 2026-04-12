import React, { useState } from 'react';
import { 
  Wrench, 
  Clock, 
  Plus,
  Filter,
  MoreVertical,
  AlertOctagon,
  CheckCircle2,
  PlayCircle,
  Edit,
  Trash2,
  ArrowRight,
  TrendingDown,
  Activity
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import MaintenanceWizard from '../components/MaintenanceWizard';
import type { MaintenanceTicket } from '../types';

const Maintenance: React.FC = () => {
  const { maintenance, properties, deleteMaintenance, updateMaintenance } = useAppStore();
  const { t } = useTranslation();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<MaintenanceTicket | undefined>(undefined);

  const getPropertyName = (id: string) => properties.find(p => p.id === id)?.name || 'Property';

  const handleEdit = (ticket: MaintenanceTicket) => {
    setEditingTicket(ticket);
    setIsWizardOpen(true);
  };

  const moveStatus = (ticket: MaintenanceTicket) => {
    const statusMap: Record<string, 'In Progress' | 'Resolved' | 'Open'> = {
      'Open': 'In Progress',
      'In Progress': 'Resolved',
      'Resolved': 'Open'
    };
    updateMaintenance(ticket.id, { status: statusMap[ticket.status] });
  };

  const calculateEfficiency = () => {
    if (maintenance.length === 0) return { resolutionRate: 100, activeTime: 'N/A' };
    const resolved = maintenance.filter(t => t.status === 'Resolved').length;
    return {
      resolutionRate: Math.round((resolved / maintenance.length) * 100),
      activeTime: '24h'
    };
  };

  const stats = calculateEfficiency();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>{t('maintenance.title')}</h1>
          <p>{t('maintenance.subtitle')}</p>
        </div>
        <button 
          onClick={() => { setEditingTicket(undefined); setIsWizardOpen(true); }}
          className="premium-gradient" 
          style={{ 
            padding: '0.875rem 1.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem' 
          }}
        >
          <Plus size={20} />
          {t('maintenance.launch_button')}
        </button>
      </header>

      {/* Efficiency Dashboard */}
      <div className="card glass-panel" style={{ display: 'flex', gap: '2rem', padding: '1.5rem 2rem', alignItems: 'center' }}>
         <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: '12px', color: 'white' }}>
               <Activity size={24} />
            </div>
            <div>
               <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Operational Efficiency</h3>
               <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Average metrics based on 30-day workflow</p>
            </div>
         </div>
         
         <div style={{ display: 'flex', gap: '3rem', borderLeft: '1px solid #e2e8f0', paddingLeft: '3rem' }}>
            <div>
               <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800, letterSpacing: '0.05em' }}>Resolution Rate</div>
               <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--success)' }}>{stats.resolutionRate}%</div>
            </div>
            <div>
               <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800, letterSpacing: '0.05em' }}>Avg Resolution Time</div>
               <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {stats.activeTime} <TrendingDown size={16} color="var(--success)" />
               </div>
            </div>
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* Kanban-style Columns */}
        {[
          { key: 'Open', label: t('maintenance.open'), icon: AlertOctagon, color: 'var(--danger)' },
          { key: 'In Progress', label: t('maintenance.in_progress'), icon: PlayCircle, color: 'var(--warning)' },
          { key: 'Resolved', label: t('maintenance.resolved'), icon: CheckCircle2, color: 'var(--success)' }
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
                  {status.label} <span style={{ opacity: 0.5, marginLeft: '0.25rem' }}>({maintenance.filter(t => t.status === status.key).length})</span>
                </h3>
              </div>
              <Filter size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <AnimatePresence mode="popLayout">
                {maintenance.filter(t => t.status === status.key).map((ticket, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -4 }}
                    key={ticket.id} 
                    className="card" 
                    style={{ padding: '1.5rem', border: '1px solid rgba(0,0,0,0.03)', background: 'white' }}
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
                        {ticket.priority === 'High' ? t('maintenance.high_priority') : t('maintenance.low_priority')}
                      </span>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button onClick={() => handleEdit(ticket)} style={{ background: 'transparent', padding: 0 }}><Edit size={16} color="#94a3b8" /></button>
                        <button 
                          onClick={() => { if(window.confirm('Discard ticket?')) deleteMaintenance(ticket.id) }} 
                          style={{ background: 'transparent', padding: 0 }}
                        >
                          <Trash2 size={16} color="#fda4af" />
                        </button>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: '1.4' }}>{ticket.description}</h4>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                      <div style={{ background: 'var(--bg-main)', padding: '0.4rem', borderRadius: '8px' }}>
                        <Building2 size={14} color="var(--primary)" />
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
                      <button 
                         onClick={() => moveStatus(ticket)}
                         style={{ 
                           background: 'white', 
                           border: '1px solid #e2e8f0', 
                           borderRadius: '8px', 
                           padding: '0.35rem 0.6rem', 
                           fontSize: '0.6875rem', 
                           fontWeight: 800,
                           display: 'flex',
                           alignItems: 'center',
                           gap: '0.35rem',
                           color: 'var(--text-main)'
                         }}
                      >
                         {ticket.status === 'Resolved' ? 'Reopen' : 'Next Task'} <ArrowRight size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
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
                  {t('common.no_data')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <MaintenanceWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
        initialData={editingTicket}
      />
    </motion.div>
  );
};

export default Maintenance;

