import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Calendar,
  Download,
  Receipt
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import TransactionWizard from '../components/Finance/TransactionWizard';

const Finance: React.FC = () => {
  const { payments, properties, deletePayment } = useAppStore();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Dynamic Calculations
  const totalCollected = payments.filter(p => p.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingAudit = payments.filter(p => p.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);
  const targetRevenue = properties.reduce((acc, curr) => acc + curr.rentAmount, 0);
  const collectionRate = targetRevenue > 0 ? (totalCollected / targetRevenue) * 100 : 0;

  const getPropertyName = (id: string) => properties.find(p => p.id === id)?.name || 'Property';

  const filteredPayments = payments.filter(p => 
    (getPropertyName(p.propertyId)?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (p.month?.toLowerCase() || '').includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>{t('finance.title')}</h1>
          <p>{t('finance.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsWizardOpen(true)}
          className="premium-gradient" 
          style={{ 
            padding: '0.875rem 1.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem' 
          }}
        >
          <Plus size={20} />
          {t('finance.record_payment')}
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        <div className="card glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ background: 'var(--accent-soft)', color: 'var(--accent)', padding: '0.75rem', borderRadius: '12px' }}>
              <DollarSign size={24} />
            </div>
            <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 700 }}>
              <TrendingUp size={16} /> +12.5%
            </div>
          </div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.5rem' }}>Total Collected</h3>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)' }}>${totalCollected.toLocaleString()}</div>
        </div>

        <div className="card glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', padding: '0.75rem', borderRadius: '12px' }}>
               <Clock size={24} />
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>Scheduled</div>
          </div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.5rem' }}>Pending Audit</h3>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)' }}>${pendingAudit.toLocaleString()}</div>
        </div>

        <div className="card glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '12px' }}>
               <CheckCircle2 size={24} />
            </div>
            <div style={{ color: 'var(--primary)', fontSize: '1.25rem', fontWeight: 900 }}>{collectionRate.toFixed(1)}%</div>
          </div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.5rem' }}>Collection Rate</h3>
          <div style={{ width: '100%', height: '8px', background: 'var(--bg-main)', borderRadius: '4px', marginTop: '1rem', overflow: 'hidden' }}>
             <div style={{ width: `${collectionRate}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--primary-light))', borderRadius: '4px' }} />
          </div>
        </div>
      </div>

      <div className="card glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ 
          padding: '1.5rem 2rem', 
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.5)'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>{t('finance.audit_trail')}</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <div className="search-bar" style={{ width: '350px' }}>
               <Search size={18} color="#94a3b8" />
               <input 
                 type="text" 
                 placeholder="Search audit trail..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
             </div>
             <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '0.8125rem', borderRadius: '10px' }}>
               <Download size={18} /> {t('common.export')}
             </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-main)' }}>
                 <th style={tableHeaderStyle}>Ref ID</th>
                 <th style={tableHeaderStyle}>Property / Unit</th>
                 <th style={tableHeaderStyle}>Month / Period</th>
                 <th style={tableHeaderStyle}>Amount</th>
                 <th style={tableHeaderStyle}>Status</th>
                 <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredPayments.map((payment) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    key={payment.id} 
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.03)', verticalAlign: 'middle' }}
                  >
                     <td style={tableCellStyle}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                         <div style={{ background: 'var(--bg-main)', padding: '0.5rem', borderRadius: '8px', color: 'var(--primary-light)' }}>
                           <Receipt size={16} />
                         </div>
                         <div>
                           <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>#{payment.id}</div>
                           <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={12} /> {payment.date}</div>
                         </div>
                       </div>
                     </td>
                     <td style={tableCellStyle}>
                       <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{getPropertyName(payment.propertyId)}</div>
                       <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mogadishu District</div>
                     </td>
                     <td style={tableCellStyle}>
                       <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{payment.month}</span>
                     </td>
                     <td style={tableCellStyle}>
                       <div style={{ fontWeight: 900, color: 'var(--text-main)', fontSize: '1rem' }}>${payment.amount.toLocaleString()}</div>
                     </td>
                     <td style={tableCellStyle}>
                       <span style={{ 
                         padding: '0.4rem 0.8rem', 
                         borderRadius: '8px', 
                         fontSize: '0.6875rem', 
                         fontWeight: 800,
                         background: payment.status === 'Paid' ? 'var(--accent-soft)' : 'rgba(245, 158, 11, 0.1)',
                         color: payment.status === 'Paid' ? 'var(--accent)' : 'var(--warning)',
                         textTransform: 'uppercase'
                       }}>
                         {payment.status}
                       </span>
                     </td>
                     <td style={tableCellStyle}>
                        <button 
                          onClick={() => { if(window.confirm('Void this transaction?')) deletePayment(payment.id) }}
                          style={{ background: 'transparent', padding: '0.5rem', color: 'var(--danger)', opacity: 0.6 }}
                        >
                           <Trash2 size={18} />
                        </button>
                     </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <TransactionWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />
    </motion.div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  padding: '1.25rem 2rem',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: '#475569',
  fontWeight: 800
};

const tableCellStyle: React.CSSProperties = {
  padding: '1.25rem 2rem'
};

export default Finance;
