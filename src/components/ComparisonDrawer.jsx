import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export default function ComparisonDrawer({ compareList, onToggleCompare }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (compareList.length === 0) return null;

  // Add custom yield values if not defined in schema
  const getYield = (prop) => {
    if (prop.title.includes('Villa')) return '7.4%';
    if (prop.title.includes('Residences')) return '8.2%';
    if (prop.title.includes('Penthouse')) return '9.1%';
    return '8.0%';
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1050, fontFamily: 'inherit' }}>
      <AnimatePresence>
        {!isExpanded ? (
          /* Collapsed Pill Button */
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setIsExpanded(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0.9rem 1.6rem',
              background: 'var(--text-dark)',
              color: '#FFF',
              border: '1px solid rgba(211,185,138,0.3)',
              borderRadius: '30px',
              cursor: 'pointer',
              boxShadow: '0 15px 35px rgba(0,0,0,0.18)',
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            <GitCompare size={16} color="var(--primary-color)" />
            <span>Compare ({compareList.length}/3)</span>
            <ChevronUp size={16} />
          </motion.button>
        ) : (
          /* Expanded Comparison Workspace Panel */
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            className="compare-drawer-content"
            style={{
              width: 'min(90vw, 840px)',
              background: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(211, 185, 138, 0.25)',
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 1.8rem', borderBottom: '1px solid var(--border-color)', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(211,185,138,0.1)', padding: '6px', borderRadius: '8px' }}>
                  <GitCompare size={20} color="var(--primary-dark)" />
                </div>
                <div>
                  <strong style={{ fontSize: '1rem', color: 'var(--text-dark)' }}>Property Comparison</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 500 }}>Select up to 3 listings to compare investment value</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  onClick={() => setIsExpanded(false)} 
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', color: 'var(--text-muted)' }}
                  title="Collapse Workspace"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="compare-grid-container" style={{ overflowX: 'auto', padding: '1.5rem 1.8rem' }}>
              <div className="compare-grid" style={{ display: 'grid', gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)`, gap: '1.5rem', minWidth: '600px' }}>
                
                {/* Labels Column */}
                <div className="compare-labels" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', paddingTop: '110px' }}>
                  <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '0.8rem' }}>Price</div>
                  <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '0.8rem' }}>Est. ROI Yield</div>
                  <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '0.8rem' }}>Location</div>
                  <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '0.8rem' }}>Specifications</div>
                  <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '0.8rem' }}>Status</div>
                  <div style={{ height: '35px' }}>Action</div>
                </div>

                {/* Property Columns */}
                {compareList.map((prop) => (
                  <div key={prop.id} className="compare-item" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                    
                    {/* Remove button */}
                    <button 
                      onClick={() => onToggleCompare(prop)}
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.95)',
                        border: '1px solid #EAEAEA',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'red',
                        zIndex: 10,
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}
                      title="Remove from comparison"
                    >
                      <X size={12} />
                    </button>

                    {/* Image & Title Card */}
                    <div style={{ height: '100px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <img src={prop.image} alt={prop.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border-color)' }} />
                      <div style={{ overflow: 'hidden' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--primary-dark)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{prop.category}</span>
                        <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prop.title}</strong>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.95rem' }}>
                      <span className="mobile-label">Price</span>
                      {prop.price}
                    </div>

                    {/* Yield */}
                    <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '0.8rem', fontWeight: 700, color: 'green', fontSize: '0.95rem' }}>
                      <span className="mobile-label">Est. ROI Yield</span>
                      {getYield(prop)}
                    </div>

                    {/* Location */}
                    <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '0.8rem', color: 'var(--text-dark)', fontSize: '0.85rem', fontWeight: 500 }}>
                      <span className="mobile-label">Location</span>
                      {prop.location || 'Prime District'}
                    </div>

                    {/* Specs */}
                    <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '0.8rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500 }}>
                      <span className="mobile-label">Specifications</span>
                      {prop.beds} Beds | {prop.baths} Baths {prop.size ? ` | ${prop.size}` : ''}
                    </div>

                    {/* Status */}
                    <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '0.8rem', fontSize: '0.8rem' }}>
                      <span className="mobile-label">Status</span>
                      <span style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        background: prop.status === 'Available' ? '#d1fae5' : '#f3f4f6',
                        color: prop.status === 'Available' ? '#065f46' : '#374151'
                      }}>
                        {prop.status}
                      </span>
                    </div>

                    {/* View Details Link */}
                    <Link 
                      to={`/property/${prop.id}`}
                      className="btn-solid" 
                      style={{ 
                        padding: '0.5rem 1rem', 
                        fontSize: '0.8rem', 
                        borderRadius: '8px', 
                        textAlign: 'center', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '6px',
                        background: 'var(--text-dark)',
                        color: '#FFF'
                      }}
                    >
                      <span>VIEW INFO</span>
                      <ArrowRight size={12} />
                    </Link>

                  </div>
                ))}

              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
