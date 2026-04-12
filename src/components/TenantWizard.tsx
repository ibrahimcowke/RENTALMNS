import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Home, 
  ClipboardCheck, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import type { Tenant } from '../types';

interface TenantWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Tenant;
}

const steps = [
  { id: 1, title: 'Profile', icon: User },
  { id: 2, title: 'Lease', icon: Home },
  { id: 3, title: 'Review', icon: ClipboardCheck }
];

const TenantWizard: React.FC<TenantWizardProps> = ({ isOpen, onClose, initialData }) => {
  const { t } = useTranslation();
  const { properties, addTenant, updateTenant, addNotification } = useAppStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Tenant>>({
    name: '',
    phone: '',
    email: '',
    propertyId: '',
    leaseStart: '',
    leaseEnd: '',
    status: 'Active'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        propertyId: '',
        leaseStart: '',
        leaseEnd: '',
        status: 'Active'
      });
    }
  }, [initialData, isOpen]);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    try {
      if (initialData) {
        await updateTenant(initialData.id, formData);
        addNotification({
          type: 'success',
          title: 'Tenant Updated',
          message: `${formData.name}'s lease records have been refreshed.`
        });
      } else {
        await addTenant({
          name: formData.name || '',
          phone: formData.phone || '',
          email: formData.email,
          propertyId: formData.propertyId || '',
          leaseStart: formData.leaseStart || '',
          leaseEnd: formData.leaseEnd || '',
          status: 'Active'
        });
        addNotification({
          type: 'success',
          title: 'Tenant Onboarded',
          message: `${formData.name} has been successfully registered.`
        });
      }
      onClose();
      setCurrentStep(1);
    } catch (error) {
       console.error('Failed to save tenant:', error);
       addNotification({
         type: 'error',
         title: 'Error',
         message: 'Failed to save resident record to the database.'
       });
    }
  };

  if (!isOpen) return null;

  const currentProperty = properties.find(p => p.id === formData.propertyId);

  return (
    <div className="wizard-overlay">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="wizard-container glass-panel"
        style={{ maxWidth: '700px' }}
      >
        <header className="wizard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="premium-gradient" style={{ padding: '0.6rem', borderRadius: '12px', color: 'white' }}>
              <User size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {initialData ? t('tenants.edit_tenant') : t('tenants.onboard_button')}
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Mogadishu Resident Registry</p>
            </div>
          </div>
          <button onClick={onClose} className="close-button"><X size={20} /></button>
        </header>

        {/* Step Indicator */}
        <div className="step-indicator">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                <div className="step-number">
                  {currentStep > step.id ? <CheckCircle2 size={16} /> : <step.icon size={16} />}
                </div>
                <span>{step.title}</span>
              </div>
              {idx < steps.length - 1 && <div className="step-line" />}
            </React.Fragment>
          ))}
        </div>

        <div className="wizard-content" style={{ minHeight: '350px' }}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <User size={18} />
                    <input 
                      type="text" 
                      placeholder="e.g. Abdullahi Mohamed" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="input-with-icon">
                      <Phone size={18} />
                      <input 
                        type="text" 
                        placeholder="+252 61..." 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address (Optional)</label>
                    <div className="input-with-icon">
                      <Mail size={18} />
                      <input 
                        type="email" 
                        placeholder="email@example.com" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div className="form-group">
                  <label>Assigned Property Unit</label>
                  <div className="input-with-icon">
                    <Building2 size={18} />
                    <select 
                      value={formData.propertyId}
                      onChange={e => setFormData({...formData, propertyId: e.target.value})}
                    >
                      <option value="">Select a property...</option>
                      {properties.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.district})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label>Lease Start Date</label>
                    <div className="input-with-icon">
                      <Calendar size={18} />
                      <input 
                        type="date" 
                        value={formData.leaseStart}
                        onChange={e => setFormData({...formData, leaseStart: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Lease End Date</label>
                    <div className="input-with-icon">
                      <Calendar size={18} />
                      <input 
                        type="date" 
                        value={formData.leaseEnd}
                        onChange={e => setFormData({...formData, leaseEnd: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div style={{ background: 'var(--bg-main)', padding: '2rem', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                  <h4 style={{ fontWeight: 800, marginBottom: '1.5rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                    Registration Summary
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Full Name</span>
                      <span style={{ fontWeight: 700 }}>{formData.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Property</span>
                      <span style={{ fontWeight: 700 }}>{currentProperty?.name || '---'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Duration</span>
                      <span style={{ fontWeight: 700 }}>{formData.leaseStart} to {formData.leaseEnd}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Monthly Rent</span>
                      <span style={{ fontWeight: 800, color: 'var(--primary)' }}>${currentProperty?.rentAmount || 0}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="wizard-footer">
          <button 
            disabled={currentStep === 1}
            onClick={handlePrev}
            className="btn-secondary"
            style={{ opacity: currentStep === 1 ? 0.3 : 1 }}
          >
            <ChevronLeft size={18} />
            Back
          </button>
          
          {currentStep < 3 ? (
            <button 
              onClick={handleNext}
              className="premium-gradient"
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="accent-gradient"
            >
              Confirm & Onboard
              <CheckCircle2 size={18} />
            </button>
          )}
        </footer>
      </motion.div>
    </div>
  );
};

export default TenantWizard;
