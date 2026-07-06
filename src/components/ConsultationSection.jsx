import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ConsultationSection() {
  const [showMobileForm, setShowMobileForm] = useState(false);

  return (
    <section className="section consultation-section" style={{ background: 'var(--primary-light)', padding: '6rem 0' }}>
      <div className="container consultation-container consultation-card-mobile" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Left Side: Copy */}
        <div className="w-full-mobile" style={{ flex: '1 1 min(100%, 450px)', paddingRight: '1rem' }}>
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
            Bespoke Advisory
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Private Portfolio<br />Consultation
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Schedule an exclusive one-on-one session with our senior investment managers to review yield analytics, capital leverage strategies, and off-market listings tailored to your financial goals.
          </p>

          <div className="hide-on-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--primary-color)', fontSize: '1.2rem', marginTop: '2px' }}>✦</div>
              <div>
                <h4 style={{ color: 'var(--text-dark)', fontSize: '1rem', marginBottom: '0.3rem' }}>Off-Market VIP Catalog</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Gain access to exclusive pre-launch penthouses and signature private villas.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--primary-color)', fontSize: '1.2rem', marginTop: '2px' }}>✦</div>
              <div>
                <h4 style={{ color: 'var(--text-dark)', fontSize: '1rem', marginBottom: '0.3rem' }}>Bespoke Cashflow Models</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Review custom leverage, amortized loan optimization, and projected net yields.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--primary-color)', fontSize: '1.2rem', marginTop: '2px' }}>✦</div>
              <div>
                <h4 style={{ color: 'var(--text-dark)', fontSize: '1rem', marginBottom: '0.3rem' }}>Global Assets & Tax Structuring</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Discuss company registry purchasing, escrow protections, and golden visas.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Consultation Form */}
        <div className="w-full-mobile consultation-right-col" style={{ flex: '1 1 min(100%, 450px)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className={`show-on-mobile-only ${showMobileForm ? 'hide-form-mobile' : ''}`} style={{ width: '100%' }}>
            <button onClick={() => setShowMobileForm(true)} className="btn-solid consultation-toggle-btn" style={{ width: '100%', padding: '1.2rem', fontSize: '0.9rem' }}>
              REQUEST CONSULTATION
            </button>
          </div>

          <div className={`consultation-form-mobile ${!showMobileForm ? 'hide-form-mobile' : ''}`} style={{ 
            background: '#FFFFFF', 
            borderRadius: '16px', 
            padding: '3rem', 
            width: '100%', 
            maxWidth: '480px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.04)'
          }}>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', marginBottom: '2rem' }}>Request Invitation</h3>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <input 
                type="text" 
                placeholder="Full Name" 
                style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '0.95rem', outline: 'none' }} 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '0.95rem', outline: 'none' }} 
              />
              <input 
                type="tel" 
                placeholder="Phone Number (Optional)" 
                style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '0.95rem', outline: 'none' }} 
              />
              
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '0.95rem', outline: 'none', appearance: 'none', background: 'transparent' }}>
                  <option value="">$ AED 5,000,000 - 10,000,000</option>
                  <option value="">$ AED 10,000,000 - 20,000,000</option>
                  <option value="">$ AED 20,000,000 - 50,000,000</option>
                  <option value="above">Above AED 50,000,000</option>
                </select>
                <ChevronDown size={16} color="#888" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>

              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <select style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '0.95rem', outline: 'none', appearance: 'none', background: 'transparent' }}>
                  <option value="video">Virtual Video Briefing</option>
                  <option value="in_person">In-Person Consultation</option>
                </select>
                <ChevronDown size={16} color="#888" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>

              <button type="button" className="btn-solid" style={{ width: '100%', padding: '1.2rem', fontSize: '0.9rem', letterSpacing: '1.5px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-color)', color: 'var(--text-dark)' }}>
                REQUEST ADVISORY INVITATION →
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
