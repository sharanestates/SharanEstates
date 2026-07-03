import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import FilterWidget from '../components/FilterWidget';
import ScannerCard from '../components/ScannerCard';
import Properties from '../components/Properties';

export default function Home() {
  const [propertyValue, setPropertyValue] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [tenure, setTenure] = useState(20);

  const principal = Math.max(0, propertyValue - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const months = tenure * 12;
  const emi = principal > 0 && monthlyRate > 0 
    ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1) 
    : 0;

  return (
    <div>
      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem', paddingBottom: '4rem' }}>
        
        {/* Background Layer */}
        <div className="hero-overlay"></div>
        <div className="grid-bg"></div>
        {/* Enhanced background: no blur and higher opacity for a stunning look */}
        <img src="/light_exterior.png" alt="Background" className="hero-bg" style={{ filter: 'none', opacity: 0.85 }} />
        
        <div className="container" style={{ display: 'flex', justifyContent: 'center', width: '100%', zIndex: 1, padding: '0 1.5rem' }}>
          
          {/* Centered Content — fully transparent, no card */}
          <div style={{ maxWidth: '820px', width: '100%', padding: '2rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            
            <p style={{ color: 'var(--primary-dark)', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', textShadow: '0 1px 8px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.6)' }}>
              Proptech Workspace
            </p>
            
            <h1 style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', color: 'var(--text-dark)', lineHeight: 1.1, fontWeight: 600, fontFamily: 'serif', marginBottom: '1.2rem', textShadow: '0 2px 12px rgba(255,255,255,0.8), 0 4px 24px rgba(255,255,255,0.5)' }}>
              Luxury Investment <br />
              <span style={{ color: 'var(--primary-color)', textShadow: '0 2px 12px rgba(255,255,255,0.7)' }}>Advisory Portal</span>
            </h1>
            
            <p style={{ fontSize: '1rem', color: '#3a3a3a', lineHeight: 1.7, maxWidth: '580px', marginBottom: '1.5rem', fontWeight: 500, textShadow: '0 1px 8px rgba(255,255,255,0.9), 0 0 16px rgba(255,255,255,0.7)' }}>
              Welcome to the Sharan Estates portal. Filter units by interactive 3D floor highlights, simulate rental yields, and select properties for comparative checkout.
            </p>
            
            <FilterWidget />
            
          </div>

        </div>
      </section>

      {/* About Us Teaser Section */}
      <section className="section" style={{ background: 'var(--bg-light)', padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
            The Standard of Excellence
          </p>
          <h2 style={{ fontSize: '3rem', color: 'var(--text-dark)', fontFamily: 'serif', marginBottom: '2rem' }}>
            Redefining Luxury Real Estate
          </h2>
          <Link to="/about" className="btn-solid" style={{ background: 'var(--text-dark)', color: '#FFF' }}>Discover Our Story</Link>
        </div>
      </section>

      {/* Featured Properties Portfolio */}
      <Properties />

      {/* Interactive Cost Calculator & 3D Building Scanner Section */}
      <section id="calculator" className="section" style={{ background: 'var(--bg-lighter)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-dark)', fontFamily: 'serif', marginBottom: '1rem' }}>Advisory Tools</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
              Plan your next luxury investment using our mortgage cost estimator and explore unit levels dynamically with the 3D Building Scanner.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', alignItems: 'stretch', maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Left side: Investment Estimator Mortgage Calculator */}
            <div style={{ flex: '1 1 500px', display: 'flex' }}>
              <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} perspective={2000} scale={1.01} style={{ width: '100%', display: 'flex' }}>
                <div className="glossy-glass card-3d" style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.8)' }}>
                  
                  <div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', fontFamily: 'serif', marginBottom: '0.5rem' }}>Investment Estimator</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>Calculate estimated monthly mortgage values dynamically based on property price.</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', marginBottom: '2rem' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Property Value ($)</label>
                          <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>${propertyValue.toLocaleString()}</span>
                        </div>
                        <input type="range" min="100000" max="5000000" step="50000" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color)' }} />
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Down Payment ($)</label>
                          <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>${downPayment.toLocaleString()}</span>
                        </div>
                        <input type="range" min="0" max={propertyValue} step="10000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color)' }} />
                      </div>

                      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '140px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>Rate (%)</label>
                            <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold', fontSize: '0.9rem' }}>{interestRate}%</span>
                          </div>
                          <input type="range" min="1" max="10" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color)' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: '140px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>Tenure</label>
                            <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold', fontSize: '0.9rem' }}>{tenure} Yrs</span>
                          </div>
                          <input type="range" min="5" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color)' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calculated EMI Display */}
                  <div style={{ background: 'var(--text-dark)', color: '#FFF', borderRadius: '16px', padding: '1.8rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Estimated Monthly Cost</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                      ${Math.round(emi).toLocaleString()}
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                      Principal Loan: ${(propertyValue - downPayment > 0 ? propertyValue - downPayment : 0).toLocaleString()}
                    </p>
                  </div>

                </div>
              </Tilt>
            </div>

            {/* Right side: 3D Building Scanner Card */}
            <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
              <div style={{ width: '100%', display: 'flex' }}>
                <ScannerCard />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
