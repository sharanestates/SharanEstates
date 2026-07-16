import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FilterWidget from '../components/FilterWidget';
import InvestmentAnalytics from '../components/InvestmentAnalytics';
import Properties from '../components/Properties';
import ConsultationSection from '../components/ConsultationSection';
import RevealSection from '../components/RevealSection';
import useRealTimeSync from '../components/useRealTimeSync';

const bgImages = [
  '/dubai_luxury_1.webp',
  '/dubai_luxury_2.webp',
  '/dubai_luxury_3.webp',
  '/dubai_luxury_4.webp',
  '/dubai_luxury_5.webp',
  '/dubai_luxury_6.webp',
  '/dubai_luxury_7.webp',
  '/dubai_luxury_8.webp',
  '/exclusive_villa.webp',
  '/luxury_facade.webp',
  '/luxury_community.webp',
  '/luxury_villa_garden.webp'
];

export default function Home() {
  const [propertyValue, setPropertyValue] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [tenure, setTenure] = useState(20);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bgImages.length);
    }, 6500); // 6.5 seconds interval for slow cinematic feel
    return () => clearInterval(timer);
  }, []);

  const loadProperties = () => {
    const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';
    fetch(`${API_BASE}/properties?limit=100`)
      .then(res => res.json())
      .then(data => {
        const propsArray = data.data || (Array.isArray(data) ? data : []);
        setProperties(propsArray);
      })
      .catch(err => console.error("Failed to fetch properties:", err));
  };

  useEffect(() => {
    loadProperties();
  }, []);

  useRealTimeSync((message) => {
    if (message.type === 'PROPERTY_CHANGE') {
      console.log('Real-time home properties update triggered');
      loadProperties();
    }
  });

  const slideshowRef = useRef(null);
  const heroCardRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (slideshowRef.current) {
        slideshowRef.current.style.transform = `translate3d(0, ${scrolled * 0.28}px, 0)`;
      }
      if (heroCardRef.current) {
        heroCardRef.current.style.transform = `translate3d(0, -${scrolled * 0.08}px, 0)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      <section className="hero-section-wrapper">
        
        {/* Full Viewport Background Slideshow (Whole Landing Page Screen) */}
        <div className="hero-slideshow-container" style={{ overflow: 'hidden' }}>
          <div className="hero-overlay"></div>
          <div className="cinematic-vignette"></div>
          <div ref={slideshowRef} style={{ position: 'absolute', inset: '-30px', width: 'calc(100% + 60px)', height: 'calc(100% + 60px)', willChange: 'transform' }}>
            {bgImages.map((img, idx) => (
              <div 
                key={img} 
                className={`cinematic-slide ${idx === currentSlide ? 'active' : ''} ${idx % 2 === 0 ? 'zoom-in' : 'zoom-out'}`}
                style={{ backgroundImage: `url(${img})`, opacity: idx === currentSlide ? 1 : 0 }}
              />
            ))}
          </div>
          {/* Mobile-only brand name overlay over the slideshow */}
          <div className="mobile-hero-brand-overlay">
            Sharan Estates
          </div>
        </div>

        {/* Content Container on Top of Slideshow */}
        <div className="hero-content-container">
          <div className="container" style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
            
            {/* Frosted Glass Content Card */}
            <div 
              ref={heroCardRef}
              className="hero-frosted-card reveal-animate"
            >
              <p className="hero-subtitle">
                Curated Dubai Portfolio
              </p>
              <h1 className="hero-title">
                Shaping Dubai's Finest Living
              </h1>
              <p className="hero-description">
                Welcome to Sharan Estates. We curate exceptional residential properties, waterfront estates, and private off-market penthouses for discerning global investors.
              </p>

              {/* Action CTA Buttons */}
              <div className="hero-cta-buttons">
                <Link to="/listings/off-plan" className="hero-cta-btn btn-solid">
                  Buy Off-Plan
                </Link>
                <Link to="/listings/ready" className="hero-cta-btn btn-outline">
                  Buy Ready Property
                </Link>
              </div>

              {/* Credibility Stats Block */}
              <div className="hero-stats-grid">
                <div>
                  <h4 className="hero-stat-value">AED 300M+</h4>
                  <p className="hero-stat-label">In Sales Closed</p>
                </div>
                <div>
                  <h4 className="hero-stat-value">Exclusive</h4>
                  <p className="hero-stat-label">Private Listings</p>
                </div>
                <div>
                  <h4 className="hero-stat-value">Dual-City</h4>
                  <p className="hero-stat-label">Dubai & Abu Dhabi</p>
                </div>
                <div>
                  <h4 className="hero-stat-value">Bespoke</h4>
                  <p className="hero-stat-label">Advisory Services</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* About Us Teaser Section */}
      <RevealSection>
        <section className="section" style={{ background: 'var(--primary-light)', padding: '4.5rem 0', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
          <div className="container" style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.5rem' }}>
              The Standard of Excellence
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginBottom: '2.5rem', letterSpacing: '1px', lineHeight: 1.3, fontWeight: 300 }}>
              "Architecture should speak of its time and place, but yearn for timelessness."
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.85, maxWidth: '680px', margin: '0 auto 3rem', fontWeight: 400 }}>
              Sharan Estates represents a bespoke approach to real estate advisory. We serve high-net-worth clients globally, providing unparalleled access to Dubai's most prestigious residences.
            </p>
            <Link to="/about" className="btn-classic" style={{ 
              background: 'transparent', 
              color: 'var(--text-dark)', 
              border: '1px solid var(--text-dark)',
              padding: '1.1rem 3.2rem',
              borderRadius: '0',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              display: 'inline-block'
            }}
              onMouseOver={(e) => { e.target.style.background = 'var(--text-dark)'; e.target.style.color = '#FFF'; }}
              onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-dark)'; }}
            >Discover Our Story</Link>
          </div>
        </section>
      </RevealSection>

      {/* Featured Properties Portfolio */}
      <Properties />

      {/* Curated Editorial Highlights (Starred Catalogs) */}
      {(() => {
        const starredProperties = properties.filter(p => p.starred);
        const displayProperties = starredProperties;

        return displayProperties.length > 0 && (
          <RevealSection>
            <section style={{ background: '#FFFFFF', padding: '4.5rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.25rem' }}>
                    Curated Highlights
                  </p>
                  <h2 style={{ fontSize: '2.6rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 300 }}>
                    Editorial Selections
                  </h2>
                  <div style={{ width: '40px', height: '1px', background: 'var(--text-dark)', margin: '1.5rem auto 0' }} />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center' }}>
                  {displayProperties.map((prop) => (
                    <div key={prop.id} style={{ flex: '1 1 320px', maxWidth: '380px', display: 'flex' }}>
                      <Link to={`/property/${prop.id}`} style={{ textDecoration: 'none', width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="classic-property-card" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <div style={{ height: '280px', background: `url(${prop.image}) center/cover`, position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0, 0, 0, 0.85)', color: '#FFFFFF', padding: '0.4rem 0.9rem', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              <span style={{ color: '#eab308' }}>★</span> Starred
                            </div>
                            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: '#FFFFFF', color: '#000000', padding: '0.35rem 0.75rem', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '2px' }}>
                              {prop.location}
                            </div>
                          </div>
                          <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ color: 'var(--text-dark)', fontSize: '1.35rem', marginBottom: '0.65rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.5px', fontWeight: 300 }}>{prop.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, flex: 1, fontSize: '0.88rem', marginBottom: '1.8rem' }}>{prop.description ? (prop.description.substring(0, 120) + '...') : ''}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.25rem' }}>
                              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                                🛏️ {prop.beds} Beds | 🚿 {prop.baths} Baths
                              </span>
                              <span style={{ color: 'var(--text-dark)', fontWeight: 700, fontSize: '1.15rem' }}>
                                {prop.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </RevealSection>
        );
      })()}

      {/* Interactive Cost Calculator & 3D Building Scanner Section */}
      <RevealSection>
        <section id="calculator" className="section advisory-section" style={{ background: 'var(--bg-lighter)', padding: '4.5rem 0' }}>
          <div className="container">
            <div className="advisory-heading-container" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
              <h2 style={{ fontSize: '2.6rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginBottom: '1rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 300 }}>Advisory Tools</h2>
              <p className="hide-on-mobile" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.65 }}>
                Plan your next investment with our mortgage cost estimator and explore residential units dynamically using our 3D Building Scanner.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', alignItems: 'stretch', maxWidth: '1050px', margin: '0 auto' }}>
              
              {/* Left side: Investment Estimator Mortgage Calculator */}
              <div style={{ flex: '1 1 500px', display: 'flex' }} className="w-full-mobile">
                <div style={{ width: '100%', display: 'flex' }}>
                  <div className="classic-property-card" style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '4px' }}>
                    
                    <div>
                      <h3 style={{ fontSize: '1.6rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '1px' }}>Investment Estimator</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2.5rem' }}>Calculate estimated monthly mortgage values dynamically based on property price.</p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.85rem' }}>Property Value (AED)</label>
                            <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>AED {propertyValue.toLocaleString()}</span>
                          </div>
                          <input type="range" min="100000" max="5000000" step="50000" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color)' }} />
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.85rem' }}>Down Payment (AED)</label>
                            <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>AED {downPayment.toLocaleString()}</span>
                          </div>
                          <input type="range" min="0" max={propertyValue} step="10000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color)' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                          <div style={{ flex: 1, minWidth: '140px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <label style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.85rem' }}>Interest Rate (%)</label>
                              <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold', fontSize: '0.85rem' }}>{interestRate}%</span>
                            </div>
                            <input type="range" min="1" max="10" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color)' }} />
                          </div>
                          <div style={{ flex: 1, minWidth: '140px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <label style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.85rem' }}>Tenure</label>
                              <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold', fontSize: '0.85rem' }}>{tenure} Yrs</span>
                            </div>
                            <input type="range" min="5" max="30" step="1" value={tenure} onChange={(e) => setDownPayment(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color)' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Calculated EMI Display */}
                    <div className="emi-card-mobile" style={{ background: 'var(--text-dark)', color: '#FFF', borderRadius: '4px', padding: '2rem', textAlign: 'center' }}>
                      <h3 className="emi-title-mobile" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Estimated Monthly Cost</h3>
                      <div className="emi-value-mobile" style={{ fontSize: '2.4rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.65rem', fontFamily: 'var(--font-serif)', letterSpacing: '1px' }}>
                        AED {Math.round(emi).toLocaleString()}
                      </div>
                      <p className="emi-desc-mobile" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', margin: 0 }}>
                        Principal Loan: AED {(propertyValue - downPayment > 0 ? propertyValue - downPayment : 0).toLocaleString()}
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
      </RevealSection>

      {/* Bespoke Advisory Consultation Section */}
      <RevealSection>
        <ConsultationSection />
      </RevealSection>

    </div>
  );
}
