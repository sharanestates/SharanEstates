import React, { useEffect } from 'react';
import Tilt from 'react-parallax-tilt';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingBottom: '6rem' }}>
      
      {/* Hero Section */}
      <section style={{ paddingTop: '10rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <div className="container">
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
            Our Story
          </p>
          <h1 style={{ fontSize: '4rem', color: 'var(--text-dark)', fontFamily: 'serif', lineHeight: 1.1, marginBottom: '2rem' }}>
            The Standard of <br/><span style={{ color: 'var(--primary-color)' }}>Excellence</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            At Sharan Estates, we redefine the standard of luxury real estate. Through cutting-edge PropTech solutions, 
            interactive simulations, and unparalleled market expertise, we provide investors with transparent, data-driven opportunities.
          </p>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="section scene-3d" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '30%', height: '50%', background: 'radial-gradient(circle, rgba(211, 185, 138, 0.15) 0%, transparent 70%)', zIndex: 0, filter: 'blur(40px)' }}></div>
        
        <div className="container card-3d glossy-glass" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem', padding: '4rem', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-dark)', marginBottom: '1.5rem', fontFamily: 'serif', lineHeight: 1.1 }}>
              Scale & <span style={{ color: 'var(--primary-color)' }}>Impact</span>
            </h2>
            <div style={{ width: '60px', height: '4px', background: 'var(--primary-color)', marginBottom: '2rem', borderRadius: '2px' }}></div>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Experience modern infrastructure seamlessly blending with premium lifestyle, ensuring your investment is future-proof and visually spectacular. We manage high-yield assets across the globe's most exclusive districts.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-dark)', fontFamily: 'serif' }}>$2B+</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Assets Managed</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-dark)', fontFamily: 'serif' }}>15+</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Global Markets</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-dark)', fontFamily: 'serif' }}>10k+</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Elite Investors</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-dark)', fontFamily: 'serif' }}>24/7</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Concierge Service</div>
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 500px', position: 'relative', height: '500px' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '70%', height: '70%', zIndex: 2 }}>
              <img src="/luxury_flats.png" alt="Luxury Flats Interior" className="image-glossy" style={{ border: '4px solid white', width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '65%', height: '65%', zIndex: 3, transform: 'translateZ(30px)' }}>
              <img src="/modern_infrastructure.png" alt="Modern Infrastructure" className="image-glossy" style={{ border: '4px solid white', width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

        </div>
      </section>

      {/* Leadership Section */}
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-dark)', fontFamily: 'serif', marginBottom: '1rem' }}>Executive Leadership</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Visionaries in modern real estate, driving innovation and architectural excellence.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
            
            {/* Leader 1 */}
            <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.01} transitionSpeed={1000}>
              <div className="glossy-glass card-3d" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.8)' }}>
                <div style={{ height: '350px', position: 'relative' }}>
                  <img src="/founder.png" alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '0.2rem', fontFamily: 'serif' }}>John Doe</h3>
                  <p style={{ color: 'var(--primary-dark)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Founder & CEO</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    With over 20 years in luxury real estate, John leads the vision for integrating cutting-edge PropTech with uncompromising architectural quality.
                  </p>
                </div>
              </div>
            </Tilt>

            {/* Leader 2 */}
            <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.01} transitionSpeed={1000}>
              <div className="glossy-glass card-3d" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.8)' }}>
                <div style={{ height: '350px', position: 'relative' }}>
                  <img src="/founder.png" alt="Executive" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'hue-rotate(15deg) contrast(1.1)' }} />
                </div>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '0.2rem', fontFamily: 'serif' }}>Jane Smith</h3>
                  <p style={{ color: 'var(--primary-dark)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Head of Global Markets</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Jane oversees international expansion, ensuring Sharan Estates maintains its dominant position in premier districts worldwide.
                  </p>
                </div>
              </div>
            </Tilt>

          </div>
        </div>
      </section>

    </div>
  );
}
