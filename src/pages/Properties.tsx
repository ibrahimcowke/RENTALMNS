import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
  Search, 
  MoreVertical, 
  Building2, 
  Trash2, 
  Edit 
} from 'lucide-react';
import { useAppStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import type { District } from '../types';
import { formatCurrency } from '../utils/format';
import PropertyWizard from '../components/PropertyWizard';

const Properties: React.FC = () => {
  const { properties, deleteProperty, currency, exchangeRate } = useAppStore();
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const districts: (District | 'All')[] = ['All', 'Hodan', 'Abdiaziz', 'Waberi', 'Wadajir', 'Hamar Weyne'];

  const filteredProperties = properties.filter(p => {
    const matchesFilter = filter === 'All' || p.district === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.address.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Asset Registry</h1>
          <p>Market listed and managed properties in Mogadishu Portfolio.</p>
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
          Register Property
        </button>
      </header>

      {/* Filters & Search */}
      <div className="card glass-panel" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '1.25rem 2rem',
        flexWrap: 'wrap',
        gap: '1.5rem',
        border: '1px solid rgba(255,255,255,0.5)'
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {districts.map(d => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '100px',
                background: filter === d ? 'var(--primary)' : 'white',
                color: filter === d ? 'white' : 'var(--text-muted)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                border: filter === d ? 'none' : '1px solid #e2e8f0',
                whiteSpace: 'nowrap',
                boxShadow: filter === d ? 'var(--shadow-md)' : 'none'
              }}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="search-bar" style={{ width: '400px' }}>
          <Search size={18} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Search assets by name, address or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', 
        gap: '2.5rem' 
      }}>
        <AnimatePresence mode="popLayout">
          {filteredProperties.map((property, idx) => (
            <motion.div
              layout
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="card glass-panel"
              style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.4)' }}
            >
              <div style={{ 
                height: '200px', 
                background: 'linear-gradient(135deg, var(--bg-main) 0%, #e2e8f0 100%)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1'
              }}>
                <Building2 size={64} style={{ opacity: 0.5 }} />
                
                {/* Status Badge */}
                <div style={{ 
                  position: 'absolute', 
                  top: '1.25rem', 
                  right: '1.25rem',
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  background: 'white',
                  letterSpacing: '0.05em',
                  color: property.status === 'Occupied' ? 'var(--success)' : 
                         property.status === 'Available' ? 'var(--info)' : 'var(--warning)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid rgba(0,0,0,0.03)'
                }}>
                  {property.status}
                </div>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>{property.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ background: 'var(--bg-main)', padding: '0.35rem', borderRadius: '8px' }}>
                        <MapPin size={14} color="var(--primary)" />
                      </div>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>{property.district}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>
                      {formatCurrency(property.rentAmount, currency, exchangeRate)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>per month</div>
                  </div>
                </div>

                <p style={{ 
                  fontSize: '0.875rem', 
                  marginTop: '1.25rem', 
                  color: 'var(--text-muted)',
                  lineHeight: '1.6',
                  height: '2.8rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {property.address}
                </p>

                <div style={{ 
                  marginTop: '1.75rem', 
                  paddingTop: '1.25rem', 
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ 
                    fontSize: '0.8125rem', 
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Building2 size={16} color="var(--primary-light)" />
                    {property.units} Registry Units
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button style={{ background: 'white', border: '1px solid #e2e8f0', color: 'var(--text-muted)', padding: '0.5rem', borderRadius: '10px' }}>
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => deleteProperty(property.id)}
                      style={{ background: 'white', border: '1px solid #fee2e2', color: 'var(--danger)', padding: '0.5rem', borderRadius: '10px' }}
                    >
                      <Trash2 size={18} />
                    </button>
                    <button style={{ background: 'white', border: '1px solid #e2e8f0', color: 'var(--text-muted)', padding: '0.5rem', borderRadius: '10px' }}>
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProperties.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', padding: '6rem 2rem' }}
        >
          <div style={{ 
            width: '100px', 
            height: '100px', 
            background: '#f1f5f9', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 2rem auto',
            color: '#cbd5e1'
          }}>
            <Building2 size={48} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>No registry matches</h3>
          <p style={{ color: 'var(--text-muted)' }}>We couldn't find any properties matching your current search criteria.</p>
          <button 
            onClick={() => {setSearch(''); setFilter('All');}}
            style={{ marginTop: '2rem', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.75rem 1.5rem', fontWeight: 700 }}
          >
            Clear All Filters
          </button>
        </motion.div>
      )}

      <PropertyWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />
    </motion.div>
  );
};

export default Properties;

