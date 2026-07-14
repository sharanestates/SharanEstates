import React, { useEffect } from 'react';
import Tilt from 'react-parallax-tilt';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingBottom: '6rem' }}>
      
      {/* Hero Section */}
      <section style={{ paddingTop: 'clamp(6rem, 15vw, 10rem)', paddingBottom: '1rem', textAlign: 'center' }}>
        <div className="container p-mobile">
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
            Our Story
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', lineHeight: 1.1, marginBottom: '2rem' }}>
            The Standard of <br/><span style={{ color: 'var(--primary-color)' }}>Excellence</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            At Sharan Estates, we redefine the standard of luxury real estate. Through cutting-edge PropTech solutions, 
            interactive simulations, and unparalleled market expertise, we provide investors with transparent, data-driven opportunities.
          </p>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="scene-3d" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '30%', height: '50%', background: 'radial-gradient(circle, rgba(211, 185, 138, 0.15) 0%, transparent 70%)', zIndex: 0, filter: 'blur(40px)' }}></div>
        
        <div className="container p-mobile" style={{ background: 'var(--text-dark)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem', padding: '4rem 3rem', zIndex: 1, maxWidth: '1200px', margin: '0 auto', borderRadius: '4px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)' }}>
          
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', color: '#FFFFFF', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
              Scale & <span style={{ color: 'var(--primary-color)' }}>Impact</span>
            </h2>
            <div style={{ width: '60px', height: '4px', background: 'var(--primary-color)', marginBottom: '2rem', borderRadius: '2px' }}></div>
            <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Experience modern infrastructure seamlessly blending with premium lifestyle, ensuring your investment is future-proof and visually spectacular. We manage high-yield assets across the globe's most exclusive districts.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem' }}>
              <div>
                <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--primary-color)', fontFamily: 'var(--font-serif)' }}>$2B+</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Assets Managed</div>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--primary-color)', fontFamily: 'var(--font-serif)' }}>15+</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Global Markets</div>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--primary-color)', fontFamily: 'var(--font-serif)' }}>10k+</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Elite Investors</div>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--primary-color)', fontFamily: 'var(--font-serif)' }}>24/7</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Concierge Service</div>
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 300px', position: 'relative', height: 'clamp(350px, 60vw, 500px)', width: '100%' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '70%', height: '75%', zIndex: 2 }}>
              <img src="/luxury_flats.webp" alt="Luxury Flats Interior" style={{ border: '3px solid white', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '65%', height: '70%', zIndex: 3, transform: 'translateZ(30px)' }}>
              <img src="/modern_infrastructure.webp" alt="Modern Infrastructure" style={{ border: '3px solid white', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
            </div>
          </div>

        </div>
      </section>

      {/* Leadership Section */}
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>Executive Leadership</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 3vw, 1.1rem)', maxWidth: '600px', margin: '0 auto', padding: '0 1rem' }}>
              Visionaries in modern real estate, driving innovation and architectural excellence.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: '3rem' }}>
            
            {/* Leader 1 */}
            <div>
              <div className="classic-property-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ height: '350px', position: 'relative' }}>
                  <img src="/founder.webp" alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '2rem', textAlign: 'center', flex: 1 }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', marginBottom: '0.2rem', fontFamily: 'var(--font-serif)' }}>John Doe</h3>
                  <p style={{ color: 'var(--primary-dark)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Founder & CEO</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    With over 20 years in luxury real estate, John leads the vision for integrating cutting-edge PropTech with uncompromising architectural quality.
                  </p>
                </div>
              </div>
            </div>

            {/* Leader 2 */}
            <div>
              <div className="classic-property-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ height: '350px', position: 'relative' }}>
                  <img src="/founder.webp" alt="Executive" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'hue-rotate(15deg) contrast(1.1)' }} />
                </div>
                <div style={{ padding: '2rem', textAlign: 'center', flex: 1 }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', marginBottom: '0.2rem', fontFamily: 'var(--font-serif)' }}>Jane Smith</h3>
                  <p style={{ color: 'var(--primary-dark)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Head of Global Markets</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    Jane oversees international expansion, ensuring Sharan Estates maintains its dominant position in premier districts worldwide.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
