import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';

gsap.registerPlugin(ScrollTrigger);

export default function Properties() {
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="properties" className="section" style={{ background: 'var(--bg-light)', padding: '8rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Catalogue</p>
          <h2 style={{ fontSize: '3.5rem', color: 'var(--text-dark)', fontFamily: 'serif', marginTop: '0.5rem' }}>
            Exclusive Portfolio
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '1rem auto' }}>
            Discover our curated selection of ultra-luxury properties featuring solid modern architecture and warm, premium interiors.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          
          {/* Card 1 */}
          <div ref={el => cardsRef.current[0] = el}>
            <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} perspective={1500} scale={1.02} transitionSpeed={1000} style={{ height: '100%' }}>
              <div className="glossy-glass card-3d" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '300px', background: 'url(/exterior_patio.png) center/cover', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', color: 'var(--text-dark)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    Just Listed
                  </div>
                </div>
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ color: 'var(--text-dark)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>The Serene Oasis</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, flex: 1 }}>A pinnacle of modern engineering, offering an infinity pool with seamless sunset views.</p>
                  <div style={{ marginTop: '1.5rem', color: 'var(--primary-dark)', fontWeight: 600, fontSize: '1.2rem' }}>$8,500,000</div>
                </div>
              </div>
            </Tilt>
          </div>

          {/* Card 2 */}
          <div ref={el => cardsRef.current[1] = el}>
            <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} perspective={1500} scale={1.02} transitionSpeed={1000} style={{ height: '100%' }}>
              <div className="glossy-glass card-3d" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '300px', background: 'url(/interior_lounge.png) center/cover', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', color: 'var(--text-dark)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    Turnkey
                  </div>
                </div>
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ color: 'var(--text-dark)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Zenith Penthouse</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, flex: 1 }}>Ultra-luxury interiors matched with expansive spaces, warm wood accents, and minimalist design.</p>
                  <div style={{ marginTop: '1.5rem', color: 'var(--primary-dark)', fontWeight: 600, fontSize: '1.2rem' }}>$4,200,000</div>
                </div>
              </div>
            </Tilt>
          </div>

          {/* Card 3 */}
          <div ref={el => cardsRef.current[2] = el}>
            <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} perspective={1500} scale={1.02} transitionSpeed={1000} style={{ height: '100%' }}>
              <div className="glossy-glass card-3d" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '300px', background: 'url(/listing_villa.png) center/cover', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', color: 'var(--text-dark)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    Off-Plan
                  </div>
                </div>
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ color: 'var(--text-dark)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Concrete Sanctuary</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, flex: 1 }}>Solid modern architecture blending raw materials with premium finishes.</p>
                  <div style={{ marginTop: '1.5rem', color: 'var(--primary-dark)', fontWeight: 600, fontSize: '1.2rem' }}>$6,100,000</div>
                </div>
              </div>
            </Tilt>
          </div>

        </div>
      </div>
    </section>
  );
}
