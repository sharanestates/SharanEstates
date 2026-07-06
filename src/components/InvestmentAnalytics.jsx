import React from 'react';
import { TrendingUp, Activity, DollarSign, ShieldCheck } from 'lucide-react';

export default function InvestmentAnalytics() {
  return (
    <div className="card-3d" style={{
      background: '#3A3A3A',
      border: 'none',
      borderRadius: '20px',
      padding: '2rem',
      color: '#FFF',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 20px 50px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.05)'
    }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <TrendingUp size={24} color="var(--primary-color)" />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>Investment Analytics</h3>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
          Real-Time Forecast
        </span>
      </div>

      {/* Grid Stats */}
      <div className="grid-1-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Card 1 */}
        <div style={{ background: '#2B2B2B', borderRadius: '16px', padding: '1.25rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#AAA', fontWeight: 600, letterSpacing: '1px', lineHeight: 1.4, maxWidth: '80%' }}>RENTAL INCOME (EST.)</span>
            <span style={{ color: '#555' }}>%</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            $19,133<span style={{ fontSize: '1rem', color: '#888', fontWeight: 500 }}>/mo</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#4CAF50', fontWeight: 500 }}>Yield: 8.2% Gross</div>
        </div>

        {/* Card 2 */}
        <div style={{ background: '#2B2B2B', borderRadius: '16px', padding: '1.25rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#AAA', fontWeight: 600, letterSpacing: '1px', lineHeight: 1.4, maxWidth: '80%' }}>5-YR CAPITAL GROWTH</span>
            <TrendingUp size={16} color="#555" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            +$1,036,243
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 500 }}>Appreciation: 6.5%/yr</div>
        </div>

        {/* Card 3 */}
        <div style={{ background: '#2B2B2B', borderRadius: '16px', padding: '1.25rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#AAA', fontWeight: 600, letterSpacing: '1px', lineHeight: 1.4, maxWidth: '80%' }}>NET MONTHLY CASHFLOW</span>
            <DollarSign size={16} color="#555" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4CAF50' }}>
            +$5,245
          </div>
          <div style={{ fontSize: '0.85rem', color: '#888', fontWeight: 500 }}>Rent vs Financing cost</div>
        </div>

        {/* Card 4 */}
        <div style={{ background: '#2B2B2B', borderRadius: '16px', padding: '1.25rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#AAA', fontWeight: 600, letterSpacing: '1px', lineHeight: 1.4, maxWidth: '80%' }}>PROJECTED 5-YR ROI</span>
            <ShieldCheck size={16} color="#555" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-color)' }}>
            540.4%
          </div>
          <div style={{ fontSize: '0.85rem', color: '#888', fontWeight: 500 }}>Leveraging Down Payment</div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="hide-on-mobile" style={{ marginTop: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#AAA', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>5-Yr Wealth Projection</span>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#CCC' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-color)' }}></div> Equity
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF5252' }}></div> Loan Debt
            </div>
          </div>
        </div>
        
        {/* Simple SVG Line Chart */}
        <div style={{ width: '100%', height: '120px', position: 'relative' }}>
          <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Grid lines */}
            <line x1="0" y1="20" x2="400" y2="20" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="50" x2="400" y2="50" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="80" x2="400" y2="80" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Debt Line (decreasing) */}
            <path d="M 0 60 L 80 62 L 160 65 L 240 68 L 320 72 L 400 76" fill="none" stroke="#FF5252" strokeWidth="2" strokeDasharray="5 5" />
            
            {/* Equity Line (increasing sharply) */}
            <path d="M 0 50 L 80 40 L 160 30 L 240 20 L 320 10 L 400 0" fill="none" stroke="var(--primary-color)" strokeWidth="3" />
            
            {/* Data points for Equity */}
            <circle cx="0" cy="50" r="4" fill="var(--primary-color)" />
            <circle cx="80" cy="40" r="4" fill="var(--primary-color)" />
            <circle cx="160" cy="30" r="4" fill="var(--primary-color)" />
            <circle cx="240" cy="20" r="4" fill="var(--primary-color)" />
            <circle cx="320" cy="10" r="4" fill="var(--primary-color)" />
            <circle cx="400" cy="0" r="4" fill="var(--primary-color)" />
            
            {/* Data points for Debt */}
            <circle cx="0" cy="60" r="3" fill="#FF5252" />
            <circle cx="80" cy="62" r="3" fill="#FF5252" />
            <circle cx="160" cy="65" r="3" fill="#FF5252" />
            <circle cx="240" cy="68" r="3" fill="#FF5252" />
            <circle cx="320" cy="72" r="3" fill="#FF5252" />
            <circle cx="400" cy="76" r="3" fill="#FF5252" />
          </svg>
          
          {/* X Axis Labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: '#666', fontSize: '0.7rem' }}>
            <span>Yr 0</span>
            <span>Yr 1</span>
            <span>Yr 2</span>
            <span>Yr 3</span>
            <span>Yr 4</span>
            <span>Yr 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
