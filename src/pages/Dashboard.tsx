import React from 'react';
import { 
  Building2, 
  Users, 
  Wallet, 
  AlertCircle,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import StatCard from '../components/Dashboard/StatCard';
import { DistrictDistribution, RevenueTrend } from '../components/Dashboard/Charts';
import MogadishuMap from '../components/Dashboard/MogadishuMap';
import MarketOverview from '../components/Dashboard/MarketOverview';
import { useAppStore } from '../store';
import { formatCurrency } from '../utils/format';

const Dashboard: React.FC = () => {
  const { properties, tenants, payments, maintenance } = useAppStore();
  const { t } = useTranslation();

  const totalRevenue = payments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const occupancyRate = properties.length > 0 
    ? Math.round((properties.filter(p => p.status === 'Occupied').length / properties.length) * 100)
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>{t('dashboard.title')}</h1>
          <p>{t('dashboard.subtitle')}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <button className="premium-gradient" style={{ padding: '0.875rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowUpRight size={18} /> Deep Insights
           </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '2rem' 
      }}>
        <StatCard 
          index={0}
          label={t('common.properties')} 
          value={properties.length} 
          icon={Building2} 
          trend={{ value: 12, isPositive: true }}
          color="#0369a1"
        />
        <StatCard 
          index={1}
          label={t('dashboard.active_tenants')} 
          value={tenants.length} 
          icon={Users} 
          trend={{ value: 4, isPositive: true }}
          color="#14b8a6"
        />
        <StatCard 
          index={2}
          label={t('dashboard.total_revenue')} 
          value={formatCurrency(totalRevenue)} 
          icon={Wallet} 
          trend={{ value: 8, isPositive: true }}
          color="#eab308"
        />
        <StatCard 
          index={3}
          label={t('dashboard.occupancy')} 
          value={`${occupancyRate}%`} 
          icon={TrendingUp} 
          trend={{ value: 2, isPositive: false }}
          color="#10b981"
        />
      </div>

      {/* Main Content Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gap: '2rem' 
      }}>
        {/* Row 1: Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
          <div className="card" style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>{t('dashboard.revenue_trend')}</h3>
                <p style={{ margin: 0, fontSize: '0.75rem' }}>Operational income trends (USD)</p>
              </div>
              <span className="premium-gradient" style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>Last 6 Months</span>
            </div>
            <RevenueTrend />
          </div>

          <div className="card" style={{ minWidth: 0 }}>
             <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ margin: 0 }}>Portfolio Density</h3>
                <p style={{ margin: 0, fontSize: '0.75rem' }}>Unit distribution by district</p>
              </div>
            <DistrictDistribution />
          </div>
        </div>

        {/* Row 2: Map & Intelligence */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
           <MogadishuMap />
           <MarketOverview />
        </div>
      </div>

      {/* Bottom Section: Active Maintenance */}
      <div className="card glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
           <div>
              <h3 style={{ margin: 0 }}>Active Command Requests</h3>
              <p style={{ margin: 0, fontSize: '0.75rem' }}>Priority maintenance and service calls</p>
           </div>
           <button style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 700 }}>View All Registry</button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {maintenance.map((ticket, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={ticket.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.25rem',
                padding: '1.25rem',
                background: 'white',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                borderLeft: `4px solid ${ticket.priority === 'High' ? 'var(--danger)' : 'var(--warning)'}`
              }}
            >
              <div style={{ 
                color: ticket.priority === 'High' ? 'var(--danger)' : 'var(--warning)',
                background: ticket.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                padding: '0.6rem',
                borderRadius: '12px'
              }}>
                <AlertCircle size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.2rem' }}>{ticket.description}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('common.status')}: <span style={{fontWeight: 600, color: 'var(--text-main)'}}>{ticket.status}</span></div>
              </div>
              <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: ticket.priority === 'High' ? 'var(--danger)' : 'var(--warning)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

