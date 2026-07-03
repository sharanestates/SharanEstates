import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';

gsap.registerPlugin(ScrollTrigger);

export default function Properties() {
  const cardsRef = useRef([]);
  const [properties, setProperties] = useState([]);
  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  useEffect(() => {
    fetch(`${API_BASE}/properties`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
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
  }, [properties]);

  if (properties.length === 0) return null;

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
          {properties.map((prop, idx) => (
            <div key={prop.id} ref={el => cardsRef.current[idx] = el}>
              <Link to={`/property/${prop.id}`} style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
                <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} perspective={1500} scale={1.02} transitionSpeed={1000} style={{ height: '100%' }}>
                  <div className="glossy-glass card-3d" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.8)' }}>
                    <div style={{ height: '300px', background: `url(${prop.image}) center/cover`, position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', color: 'var(--text-dark)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                        {prop.status || 'Featured'}
                      </div>
                    </div>
                    <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ color: 'var(--text-dark)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>{prop.title}</h3>
                      <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, flex: 1 }}>{prop.desc || prop.description}</p>
                      <div style={{ marginTop: '1.5rem', color: 'var(--primary-dark)', fontWeight: 600, fontSize: '1.2rem' }}>{prop.price}</div>
                    </div>
                  </div>
                </Tilt>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
