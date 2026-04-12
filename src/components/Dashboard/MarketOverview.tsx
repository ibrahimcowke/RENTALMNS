import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, MapPin, Activity } from 'lucide-react';

const marketStats = [
  { district: 'Hodan', growth: '+12.4%', demand: 'High', avgRent: '$1,200', color: '#0ea5e9' },
  { district: 'Abdiaziz', growth: '+8.2%', demand: 'Moderate', avgRent: '$850', color: '#14b8a6' },
  { district: 'Wadajir', growth: '+5.7%', demand: 'Growing', avgRent: '$600', color: '#f59e0b' },
];

const MarketOverview: React.FC = () => {
  return (
    <div className="card" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Market Intelligence</h3>
          <p style={{ margin: 0, fontSize: '0.75rem' }}>Real-time stats across Banadir</p>
        </div>
        <Activity size={20} color="var(--primary)" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {marketStats.map((stat, index) => (
          <motion.div 
            key={stat.district}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ 
              padding: '1rem', 
              background: '#f8fafc', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ scale: 1.02, background: 'white', borderColor: stat.color }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '8px', 
                background: `${stat.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: stat.color
              }}>
                <MapPin size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{stat.district}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Demand: {stat.demand}</div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ 
                color: 'var(--success)', 
                fontSize: '0.8125rem', 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                justifyContent: 'flex-end'
              }}>
                <TrendingUp size={12} />
                {stat.growth}
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, marginTop: '0.25rem' }}>{stat.avgRent}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <button style={{ 
        width: '100%', 
        marginTop: '1.5rem', 
        padding: '0.75rem', 
        background: '#f1f5f9', 
        color: 'var(--primary)',
        fontSize: '0.8125rem',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        View Global Market Report <ArrowUpRight size={16} />
      </button>
    </div>
  );
};

export default MarketOverview;
