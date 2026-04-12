import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, Users } from 'lucide-react';

const districts = [
  { id: 'Hodan', name: 'Hodan', x: 220, y: 180, count: 12, growth: '+12%', yield: '8.4%' },
  { id: 'Abdiaziz', name: 'Abdiaziz', x: 380, y: 120, count: 8, growth: '+8%', yield: '7.2%' },
  { id: 'Waberi', name: 'Waberi', x: 280, y: 220, count: 5, growth: '+5%', yield: '6.8%' },
  { id: 'Hamar Weyne', name: 'Hamar Weyne', x: 340, y: 190, count: 7, growth: '+9%', yield: '9.1%' },
  { id: 'Wadajir', name: 'Wadajir', x: 180, y: 280, count: 4, growth: '+6%', yield: '5.5%' },
  { id: 'Dharkenley', name: 'Dharkenley', x: 120, y: 320, count: 3, growth: '+4%', yield: '4.8%' },
  { id: 'Karan', name: 'Karaan', x: 450, y: 80, count: 2, growth: '+3%', yield: '4.2%' },
  { id: 'Bondhere', name: 'Boondheere', x: 320, y: 140, count: 6, growth: '+7%', yield: '7.5%' },
  { id: 'Shangani', name: 'Shangaani', x: 360, y: 160, count: 4, growth: '+10%', yield: '8.8%' },
];

const MogadishuMap: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const selectedData = districts.find(d => d.id === hovered);

  return (
    <div className="card glass-panel" style={{ position: 'relative', width: '100%', height: '450px', overflow: 'hidden', padding: 0 }}>
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
        <h3 className="text-gradient" style={{ margin: 0 }}>Geospatial Intelligence</h3>
        <p style={{ fontSize: '0.75rem', margin: 0 }}>Active portfolio distribution & market yields</p>
      </div>

      <svg width="100%" height="100%" viewBox="0 0 600 450" style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.1))' }}>
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary-light)" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="var(--primary-light)" stopOpacity="0"/>
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Ocean Background / Waves */}
        <path
          d="M 600 300 Q 500 320 400 300 T 200 300 T 0 300 L 0 450 L 600 450 Z"
          fill="url(#waveGradient)"
        />
        
        {/* Simplified Coastline Path */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M 550 50 Q 450 100 400 150 Q 350 200 280 250 Q 220 300 150 350 Q 100 400 50 430"
          fill="none"
          stroke="var(--primary-light)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="1, 12"
          opacity="0.2"
        />

        {/* District Nodes */}
        {districts.map((district) => (
          <g 
            key={district.id} 
            onMouseEnter={() => setHovered(district.id)} 
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Pulse Aura */}
            <motion.circle
              cx={district.x}
              cy={district.y}
              r={12}
              fill="var(--accent)"
              initial={{ opacity: 0.2, scale: 1 }}
              animate={{ 
                opacity: [0.2, 0, 0.2], 
                scale: [1, 3, 1] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeOut",
                delay: Math.random() * 2 
              }}
            />
            
            {/* Main Node */}
            <motion.circle
              whileHover={{ scale: 1.5 }}
              cx={district.x}
              cy={district.y}
              r={hovered === district.id ? 10 : 7}
              fill={hovered === district.id ? 'var(--accent)' : 'white'}
              stroke={hovered === district.id ? 'white' : 'var(--primary-light)'}
              strokeWidth="3"
              style={{ filter: hovered === district.id ? 'url(#glow)' : 'none', transition: 'all 0.3s ease' }}
            />

            {/* Micro Indicator for Yield */}
            {hovered !== district.id && (
              <text
                x={district.x + 12}
                y={district.y + 4}
                fontSize="10"
                fontWeight="700"
                fill="var(--text-muted)"
                opacity="0.8"
              >
                {district.name}
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Floating Detailed Info Card */}
      <AnimatePresence>
        {selectedData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              width: '240px',
              padding: '1.5rem',
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-premium)',
              border: '1px solid rgba(14, 165, 233, 0.1)',
              zIndex: 100
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.5rem', background: 'var(--accent-soft)', borderRadius: '10px', color: 'var(--accent)' }}>
                <MapPin size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1rem' }}>{selectedData.name}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mogadishu Central</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Users size={12} /> Units</span>
                <span style={{ fontWeight: 700 }}>{selectedData.count} Properties</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><TrendingUp size={12} /> Yield</span>
                <span style={{ fontWeight: 700, color: 'var(--success)' }}>{selectedData.yield}</span>
              </div>
              
              <div style={{ marginTop: '0.5rem', height: '1px', background: '#f1f5f9' }} />
              <button style={{ 
                marginTop: '0.5rem', 
                padding: '0.5rem', 
                fontSize: '0.75rem', 
                background: 'var(--primary-glow)', 
                color: 'var(--primary)',
                width: '100%'
              }}>
                Explore Hub Data
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', display: 'flex', gap: '1.5rem' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
            High Yield Ready
         </div>
      </div>
    </div>
  );
};

export default MogadishuMap;

