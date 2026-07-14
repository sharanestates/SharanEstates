import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function FilterWidget() {
  const [activeType, setActiveType] = useState('buy');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const types = [
    { key: 'buy', label: 'Buy' },
    { key: 'rent', label: 'Rent' },
    { key: 'off-plan', label: 'Off-Plan' }
  ];

  const handleTabClick = (typeKey) => {
    setActiveType(typeKey);
  };

  const handleSearch = () => {
    const query = searchQuery.trim();
    // Navigate to listings page with the selected type and search query
    if (query) {
      navigate(`/listings/${activeType}/all?search=${encodeURIComponent(query)}`);
    } else {
      navigate(`/listings/${activeType}/all`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

      {/* Tabs + Search */}
      <div>
        <div className="tab-container" style={{ marginBottom: '1.25rem', justifyContent: 'center', gap: '2.5rem' }}>
          {types.map((t) => (
            <span 
              key={t.key}
              onClick={() => handleTabClick(t.key)}
              style={{ 
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: activeType === t.key ? 'var(--text-dark)' : 'var(--text-muted)',
                textTransform: 'uppercase',
                paddingBottom: '0.4rem',
                borderBottom: activeType === t.key ? '1px solid var(--text-dark)' : '1px solid transparent',
                letterSpacing: '1.5px',
                transition: 'all 0.3s ease'
              }}
            >
              {t.label}
            </span>
          ))}
        </div>
        
        <div style={{ 
          display: 'flex', 
          background: '#FFFFFF', 
          borderRadius: '3px', 
          overflow: 'hidden', 
          border: '1px solid rgba(211,185,138,0.3)', 
          height: '52px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
        }}>
          <input 
            type="text" 
            placeholder="Search by community or project..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ 
              border: 'none', 
              background: 'transparent', 
              width: '100%', 
              outline: 'none', 
              fontSize: '0.88rem', 
              color: 'var(--text-dark)', 
              fontWeight: 400,
              padding: '0 1.5rem',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.5px'
            }}
          />
          <button 
            onClick={handleSearch}
            style={{ 
              background: 'var(--text-dark)', 
              color: '#FFFFFF', 
              border: 'none', 
              padding: '0 2rem', 
              cursor: 'pointer', 
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-sans)'
            }} 
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-color)'; e.currentTarget.style.color = 'var(--text-dark)'; }} 
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--text-dark)'; e.currentTarget.style.color = '#FFFFFF'; }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Stats Row — brand credibility stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '0.5rem', 
        width: '100%',
        paddingTop: '1.5rem', 
        marginTop: '0.5rem', 
        borderTop: '1px solid rgba(0,0,0,0.08)' 
      }} className="grid-2-mobile">
        <div style={{ padding: '0.2rem 0', textAlign: 'center' }}>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 400, color: 'var(--text-dark)', margin: 0, fontFamily: 'var(--font-serif)', letterSpacing: '0.5px' }}>AED 300M+</h4>
          <p style={{ fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.3rem', fontWeight: 600 }}>In Sales Closed</p>
        </div>
        <div style={{ padding: '0.2rem 0', textAlign: 'center', borderLeft: '1px solid rgba(211,185,138,0.2)' }} className="border-left-none-mobile">
          <h4 style={{ fontSize: '1.15rem', fontWeight: 400, color: 'var(--text-dark)', margin: 0, fontFamily: 'var(--font-serif)', letterSpacing: '0.5px' }}>Exclusive</h4>
          <p style={{ fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.3rem', fontWeight: 600 }}>Private Listings</p>
        </div>
        <div style={{ padding: '0.2rem 0', textAlign: 'center', borderLeft: '1px solid rgba(211,185,138,0.2)' }} className="border-left-none-mobile">
          <h4 style={{ fontSize: '1.15rem', fontWeight: 400, color: 'var(--text-dark)', margin: 0, fontFamily: 'var(--font-serif)', letterSpacing: '0.5px' }}>Dual-City</h4>
          <p style={{ fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.3rem', fontWeight: 600 }}>Dubai & Abu Dhabi</p>
        </div>
        <div style={{ padding: '0.2rem 0', textAlign: 'center', borderLeft: '1px solid rgba(211,185,138,0.2)' }} className="border-left-none-mobile">
          <h4 style={{ fontSize: '1.15rem', fontWeight: 400, color: 'var(--text-dark)', margin: 0, fontFamily: 'var(--font-serif)', letterSpacing: '0.5px' }}>Advisory</h4>
          <p style={{ fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.3rem', fontWeight: 600 }}>Private Strategy</p>
        </div>
      </div>

    </div>
  );
}
