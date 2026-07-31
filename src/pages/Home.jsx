import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Properties from '../components/Properties';
import ConsultationSection from '../components/ConsultationSection';
import DeveloperLogos from '../components/DeveloperLogos';
import RevealSection from '../components/RevealSection';
import useRealTimeSync from '../components/useRealTimeSync';
import useSEO from '../components/useSEO';

const bgImages = [
  '/dubai_luxury_1.webp',
  '/dubai_luxury_2.webp',
  '/dubai_luxury_3.webp',
  '/dubai_luxury_4.webp'
];

export default function Home() {
  useSEO(
    'Luxury Real Estate Dubai | Sharan Estates',
    'Sharan Estates provides private real estate advisory in Dubai, curating exceptional off-plan developments, luxury villas, and signature residences for global investors.'
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bgImages.length);
    }, 6500);
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
        heroCardRef.current.style.transform = `translate3d(0, -${scrolled * 0.06}px, 0)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Top 5 Editorial Selection Properties
  const starredProperties = properties.filter(p => p.starred);
  const editorialProperties = starredProperties.length >= 5 
    ? starredProperties.slice(0, 5) 
    : (properties.length > 0 
        ? properties.slice(0, 5) 
        : [
            {
              id: 1,
              title: 'WASL AT JUMEIRAH GOLF ESTATES',
              location: 'Jumeirah Golf Estates, Dubai',
              beds: 4,
              baths: 4,
              price: 'AED 4,800,000',
              description: 'WASL at Jumeirah Golf Estates brings premium townhouses and luxury villas.',
              image: '/light_exterior.webp',
            },
            {
              id: 2,
              title: 'EMAAR SOUTH RESIDENCES',
              location: 'Emaar South, Dubai',
              beds: 3,
              baths: 3,
              price: 'AED 2,100,000',
              description: 'Emaar South Residences offer modern townhouses and golf course apartments.',
              image: '/dubai_luxury_1.webp',
            },
            {
              id: 3,
              title: 'THE OASIS & THE HEIGHTS BY EMAAR',
              location: 'The Oasis, Dubai',
              beds: 5,
              baths: 6,
              price: 'AED 12,000,000',
              description: 'The Oasis and The Heights by Emaar are master-planned luxury developments.',
              image: '/exclusive_villa.webp',
            },
            {
              id: 4,
              title: 'PALM JUMEIRAH SIGNATURE VILLA',
              location: 'Palm Jumeirah, Dubai',
              beds: 6,
              baths: 7,
              price: 'AED 38,500,000',
              description: 'Exclusive beachfront estate offering panoramic Arabian Gulf views and private beach access.',
              image: '/sunset_villa.webp',
            },
            {
              id: 5,
              title: 'DOWNTOWN ROYAL PENTHOUSE',
              location: 'Downtown Dubai, Dubai',
              beds: 4,
              baths: 5,
              price: 'AED 24,000,000',
              description: 'Duplex sky residence featuring unobstructed vistas of the Burj Khalifa.',
              image: '/dubai_luxury_2.webp',
            },
          ]);

  return (
    <div style={{ background: '#FFFFFF', color: '#111111' }}>
      
      {/* ── 1. HERO SECTION WITH CINEMATIC IMAGE SLIDESHOW ── */}
      <section className="hero-section-wrapper">
        
        {/* Full Viewport Background Slideshow */}
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
                Private Real Estate Advisory
              </p>
              <h1 className="hero-title">
                Representing Exceptional Real Estate
              </h1>
              <p className="hero-description">
                Sharan Estates curates Dubai’s most distinguished residences and premier investment portfolios, delivering discreet, bespoke guidance to homeowners and private investors worldwide.
              </p>

              {/* Action CTA Buttons */}
              <div className="hero-cta-buttons">
                <Link to="/listings/ready" className="hero-cta-btn btn-solid">
                  Explore Residences →
                </Link>
                <Link to="/contact" className="hero-cta-btn btn-outline">
                  Private Consultation →
                </Link>
              </div>

              {/* Credibility Stats Block */}
              <div className="hero-stats-grid">
                <div>
                  <h4 className="hero-stat-value">AED 300M+</h4>
                  <p className="hero-stat-label">In Transactions</p>
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

      {/* ── 2. STANDARD OF EXCELLENCE SECTION (Shifted immediately after Hero) ── */}
      <RevealSection>
        <section className="section" style={{ background: 'var(--primary-light)', padding: '5rem 0', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
          <div className="container" style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.5rem' }}>
              The Standard of Excellence
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginBottom: '2.5rem', letterSpacing: '1px', lineHeight: 1.3, fontWeight: 300 }}>
              "Architecture should speak of its time and place, but yearn for timelessness."
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.85, maxWidth: '720px', margin: '0 auto 3rem', fontWeight: 400 }}>
              Sharan Private Advisory represents a bespoke approach to real estate advisory. We work with discerning clients seeking exceptional residences across Dubai, providing considered guidance, curated opportunities and trusted access.
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
            >Discover Our Approach →</Link>
          </div>
        </section>
      </RevealSection>

      {/* ── 3. ADVISORY PHILOSOPHY SECTION (Acquisition / Advisory / Access) ── */}
      <RevealSection>
        <section style={{
          padding: 'clamp(3.5rem, 6vw, 5rem) 1.5rem',
          background: '#0B0B0B',
          color: '#FFFFFF',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '0.68rem',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>
                Advisory Philosophy
              </p>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                fontFamily: 'var(--font-serif)',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: 300,
                margin: 0
              }}>
                Private Real Estate Advisory
              </h2>
            </div>

            <div 
              className="responsive-pillars-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
                gap: '1.5rem'
              }}
            >
              {/* Pillar 1: Acquisition */}
              <div 
                className="responsive-pillar-card"
                style={{
                  padding: '1.8rem 1.5rem',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '2px'
                }}
              >
                <div style={{
                  fontSize: '0.65rem',
                  letterSpacing: '2.5px',
                  color: 'rgba(255,255,255,0.4)',
                  fontWeight: 600,
                  marginBottom: '0.6rem',
                  textTransform: 'uppercase'
                }}>
                  01 / ACQUISITION
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-serif)',
                  color: '#FFFFFF',
                  fontWeight: 300,
                  marginBottom: '0.6rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Acquisition
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>
                  Identifying exceptional residences and opportunities aligned with each client’s objectives.
                </p>
              </div>

              {/* Pillar 2: Advisory */}
              <div 
                className="responsive-pillar-card"
                style={{
                  padding: '1.8rem 1.5rem',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '2px'
                }}
              >
                <div style={{
                  fontSize: '0.65rem',
                  letterSpacing: '2.5px',
                  color: 'rgba(255,255,255,0.4)',
                  fontWeight: 600,
                  marginBottom: '0.6rem',
                  textTransform: 'uppercase'
                }}>
                  02 / ADVISORY
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-serif)',
                  color: '#FFFFFF',
                  fontWeight: 300,
                  marginBottom: '0.6rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Advisory
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>
                  Providing considered guidance across selection, negotiation and investment strategy.
                </p>
              </div>

              {/* Pillar 3: Access */}
              <div 
                className="responsive-pillar-card"
                style={{
                  padding: '1.8rem 1.5rem',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '2px'
                }}
              >
                <div style={{
                  fontSize: '0.65rem',
                  letterSpacing: '2.5px',
                  color: 'rgba(255,255,255,0.4)',
                  fontWeight: 600,
                  marginBottom: '0.6rem',
                  textTransform: 'uppercase'
                }}>
                  03 / ACCESS
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-serif)',
                  color: '#FFFFFF',
                  fontWeight: 300,
                  marginBottom: '0.6rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Access
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>
                  Connecting clients with curated opportunities and trusted relationships beyond the conventional market.
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── 4. CURATED HIGHLIGHTS / EDITORIAL SELECTIONS (Top 6 Display Right After Advisory) ── */}
      <RevealSection>
        <section style={{
          background: '#FFFFFF',
          padding: 'clamp(4.5rem, 8vw, 6.5rem) 1.5rem',
          borderBottom: '1px solid rgba(0,0,0,0.06)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{
                color: 'rgba(0,0,0,0.5)',
                fontSize: '0.68rem',
                letterSpacing: '4.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '0.75rem'
              }}>
                CURATED HIGHLIGHTS
              </p>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontFamily: 'var(--font-serif)',
                color: '#111111',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontWeight: 300,
                margin: 0
              }}>
                EDITORIAL SELECTIONS
              </h2>
              <div style={{ width: '40px', height: '1px', background: 'rgba(0,0,0,0.2)', margin: '1.25rem auto 0' }} />
            </div>

            {/* 5 Compact Property Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
              gap: '1.25rem',
            }}>
              {editorialProperties.map((prop) => (
                <Link
                  key={prop.id}
                  to={`/property/${prop.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
                      transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                    }}
                    className="editorial-card-item"
                  >
                    {/* Property Image Container */}
                    <div style={{ height: '175px', position: 'relative', overflow: 'hidden', background: '#F5F5F3' }}>
                      <img
                        src={prop.image || '/dubai_luxury_1.webp'}
                        alt={prop.title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                      />

                      {/* Top Right Star Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '0.75rem',
                          right: '0.75rem',
                          background: '#FFFFFF',
                          color: '#000000',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.12)',
                          fontSize: '0.8rem',
                        }}
                        title="Starred Highlight"
                      >
                        ★
                      </div>

                      {/* Bottom Left Location Badge */}
                      <div style={{
                        position: 'absolute',
                        bottom: '0.75rem',
                        left: '0.75rem',
                        background: '#FFFFFF',
                        color: '#000000',
                        padding: '0.25rem 0.55rem',
                        fontSize: '0.55rem',
                        fontWeight: 600,
                        letterSpacing: '1.2px',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(0,0,0,0.12)',
                        borderRadius: '2px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                      }}>
                        {prop.location}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.85rem' }}>
                      <div>
                        <h3 style={{
                          fontSize: '0.92rem',
                          fontFamily: 'var(--font-serif)',
                          color: '#111111',
                          fontWeight: 400,
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                          margin: '0 0 0.45rem',
                          lineHeight: 1.3,
                        }}>
                          {prop.title}
                        </h3>

                        <p style={{
                          fontSize: '0.78rem',
                          color: 'rgba(0, 0, 0, 0.6)',
                          lineHeight: 1.55,
                          margin: 0,
                        }}>
                          {prop.description ? (prop.description.substring(0, 75) + '...') : ''}
                        </p>
                      </div>

                      {/* Footer Specs & Price */}
                      <div style={{
                        display: 'flex',
                        justify: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid rgba(0, 0, 0, 0.07)',
                        paddingTop: '0.75rem',
                        marginTop: '0.25rem',
                      }}>
                        <span style={{ fontSize: '0.72rem', color: 'rgba(0, 0, 0, 0.65)', fontWeight: 500 }}>
                          🛏️ {prop.beds || 3} Beds | 🚿 {prop.baths || 3} Baths
                        </span>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#111111' }}>
                          {prop.price}
                        </span>
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      </RevealSection>

      {/* ── 5. FEATURED PROPERTIES FULL CATALOG ── */}
      <Properties />

      {/* ── 6. SELECTED DEVELOPERS & PARTNERS SECTION ── */}
      <RevealSection>
        <section style={{
          background: '#FFFFFF',
          padding: 'clamp(4rem, 8vw, 6rem) 1.5rem',
          borderBottom: '1px solid rgba(0,0,0,0.06)'
        }}>
          <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{ width: '35px', height: '1px', background: 'rgba(0,0,0,0.15)', margin: '0 auto 0.75rem' }} />
              <p style={{
                color: 'rgba(0,0,0,0.5)',
                fontSize: '0.68rem',
                letterSpacing: '3.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
                margin: 0
              }}>
                Selected Developers & Partners
              </p>
            </div>

            <DeveloperLogos />
          </div>
        </section>
      </RevealSection>

      {/* ── 7. THE SHARAN DIFFERENCE ("Why Sharan") ── */}
      <RevealSection>
        <section 
          className="responsive-difference-section"
          style={{
            padding: 'clamp(5rem, 9vw, 7rem) 1.5rem',
            background: '#0B0B0B',
            color: '#FFFFFF',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
            <div className="responsive-difference-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{
                fontSize: '0.68rem',
                letterSpacing: '4.5px',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.45)',
                fontWeight: 600,
                marginBottom: '0.85rem',
              }}>
                THE SHARAN DIFFERENCE
              </p>

              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 300,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                margin: 0,
              }}>
                More Than Access. A More Considered Perspective.
              </h2>
              <div style={{ width: '40px', height: '1px', background: 'rgba(255, 255, 255, 0.2)', margin: '1.25rem auto 0' }} />
            </div>

            <div 
              className="responsive-difference-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
                gap: '1.75rem',
              }}
            >
              {/* Point 1 */}
              <div
                style={{
                  padding: '2.2rem 1.75rem',
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  transition: 'transform 0.35s ease, border-color 0.35s ease',
                }}
                className="editorial-card-item responsive-difference-card"
              >
                <span style={{ fontSize: '0.75rem', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                  01
                </span>
                <h3 style={{ fontSize: '0.92rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#FFFFFF', margin: 0, fontWeight: 600 }}>
                  INDEPENDENT PERSPECTIVE
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.7, margin: 0 }}>
                  Advice focused strictly on the client's long-term objectives rather than simply closing a transaction.
                </p>
              </div>

              {/* Point 2 */}
              <div
                style={{
                  padding: '2.2rem 1.75rem',
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  transition: 'transform 0.35s ease, border-color 0.35s ease',
                }}
                className="editorial-card-item responsive-difference-card"
              >
                <span style={{ fontSize: '0.75rem', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                  02
                </span>
                <h3 style={{ fontSize: '0.92rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#FFFFFF', margin: 0, fontWeight: 600 }}>
                  CURATED OPPORTUNITIES
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.7, margin: 0 }}>
                  A hand-selected portfolio of prime residences and off-market assets rather than an overwhelming catalogue.
                </p>
              </div>

              {/* Point 3 */}
              <div
                style={{
                  padding: '2.2rem 1.75rem',
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  transition: 'transform 0.35s ease, border-color 0.35s ease',
                }}
                className="editorial-card-item responsive-difference-card"
              >
                <span style={{ fontSize: '0.75rem', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                  03
                </span>
                <h3 style={{ fontSize: '0.92rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#FFFFFF', margin: 0, fontWeight: 600 }}>
                  PRIVATE ACCESS
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.7, margin: 0 }}>
                  Direct lines to confidential pre-launch releases, private sellers, and developer leadership across Dubai.
                </p>
              </div>

              {/* Point 4 */}
              <div
                style={{
                  padding: '2.2rem 1.75rem',
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  transition: 'transform 0.35s ease, border-color 0.35s ease',
                }}
                className="editorial-card-item responsive-difference-card"
              >
                <span style={{ fontSize: '0.75rem', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                  04
                </span>
                <h3 style={{ fontSize: '0.92rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#FFFFFF', margin: 0, fontWeight: 600 }}>
                  DISCREET SERVICE
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.7, margin: 0 }}>
                  A personal, highly attentive and confidential advisory experience throughout every step of your acquisition.
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── 8. PRIVATE CLIENT ADVISORY / CONSULTATION SECTION (Kept at end) ── */}
      <RevealSection>
        <ConsultationSection />
      </RevealSection>

    </div>
  );
}
