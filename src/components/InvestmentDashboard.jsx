import React from 'react';
import Tilt from 'react-parallax-tilt';
import { TrendingUp, ArrowUpRight, DollarSign, Percent, ShieldCheck } from 'lucide-react';

export default function InvestmentDashboard({ propertyValue, downPayment, interestRate, tenure }) {
  // Financial Model Assumptions
  const annualRentalYieldRate = 0.082; // 8.2% gross rental yield
  const annualAppreciationRate = 0.065; // 6.5% annual capital appreciation

  // Calculations
  const loanAmount = Math.max(0, propertyValue - downPayment);
  
  // Monthly EMI Calculation
  const monthlyInterestRate = interestRate / 12 / 100;
  const numberOfPayments = tenure * 12;
  let emi = 0;
  if (loanAmount > 0) {
    if (monthlyInterestRate > 0) {
      emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    } else {
      emi = loanAmount / numberOfPayments;
    }
  }

  // Rent Calculations
  const annualRent = propertyValue * annualRentalYieldRate;
  const monthlyRent = annualRent / 12;

  // 5-Year Appreciation Calculation
  const futureValue = propertyValue * Math.pow(1 + annualAppreciationRate, 5);
  const totalAppreciation = futureValue - propertyValue;

  // Monthly Cash Flow (Rent - EMI)
  const monthlyCashFlow = monthlyRent - emi;

  // 5-Year Cumulative ROI
  // Returns = Cumulative Rent (5 Years) + Appreciation (5 Years) - Interest Paid (5 Years)
  // Let's estimate interest paid as approx: 5 years of EMI payments minus principal reduction
  const approximateFiveYearEMI = emi * 12 * 5;
  // Simple amortization estimate
  const estimatedFiveYearInterestPaid = Math.min(approximateFiveYearEMI, loanAmount * interestRate * 0.05 * 5); 
  const totalReturns = (annualRent * 5) + totalAppreciation - estimatedFiveYearInterestPaid;
  const roiPercentage = downPayment > 0 ? (totalReturns / downPayment) * 100 : 0;

  // Generate SVG Chart Data Points (5-Year Projections)
  const chartPoints = [];
  const chartHeight = 120;
  const chartWidth = 360;
  
  for (let year = 0; year <= 5; year++) {
    const yearVal = propertyValue * Math.pow(1 + annualAppreciationRate, year);
    // Loan balance amortized roughly
    const paidRatio = year / tenure;
    const remainingLoan = Math.max(0, loanAmount * (1 - Math.pow(paidRatio, 2))); // Non-linear amortization approximation
    const equityVal = yearVal - remainingLoan;
    
    chartPoints.push({
      year,
      propertyValue: yearVal,
      loanBalance: remainingLoan,
      equity: equityVal
    });
  }

  // Map data to SVG coordinates
  const maxVal = chartPoints[5].propertyValue * 1.1; // 10% headroom
  const getX = (index) => (index / 5) * chartWidth;
  const getY = (val) => chartHeight - (val / maxVal) * chartHeight;

  // Generate SVG Path definitions
  const propPath = chartPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.propertyValue)}`).join(' ');
  const loanPath = chartPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.loanBalance)}`).join(' ');
  const equityAreaPath = [
    `M 0 ${getY(chartPoints[0].propertyValue)}`,
    ...chartPoints.map((p, i) => `L ${getX(i)} ${getY(p.propertyValue)}`),
    ...[...chartPoints].reverse().map((p, i) => `L ${getX(5 - i)} ${getY(p.loanBalance)}`),
    'Z'
  ].join(' ');

  return (
    <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1500} scale={1.01} transitionSpeed={1000} style={{ width: '100%' }}>
      <div className="glass-panel card-3d" style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2.5rem',
        background: 'rgba(20, 20, 22, 0.95)',
        border: '1px solid rgba(211, 185, 138, 0.25)',
        boxShadow: '0 30px 70px rgba(0,0,0,0.15)',
        borderRadius: '28px',
        color: '#FFFFFF'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.5px' }}>
            <TrendingUp size={22} color="var(--primary-color)" />
            Investment Analytics
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>Real-time Forecast</div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          
          {/* Box 1: Annual Rental Yield */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '1rem', top: '1rem', color: 'var(--primary-color)', opacity: 0.15 }}>
              <Percent size={32} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>Rental Income (Est.)</span>
            <h4 style={{ fontSize: '1.5rem', color: 'var(--primary-color)', margin: '0.4rem 0 0.2rem', fontFamily: 'var(--font-serif)' }}>
              ${Math.round(monthlyRent).toLocaleString()}<span style={{ fontSize: '0.9rem', color: '#FFF', opacity: 0.7 }}>/mo</span>
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'green', fontWeight: 600 }}>
              Yield: {(annualRentalYieldRate * 100).toFixed(1)}% Gross
            </span>
          </div>

          {/* Box 2: 5-Year Capital Appreciation */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '1rem', top: '1rem', color: 'var(--primary-color)', opacity: 0.15 }}>
              <ArrowUpRight size={32} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>5-Yr Capital Growth</span>
            <h4 style={{ fontSize: '1.5rem', color: '#FFF', margin: '0.4rem 0 0.2rem', fontFamily: 'var(--font-serif)' }}>
              +${Math.round(totalAppreciation).toLocaleString()}
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: 600 }}>
              Appreciation: {(annualAppreciationRate * 100).toFixed(1)}%/yr
            </span>
          </div>

          {/* Box 3: Monthly Net Cash Flow */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '1rem', top: '1rem', color: 'var(--primary-color)', opacity: 0.15 }}>
              <DollarSign size={32} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>Net Monthly Cashflow</span>
            <h4 style={{ 
              fontSize: '1.5rem', 
              color: monthlyCashFlow >= 0 ? '#4ADE80' : '#F87171', 
              margin: '0.4rem 0 0.2rem', 
              fontFamily: 'var(--font-serif)' 
            }}>
              {monthlyCashFlow >= 0 ? '+' : '-'}${Math.abs(Math.round(monthlyCashFlow)).toLocaleString()}
            </h4>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>
              Rent vs Financing cost
            </span>
          </div>

          {/* Box 4: Projected Return on Equity */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '1rem', top: '1rem', color: 'var(--primary-color)', opacity: 0.15 }}>
              <ShieldCheck size={32} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>Projected 5-Yr ROI</span>
            <h4 style={{ fontSize: '1.5rem', color: 'var(--primary-color)', margin: '0.4rem 0 0.2rem', fontFamily: 'var(--font-serif)' }}>
              {roiPercentage.toFixed(1)}%
            </h4>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>
              Leveraging Down Payment
            </span>
          </div>

        </div>

        {/* 5-Year Wealth Growth Chart */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>5-Yr Wealth Projection</span>
            <span style={{ display: 'flex', gap: '10px', fontSize: '0.65rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--primary-color)', borderRadius: '50%' }}></span> Equity
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: '#F87171', borderRadius: '50%' }}></span> Loan Debt
              </span>
            </span>
          </div>

          {/* SVG Chart */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
              {/* Grid Lines */}
              <line x1="0" y1="0" x2={chartWidth} y2="0" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
              <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
              <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="rgba(255,255,255,0.08)" />

              {/* Year Labels X-Axis */}
              {chartPoints.map((p, i) => (
                <text key={i} x={getX(i)} y={chartHeight + 16} fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle">
                  Yr {p.year}
                </text>
              ))}

              {/* Equity Growth Area */}
              <path d={equityAreaPath} fill="rgba(211, 185, 138, 0.15)" />

              {/* Lines */}
              <path d={propPath} fill="none" stroke="var(--primary-color)" strokeWidth="2.5" />
              <path d={loanPath} fill="none" stroke="#F87171" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Data points */}
              {chartPoints.map((p, i) => (
                <g key={i}>
                  <circle cx={getX(i)} cy={getY(p.propertyValue)} r="3.5" fill="var(--primary-color)" stroke="#141416" strokeWidth="1.5" />
                  <circle cx={getX(i)} cy={getY(p.loanBalance)} r="2.5" fill="#F87171" stroke="#141416" strokeWidth="1" />
                </g>
              ))}
            </svg>
          </div>
        </div>

      </div>
    </Tilt>
  );
}
