import React from 'react';
import { MapPin, TrendingUp, Info, Building2, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import type { District } from '../types';

const districtDetails: { name: District; description: string; tag: string; metric: string; trend: string }[] = [
  { name: 'Hodan', description: 'The commercial heart of modern Mogadishu. High demand for office spaces and luxury villas.', tag: 'High Growth', metric: '8.4%', trend: 'up' },
  { name: 'Abdiaziz', description: 'Coastal district famous for Liido Beach. Prime location for tourism and high-end apartments.', tag: 'Premium', metric: '9.2%', trend: 'up' },
  { name: 'Waberi', description: 'Strategic location near Aden Adde Airport. Busy residential and logistical hub.', tag: 'High Yield', metric: '7.5%', trend: 'up' },
  { name: 'Hamar Weyne', description: 'The historic old city. Dense commercial activity with traditional shops and heritage sites.', tag: 'Historic', metric: '6.8%', trend: 'stable' },
  { name: 'Bondhere', description: 'Centrally located with many government offices and quiet residential streets.', tag: 'Stable', metric: '5.4%', trend: 'stable' },
  { name: 'Wadajir', description: 'Large residential district with diverse property types and expanding infrastructure.', tag: 'Residential', metric: '4.2%', trend: 'up' },
];

const Districts: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>District Intelligence</h1>
          <p>Neighborhood analytics and market yields across the 17 administrative districts of Banadir.</p>
        </div>
        <button className="glass-panel" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.875rem' }}>
          <LayoutGrid size={18} /> Regional Grid View
        </button>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
        gap: '2.5rem' 
      }}>
        {districtDetails.map((district, index) => (
          <motion.div
            key={district.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="card glass-panel"
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              padding: '2rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--primary-glow)', borderRadius: '12px', color: 'var(--primary)' }}>
                   <MapPin size={24} />
                </div>
                <div>
                   <h3 style={{ fontSize: '1.375rem', fontWeight: 800, margin: 0 }}>{district.name}</h3>
                   <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Banadir Region</span>
                </div>
              </div>
              <span style={{ 
                fontSize: '0.6875rem', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                background: 'rgba(7, 89, 133, 0.05)', 
                color: 'var(--primary)',
                padding: '0.4rem 0.8rem', 
                borderRadius: '20px',
                letterSpacing: '0.05em'
              }}>
                {district.tag}
              </span>
            </div>

            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{district.description}</p>

            <div style={{ 
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
                <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Target Yield</div>
                <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                   {district.metric} <TrendingUp size={16} color="var(--success)" />
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Rent Range</div>
                <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--text-main)' }}>$600 - $1.8k</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
               <button style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', padding: '0.75rem', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', color: 'var(--text-main)' }}>
                 <TrendingUp size={16} /> Market Trends
               </button>
               <button className="premium-gradient" style={{ flex: 1, padding: '0.75rem', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                 <Building2 size={16} /> Portfolio
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
          <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 800 }}>Registry Expanding</h4>
          <p style={{ fontSize: '0.875rem' }}>11 more districts currently undergoing geospatial analysis and yield auditing for Q3 reports.</p>
          <button style={{ marginTop: '1.5rem', background: 'transparent', border: '1px solid #cbd5e1', padding: '0.6rem 1.25rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>Request Access Update</button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Districts;

