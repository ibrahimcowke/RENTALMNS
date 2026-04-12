import React from 'react';
import { MapPin, TrendingUp, Info, Building2, Eye, ShieldCheck, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import type { District } from '../types';

const allDistricts: District[] = [
  'Hodan', 'Abdiaziz', 'Waberi', 'Wadajir', 'Hamar Weyne', 
  'Bondhere', 'Daynile', 'Dharkenley', 'Hamar Jajab', 'Heliwa', 
  'Howlwadag', 'Karan', 'Shangani', 'Shibis', 'Wardhigley', 'Yaqshid', 'Kahda'
];

// Simulated backend intelligence metrics
const getIntelligenceMetrics = (district: string) => {
  const hash = district.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const occupancy = 70 + (hash % 25); // 70% - 95%
  const yieldRate = 5 + (hash % 8); // 5% - 12%
  const demandScore = 60 + (hash % 40); // 60 - 100

  return { occupancy, yieldRate, demandScore };
};

const Districts: React.FC = () => {
  const { t } = useTranslation();
  const { properties } = useAppStore();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Market Intelligence</h1>
          <p>Deep Insight command center for Mogadishu's 17 administrative districts.</p>
        </div>
      </header>

      {/* Intelligence Master Dash */}
      <div className="card glass-panel premium-gradient" style={{ display: 'flex', gap: '3rem', padding: '2.5rem', color: 'white', alignItems: 'center' }}>
         <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Zap size={32} color="#fcd34d" /> 
              City-Wide Pulse
            </h2>
            <p style={{ opacity: 0.9, lineHeight: 1.6, maxWidth: '500px' }}>
              Real-time aggregation of geospatial property data across the Banaadir region. High demand detected in coastal and central commercial hubs.
            </p>
         </div>
         <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '16px', minWidth: '150px' }}>
               <div style={{ fontSize: '0.875rem', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Avg Yield</div>
               <div style={{ fontSize: '2rem', fontWeight: 900 }}>8.4%</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '16px', minWidth: '150px' }}>
               <div style={{ fontSize: '0.875rem', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Global Occupancy</div>
               <div style={{ fontSize: '2rem', fontWeight: 900 }}>82%</div>
            </div>
         </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', 
        gap: '2.5rem' 
      }}>
        {allDistricts.map((district, idx) => {
          const metrics = getIntelligenceMetrics(district);
          const propertyCount = properties.filter(p => p.district === district).length;
          
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.03 }}
              whileHover={{ y: -5 }}
              key={district}
              className="card glass-panel"
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.05 }}>
                <MapPin size={100} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--text-main)' }}>{district}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={14} color="var(--primary)" />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Verified District</span>
                  </div>
                </div>
                
                <div style={{ 
                    background: metrics.demandScore > 85 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', 
                    color: metrics.demandScore > 85 ? 'var(--danger)' : 'var(--success)',
                    padding: '0.4rem 1rem', 
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                 }}>
                   Demand: {metrics.demandScore}
                </div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '1.25rem', 
                padding: '1.5rem',
                background: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(0,0,0,0.03)'
              }}>
                <div>
                  <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Est. Yield</div>
                  <div style={{ fontWeight: 900, fontSize: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                     {metrics.yieldRate}% <TrendingUp size={16} color="var(--success)" />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Occupancy</div>
                  <div style={{ fontWeight: 900, fontSize: '1.25rem', color: 'var(--text-main)' }}>{metrics.occupancy}%</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                 <button style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', padding: '0.75rem', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', color: 'var(--text-main)', borderRadius: '12px' }}>
                   <Building2 size={16} /> {propertyCount} Assets
                 </button>
                 <button style={{ flex: 1, background: 'var(--primary-light)', padding: '0.75rem', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', color: 'white', borderRadius: '12px', border: 'none' }}>
                   <Eye size={16} /> Inspect
                 </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Districts;
