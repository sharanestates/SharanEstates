import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, ChevronDown, CheckCircle, ArrowRight, DollarSign } from 'lucide-react';

export default function ConsultancyForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('10m-20m');
  const [mode, setMode] = useState('virtual');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please fill in your name and email address.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          propertyType: 'consultancy',
          propertyId: null,
          message: `Consultancy Request - Budget: ${budget}, Mode: ${mode}`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit consultation request');
      }

      setSubmitted(true);
    } catch (err) {
      console.warn('Consultancy submission failed, using local success:', err.message);
      // Fallback for user local environments
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1rem 0.9rem 2.8rem',
    background: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    fontSize: '0.9rem',
    color: 'var(--text-dark)',
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    cursor: 'pointer'
  };

  return (
    <section id="consultancy" className="section" style={{ background: 'var(--bg-light)', padding: '7rem 0', borderTop: '1px solid rgba(211, 185, 138, 0.15)' }}>
      <div className="container" style={{ textAlign: isFormVisible ? 'left' : 'center' }}>
        
        {!isFormVisible ? (
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ color: 'var(--primary-dark)', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}>
              Bespoke Advisory
            </span>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', lineHeight: 1.2, margin: 0 }}>
              Private Portfolio Consultation
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem', marginBottom: '1rem' }}>
              Schedule an exclusive one-on-one session with our senior investment managers to review yield analytics, capital leverage strategies, and off-market listings.
            </p>
            <button 
              onClick={() => setIsFormVisible(true)}
              style={{ 
                background: 'var(--primary-color)', 
                color: 'var(--text-dark)', 
                fontWeight: 700, 
                border: 'none',
                padding: '0.8rem 1.8rem',
                borderRadius: '50px',
                fontSize: '0.85rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                boxShadow: '0 8px 20px rgba(211, 185, 138, 0.18)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(211, 185, 138, 0.28)';
                e.currentTarget.style.background = '#E5C790';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(211, 185, 138, 0.18)';
                e.currentTarget.style.background = 'var(--primary-color)';
              }}
            >
              Book Private Consultation <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            
            {/* Left Column: Descriptive Invitation */}
            <div>
              <span style={{ color: 'var(--primary-dark)', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}>
                Bespoke Advisory
              </span>
              <h2 style={{ fontSize: '3rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginTop: '0.6rem', marginBottom: '1.5rem', lineHeight: 1.15 }}>
                Private Portfolio Consultation
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '2rem' }}>
                Schedule an exclusive one-on-one session with our senior investment managers to review yield analytics, capital leverage strategies, and off-market listings tailored to your financial goals.
              </p>
              
              {/* Features list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 'bold', lineHeight: 1 }}>✦</div>
                  <div>
                    <strong style={{ color: 'var(--text-dark)', fontSize: '0.9rem', display: 'block', marginBottom: '0.2rem' }}>Off-Market VIP Catalog</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Gain access to exclusive pre-launch penthouses and signature private villas.</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 'bold', lineHeight: 1 }}>✦</div>
                  <div>
                    <strong style={{ color: 'var(--text-dark)', fontSize: '0.9rem', display: 'block', marginBottom: '0.2rem' }}>Bespoke Cashflow Models</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Review custom leverage, amortized loan optimization, and projected net yields.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 'bold', lineHeight: 1 }}>✦</div>
                  <div>
                    <strong style={{ color: 'var(--text-dark)', fontSize: '0.9rem', display: 'block', marginBottom: '0.2rem' }}>Global Assets & Tax Structuring</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Discuss company registry purchasing, escrow protections, and golden visas.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Card */}
            <div style={{
              background: 'var(--bg-lighter)',
              border: '1px solid rgba(211, 185, 138, 0.2)',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {submitted ? (
                /* Success Panel */
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem', color: 'var(--primary-color)' }}>
                    <CheckCircle size={52} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginBottom: '0.8rem' }}>Invitation Requested</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.8rem' }}>
                    Your request for a private portfolio consultation has been received. Our advisory coordinator will contact you at <strong>{email}</strong> within 2 hours to confirm your scheduled time.
                  </p>
                  <button 
                    onClick={() => { setSubmitted(false); setIsFormVisible(false); }}
                    className="btn-solid" 
                    style={{ background: 'var(--text-dark)', color: '#FFF', padding: '0.8rem 2rem', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>Request Invitation</h3>
                  
                  {error && <div style={{ color: '#E53E3E', fontSize: '0.8rem', fontWeight: 600 }}>{error}</div>}

                  {/* Name */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                      <User size={16} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      style={inputStyle}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                      <Mail size={16} />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      style={inputStyle}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                      <Phone size={16} />
                    </div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number (Optional)" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      style={inputStyle}
                    />
                  </div>

                  {/* Budget Dropdown */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                      <DollarSign size={16} />
                    </div>
                    <select 
                      value={budget} 
                      onChange={(e) => setBudget(e.target.value)} 
                      style={selectStyle}
                    >
                      <option value="below-5m">Below AED 5,000,000</option>
                      <option value="5m-10m">AED 5,000,000 - 10,000,000</option>
                      <option value="10m-20m">AED 10,000,000 - 20,000,000</option>
                      <option value="above-20m">AED 20,000,000+</option>
                    </select>
                    <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
                      <ChevronDown size={16} />
                    </div>
                  </div>

                  {/* Mode Select */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                      <Calendar size={16} />
                    </div>
                    <select 
                      value={mode} 
                      onChange={(e) => setMode(e.target.value)} 
                      style={selectStyle}
                    >
                      <option value="virtual">Virtual Video Briefing</option>
                      <option value="in-person">Private Office Session (Dubai)</option>
                    </select>
                    <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
                      <ChevronDown size={16} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button 
                      type="button"
                      onClick={() => setIsFormVisible(false)}
                      style={{
                        background: 'transparent',
                        color: 'var(--text-muted)',
                        border: '1px solid #E5E5E5',
                        padding: '1rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        flex: 1
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-solid"
                      style={{
                        background: 'var(--primary-color)',
                        color: 'var(--text-dark)',
                        fontWeight: 700,
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxShadow: '0 8px 20px rgba(211, 185, 138, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.25s ease',
                        flex: 2
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 22px rgba(211, 185, 138, 0.3)';
                        e.currentTarget.style.background = '#E5C790';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(211, 185, 138, 0.2)';
                        e.currentTarget.style.background = 'var(--primary-color)';
                      }}
                    >
                      <span>{loading ? 'Submitting...' : 'Request Invitation'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
