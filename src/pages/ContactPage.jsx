import React, { useState, useEffect } from 'react';
import RevealSection from '../components/RevealSection';
import useSEO from '../components/useSEO';

export default function ContactPage() {
  useSEO(
    'Private Consultation',
    'Begin a private conversation with Sharan Private Advisory. Whether searching for a private residence or exploring investment opportunities in Dubai, our advisory team is at your service.'
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Private Residence',
    location: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Interest: ${formData.interest} | Location: ${formData.location || 'Any'} | Budget: ${formData.budget || 'Flexible'}\n\n${formData.message}`,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#FFFFFF', color: '#111111', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* HERO HEADER */}
      <RevealSection>
        <section style={{ padding: 'clamp(3.5rem, 7vw, 5.5rem) 1.5rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', fontWeight: 600, marginBottom: '1rem' }}>
            PRIVATE CONSULTATION
          </p>

          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '1.5px', textTransform: 'uppercase', lineHeight: 1.15, marginBottom: '1.5rem', color: '#111111' }}>
            Begin a Private Conversation.
          </h1>

          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'rgba(0,0,0,0.7)', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto 2rem' }}>
            Whether searching for a private residence, exploring an investment opportunity, or considering your next acquisition, tell us what you're looking for.
          </p>

          <div style={{ width: '40px', height: '1px', background: 'rgba(0,0,0,0.2)', margin: '0 auto' }} />
        </section>
      </RevealSection>

      {/* FORM SECTION */}
      <RevealSection>
        <section style={{ padding: '0 1.5rem clamp(4.5rem, 8vw, 7rem)', maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ background: '#FDFDFB', border: '1px solid rgba(0,0,0,0.08)', padding: 'clamp(2rem, 5vw, 3.5rem)', borderRadius: '2px', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', letterSpacing: '1px', marginBottom: '1rem' }}>
                  Inquiry Received
                </h2>
                <p style={{ color: 'rgba(0,0,0,0.65)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 2rem' }}>
                  Thank you for reaching out. A senior partner from Sharan Private Advisory will contact you discreetly within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{ padding: '0.75rem 2rem', background: '#111111', color: '#FFFFFF', border: 'none', borderRadius: '2px', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 600 }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.6)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Alexander Vance"
                      value={formData.name}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.85rem 1rem', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '2px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.6)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. alexander@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.85rem 1rem', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '2px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.6)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+971 50 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.85rem 1rem', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '2px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.6)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      I'm interested in
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.85rem 1rem', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '2px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                    >
                      <option value="Private Residence">Private Residence (End-User)</option>
                      <option value="Off-Plan Investment">Off-Plan Investment</option>
                      <option value="Off-Market Portfolio">Off-Market Portfolio</option>
                      <option value="Sell Property">List & Sell Property</option>
                      <option value="General Advisory">General Advisory Consultation</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.6)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Palm Jumeirah, Downtown Dubai"
                      value={formData.location}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.85rem 1rem', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '2px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.6)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Target Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.85rem 1rem', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '2px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                    >
                      <option value="">Flexible / Undisclosed</option>
                      <option value="AED 5M - 10M">AED 5,000,000 – 10,000,000</option>
                      <option value="AED 10M - 25M">AED 10,000,000 – 25,000,000</option>
                      <option value="AED 25M - 50M">AED 25,000,000 – 50,000,000</option>
                      <option value="AED 50M+">AED 50,000,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.6)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Brief / Specific Requirements
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your timeline, specific developer preferences, or any confidential requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.85rem 1rem', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '2px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </div>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '1rem 3rem',
                      background: '#111111',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '2px',
                      fontSize: '0.75rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      fontWeight: 600,
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? 'Submitting...' : 'Request Private Consultation →'}
                  </button>
                  <p style={{ fontSize: '0.68rem', color: 'rgba(0,0,0,0.45)', marginTop: '0.85rem' }}>
                    All inquiries are held in strict professional confidence.
                  </p>
                </div>

              </form>
            )}
          </div>
        </section>
      </RevealSection>

    </div>
  );
}
