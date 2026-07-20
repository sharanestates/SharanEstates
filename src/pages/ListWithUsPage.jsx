import React, { useState, useEffect } from 'react';
import RevealSection from '../components/RevealSection';
import useSEO from '../components/useSEO';

export default function ListWithUsPage() {
  useSEO(
    'List Your Property',
    'List your luxury villa, penthouse, or apartment with Sharan Estates. Maximize your property value with our premium marketing and network.'
  );
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Villa',
    location: '',
    bedrooms: '3',
    expectedPrice: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      propertyType: form.propertyType.toLowerCase(),
      message: `PROPERTY SUBMISSION details:
• Location: ${form.location}
• Bedrooms: ${form.bedrooms}
• Expected Price: AED ${Number(form.expectedPrice).toLocaleString()}
• Notes: ${form.notes || 'None'}`
    };

    try {
      const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to submit property listing inquiry.');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    border: '1px solid rgba(0, 0, 0,0.3)',
    borderRadius: '3px',
    fontSize: '0.88rem',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    background: '#FAFAF8',
    color: 'var(--text-dark)',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)' }}>
      
      {/* ── HERO ── */}
      <RevealSection>
        <section style={{
          position: 'relative',
          minHeight: '520px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'var(--text-dark)',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 15% 55%, rgba(0, 0, 0,0.06) 0%, transparent 50%), radial-gradient(circle at 85% 25%, rgba(0, 0, 0,0.04) 0%, transparent 40%)',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px', height: '700px',
            border: '1px solid rgba(0, 0, 0,0.05)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: 'clamp(7rem, 14vw, 9rem) 1.5rem clamp(4rem, 8vw, 5rem)',
            maxWidth: '780px',
          }}>
            <div style={{ width: '40px', height: '1px', background: '#eab308', margin: '0 auto 1.5rem' }} />
            <p style={{
              color: '#eab308',
              fontSize: '0.7rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}>
              List Your Property
            </p>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-serif)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              lineHeight: 1.15,
              marginBottom: '1.75rem',
              fontWeight: 300,
            }}>
              Showcase Your Home to<br />
              <span style={{ color: '#eab308' }}>Our Elite Global Network</span>
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              maxWidth: '540px',
              margin: '0 auto 2.5rem',
            }}>
              Get maximum value for your luxury asset. Benefit from high-end media production, data-driven valuations, and targeted marketing campaigns.
            </p>
            <a
              href="#listing-form"
              className="btn-solid"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 2.2rem',
                borderRadius: '3px',
                fontSize: '0.72rem',
                letterSpacing: '2px',
                textDecoration: 'none',
              }}
            >
              Start Listing Process
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
              </svg>
            </a>
          </div>
        </section>
      </RevealSection>

      {/* ── BENEFITS SECTION ── */}
      <RevealSection>
        <section style={{ padding: '3rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--primary-color)', margin: '0 auto 1rem' }} />
            <p style={{
              color: 'var(--primary-dark)',
              fontSize: '0.68rem',
              letterSpacing: '3.5px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}>Why Sharan Estates</p>
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontFamily: 'var(--font-serif)',
              color: 'var(--text-dark)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 300,
              marginBottom: '1rem',
            }}>
              The Sharan Estates Advantage
            </h2>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              maxWidth: '560px',
              margin: '0 auto',
            }}>
              We combine high-touch personal advisory with cutting-edge marketing technologies to achieve premium results for our sellers.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }} className="benefits-grid">
            {[
              {
                title: 'HNW Global Network',
                desc: 'Your property is showcased directly to our exclusive, pre-qualified database of active local and international cash buyers.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                )
              },
              {
                title: 'Premium Media Production',
                desc: 'We produce cinema-grade walkthroughs, drone footage, and architectural photography to showcase your property in its best light.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                  </svg>
                )
              },
              {
                title: '3D & PropTech Marketing',
                desc: 'Allow buyers to explore interactive 3D structures and virtual layouts of your property, securing higher conversion rates.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
                  </svg>
                )
              }
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="advantage-card"
                style={{
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div className="advantage-icon-container">
                  {benefit.icon}
                </div>
                <h3 style={{
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--text-dark)',
                  fontWeight: 300,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}>
                  {benefit.title}
                </h3>
                <div style={{ width: '25px', height: '1px', background: '#eab308', margin: '0.5rem auto 0.75rem' }} />
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* ── THE PROCESS SECTION ── */}
      <RevealSection>
        <section style={{ background: '#FFFFFF', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0, 0, 0,0.12)', borderBottom: '1px solid rgba(0, 0, 0,0.12)' }}>
          <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
              <div style={{ width: '40px', height: '1px', background: '#eab308', margin: '0 auto 1rem' }} />
              <p style={{
                color: 'var(--primary-dark)',
                fontSize: '0.68rem',
                letterSpacing: '3.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}>Step-by-Step</p>
              <h2 style={{
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-dark)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: 300,
                marginBottom: '1rem',
              }}>
                Our Listing Journey
              </h2>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }} className="process-container">
              {[
                { step: '01', title: 'Consultation & Valuation', desc: 'We conduct a detailed market analysis to recommend a competitive, optimized list price.', image: '/list_step_1.png' },
                { step: '02', title: 'Media Production', desc: 'Our creative team captures high-definition cinematic tours, drone shots, and images.', image: '/list_step_2.png' },
                { step: '03', title: 'Bespoke Marketing', desc: 'We launch targeted campaigns across local real estate portals, social channels, and print.', image: '/list_step_3.png' },
                { step: '04', title: 'Sale & Closure', desc: 'We manage all buyer viewings, handle negotiations, and coordinate contract signatures.', image: '/list_step_4.png' }
              ].map((proc, idx) => (
                <div key={idx} style={{ flex: '1 1 220px', position: 'relative', display: 'flex', flexDirection: 'column' }} className="process-step-wrapper">
                  {/* Card Container */}
                  <div className="classic-property-card" style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                    transition: 'all 0.4s ease',
                  }}>
                    {/* Image Area */}
                    <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
                      <img src={proc.image} alt={proc.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} className="step-image-hover" />
                      <div style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                        background: 'rgba(0,0,0,0.85)',
                        color: '#eab308',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 600,
                        border: '1px solid #eab308',
                      }}>
                        {proc.step}
                      </div>
                    </div>
                    {/* Content */}
                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{
                        fontSize: '0.82rem',
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--text-dark)',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem',
                      }}>
                        {proc.title}
                      </h3>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                        {proc.desc}
                      </p>
                    </div>
                  </div>

                  {/* Flowchart Connectors */}
                  {idx < 3 && (
                    <>
                      <div style={{
                        position: 'absolute',
                        top: '70px',
                        right: '-1.1rem',
                        transform: 'translateY(-50%)',
                        color: '#eab308',
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        zIndex: 5,
                        display: 'none',
                      }} className="process-arrow-desktop">
                        →
                      </div>
                      <div style={{
                        color: '#eab308',
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        textAlign: 'center',
                        margin: '0.5rem 0',
                        display: 'none',
                      }} className="process-arrow-mobile">
                        ↓
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── REGISTRATION FORM ── */}
      <RevealSection>
        <section id="listing-form" style={{ padding: '3rem 1.5rem' }}>
        <div style={{
          maxWidth: '620px',
          margin: '0 auto',
          background: '#FFFFFF',
          borderRadius: '4px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0, 0, 0,0.25)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            background: 'var(--text-dark)',
            padding: '1.75rem 2.5rem',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #333333, #FFFFFF, #333333)',
            }} />
            <p style={{
              color: '#CCCCCC',
              fontSize: '0.62rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '0.35rem',
            }}>Property Intake Form</p>
            <h3 style={{
              color: '#fff',
              fontSize: '1.1rem',
              fontFamily: 'var(--font-serif)',
              margin: 0,
              fontWeight: 300,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}>Submit Your Property</h3>
          </div>

          <div style={{ padding: '2.5rem' }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {error && (
                  <div style={{
                    padding: '0.85rem 1rem',
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '4px',
                    color: '#ef4444',
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                  }}>
                    {error}
                  </div>
                )}
                
                {/* Section: Owner Contact */}
                <h4 style={{
                  fontSize: '0.72rem',
                  letterSpacing: '2px',
                  color: 'var(--primary-dark)',
                  borderBottom: '1px solid rgba(0, 0, 0,0.15)',
                  paddingBottom: '0.35rem',
                  marginBottom: '0.5rem',
                }}>Owner Details</h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      placeholder="Your name"
                      className="premium-input"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      placeholder="your@email.com"
                      className="premium-input"
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                    placeholder="+971 50 000 0000"
                    className="premium-input"
                  />
                </div>

                {/* Section: Property Info */}
                <h4 style={{
                  fontSize: '0.72rem',
                  letterSpacing: '2px',
                  color: 'var(--primary-dark)',
                  borderBottom: '1px solid rgba(0, 0, 0,0.15)',
                  paddingBottom: '0.35rem',
                  marginTop: '0.8rem',
                  marginBottom: '0.5rem',
                }}>Property Details</h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
                  <div>
                    <label style={labelStyle}>Property Type *</label>
                    <select
                      value={form.propertyType}
                      onChange={e => setForm({ ...form, propertyType: e.target.value })}
                      style={{ ...inputStyle, height: '42px', padding: '0.5rem 1rem' }}
                      className="premium-input"
                    >
                      <option value="Villa">Villa</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Land / Plot">Land / Plot</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Location / Community *</label>
                    <input
                      type="text"
                      required
                      value={form.location}
                      onChange={e => setForm({ ...form, location: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. Palm Jumeirah"
                      className="premium-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
                  <div>
                    <label style={labelStyle}>Bedrooms *</label>
                    <select
                      value={form.bedrooms}
                      onChange={e => setForm({ ...form, bedrooms: e.target.value })}
                      style={{ ...inputStyle, height: '42px', padding: '0.5rem 1rem' }}
                      className="premium-input"
                    >
                      <option value="Studio">Studio</option>
                      <option value="1">1 Bedroom</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4">4 Bedrooms</option>
                      <option value="5+">5+ Bedrooms</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Expected Price (AED) *</label>
                    <input
                      type="number"
                      required
                      value={form.expectedPrice}
                      onChange={e => setForm({ ...form, expectedPrice: e.target.value })}
                      style={inputStyle}
                      placeholder="Expected price"
                      className="premium-input"
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Additional Notes / Features</label>
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="Provide details about pool, view, layout, etc."
                    className="premium-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-solid"
                  style={{
                    padding: '1rem',
                    borderRadius: '3px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    width: '100%',
                    marginTop: '0.5rem',
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? 'Registering...' : 'Register Property →'}
                </button>

                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
                  By submitting, you agree to allow Sharan Estates to review your property details.
                </p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0,0.12)',
                  border: '2px solid var(--primary-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h4 style={{
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--text-dark)',
                  marginBottom: '0.6rem',
                  fontSize: '1.2rem',
                  fontWeight: 300,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}>Registration Received</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '360px', margin: '0 auto 1.5rem' }}>
                  Thank you for submitting your property. One of our luxury consultants will contact you within 24 hours to schedule a complimentary valuation and consultation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-solid"
                  style={{ padding: '0.7rem 2.5rem', borderRadius: '3px', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px' }}
                >
                  Register Another
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </RevealSection>

      <style>{`
        .advantage-card {
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.06) !important;
          border-radius: 4px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .advantage-card:hover {
          transform: translateY(-6px);
          border-color: rgba(234, 179, 8, 0.3) !important;
          box-shadow: 0 20px 40px rgba(234, 179, 8, 0.06) !important;
        }
        .advantage-icon-container {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(234, 179, 8, 0.05);
          border: 1px solid rgba(234, 179, 8, 0.15) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin-bottom: 1.25rem;
          color: #eab308;
          transition: all 0.4s ease;
        }
        .advantage-icon-container svg {
          display: block;
          margin: 0 auto;
        }
        .advantage-card:hover .advantage-icon-container {
          background: rgba(234, 179, 8, 0.12);
          border-color: rgba(234, 179, 8, 0.3) !important;
          transform: scale(1.05);
        }
        .premium-input {
          transition: all 0.3s ease !important;
          border: 1px solid rgba(0, 0, 0, 0.15) !important;
        }
        .premium-input:focus {
          border-color: #eab308 !important;
          background: #FFFFFF !important;
          box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.12) !important;
          outline: none !important;
        }
        .step-image-hover:hover {
          transform: scale(1.08);
        }
        @media (min-width: 769px) {
          .process-arrow-desktop {
            display: block !important;
          }
        }
        @media (max-width: 768px) {
          .benefits-grid {
            grid-template-columns: 1fr !important;
          }
          .process-container {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          .process-step-wrapper {
            flex: 1 1 100% !important;
          }
          .process-arrow-mobile {
            display: block !important;
          }
          .form-row-2 {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
