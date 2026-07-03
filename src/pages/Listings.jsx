import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';

export default function Listings() {
  const { type, category } = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  // Scroll to top and fetch properties on load
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(`${API_BASE}/properties?category=${category}&type=${type}`)
      .then(res => res.json())
      .then(data => {
        setProperties(data || []);
      })
      .catch(err => {
        console.warn('Backend fetch failed:', err.message);
        setProperties([]);
      })
      .finally(() => setLoading(false));
  }, [type, category]);

  return (
    <div style={{ paddingTop: '8rem', minHeight: '100vh', background: 'var(--bg-light)' }}>
      <div className="container">
        
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
            {type.replace('-', ' ')}
          </p>
          <h1 style={{ fontSize: '3.5rem', color: 'var(--text-dark)', fontFamily: 'serif', textTransform: 'capitalize' }}>
            Exclusive {category}
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '1rem auto' }}>
            Browse our curated selection of modern, high-end {category}. Solid architectural designs with premium amenities.
          </p>
        </div>

        {properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text-muted)' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'serif', color: 'var(--text-dark)' }}>No Listings Found</h3>
            <p>Our exclusive portfolio in this category is currently being updated. Please check back shortly or register your interest above.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', paddingBottom: '6rem', maxWidth: '1000px', margin: '0 auto' }}>
            {properties.map(prop => (
              <Tilt key={prop.id} tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.01} transitionSpeed={1000} style={{ height: '100%' }}>
                <Link to={`/property/${prop.id}`} style={{ textDecoration: 'none' }}>
                  <div className="glossy-glass card-3d" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', background: 'rgba(255,255,255,0.8)' }}>
                    
                    <div style={{ height: '200px', position: 'relative' }}>
                      <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: '#FFF', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', backdropFilter: 'blur(5px)' }}>
                        {prop.status || (type === 'off-plan' ? 'Under Construction' : 'Available')}
                      </div>
                    </div>

                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>{prop.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>{prop.desc || prop.description}</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                          <span>🛏️ {prop.beds} Beds</span>
                          <span>🚿 {prop.baths} Baths</span>
                        </div>
                        <h4 style={{ color: 'var(--primary-dark)', fontSize: '1.2rem' }}>{prop.price}</h4>
                      </div>
                    </div>

                  </div>
                </Link>
              </Tilt>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
