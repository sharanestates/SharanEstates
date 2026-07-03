import React from 'react';
import { Search } from 'lucide-react';

export default function FilterWidget() {
  return (
    <div style={{ marginTop: '2rem', width: '100%' }}>
      
      {/* Search Box */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
        <div className="tab-container">
          <span className="tab active">Buy</span>
          <span className="tab">Rent</span>
          <span className="tab">Off-Plan</span>
        </div>
        
        <div style={{ display: 'flex', background: '#F5F5F5', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <div style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search Community or Building" 
            style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.9rem', color: 'var(--text-dark)' }}
          />
          <button style={{ background: 'var(--text-dark)', color: '#fff', border: 'none', padding: '0 1.5rem', cursor: 'pointer' }}>
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Stats Box */}
      <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', textAlign: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>8.4%</h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Average Yield</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>12</h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Premium Listings</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>AED 4.2M</h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Entry Ticket</p>
        </div>
      </div>

    </div>
  );
}
