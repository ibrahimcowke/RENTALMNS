import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, Landmark, Building2, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Payment } from '../../types';
import { formatCurrency } from '../../utils/format';
import { useAppStore } from '../../store';

interface StatementModalProps {
  payment: Payment | null;
  onClose: () => void;
}

const StatementModal: React.FC<StatementModalProps> = ({ payment, onClose }) => {
  const { tenants, properties } = useAppStore();
  const { t } = useTranslation();

  if (!payment) return null;

  const tenant = tenants.find(t => t.id === payment.tenantId);
  const property = properties.find(p => p.id === payment.propertyId);

  return (
    <AnimatePresence>
      {payment && (
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
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            style={{
              width: '800px',
              height: '90vh',
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header Controls */}
            <div style={{ padding: '1rem 2rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <Printer size={16} /> {t('common.export')}
                </button>
                <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <Download size={16} /> PDF
                </button>
              </div>
              <button onClick={onClose} style={{ background: 'transparent', padding: '0.5rem' }}>
                <X size={24} color="#64748b" />
              </button>
            </div>

            {/* Receipt Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <Building2 size={32} color="var(--primary)" />
                      <h1 style={{ margin: 0 }}>M-PRMS</h1>
                   </div>
                   <p style={{ margin: 0, fontSize: '0.875rem' }}>Banaadir Region, Mogadishu</p>
                   <p style={{ margin: 0, fontSize: '0.875rem' }}>Somalia, East Africa</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{t('finance.audit_trail')}</h2>
                   <p style={{ margin: 0, fontWeight: 700 }}>#{payment.id}</p>
                   <p style={{ margin: 0, color: '#64748b' }}>{t('common.date')}: {payment.date}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '3rem' }}>
                 <div>
                    <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>{t('finance.paid')} From</h4>
                    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                       <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Mogadishu Property MGMT</div>
                       <p style={{ margin: 0, fontSize: '0.875rem' }}>Tax ID: Banadir-8890</p>
                       <p style={{ margin: 0, fontSize: '0.875rem' }}>support@m-prms.so</p>
                    </div>
                 </div>
                 <div>
                    <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>{t('finance.paid')} To</h4>
                    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <User size={14} />
                          <div style={{ fontWeight: 700 }}>{tenant?.name}</div>
                       </div>
                       <p style={{ margin: 0, fontSize: '0.875rem' }}>{property?.name}</p>
                       <p style={{ margin: 0, fontSize: '0.875rem' }}>{tenant?.phone}</p>
                    </div>
                 </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '3rem' }}>
                 <thead>
                    <tr style={{ background: 'var(--primary)', color: 'white' }}>
                       <th style={{ padding: '1rem', textAlign: 'left', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)' }}>{t('common.properties')}</th>
                       <th style={{ padding: '1rem', textAlign: 'center' }}>Qty</th>
                       <th style={{ padding: '1rem', textAlign: 'right', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>{t('common.amount')}</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr>
                       <td style={{ padding: '1.5rem 1rem', borderBottom: '1px solid #f1f5f9' }}>
                          <div style={{ fontWeight: 600 }}>Rent for {payment.month}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{property?.address}</div>
                       </td>
                       <td style={{ padding: '1.5rem 1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>1</td>
                       <td style={{ padding: '1.5rem 1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'right', fontWeight: 600 }}>
                          {formatCurrency(payment.amount)}
                       </td>
                    </tr>
                 </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                 <div style={{ width: '250px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                       <span>Subtotal</span>
                       <span>{formatCurrency(payment.amount)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', color: 'var(--success)', fontWeight: 600 }}>
                       <span>Tax (0%)</span>
                       <span>$0.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderTop: '2px solid var(--text-main)', marginTop: '0.5rem', fontSize: '1.25rem', fontWeight: 700 }}>
                       <span>{t('finance.gross_amount')}</span>
                       <span>{formatCurrency(payment.amount)}</span>
                    </div>
                 </div>
              </div>

              <div style={{ marginTop: '4rem', padding: '2rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                 <Landmark size={24} style={{ marginBottom: '1rem', color: '#64748b' }} />
                 <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem' }}>{t('common.status')}: {payment.status === 'Paid' ? t('finance.paid').toUpperCase() : t('finance.pending').toUpperCase()}</p>
                 <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>Thank you for your business. For any queries, please visit our Hodan office.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StatementModal;
