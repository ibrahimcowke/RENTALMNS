import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
  index?: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, color = 'var(--primary)', index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true }}
      className="card"
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Accent Pattern */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '120px',
        height: '120px',
        background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
        borderRadius: '50%',
        zIndex: 0
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          background: `linear-gradient(135deg, ${color}20, ${color}10)`, 
          padding: '0.875rem', 
          borderRadius: 'var(--radius-md)',
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 12px 0 ${color}15`
        }}>
          <Icon size={24} />
        </div>
        
        {trend && (
          <div style={{ 
            fontSize: '0.75rem', 
            fontWeight: 700,
            color: trend.isPositive ? 'var(--success)' : 'var(--danger)',
            background: trend.isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            padding: '0.35rem 0.75rem',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>

      <div style={{ marginTop: '1.25rem', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          fontSize: '0.8125rem', 
          color: 'var(--text-muted)', 
          fontWeight: 600, 
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>{label}</div>
        <div style={{ 
          fontSize: '1.875rem', 
          fontWeight: 800, 
          marginTop: '0.35rem',
          letterSpacing: '-0.02em',
          color: 'var(--text-main)'
        }}>{value}</div>
      </div>

      {/* Subtle Progress Bar (Visual Only) */}
      <div style={{ 
        marginTop: '1.5rem', 
        height: '4px', 
        width: '100%', 
        background: '#f1f5f9', 
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '70%' }}
          transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
          style={{ height: '100%', background: color }} 
        />
      </div>
    </motion.div>
  );
};

export default StatCard;

