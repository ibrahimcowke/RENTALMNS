import React from 'react';
import { MapPin, TrendingUp, Info, Building2, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { District } from '../types';

const districtDetails: { name: District; metric: string; trend: string }[] = [
  { name: 'Hodan', metric: '8.4%', trend: 'up' },
  { name: 'Abdiaziz', metric: '9.2%', trend: 'up' },
  { name: 'Waberi', metric: '7.5%', trend: 'up' },
  { name: 'Hamar Weyne', metric: '6.8%', trend: 'stable' },
  { name: 'Bondhere', metric: '5.4%', trend: 'stable' },
  { name: 'Wadajir', metric: '4.2%', trend: 'up' },
];

const Districts: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>{t('districts.title')}</h1>
          <p>{t('districts.subtitle')}</p>
        </div>
        <button className="premium-gradient" style={{ 
          padding: '0.875rem 1.75rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.6rem'
        }}>
          <Plus size={20} />
          {t('districts.request_update')}
        </button>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
        gap: '2rem' 
      }}>
        {districtKeys.map((districtKey, idx) => {
          const stats = getDistrictStats(districtKey);
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.03 }}
              whileHover={{ y: -5 }}
              key={districtKey}
              className="card glass-panel"
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.03 }}>
                <MapIcon size={120} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem' }}>{districtKey}</h3>
                  <span style={{ 
                    fontSize: '0.6875rem', 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    color: 'var(--primary)',
                    background: 'rgba(7, 89, 133, 0.08)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '20px',
                    letterSpacing: '0.05em'
                  }}>
                    {t(`districts.list.${districtKey}.tag`)}
                  </span>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '0.5rem', borderRadius: '12px' }}>
                  <TrendingUp size={20} color="var(--primary)" />
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', height: '3.2rem', overflow: 'hidden' }}>
                {t(`districts.list.${districtKey}.desc`)}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.25rem' }}>{t('districts.target_yield')}</div>
                  <div style={{ fontWeight: 800, color: 'var(--success)' }}>12.4%</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.25rem' }}>{t('districts.portfolio')}</div>
                  <div style={{ fontWeight: 800 }}>{stats.count} {t('common.properties')}</div>
                </div>
              </div>

              <button style={{ 
                marginTop: '0.5rem',
                background: 'transparent',
                border: '1px solid #e2e8f0',
                padding: '0.6rem 1rem',
                borderRadius: '10px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                color: 'var(--text-main)',
                transition: 'all 0.2s ease'
              }}>
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1.25rem', 
              marginTop: '0.5rem',
              padding: '1.25rem',
              background: 'var(--bg-main)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(0,0,0,0.02)'
            }}>
              <div>
                <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{t('districts.target_yield')}</div>
                <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                   {district.metric} <TrendingUp size={16} color="var(--success)" />
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{t('districts.rent_range')}</div>
                <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--text-main)' }}>$600 - $1.8k</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
               <button style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', padding: '0.75rem', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', color: 'var(--text-main)' }}>
                 <TrendingUp size={16} /> {t('districts.market_trends')}
               </button>
               <button className="premium-gradient" style={{ flex: 1, padding: '0.75rem', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                 <Building2 size={16} /> {t('districts.portfolio')}
               </button>
            </div>
          </motion.div>
        ))}
        
        {/* Placeholder for more districts */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          style={{ 
            border: '2px dashed #cbd5e1', 
            borderRadius: 'var(--radius-lg)', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '3rem 2rem',
            color: '#64748b',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(4px)'
          }}>
          <div style={{ background: '#e2e8f0', padding: '1rem', borderRadius: '50%', marginBottom: '1.25rem' }}>
             <Info size={36} color="var(--primary)" />
          </div>
          <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 800 }}>{t('districts.expand_title')}</h4>
          <p style={{ fontSize: '0.875rem' }}>{t('districts.expand_desc')}</p>
          <button style={{ marginTop: '1.5rem', background: 'transparent', border: '1px solid #cbd5e1', padding: '0.6rem 1.25rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>{t('districts.request_update')}</button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Districts;

