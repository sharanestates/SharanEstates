import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InteractiveFloorPlan from '../components/InteractiveFloorPlan';

// ─── Floor Plan Lead Modal ────────────────────────────────────────────────────
function FloorPlanModal({ property, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          propertyType: property.type || 'off-plan',
          propertyId: property.id,
          message: `Floor plan request for: ${property.title}`
        })
      });
      setSubmitted(true);
    } catch (err) {
      // Even if backend fails, show floor plan (graceful degradation)
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div style={{
        background: '#fff', borderRadius: '8px', maxWidth: '520px', width: '100%',
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ background: '#0a0a0a', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--primary-dark)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.25rem' }}>Exclusive Access</p>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-serif)', margin: 0 }}>View Floor Plan</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#888', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1 }}
          >×</button>
        </div>

        <div style={{ padding: '2rem' }}>
          {!submitted ? (
            <>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Please provide your details to access the floor plan for <strong style={{ color: 'var(--text-dark)' }}>{property.title}</strong>.
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. John Smith"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '4px', fontSize: '0.95rem', fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="e.g. +971 50 000 0000"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '4px', fontSize: '0.95rem', fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Email Address *</label>
                  <input
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '4px', fontSize: '0.95rem', fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                {error && <p style={{ color: '#c0392b', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ padding: '0.9rem', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.2s' }}
                >
                  {loading ? 'Submitting...' : 'Access Floor Plan →'}
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Thank you!</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Our team will reach out to you shortly with the complete floor plan and brochure.</p>
              {property.dropbox_link ? (
                <a
                  href={property.dropbox_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', background: '#0a0a0a', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px' }}
                >
                  📥 Download Agent Pack & Floor Plans
                </a>
              ) : (
                <p style={{ color: 'var(--primary-dark)', fontWeight: 600 }}>
                  We'll email you the floor plan within 24 hours.
                </p>
              )}
              <button onClick={onClose} style={{ marginTop: '1rem', display: 'block', width: '100%', padding: '0.7rem', background: 'transparent', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Image Gallery ────────────────────────────────────────────────────────────
function ImageGallery({ images, fallback }) {
  const [active, setActive] = useState(0);
  const allImages = images && images.length > 0 ? images : [fallback || '/listing_villa.webp'];

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Main image */}
      <div style={{ height: '420px', borderRadius: '6px', overflow: 'hidden', marginBottom: '0.75rem', position: 'relative' }}>
        <img
          src={allImages[active]}
          alt="Property"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }}
          onError={e => { e.target.src = fallback || '/listing_villa.webp'; }}
        />
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setActive(a => (a - 1 + allImages.length) % allImages.length)}
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >‹</button>
            <button
              onClick={() => setActive(a => (a + 1) % allImages.length)}
              style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >›</button>
          </>
        )}
      </div>
      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(allImages.length, 4)}, 1fr)`, gap: '0.5rem' }}>
          {allImages.slice(0, 4).map((img, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{ height: '80px', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', opacity: active === i ? 1 : 0.65, border: active === i ? '2px solid var(--primary-dark)' : '2px solid transparent', transition: 'all 0.2s' }}
            >
              <img src={img} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.src = fallback || '/listing_villa.webp'; }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [brochureForm, setBrochureForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [brochureSubmitted, setBrochureSubmitted] = useState(false);
  const [brochureLoading, setBrochureLoading] = useState(false);

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const isNumeric = /^\d+$/.test(id);
    if (isNumeric) {
      fetch(`${API_BASE}/properties/${id}`)
        .then(res => { if (!res.ok) throw new Error('Not found'); return res.json(); })
        .then(data => setProperty(data))
        .catch(() => setProperty(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleBrochureSubmit = async (e) => {
    e.preventDefault();
    setBrochureLoading(true);
    try {
      await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: brochureForm.name,
          email: brochureForm.email,
          phone: brochureForm.phone,
          propertyType: property?.type || 'off-plan',
          propertyId: property?.id,
          message: brochureForm.message || `Brochure request for: ${property?.title}`
        })
      });
    } catch (e) {}
    setBrochureSubmitted(true);
    setBrochureLoading(false);
  };

  const getImages = (prop) => {
    if (!prop) return [];
    if (prop.images && Array.isArray(prop.images) && prop.images.length > 0) return prop.images;
    if (prop.image) return [prop.image, prop.image, prop.image];
    return [];
  };

  const parseFeatures = (f) => {
    if (!f) return [];
    if (Array.isArray(f)) return f;
    try { return JSON.parse(f); } catch { return []; }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-light)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(211,185,138,0.3)', borderTopColor: 'var(--primary-dark)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
        <p style={{ color: 'var(--text-muted)' }}>Loading property details...</p>
      </div>
    </div>
  );

  if (!property) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-light)', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-dark)' }}>Property Not Found</h2>
      <button onClick={() => navigate(-1)} style={{ padding: '0.7rem 1.5rem', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>← Go Back</button>
    </div>
  );

  const images = getImages(property);
  const features = parseFeatures(property.features);
  const isOffPlan = property.type === 'off-plan';

  const sanitizeFloors = (floorsData) => {
    if (!floorsData) return [];
    if (Array.isArray(floorsData)) return floorsData;
    try {
      const parsed = JSON.parse(floorsData);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '7rem', paddingBottom: '5rem' }}>
      {showFloorPlan && <FloorPlanModal property={property} onClose={() => setShowFloorPlan(false)} />}

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
          <span style={{ cursor: 'pointer', color: 'var(--primary-dark)', fontWeight: 600 }} onClick={() => navigate('/')}>Home</span>
          <span>›</span>
          <span style={{ cursor: 'pointer', color: 'var(--primary-dark)', fontWeight: 600 }} onClick={() => navigate(-1)}>
            {property.type === 'off-plan' ? 'Off-Plan' : 'Ready'}
          </span>
          <span>›</span>
          <span style={{ color: 'var(--text-muted)' }}>{property.title}</span>
        </div>

        {/* ── Image Gallery (full width) ── */}
        <ImageGallery images={images} fallback={property.image} />

        {/* ── Two Column Layout ── */}
        <div className="property-grid" style={{ display: 'grid', gridTemplateColumns: isOffPlan ? 'minmax(0,1fr) 380px' : 'minmax(0,1fr) 520px', gap: '3rem', alignItems: 'flex-start' }}>

          {/* ──── LEFT: Property Details ──── */}
          <div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              {property.title}
            </h1>

            {/* Key Metadata Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 1.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
              {property.location && (
                <span><strong style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Location: </strong>{property.location}</span>
              )}
              {(property.property_type || property.category) && (
                <span><strong style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Type: </strong>{property.property_type || property.category}</span>
              )}
              {(property.bedrooms_range || property.beds) && (
                <span><strong style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Bedrooms: </strong>{property.bedrooms_range || property.beds}</span>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 1.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
              {property.handover && (
                <span><strong style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Handover: </strong>{property.handover}</span>
              )}
              {property.payment_plan && (
                <span><strong style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Payment Plan: </strong>{property.payment_plan}</span>
              )}
              {property.price && (
                <span style={{ color: 'var(--text-dark)' }}>
                  <strong style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Starting From: </strong>
                  <strong style={{ color: 'var(--primary-dark)', fontSize: '1.05rem' }}>{property.price}</strong>
                </span>
              )}
            </div>

            {/* Status Badge */}
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ display: 'inline-block', padding: '0.3rem 0.9rem', background: 'rgba(211,185,138,0.15)', color: 'var(--primary-dark)', border: '1px solid rgba(211,185,138,0.4)', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                {property.status || (isOffPlan ? 'Off-Plan' : 'Ready')}
              </span>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>
                Description
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                {property.description}
              </p>
            </div>

            {/* Features & Amenities */}
            {features.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '1.25rem', fontFamily: 'var(--font-sans)' }}>
                  Features & Amenities
                </h2>
                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.7rem', padding: 0, listStyle: 'none', margin: 0 }}>
                  {features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                      <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(211,185,138,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--primary-dark)', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {/* View Floor Plan button */}
              <button
                onClick={() => setShowFloorPlan(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-dark)'}
                onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
              >
                📐 View Floor Plan
              </button>

              {/* Marketing Materials */}
              {property.dropbox_link && (
                <a
                  href={property.dropbox_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', background: 'transparent', color: 'var(--text-dark)', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}
                >
                  📥 Agent Pack
                </a>
              )}
            </div>
          </div>

          {/* ──── RIGHT: Request Brochure Form or Unit Selection ──── */}
          <div style={{ position: 'sticky', top: '8rem', width: '100%' }}>
            {!isOffPlan ? (
              <InteractiveFloorPlan 
                propertyType={property.category === 'villas' ? 'villa' : 'apartment'} 
                floorsData={sanitizeFloors(property.floors)} 
              />
            ) : (
              <div style={{ background: '#0a0a0a', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
                {/* Form Header */}
                <div style={{ padding: '1.75rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ color: 'var(--primary-dark)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.4rem' }}>Get In Touch</p>
                  <h3 style={{ color: '#fff', fontSize: '1.3rem', fontFamily: 'var(--font-serif)', margin: 0 }}>Request Brochure</h3>
                </div>

                {/* Contact Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
                  {[
                    { label: '📞 Call', href: 'tel:+971000000000' },
                    { label: '💬 WhatsApp', href: `https://wa.me/971000000000?text=I'm interested in ${encodeURIComponent(property.title)}` },
                    { label: '✉️ Email', href: 'mailto:info@sharanestates.com' }
                  ].map((btn, i) => (
                    <a
                      key={i}
                      href={btn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.7rem 0.5rem', background: 'rgba(255,255,255,0.05)', color: '#fff', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.5px', transition: 'background 0.2s', textAlign: 'center' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    >
                      {btn.label}
                    </a>
                  ))}
                </div>

                {/* Form */}
                <div style={{ padding: '1.75rem 2rem' }}>
                  {!brochureSubmitted ? (
                    <form onSubmit={handleBrochureSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {[
                        { key: 'name', label: 'Name', type: 'text', placeholder: 'Your full name' },
                        { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+971 50 000 0000' },
                        { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                      ].map(field => (
                        <input
                          key={field.key}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={brochureForm[field.key]}
                          required
                          onChange={e => setBrochureForm({ ...brochureForm, [field.key]: e.target.value })}
                          style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', color: '#fff', fontSize: '0.9rem', fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box' }}
                        />
                      ))}
                      <textarea
                        placeholder="Your message (optional)"
                        rows={3}
                        value={brochureForm.message}
                        onChange={e => setBrochureForm({ ...brochureForm, message: e.target.value })}
                        style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', color: '#fff', fontSize: '0.9rem', fontFamily: 'var(--font-sans)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                      />
                      <button
                        type="submit"
                        disabled={brochureLoading}
                        style={{ padding: '0.9rem', background: 'var(--primary-dark)', color: '#0a0a0a', border: 'none', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s', opacity: brochureLoading ? 0.7 : 1 }}
                      >
                        {brochureLoading ? 'Sending...' : 'Send Request →'}
                      </button>
                      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', textAlign: 'center', margin: 0 }}>
                        Our team typically responds within 2 hours
                      </p>
                    </form>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                      <h4 style={{ color: '#fff', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>Request Received!</h4>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Our specialist will contact you shortly with the brochure and full details.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spin animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @media (max-width: 900px) { .property-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
