import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import FilterWidget from '../components/FilterWidget';
import InvestmentAnalytics from '../components/InvestmentAnalytics';
import Properties from '../components/Properties';
import ConsultationSection from '../components/ConsultationSection';

const bgImages = [
  '/light_exterior.webp',
  '/luxury_flats.webp',
  '/listing_villa.webp',
  '/interior.webp',
  '/interior_lounge.webp'
];

export default function Home() {
  const [propertyValue, setPropertyValue] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [tenure, setTenure] = useState(20);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bgImages.length);
    }, 3000); // 3 seconds interval
    return () => clearInterval(timer);
  }, []);

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
        
        {/* Background Layer (Slideshow) */}
        <div className="hero-overlay"></div>
        <div className="grid-bg"></div>
        <div className="cinematic-bg-container">
          <div className="parallax-wrapper">
            {bgImages.map((img, idx) => (
              <div 
                key={img} 
                className={`cinematic-slide ${idx === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${img})`, opacity: idx === currentSlide ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
        
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 1, padding: '0 2rem', gap: '2rem' }}>
          
          {/* Headline — floating, no card */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--text-dark)', fontSize: '0.85rem', letterSpacing: '4px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>
              Proptech Workspace
            </p>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'var(--text-dark)', lineHeight: 1.05, fontWeight: 600, fontFamily: 'var(--font-serif)', textShadow: '0 2px 16px rgba(255,255,255,0.7)' }}>
              Luxury Investment
            </h1>
          </div>

          <div className="p-mobile hero-card-mobile" style={{
            maxWidth: '780px', width: '100%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '24px',
            padding: '2.5rem 3.5rem',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}>

            {/* Description */}
            <p className="hide-on-mobile" style={{ fontSize: '0.9rem', color: '#111', lineHeight: 1.6, textAlign: 'center', maxWidth: '650px', fontWeight: 600, margin: 0 }}>
              Welcome to the Sharan Estates portal. Filter units by interactive 3D floor highlights and select properties for comparative checkout.
            </p>

            {/* Search & Tabs */}
            <div style={{ width: '100%' }}>
              <FilterWidget />
            </div>

          </div>

        </div>
      </section>

      {/* About Us Teaser Section */}
      <section className="section" style={{ background: 'var(--primary-light)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
            The Standard of Excellence
          </p>
          <h2 style={{ fontSize: '3rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginBottom: '2.5rem' }}>
            Redefining Luxury Real Estate
          </h2>
          <Link to="/about" className="btn-classic" style={{ 
            background: 'transparent', 
            color: 'var(--text-dark)', 
            border: '2px solid var(--text-dark)',
            padding: '1rem 2.5rem',
            borderRadius: '0',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            display: 'inline-block',
            position: 'relative'
          }}
            onMouseOver={(e) => { e.target.style.background = 'var(--text-dark)'; e.target.style.color = '#FFF'; }}
            onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-dark)'; }}
          >Discover Our Story</Link>
        </div>
      </section>

      {/* Featured Properties Portfolio */}
      <Properties />

      {/* Interactive Cost Calculator & 3D Building Scanner Section */}
      <section id="calculator" className="section advisory-section" style={{ background: 'var(--bg-lighter)', padding: '6rem 0' }}>
        <div className="container">
          <div className="advisory-heading-container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>Advisory Tools</h2>
            <p className="hide-on-mobile" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
              Plan your next luxury investment using our mortgage cost estimator and explore unit levels dynamically with the 3D Building Scanner.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', alignItems: 'stretch', maxWidth: '1050px', margin: '0 auto' }}>
            
            {/* Left side: Investment Estimator Mortgage Calculator */}
            <div style={{ flex: '1 1 500px', display: 'flex' }}>
              <div style={{ width: '100%', display: 'flex' }}>
                <div className="classic-property-card" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '4px' }}>
                  
                  <div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>Investment Estimator</h3>
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
                  <div className="emi-card-mobile" style={{ background: 'var(--text-dark)', color: '#FFF', borderRadius: '4px', padding: '1.8rem', textAlign: 'center' }}>
                    <h3 className="emi-title-mobile" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Estimated Monthly Cost</h3>
                    <div className="emi-value-mobile" style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                      ${Math.round(emi).toLocaleString()}
                    </div>
                    <p className="emi-desc-mobile" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0 }}>
                      Principal Loan: ${(propertyValue - downPayment > 0 ? propertyValue - downPayment : 0).toLocaleString()}
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Right side: Investment Analytics Card */}
            <div className="hide-on-mobile" style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
              <div style={{ width: '100%', display: 'flex' }}>
                <InvestmentAnalytics />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bespoke Advisory Consultation Section */}
      <ConsultationSection />

    </div>
  );
}
