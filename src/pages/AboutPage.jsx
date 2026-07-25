import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RevealSection from '../components/RevealSection';
import useSEO from '../components/useSEO';

export default function AboutPage() {
  useSEO(
    'About Us | Sharan Real Estate',
    'Sharan Real Estate was founded on trust, discretion, and enduring relationships. Derived from Sanskrit for shelter, we provide bespoke advisory for exceptional Dubai properties.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#111111', fontFamily: 'var(--font-sans)' }}>
      
      {/* ── 1. HERO BANNER (Dark Classic Heritage Header) ── */}
      <RevealSection>
        <section style={{
          position: 'relative',
          background: '#0D0D0D',
          color: '#FFFFFF',
          padding: 'clamp(7rem, 13vw, 9.5rem) 1.5rem clamp(4rem, 8vw, 6rem)',
          textAlign: 'center',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          {/* Subtle Ambient Radial Lighting */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60vw',
            height: '60vw',
            maxWidth: '600px',
            maxHeight: '600px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {/* Elegant Divider Line */}
            <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.4)', margin: '0 auto 1.5rem' }} />
            
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.72rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1.5rem'
            }}>
              About Sharan Real Estate
            </p>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.6rem)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-serif)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              lineHeight: 1.15,
              fontWeight: 300,
              marginBottom: '2rem'
            }}>
              Built on Trust. <br />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>Guided by Purpose.</span>
            </h1>

            {/* Core Founding Belief (Paragraph 1) */}
            <p style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.7,
              maxWidth: '720px',
              margin: '0 auto',
              fontWeight: 300,
              letterSpacing: '0.5px'
            }}>
              Sharan Real Estate was founded on the belief that exceptional real estate is built on trust, discretion, and enduring relationships.
            </p>
          </div>
        </section>
      </RevealSection>

      {/* ── 2. THE HERITAGE & ETYMOLOGY SECTION (Sanskrit Origin) ── */}
      <RevealSection>
        <section style={{
          padding: 'clamp(4.5rem, 9vw, 7rem) 1.5rem',
          background: '#FBFBF9',
          borderBottom: '1px solid rgba(0,0,0,0.06)'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
              gap: 'clamp(2.5rem, 6vw, 4.5rem)',
              alignItems: 'center'
            }}>
              
              {/* Left Column: Meaning & Sanskrit Etymology Callout */}
              <div style={{
                background: '#FFFFFF',
                padding: 'clamp(2rem, 4vw, 3rem)',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '2px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-1px',
                  left: '2rem',
                  width: '40px',
                  height: '2px',
                  background: '#111111'
                }} />
                
                <p style={{
                  fontSize: '0.68rem',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.45)',
                  fontWeight: 600,
                  marginBottom: '1rem'
                }}>
                  Etymology & Meaning
                </p>

                <h3 style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                  fontFamily: 'var(--font-serif)',
                  color: '#111111',
                  fontWeight: 300,
                  marginBottom: '0.75rem',
                  lineHeight: 1.2
                }}>
                  SHARAN <span style={{ fontSize: '1.2rem', color: 'rgba(0,0,0,0.4)', fontStyle: 'italic' }}>( शरण )</span>
                </h3>

                <p style={{
                  fontSize: '0.88rem',
                  color: 'rgba(0,0,0,0.55)',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                  paddingBottom: '1rem'
                }}>
                  Sanskrit for "Shelter" & "Sanctuary"
                </p>

                <p style={{
                  fontSize: '0.92rem',
                  color: 'rgba(0,0,0,0.7)',
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  "Creating places of permanence, security, and opportunity for discerning private capital and families."
                </p>
              </div>

              {/* Right Column: Detailed Narrative (Paragraph 2) */}
              <div>
                <div style={{ width: '35px', height: '1px', background: 'rgba(0,0,0,0.2)', marginBottom: '1.25rem' }} />
                <h2 style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                  fontFamily: 'var(--font-serif)',
                  color: '#111111',
                  fontWeight: 300,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                  marginBottom: '1.75rem'
                }}>
                  A Legacy of Integrity & Bespoke Advisory
                </h2>

                {/* Exact Paragraph 2 Text */}
                <p style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
                  color: 'rgba(0,0,0,0.75)',
                  lineHeight: 1.85,
                  margin: 0
                }}>
                  Derived from the Sanskrit word Sharan, meaning shelter, our name reflects the timeless purpose of real estate: creating places of permanence, security, and opportunity. Inspired by a legacy of integrity and service, we provide bespoke advisory to individuals and investors seeking exceptional opportunities in Dubai.
                </p>
              </div>

            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── 3. OUR APPROACH & PHILOSOPHY (Paragraph 3 Highlight) ── */}
      <RevealSection>
        <section style={{
          padding: 'clamp(4.5rem, 9vw, 6.5rem) 1.5rem',
          background: '#111111',
          color: '#FFFFFF'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.7rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1.25rem'
            }}>
              Our Philosophy
            </p>

            <h2 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
              fontFamily: 'var(--font-serif)',
              color: '#FFFFFF',
              fontWeight: 300,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              lineHeight: 1.25,
              marginBottom: '2rem'
            }}>
              Measured. Insightful. Deeply Personal.
            </h2>

            <div style={{
              width: '50px',
              height: '1px',
              background: 'rgba(255,255,255,0.25)',
              margin: '0 auto 2.25rem'
            }} />

            {/* Exact Paragraph 3 Text */}
            <p style={{
              fontSize: 'clamp(1.05rem, 2.4vw, 1.25rem)',
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.8,
              maxWidth: '820px',
              margin: '0 auto',
              fontWeight: 300,
              letterSpacing: '0.4px'
            }}>
              Our approach is measured, insightful, and deeply personal—combining market intelligence with an unwavering commitment to excellence. Every relationship is built for the long term, and every decision is guided by the confidence that lasting value is never accidental.
            </p>
          </div>
        </section>
      </RevealSection>

      {/* ── 4. CORE ADVISORY PILLARS (Grid Layout) ── */}
      <RevealSection>
        <section style={{
          padding: 'clamp(4.5rem, 9vw, 7rem) 1.5rem',
          background: '#FFFFFF',
          borderBottom: '1px solid rgba(0,0,0,0.06)'
        }}>
          <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
              <div style={{ width: '40px', height: '1px', background: 'rgba(0,0,0,0.15)', margin: '0 auto 1rem' }} />
              <p style={{
                color: 'rgba(0,0,0,0.45)',
                fontSize: '0.7rem',
                letterSpacing: '3.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '0.75rem'
              }}>
                Foundational Principles
              </p>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                fontFamily: 'var(--font-serif)',
                color: '#111111',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: 300,
                margin: 0
              }}>
                The Pillars of Our Practice
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '2rem'
            }}>
              {/* Pillar 1 */}
              <div style={{
                padding: '2.5rem 2rem',
                background: '#FDFDFB',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '2px'
              }}>
                <div style={{
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'rgba(0,0,0,0.35)',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  marginBottom: '1rem'
                }}>
                  01 / DISCRETION
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  color: '#111111',
                  fontWeight: 400,
                  marginBottom: '0.85rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Trust & Confidentiality
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(0,0,0,0.65)', lineHeight: 1.7, margin: 0 }}>
                  We safeguard client privacy with uncompromising discretion, acting as confidential advisors to ultra-high-net-worth individuals and private funds.
                </p>
              </div>

              {/* Pillar 2 */}
              <div style={{
                padding: '2.5rem 2rem',
                background: '#FDFDFB',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '2px'
              }}>
                <div style={{
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'rgba(0,0,0,0.35)',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  marginBottom: '1rem'
                }}>
                  02 / PERMANENCE
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  color: '#111111',
                  fontWeight: 400,
                  marginBottom: '0.85rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Places of Shelter & Security
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(0,0,0,0.65)', lineHeight: 1.7, margin: 0 }}>
                  Guided by the Sanskrit ethos of <em>Sharan</em>, we identify prime residential and commercial real estate that promises security, legacy, and long-term capital protection.
                </p>
              </div>

              {/* Pillar 3 */}
              <div style={{
                padding: '2.5rem 2rem',
                background: '#FDFDFB',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '2px'
              }}>
                <div style={{
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'rgba(0,0,0,0.35)',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  marginBottom: '1rem'
                }}>
                  03 / INTELLIGENCE
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  color: '#111111',
                  fontWeight: 400,
                  marginBottom: '0.85rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Data-Driven Advisory
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(0,0,0,0.65)', lineHeight: 1.7, margin: 0 }}>
                  We pair institutional-grade market analytics and PropTech simulations with deep local expertise across Dubai's most coveted master developments.
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── 5. ARCHITECTURAL SHOWCASE GALLERY ── */}
      <RevealSection>
        <section style={{
          padding: 'clamp(4.5rem, 8vw, 6.5rem) 1.5rem',
          background: '#F8F8F6'
        }}>
          <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}>
              
              {/* Image Card 1 */}
              <div style={{
                position: 'relative',
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.08)',
                padding: '0.75rem',
                boxShadow: '0 12px 35px rgba(0,0,0,0.04)'
              }}>
                <div style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src="/luxury_flats.webp"
                    alt="Luxury Residences"
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.95)' }}
                  />
                </div>
                <div style={{ padding: '1rem 0.5rem 0.5rem', textAlign: 'center' }}>
                  <p style={{
                    fontSize: '0.75rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.5)',
                    fontWeight: 600,
                    margin: 0
                  }}>
                    Curating Dubai's Finest Addresses
                  </p>
                </div>
              </div>

              {/* Image Card 2 */}
              <div style={{
                position: 'relative',
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.08)',
                padding: '0.75rem',
                boxShadow: '0 12px 35px rgba(0,0,0,0.04)'
              }}>
                <div style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src="/modern_infrastructure.webp"
                    alt="Modern Infrastructure"
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.95)' }}
                  />
                </div>
                <div style={{ padding: '1rem 0.5rem 0.5rem', textAlign: 'center' }}>
                  <p style={{
                    fontSize: '0.75rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.5)',
                    fontWeight: 600,
                    margin: 0
                  }}>
                    Bespoke Advisory for Private Capital
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── 6. CALL TO ACTION (Classic Private Advisory Banner) ── */}
      <RevealSection>
        <section style={{
          background: '#0D0D0D',
          color: '#FFFFFF',
          padding: 'clamp(4.5rem, 9vw, 6.5rem) 1.5rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.4)', margin: '0 auto 1.5rem' }} />
            
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.7rem',
              letterSpacing: '3.5px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              Private Advisory Services
            </p>

            <h2 style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
              fontFamily: 'var(--font-serif)',
              color: '#FFFFFF',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              lineHeight: 1.2,
              fontWeight: 300,
              marginBottom: '1.5rem'
            }}>
              Discuss Your Real Estate Vision
            </h2>

            <p style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              maxWidth: '560px',
              margin: '0 auto 2.5rem'
            }}>
              Whether seeking a personal residence or expanding an institutional portfolio, our senior advisory team is at your service.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <Link
                to="/list-with-us"
                className="btn-solid"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.9rem 2.2rem',
                  borderRadius: '2px',
                  fontSize: '0.72rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  background: '#FFFFFF',
                  color: '#000000',
                  fontWeight: 600
                }}
              >
                List Your Property
              </Link>
              <a
                href="mailto:contactus@sharanestates.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.9rem 2.2rem',
                  borderRadius: '2px',
                  fontSize: '0.72rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
              >
                Contact Advisory
              </a>
            </div>
          </div>
        </section>
      </RevealSection>

    </div>
  );
}

