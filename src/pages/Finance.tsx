import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Receipt
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import StatCard from '../components/Dashboard/StatCard';
import { formatCurrency } from '../utils/format';
import StatementModal from '../components/Finance/StatementModal';
import type { Payment } from '../types';

const Finance: React.FC = () => {
  const { payments, properties, tenants, currency, exchangeRate } = useAppStore();
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const getTenantName = (id: string) => tenants.find(t => t.id === id)?.name || 'Former Tenant';
  const getPropertyName = (id: string) => properties.find(p => p.id === id)?.name || 'Unknown Property';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Financial HUB</h1>
          <p>Unified rent tracking and financial performance analytics for the Banadir region.</p>
        </div>
        <button className="glass-panel" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '0.875rem' }}>
          <TrendingUp size={18} /> Performance Reports
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <StatCard 
          label="Total Collected (MTD)" 
          value={formatCurrency(14500, currency, exchangeRate)} 
          icon={ArrowUpRight} 
          trend={{ value: 15, isPositive: true }}
          color="var(--success)"
        />
        <StatCard 
          label="Outstanding Balance" 
          value={formatCurrency(2800, currency, exchangeRate)} 
          icon={Clock} 
          trend={{ value: 5, isPositive: false }}
          color="var(--warning)"
        />
        <StatCard 
          label="Operational Expenses" 
          value={formatCurrency(3100, currency, exchangeRate)} 
          icon={ArrowDownLeft} 
          trend={{ value: 2, isPositive: true }}
          color="var(--danger)"
        />
      </div>

      <div className="card glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ 
          padding: '1.5rem 2rem', 
          borderBottom: '1px solid #f1f5f9', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'rgba(255,255,255,0.5)'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Audit Trail</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <div className="search-bar" style={{ width: '350px' }}>
               <Search size={18} color="#94a3b8" />
               <input type="text" placeholder="Search reference, tenant or property..." />
             </div>
             <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '0.8125rem', borderRadius: '10px' }}>
               <Download size={18} /> Export CSV
             </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-main)' }}>
                <th style={headerStyle}>Ref Token</th>
                <th style={headerStyle}>Counterparty</th>
                <th style={headerStyle}>Linked Asset</th>
                <th style={headerStyle}>Processing Date</th>
                <th style={headerStyle}>Gross Amount</th>
                <th style={headerStyle}>Authorization</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={payment.id} 
                  onClick={() => setSelectedPayment(payment)}
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.03)', cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(7, 89, 133, 0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={cellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                       <div style={{ background: 'var(--bg-main)', padding: '0.5rem', borderRadius: '8px', color: 'var(--primary-light)' }}>
                         <Receipt size={16} />
                       </div>
                       <span style={{ fontWeight: 800, fontSize: '0.8125rem', letterSpacing: '0.05em' }}>#PAY-{payment.id.toUpperCase()}</span>
                    </div>
                  </td>
                  <td style={cellStyle}>
                    <div style={{ fontWeight: 700 }}>{getTenantName(payment.tenantId)}</div>
                    <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>Verified Tenant</div>
                  </td>
                  <td style={cellStyle}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{getPropertyName(payment.propertyId)}</div>
                  </td>
                  <td style={cellStyle}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{payment.date}</div>
                  </td>
                  <td style={{ ...cellStyle, fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>
                    {formatCurrency(payment.amount, currency, exchangeRate)}
                  </td>
                  <td style={cellStyle}>
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      padding: '0.4rem 0.9rem',
                      borderRadius: '20px',
                      background: payment.status === 'Paid' ? 'var(--accent-soft)' : 'rgba(245, 158, 11, 0.1)',
                      color: payment.status === 'Paid' ? 'var(--accent)' : 'var(--warning)',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {payment.status === 'Paid' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      {payment.status}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <StatementModal 
        payment={selectedPayment} 
        onClose={() => setSelectedPayment(null)} 
      />
    </motion.div>
  );
};

const headerStyle: React.CSSProperties = {
  padding: '1.25rem 2rem',
  textAlign: 'left',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  color: '#475569',
  fontWeight: 800,
  letterSpacing: '0.12em'
};

const cellStyle: React.CSSProperties = {
  padding: '1.25rem 2rem',
  fontSize: '0.875rem'
};

export default Finance;

