import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Phone, 
  Calendar,
  Mail,
  Globe,
  Edit,
  Trash2,
  ShieldCheck,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import { motion } from 'framer-motion';
import type { Tenant } from '../types';
import TenantWizard from '../components/TenantWizard';

const Tenants: React.FC = () => {
  const { tenants, properties, payments, deleteTenant } = useAppStore();
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | undefined>(undefined);

  const filteredTenants = tenants.filter(t => 
    (t.name?.toLowerCase() || '').includes(search.toLowerCase()) || 
    (t.phone || '').includes(search)
  );

  const getPropertyName = (id: string) => {
    return properties.find(p => p.id === id)?.name || 'Unknown Property';
  };

  const handleEdit = (tenant: Tenant) => {
    setEditingTenant(tenant);
    setIsWizardOpen(true);
  };

  const closeWizard = () => {
    setIsWizardOpen(false);
    setEditingTenant(undefined);
  };

  const calculateLeaseHealth = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'Expired', color: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.1)' };
    if (diffDays <= 30) return { status: 'Expiring Soon', color: 'var(--warning)', bg: 'rgba(245, 158, 11, 0.1)' };
    return { status: 'Healthy', color: 'var(--success)', bg: 'rgba(16, 185, 129, 0.1)' };
  };

  const calculateReliability = (tenantId: string) => {
    const tenantPayments = payments.filter(p => p.tenantId === tenantId);
    if (tenantPayments.length === 0) return { score: 'New', color: 'var(--info)' };
    
    const paid = tenantPayments.filter(p => p.status === 'Paid').length;
    const ratio = paid / tenantPayments.length;
    
    if (ratio >= 0.9) return { score: 'Excellent', color: 'var(--success)' };
    if (ratio >= 0.7) return { score: 'Good', color: 'var(--primary)' };
    return { score: 'Review', color: 'var(--warning)' };
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>{t('tenants.title')}</h1>
          <p>{t('tenants.subtitle')}</p>
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
          {t('tenants.onboard_button')}
        </button>
      </header>

      <div className="card glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ 
          padding: '1.5rem 2rem', 
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.5)'
        }}>
          <div className="search-bar" style={{ width: '450px' }}>
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder={t('common.search')} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
             <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.6rem 1.25rem', color: 'var(--text-main)', fontSize: '0.8125rem', fontWeight: 700, borderRadius: '10px' }}>{t('common.export')} PDF</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-main)' }}>
                <th style={tableHeaderStyle}>{t('tenants.title')} / ID</th>
                <th style={tableHeaderStyle}>Assigned Unit</th>
                <th style={tableHeaderStyle}>{t('tenants.lease_period')} / Health</th>
                <th style={tableHeaderStyle}>{t('tenants.contact_details')}</th>
                <th style={tableHeaderStyle}>Reliability</th>
                <th style={tableHeaderStyle}>{t('tenants.operational_status')}</th>
                <th style={tableHeaderStyle}></th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant, index) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={tenant.id} 
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.03)', verticalAlign: 'middle', transition: 'all 0.2s ease' }}
                >
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div className="avatar" style={{ width: '40px', height: '40px', fontSize: '0.875rem', fontWeight: 800 }}>
                        {tenant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9375rem' }}>{tenant.name}</div>
                        <div style={{ fontSize: '0.6875rem', color: '#94a3b8', fontWeight: 700 }}>RES-{tenant.id.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)' }}>{getPropertyName(tenant.propertyId)}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                       <Globe size={10} /> Mogadishu Portfolio
                    </div>
                  </td>
                  <td style={tableCellStyle}>
                    {(() => {
                      const health = calculateLeaseHealth(tenant.leaseEnd);
                      return (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            <Calendar size={14} color="var(--primary-light)" />
                            {tenant.leaseStart} <span style={{opacity: 0.3}}>→</span> {tenant.leaseEnd}
                          </div>
                          <span style={{ 
                            fontSize: '0.6875rem', 
                            padding: '0.2rem 0.6rem', 
                            borderRadius: '12px', 
                            background: health.bg, 
                            color: health.color, 
                            fontWeight: 700 
                          }}>
                            {health.status}
                          </span>
                        </div>
                      )
                    })()}
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-main)', fontWeight: 600 }}>
                        <Phone size={13} color="var(--primary-light)" /> {tenant.phone}
                      </div>
                      {tenant.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <Mail size={13} /> {tenant.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={tableCellStyle}>
                    {(() => {
                      const rel = calculateReliability(tenant.id);
                      return (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: rel.color }}>
                          <ShieldCheck size={16} />
                          {rel.score}
                        </div>
                      );
                    })()}
                  </td>
                  <td style={tableCellStyle}>
                    <span style={{ 
                      padding: '0.4rem 0.9rem', 
                      borderRadius: '20px', 
                      fontSize: '0.6875rem', 
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      background: tenant.status === 'Active' ? 'var(--accent-soft)' : 'rgba(245, 158, 11, 0.1)',
                      color: tenant.status === 'Active' ? 'var(--accent)' : 'var(--warning)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
                      {tenant.status === 'Active' ? (i18n.language === 'so' ? 'Firfircoon' : 'Active') : (i18n.language === 'so' ? 'Lagu leeyahay' : 'Due')}
                    </span>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                       <button 
                        onClick={() => handleEdit(tenant)}
                        style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '8px', color: '#64748b' }}
                       >
                        <Edit size={18} />
                       </button>
                       <button 
                         onClick={() => {
                           if(window.confirm('Delete this tenant record?')) {
                             deleteTenant(tenant.id);
                           }
                         }}
                         style={{ background: 'white', border: '1px solid #fee2e2', padding: '0.5rem', borderRadius: '8px', color: 'var(--danger)' }}
                       >
                        <Trash2 size={18} />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TenantWizard 
        isOpen={isWizardOpen} 
        onClose={closeWizard} 
        initialData={editingTenant}
      />
    </motion.div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  padding: '1.25rem 2rem',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: '#475569',
  fontWeight: 800
};

const tableCellStyle: React.CSSProperties = {
  padding: '1.25rem 2rem',
  color: 'var(--text-main)'
};

export default Tenants;
;

