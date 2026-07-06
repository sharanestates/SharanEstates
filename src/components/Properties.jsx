import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';
import { GitCompare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Properties({ compareList = [], onToggleCompare }) {
  const cardsRef = useRef([]);
  const [properties, setProperties] = useState([]);
  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  useEffect(() => {
    fetch(`${API_BASE}/properties`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Take the first 3 properties for homepage
          setProperties(data.slice(0, 3));
        } else {
          setProperties([]);
        }
      })
      .catch(err => {
        console.warn('Failed to fetch featured properties:', err.message);
        setProperties([]);
      });
  }, []);

  useLayoutEffect(() => {
    if (properties.length === 0) return;
    
    // Clear references on update
    cardsRef.current = cardsRef.current.slice(0, properties.length);
    
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
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
  }, [properties]);

  if (properties.length === 0) return null;

  return (
    <section id="properties" className="section" style={{ background: 'var(--bg-lighter)', padding: '4rem 0 6rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Catalogue</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginTop: '0.5rem' }}>
            Exclusive Portfolio
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '1rem auto' }}>
            Discover our curated selection of ultra-luxury properties featuring solid modern architecture and warm, premium interiors.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {properties.map((prop, idx) => {
            const isCompared = compareList.some(p => p.id === prop.id);
            return (
              <div key={prop.id} ref={el => cardsRef.current[idx] = el} style={{ position: 'relative' }}>
                {onToggleCompare && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggleCompare(prop);
                    }}
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      left: '1.25rem',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: isCompared ? 'var(--text-dark)' : 'rgba(255,255,255,0.92)',
                      color: isCompared ? 'var(--primary-color)' : 'var(--text-dark)',
                      border: '1px solid rgba(211,185,138,0.25)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      zIndex: 10
                    }}
                    title={isCompared ? "Remove from Compare" : "Compare Property Specs"}
                    onMouseOver={(e) => {
                      if (!isCompared) {
                        e.currentTarget.style.transform = 'scale(1.08)';
                        e.currentTarget.style.borderColor = 'var(--primary-color)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isCompared) {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = 'rgba(211,185,138,0.25)';
                      }
                    }}
                  >
                    <GitCompare size={16} />
                  </button>
                )}

                <Link to={`/property/${prop.id}`} style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
                  <div className="classic-property-card" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '180px', background: `url(${prop.image}) center/cover`, position: 'relative', borderTopLeftRadius: '3px', borderTopRightRadius: '3px' }}>
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#FFFFFF', color: 'var(--text-dark)', padding: '0.3rem 0.8rem', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '2px' }}>
                        {prop.status || 'Featured'}
                      </div>
                    </div>
                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ color: 'var(--text-dark)', fontSize: '1.3rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>{prop.title}</h3>
                      <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, flex: 1, fontSize: '0.85rem' }}>{prop.desc || prop.description}</p>
                      <div style={{ marginTop: '1.2rem', color: 'var(--primary-dark)', fontWeight: 600, fontSize: '1.15rem', borderTop: '1px solid rgba(211, 185, 138, 0.2)', paddingTop: '1rem' }}>{prop.price}</div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
