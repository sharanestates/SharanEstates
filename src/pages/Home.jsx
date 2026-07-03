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
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '6rem' }}>
        
        {/* Background Layer */}
        <div className="hero-overlay"></div>
        <div className="grid-bg"></div>
        <img src="/light_exterior.png" alt="Background" className="hero-bg" style={{ filter: 'blur(3px) opacity(0.3)' }} />
        
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem', width: '100%', zIndex: 1, padding: '0 3.5rem' }}>
          
          {/* Left Content */}
          <div style={{ flex: '1 1 400px' }}>
            <p style={{ color: 'var(--primary-dark)', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1rem' }}>
              Proptech Workspace
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: 'var(--text-dark)', lineHeight: 1.1, fontWeight: 400, fontFamily: 'serif' }}>
              Luxury Investment <br />
              <span style={{ color: 'var(--primary-color)' }}>Advisory Portal</span>
            </h1>
            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '450px' }}>
              Welcome to the Sharan Estates portal. Filter units by interactive 3D floor highlights, simulate rental yields, and select properties for comparative checkout.
            </p>
            
            <FilterWidget />
          </div>

          {/* Right Content */}
          <div style={{ flex: '1 1 600px', display: 'flex', justifyContent: 'center' }}>
            <ScannerCard />
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

      {/* Interactive Cost Calculator */}
      <section id="calculator" className="section" style={{ background: 'var(--bg-lighter)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-dark)', fontFamily: 'serif', marginBottom: '1rem' }}>Investment Estimator</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Plan your next luxury investment. Calculate your estimated monthly mortgage to seamlessly book your dream property online.
            </p>
          </div>

          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} perspective={2000} scale={1.01} transitionSpeed={1000} glareEnable={true} glareMaxOpacity={0.1} glareColor="#D3B98A" glarePosition="all" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="glossy-glass card-3d" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', padding: '3rem' }}>

            
            {/* Controls */}
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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

              <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Interest Rate (%)</label>
                    <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>{interestRate}%</span>
                  </div>
                  <input type="range" min="1" max="10" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Tenure (Years)</label>
                    <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>{tenure} Yrs</span>
                  </div>
                  <input type="range" min="5" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color)' }} />
                </div>
              </div>
            </div>

            {/* Results */}
            <div style={{ flex: '1 1 300px', background: 'var(--text-dark)', color: '#FFF', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Estimated Monthly Cost</h3>
              <div style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '1rem' }}>
                ${Math.round(emi).toLocaleString()}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>
                Principal Loan: ${(propertyValue - downPayment > 0 ? propertyValue - downPayment : 0).toLocaleString()}
              </p>
              <button className="btn-solid" style={{ background: 'var(--primary-color)', color: 'var(--text-dark)', width: '100%', padding: '1rem' }}>
                Browse Eligible Properties
              </button>
            </div>

          </div>
          </Tilt>
        </div>
      </section>

    </div>
  );
}
