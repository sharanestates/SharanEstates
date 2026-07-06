import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';

export default function Listings() {
  const { type, category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  // Scroll to top and fetch properties on load
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    // Build query params
    const params = new URLSearchParams();
    if (category && category !== 'all') {
      params.set('category', category);
    }
    if (type) {
      params.set('type', type);
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    fetch(`${API_BASE}/properties?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setProperties(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.warn('Backend fetch failed:', err.message);
        setProperties([]);
      })
      .finally(() => setLoading(false));
  }, [type, category, searchQuery]);

  // Build a human-readable title
  const typeLabel = type === 'off-plan' ? 'Off-Plan' : type === 'rent' ? 'For Rent' : 'For Sale';
  const categoryLabel = (!category || category === 'all') ? 'Properties' : category;

  return (
    <div style={{ paddingTop: '8rem', minHeight: '100vh', background: 'var(--bg-light)' }}>
      <div className="container">
        
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
            {typeLabel}
          </p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', textTransform: 'capitalize', lineHeight: 1.2, marginTop: '0.5rem' }}>
            {searchQuery ? `Results for "${searchQuery}"` : `Exclusive ${categoryLabel}`}
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '1rem auto' }}>
            {searchQuery 
              ? `Showing ${typeLabel.toLowerCase()} listings matching your search.`
              : `Browse our curated selection of modern, high-end ${categoryLabel}. Solid architectural designs with premium amenities.`
            }
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text-muted)' }}>
            <p>Loading listings...</p>
          </div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text-muted)' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)' }}>No Listings Found</h3>
            <p>
              {searchQuery 
                ? `No properties match "${searchQuery}" in ${typeLabel.toLowerCase()} listings. Try a different search term.`
                : 'Our exclusive portfolio in this category is currently being updated. Please check back shortly or register your interest above.'
              }
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', paddingBottom: '6rem', maxWidth: '1000px', margin: '0 auto' }}>
            {properties.map(prop => (
              <div key={prop.id} style={{ height: '100%' }}>
                <Link to={`/property/${prop.id}`} style={{ textDecoration: 'none' }}>
                  <div className="classic-property-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    
                    <div style={{ height: '180px', position: 'relative' }}>
                      <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '3px', borderTopRightRadius: '3px' }} />
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#FFFFFF', color: 'var(--text-dark)', padding: '0.3rem 0.8rem', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '2px' }}>
                        {prop.status || (type === 'off-plan' ? 'Under Construction' : 'Available')}
                      </div>
                    </div>

                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>{prop.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.2rem', flex: 1 }}>{prop.desc || prop.description}</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(211, 185, 138, 0.2)', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500 }}>
                          <span>{prop.beds} Beds</span>
                          <span>•</span>
                          <span>{prop.baths} Baths</span>
                          {prop.size && <><span>•</span><span>{prop.size}</span></>}
                        </div>
                        <h4 style={{ color: 'var(--primary-dark)', fontSize: '1.15rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{prop.price}</h4>
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
