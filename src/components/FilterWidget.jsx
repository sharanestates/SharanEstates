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

      {/* Tabs + Search — no white background, sits inside parent glass card */}
      <div>
        <div className="tab-container" style={{ marginBottom: '1.5rem', justifyContent: 'center', gap: '2.5rem' }}>
          {types.map((t) => (
            <span 
              key={t.key}
              onClick={() => handleTabClick(t.key)}
              style={{ 
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: activeType === t.key ? 'var(--text-dark)' : 'var(--text-muted)',
                textTransform: 'uppercase',
                paddingBottom: '0.4rem',
                borderBottom: activeType === t.key ? '2px solid var(--text-dark)' : '2px solid transparent',
                letterSpacing: '0.5px'
              }}
            >
              {t.label}
            </span>
          ))}
        </div>
        
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.7)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', height: '56px' }}>
          <div style={{ padding: '0 1.2rem', color: '#666', display: 'flex', alignItems: 'center' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search Community or Building" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '1rem', color: 'var(--text-dark)', fontWeight: 500 }}
          />
          <button 
            onClick={handleSearch}
            style={{ background: 'var(--primary-color)', color: 'var(--text-dark)', border: 'none', width: '80px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s ease' }} 
            onMouseOver={e => e.currentTarget.style.background = '#CBB285'} 
            onMouseOut={e => e.currentTarget.style.background = 'var(--primary-color)'}
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Stats Row — borderless, transparent */}
      {/* Stats Row — responsive */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', paddingTop: '1.5rem', marginTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ flex: 1, padding: '0.5rem 0' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0, fontFamily: 'var(--font-sans)' }}>8.4%</h3>
          <p style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.3rem', fontWeight: 600 }}>Average Yield</p>
        </div>
        <div style={{ width: '1px', height: '40px', background: 'rgba(0,0,0,0.15)' }} />
        <div style={{ flex: 1, padding: '0.5rem 0' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0, fontFamily: 'var(--font-sans)' }}>12</h3>
          <p style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.3rem', fontWeight: 600 }}>Premium Listings</p>
        </div>
        <div style={{ width: '1px', height: '40px', background: 'rgba(0,0,0,0.15)' }} />
        <div style={{ flex: 1, padding: '0.5rem 0' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0, fontFamily: 'var(--font-sans)' }}>AED 4.2M</h3>
          <p style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.3rem', fontWeight: 600 }}>Entry Ticket</p>
        </div>
      </div>

    </div>
  );
}
