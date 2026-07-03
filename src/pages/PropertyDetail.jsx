import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InteractiveFloorPlan from '../components/InteractiveFloorPlan';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    const isNumeric = /^\d+$/.test(id);
    if (isNumeric) {
      fetch(`${API_BASE}/properties/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Property not found');
          return res.json();
        })
        .then(data => {
          setProperty(data);
        })
        .catch(err => {
          console.warn('Backend fetch failed for property detail, using fallback:', err.message);
          loadMockProperty(id);
        })
        .finally(() => setLoading(false));
    } else {
      loadMockProperty(id);
      setLoading(false);
    }
  }, [id]);

  const loadMockProperty = (propId) => {
    const isVilla = propId && propId.includes('villa');
    setProperty({
      id: propId,
      title: isVilla ? "The Oasis Concrete Villa" : "Skyline Stone Residences",
      description: isVilla 
        ? "A solid, modern architectural masterpiece with brutalist aesthetics and warm wood accents."
        : "Premium high-rise with a concrete and stone facade, integrating vertical gardens and solid structural elements.",
      location: 'Prime District',
      status: 'Available',
      image: isVilla ? '/listing_villa.png' : '/listing_apt.png',
      category: isVilla ? 'villas' : 'apartments'
    });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-light)' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-light)' }}>
        <p style={{ color: 'var(--text-muted)' }}>Property not found.</p>
      </div>
    );
  }

  const isVilla = property.category === 'villas';
  const name = property.title;
  const desc = property.description;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-light)' }}>
      
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', flex: 1, alignItems: 'flex-start', gap: '4rem', paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Left Side: Info */}
        <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', position: 'sticky', top: '8rem' }}>
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem', cursor: 'pointer' }} onClick={() => navigate(-1)}>
            &larr; Back to Listings / {isVilla ? 'Villa' : 'Apartment'}
          </p>
          <h1 style={{ fontSize: '3.5rem', color: 'var(--text-dark)', fontFamily: 'serif', lineHeight: 1.1, marginBottom: '1rem' }}>
            {name}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            {desc}
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1, padding: '1rem 1.5rem', background: '#FFF', border: '1px solid #EAEAEA', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <strong style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Location</strong>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-dark)' }}>{property.location || 'Prime District'}</span>
            </div>
            <div style={{ flex: 1, padding: '1rem 1.5rem', background: '#FFF', border: '1px solid #EAEAEA', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <strong style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Status</strong>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary-dark)' }}>{property.status || 'Available'}</span>
            </div>
          </div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '300px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
             <img src={property.image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = isVilla ? '/listing_villa.png' : '/listing_apt.png' }} />
          </div>
        </div>

        {/* Right Side: Interactive Floor Plan */}
        <div style={{ flex: '1 1 500px', minHeight: '600px' }}>
           <InteractiveFloorPlan propertyType={isVilla ? 'villa' : 'apartment'} />
        </div>

      </div>
    </div>
  );
}
