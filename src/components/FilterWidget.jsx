import React from 'react';
import { Search } from 'lucide-react';

export default function FilterWidget() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

      {/* Tabs + Search — no white background, sits inside parent glass card */}
      <div>
        <div className="tab-container" style={{ marginBottom: '0.8rem', justifyContent: 'center' }}>
          <span className="tab active">Buy</span>
          <span className="tab">Rent</span>
          <span className="tab">Off-Plan</span>
        </div>
        
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.35)' }}>
          <div style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search Community or Building" 
            style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.9rem', color: 'var(--text-dark)' }}
          />
          <button style={{ background: 'var(--text-dark)', color: '#fff', border: 'none', padding: '0 1.5rem', cursor: 'pointer', borderRadius: '0 10px 10px 0' }}>
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Stats Row — borderless, transparent */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>8.4%</h3>
          <p style={{ fontSize: '0.68rem', color: '#444', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.2rem', fontWeight: 600 }}>Average Yield</p>
        </div>
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' }} />
        <div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>12</h3>
          <p style={{ fontSize: '0.68rem', color: '#444', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.2rem', fontWeight: 600 }}>Premium Listings</p>
        </div>
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' }} />
        <div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>AED 4.2M</h3>
          <p style={{ fontSize: '0.68rem', color: '#444', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.2rem', fontWeight: 600 }}>Entry Ticket</p>
        </div>
      </div>

    </div>
  );
}
