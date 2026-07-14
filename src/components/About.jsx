import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const textRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" style={{ padding: '6rem 0', background: 'var(--bg-light)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" ref={textRef}>
        <div className="flex-col-mobile gap-mobile" style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text-dark)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
              The Standard of Excellence
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 3vw, 1.15rem)', lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              At Sharan Estates, we don't just build homes; we curate lifestyles. 
              Our avant-garde approach blends modern architectural brilliance with unparalleled luxury, 
              ensuring that every property we offer is a masterpiece of design and comfort. 
            </p>
            <p style={{ fontSize: 'clamp(1rem, 3vw, 1.15rem)', lineHeight: '1.7', color: 'var(--text-muted)' }}>
              Experience real estate in a completely new dimension with our bespoke portfolio of off-market properties and interactive tech tools.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <img src="/interior_lounge.webp" alt="Luxury Interior" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
