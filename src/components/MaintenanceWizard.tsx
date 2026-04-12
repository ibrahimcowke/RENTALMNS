import React, { useState, useEffect } from 'react';
import { 
  X, 
  Wrench, 
  AlertOctagon, 
  Clock, 
  Building2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import type { MaintenanceTicket } from '../types';

interface MaintenanceWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: MaintenanceTicket;
}

const MaintenanceWizard: React.FC<MaintenanceWizardProps> = ({ isOpen, onClose, initialData }) => {
  const { t } = useTranslation();
  const { properties, addMaintenance, updateMaintenance, addNotification } = useAppStore();
  const [formData, setFormData] = useState<Partial<MaintenanceTicket>>({
    propertyId: '',
    description: '',
    priority: 'Medium',
    status: 'Open',
    createdAt: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        propertyId: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
        createdAt: new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData) {
        await updateMaintenance(initialData.id, formData);
        addNotification({
          type: 'info',
          title: 'Ticket Updated',
          message: 'Maintenance request details have been synchronized.'
        });
      } else {
        await addMaintenance({
          propertyId: formData.propertyId || '',
          description: formData.description || '',
          priority: formData.priority || 'Medium',
          status: formData.status || 'Open'
        });
        addNotification({
          type: 'warning',
          title: 'New Request',
          message: 'A maintenance ticket has been registered and queued for dispatch.'
        });
      }
      onClose();
    } catch (error) {
       console.error('Failed to save maintenance ticket:', error);
       addNotification({
         type: 'error',
         title: 'Error',
         message: 'Failed to save maintenance request to the database.'
       });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="wizard-overlay">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="wizard-container glass-panel"
        style={{ maxWidth: '550px' }}
      >
        <header className="wizard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="premium-gradient" style={{ padding: '0.6rem', borderRadius: '12px', color: 'white' }}>
              <Wrench size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {initialData ? 'Refine Ticket' : t('maintenance.launch_button')}
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Operational Dispatch Console</p>
            </div>
          </div>
          <button onClick={onClose} className="close-button"><X size={20} /></button>
        </header>

        <form onSubmit={handleSubmit} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Link Property</label>
            <div className="input-with-icon">
              <Building2 size={18} />
              <select 
                required
                value={formData.propertyId}
                onChange={e => setFormData({...formData, propertyId: e.target.value})}
              >
                <option value="">Select a property unit...</option>
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.district})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Request Description</label>
            <textarea 
              required
              placeholder="e.g. Electrical failure in the master bedroom..."
              style={{ width: '100%', minHeight: '100px', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.875rem' }}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Urgency Level</label>
              <div className="input-with-icon">
                <AlertOctagon size={18} />
                <select 
                  value={formData.priority}
                  onChange={e => setFormData({...formData, priority: e.target.value as any})}
                >
                  <option value="Low">Standard (Low)</option>
                  <option value="Medium">Urgent (Medium)</option>
                  <option value="High">Emergency (High)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Service Status</label>
              <div className="input-with-icon">
                <Clock size={18} />
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="Open">Pending Dispatch</option>
                  <option value="In Progress">Active Service</option>
                  <option value="Resolved">Maintenance Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
              Discard
            </button>
            <button type="submit" className="premium-gradient" style={{ flex: 2 }}>
              {initialData ? 'Update Ticket' : 'Launch Request'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default MaintenanceWizard;
