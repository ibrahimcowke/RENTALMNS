import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Building2, MapPin, DollarSign, CheckCircle } from 'lucide-react';
import { useAppStore } from '../store';
import type { District, PropertyType } from '../types';

interface PropertyWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, title: 'Basic Details', icon: Building2 },
  { id: 2, title: 'Location & Info', icon: MapPin },
  { id: 3, title: 'Pricing & Status', icon: DollarSign },
];

const PropertyWizard: React.FC<PropertyWizardProps> = ({ isOpen, onClose }) => {
  const { addProperty, addNotification } = useAppStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Apartment' as PropertyType,
    district: 'Hodan' as District,
    address: '',
    rentAmount: 0,
    units: 1,
    status: 'Available' as const,
  });

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    const newProperty = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      currency: 'USD' as const,
    };
    addProperty(newProperty);
    addNotification({
      type: 'success',
      title: 'Property Added',
      message: `${formData.name} was successfully added to ${formData.district}.`
    });
    onClose();
    setCurrentStep(1);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        style={{
          width: '600px',
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '2rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Add New Property</h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Step {currentStep} of 3: {steps[currentStep-1].title}</p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', padding: '0.5rem' }}>
            <X size={24} color="#64748b" />
          </button>
        </div>

        {/* Multi-step indicator */}
        <div style={{ display: 'flex', padding: '1.5rem 2rem', gap: '1rem', background: 'white' }}>
          {steps.map(step => (
            <div key={step.id} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 700,
                background: currentStep >= step.id ? 'var(--primary)' : '#f1f5f9',
                color: currentStep >= step.id ? 'white' : '#64748b',
                transition: 'all 0.3s ease'
              }}>
                {currentStep > step.id ? <CheckCircle size={16} /> : step.id}
              </div>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                color: currentStep >= step.id ? 'var(--text-main)' : '#94a3b8' 
              }}>
                {step.title}
              </span>
              {step.id < 3 && <div style={{ flex: 1, height: '2px', background: currentStep > step.id ? 'var(--primary)' : '#f1f5f9' }} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div style={{ padding: '2rem', minHeight: '300px' }}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div>
                  <label style={labelStyle}>Property Name</label>
                  <input 
                    style={inputStyle} 
                    placeholder="e.g. Blue Lagoon Villas"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Property Type</label>
                  <select 
                    style={inputStyle}
                    value={formData.type}
                    onChange={(e) => updateField('type', e.target.value)}
                  >
                    <option>Villa</option>
                    <option>Apartment</option>
                    <option>Shop</option>
                    <option>Office</option>
                    <option>Warehouse</option>
                  </select>
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
                <div>
                  <label style={labelStyle}>District</label>
                  <select 
                    style={inputStyle}
                    value={formData.district}
                    onChange={(e) => updateField('district', e.target.value)}
                  >
                    {['Hodan', 'Abdiaziz', 'Waberi', 'Wadajir', 'Hamar Weyne', 'Bondhere'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Full Address</label>
                  <textarea 
                    style={{ ...inputStyle, height: '100px', resize: 'none' }} 
                    placeholder="Street name, landmarks..."
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Monthly Rent (USD)</label>
                    <input 
                      type="number" 
                      style={inputStyle} 
                      value={formData.rentAmount}
                      onChange={(e) => updateField('rentAmount', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Number of Units</label>
                    <input 
                      type="number" 
                      style={inputStyle} 
                      value={formData.units}
                      onChange={(e) => updateField('units', Number(e.target.value))}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Initial Status</label>
                  <select 
                    style={inputStyle}
                    value={formData.status}
                    onChange={(e) => updateField('status', e.target.value)}
                  >
                    <option value="Available">Available</option>
                    <option value="Maintenance">Under Maintenance</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div style={{ padding: '1.5rem 2rem', background: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
          <button 
            onClick={currentStep === 1 ? onClose : handleBack}
            style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {currentStep === 1 ? 'Cancel' : <><ChevronLeft size={18} /> Previous</>}
          </button>
          
          <button 
            onClick={currentStep === 3 ? handleSubmit : handleNext}
            className="premium-gradient"
            style={{ padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}
          >
            {currentStep === 3 ? 'Complete Setup' : <>Next Step <ChevronRight size={18} /></>}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: '#64748b',
  marginBottom: '0.5rem',
  textTransform: 'uppercase',
  letterSpacing: '0.025em'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid #e2e8f0',
  fontSize: '0.9375rem',
  outline: 'none',
  fontFamily: 'inherit',
  color: 'var(--text-main)',
  transition: 'border-color 0.2s ease'
};

export default PropertyWizard;
