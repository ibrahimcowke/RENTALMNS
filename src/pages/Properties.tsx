import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
  Search, 
  Building2, 
  Trash2, 
  Edit,
  Bed,
  Bath,
  ChefHat,
  Layers
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import type { District, Property } from '../types';
import { formatCurrency } from '../utils/format';
import PropertyWizard from '../components/PropertyWizard';

const Properties: React.FC = () => {
  const { properties, deleteProperty, currency, exchangeRate } = useAppStore();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | undefined>(undefined);

  const districts: (District | 'All')[] = ['All', 'Hodan', 'Abdiaziz', 'Waberi', 'Wadajir', 'Hamar Weyne'];

  const filteredProperties = properties.filter(p => {
    const matchesFilter = filter === 'All' || p.district === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.address.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getDistrictLabel = (d: string) => {
    if (d === 'All') return t('properties.all_districts');
    return d;
  };

  const handleEdit = (p: Property) => {
    setEditingProperty(p);
    setIsWizardOpen(true);
  };

  const closeWizard = () => {
    setIsWizardOpen(false);
    setEditingProperty(undefined);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>{t('properties.title')}</h1>
          <p>{t('properties.subtitle')}</p>
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
          {t('properties.register_button')}
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
              {getDistrictLabel(d)}
            </button>
          ))}
        </div>

        <div className="search-bar" style={{ width: '400px' }}>
          <Search size={18} color="#94a3b8" />
          <input 
            type="text" 
            placeholder={t('common.search')} 
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
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{t('properties.rent_per_month')}</div>
                  </div>
                </div>

                {/* Architectural Features */}
                {(property.beds || property.toilets || property.kitchens) && (
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    marginTop: '1.25rem',
                    background: '#f8fafc',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9'
                  }}>
                    {property.beds > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                        <Bed size={14} color="var(--primary)" /> {property.beds} {t('properties.beds')}
                      </div>
                    )}
                    {property.toilets > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                        <Bath size={14} color="var(--primary)" /> {property.toilets} {t('properties.toilets')}
                      </div>
                    )}
                    {property.kitchens > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                        <ChefHat size={14} color="var(--primary)" /> {property.kitchens} {t('properties.kitchens')}
                      </div>
                    )}
                    {property.floors > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                        <Layers size={14} color="var(--primary)" /> {property.floors} {t('properties.floors')}
                      </div>
                    )}
                  </div>
                )}

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
                    {property.units} {t('properties.units')}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => handleEdit(property)}
                      style={{ background: 'white', border: '1px solid #e2e8f0', color: 'var(--text-muted)', padding: '0.5rem', borderRadius: '10px' }}
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => {
                        if(window.confirm('Are you sure you want to delete this property?')) {
                          deleteProperty(property.id);
                        }
                      }}
                      style={{ background: 'white', border: '1px solid #fee2e2', color: 'var(--danger)', padding: '0.5rem', borderRadius: '10px' }}
                    >
                      <Trash2 size={18} />
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
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t('common.no_data')}</h3>
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
        onClose={closeWizard} 
        initialData={editingProperty}
      />
    </motion.div>
  );
};

export default Properties;

