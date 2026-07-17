import React from 'react';
import { TrendingUp, Activity, DollarSign, ShieldCheck } from 'lucide-react';

export default function InvestmentAnalytics({ propertyValue = 2500000, downPayment = 500000, interestRate = 4.5, tenure = 20, emi = 12641 }) {
  // 1. Rental Income Calculations
  const yieldRate = 7.5; // 7.5% gross yield
  const annualRent = propertyValue * (yieldRate / 100);
  const monthlyRent = annualRent / 12;

  // 2. Capital Growth Calculations (Appreciation: 6.2%/yr)
  const appreciationRate = 6.2;
  const futureValue = propertyValue * Math.pow(1 + appreciationRate / 100, 5);
  const capitalGrowth = futureValue - propertyValue;

  // 3. Net Monthly Cashflow
  const netCashflow = monthlyRent - emi;

  // 4. Projected 5-Yr ROI
  const initialEquity = Math.max(10000, downPayment);
  const totalRentReceived = monthlyRent * 12 * 5;
  const totalMortgagePaid = emi * 12 * 5;
  const netProfit5Yr = totalRentReceived + capitalGrowth - totalMortgagePaid;
  const roi = (netProfit5Yr / initialEquity) * 100;

  // 5. Chart Coordinates calculation
  const maxWealth = futureValue; // Scaled to maximum property value at Yr 5
  
  const getPoints = () => {
    let equityPoints = [];
    let debtPoints = [];
    
    for (let t = 0; t <= 5; t++) {
      const x = t * 80;
      const valAtT = propertyValue * Math.pow(1 + appreciationRate / 100, t);
      const debtAtT = Math.max(0, (propertyValue - downPayment) * (1 - t / tenure));
      const equityAtT = valAtT - debtAtT;
      
      const yEquity = 100 - (equityAtT / maxWealth) * 85;
      const yDebt = 100 - (debtAtT / maxWealth) * 85;
      
      equityPoints.push({ x, y: yEquity });
      debtPoints.push({ x, y: yDebt });
    }
    
    return { equityPoints, debtPoints };
  };

  const { equityPoints, debtPoints } = getPoints();
  
  const equityPath = equityPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const debtPath = debtPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <TrendingUp size={24} color="var(--primary-color)" />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>Investment Analytics</h3>
        </div>
        <span style={{ 
          fontSize: '0.58rem', 
          color: 'rgba(255, 255, 255, 0.4)', 
          letterSpacing: '1.5px', 
          textTransform: 'uppercase', 
          fontWeight: 600,
          background: 'rgba(255, 255, 255, 0.06)',
          padding: '0.2rem 0.6rem',
          borderRadius: '10px'
        }}>
          Real-Time Forecast
        </span>
      </div>

      {/* Grid Stats */}
      <div className="grid-1-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Card 1: Rental Income */}
        <div style={{ background: '#2B2B2B', borderRadius: '16px', padding: '1.25rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#AAA', fontWeight: 600, letterSpacing: '1px', lineHeight: 1.4, maxWidth: '80%' }}>RENTAL INCOME (EST.)</span>
            <span style={{ color: '#555' }}>%</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem', color: '#FFFFFF' }}>
            AED {Math.round(monthlyRent).toLocaleString()}<span style={{ fontSize: '0.9rem', color: '#888', fontWeight: 500 }}>/mo</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#4CAF50', fontWeight: 500 }}>Yield: {yieldRate}% Gross</div>
        </div>

        {/* Card 2: 5-Yr Capital Growth */}
        <div style={{ background: '#2B2B2B', borderRadius: '16px', padding: '1.25rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#AAA', fontWeight: 600, letterSpacing: '1px', lineHeight: 1.4, maxWidth: '80%' }}>5-YR CAPITAL GROWTH</span>
            <TrendingUp size={16} color="#555" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem', color: '#FFFFFF' }}>
            +AED {Math.round(capitalGrowth).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#4CAF50', fontWeight: 500 }}>Appreciation: {appreciationRate}%/yr</div>
        </div>

        {/* Card 3: Net Cashflow */}
        <div style={{ background: '#2B2B2B', borderRadius: '16px', padding: '1.25rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#AAA', fontWeight: 600, letterSpacing: '1px', lineHeight: 1.4, maxWidth: '80%' }}>NET MONTHLY CASHFLOW</span>
            <DollarSign size={16} color="#555" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem', color: '#FFFFFF' }}>
            {netCashflow >= 0 ? '+' : ''}AED {Math.round(netCashflow).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#4CAF50', fontWeight: 500 }}>Rent vs Financing cost</div>
        </div>

        {/* Card 4: Projected 5-Yr ROI */}
        <div style={{ background: '#2B2B2B', borderRadius: '16px', padding: '1.25rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#AAA', fontWeight: 600, letterSpacing: '1px', lineHeight: 1.4, maxWidth: '80%' }}>PROJECTED 5-YR ROI</span>
            <ShieldCheck size={16} color="#555" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem', color: '#FFFFFF' }}>
            {roi.toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.85rem', color: '#4CAF50', fontWeight: 500 }}>Leveraging Down Payment</div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="hide-on-mobile" style={{ marginTop: 'auto' }}>
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
            <path d={debtPath} fill="none" stroke="#FF5252" strokeWidth="2" strokeDasharray="5 5" style={{ transition: 'd 0.3s ease' }} />
            
            {/* Equity Line (increasing sharply) */}
            <path d={equityPath} fill="none" stroke="var(--primary-color)" strokeWidth="3" style={{ transition: 'd 0.3s ease' }} />
            
            {/* Data points for Equity */}
            {equityPoints.map((p, i) => (
              <circle key={`eq-${i}`} cx={p.x} cy={p.y} r="4" fill="var(--primary-color)" style={{ transition: 'cy 0.3s ease' }} />
            ))}
            
            {/* Data points for Debt */}
            {debtPoints.map((p, i) => (
              <circle key={`db-${i}`} cx={p.x} cy={p.y} r="3" fill="#FF5252" style={{ transition: 'cy 0.3s ease' }} />
            ))}
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
