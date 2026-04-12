import React, { useState, useEffect } from 'react';
import { 
  X, 
  DollarSign, 
  CheckCircle2, 
  Calendar, 
  Building2,
  User,
  CreditCard,
  Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import type { Payment } from '../types';

interface TransactionWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionWizard: React.FC<TransactionWizardProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { properties, tenants, addPayment, addNotification } = useAppStore();
  const [formData, setFormData] = useState<Partial<Payment>>({
    propertyId: '',
    tenantId: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    month: '',
    status: 'Paid'
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();

  // Update tenant list when property changes
  const filteredTenants = tenants.filter(t => t.propertyId === formData.propertyId);

  // Auto-fill amount when tenant/property is selected
  useEffect(() => {
    if (formData.propertyId) {
      const prop = properties.find(p => p.id === formData.propertyId);
      if (prop) {
        setFormData(prev => ({ ...prev, amount: prop.rentAmount }));
      }
    }
  }, [formData.propertyId, properties]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPayment({
      ...formData as Payment,
      id: Math.random().toString(36).substr(2, 9)
    });
    
    addNotification({
      type: 'success',
      title: 'Payment Recorded',
      message: `Transaction of $${formData.amount} for ${formData.month} has been logged.`
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="wizard-overlay">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="wizard-container glass-panel"
        style={{ maxWidth: '600px' }}
      >
        <header className="wizard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="accent-gradient" style={{ padding: '0.6rem', borderRadius: '12px', color: 'white' }}>
              <CreditCard size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Record Payment</h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Financial Audit & Ledger Entry</p>
            </div>
          </div>
          <button onClick={onClose} className="close-button"><X size={20} /></button>
        </header>

        <form onSubmit={handleSubmit} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Property Unit</label>
              <div className="input-with-icon">
                <Building2 size={18} />
                <select 
                  required
                  value={formData.propertyId}
                  onChange={e => setFormData({...formData, propertyId: e.target.value, tenantId: ''})}
                >
                  <option value="">Select unit...</option>
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Tenant</label>
              <div className="input-with-icon">
                <User size={18} />
                <select 
                  required
                  disabled={!formData.propertyId}
                  value={formData.tenantId}
                  onChange={e => setFormData({...formData, tenantId: e.target.value})}
                >
                  <option value="">Select resident...</option>
                  {filteredTenants.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Transaction Amount (USD)</label>
              <div className="input-with-icon">
                <DollarSign size={18} />
                <input 
                  type="number" 
                  required
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: Number(e.target.value)})}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Payment Date</label>
              <div className="input-with-icon">
                <Calendar size={18} />
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Billing Month</label>
              <div className="input-with-icon">
                <Hash size={18} />
                <select 
                  required
                  value={formData.month}
                  onChange={e => setFormData({...formData, month: e.target.value})}
                >
                  <option value="">Select month...</option>
                  {months.map(m => (
                    <option key={m} value={`${m} ${currentYear}`}>{m} {currentYear}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Collection Status</label>
              <div className="input-with-icon">
                <CheckCircle2 size={18} />
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="Paid">Fully Paid</option>
                  <option value="Partial">Partial Payment</option>
                  <option value="Pending">Pending Audit</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="accent-gradient" style={{ flex: 2 }}>
              Post Transaction
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TransactionWizard;
