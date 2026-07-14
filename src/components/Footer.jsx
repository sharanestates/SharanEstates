import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [expanded, setExpanded] = useState(false);

  const toggleFooter = () => {
    setExpanded(!expanded);
    if (!expanded) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <footer className={`footer-wrapper ${expanded ? 'expanded' : 'collapsed'}`} style={{ background: '#0a0a0a', color: '#FFFFFF', padding: '4rem 0 2rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glow */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(211, 185, 138, 0.1) 0%, transparent 70%)', zIndex: 0, filter: 'blur(60px)' }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)', zIndex: 0, filter: 'blur(60px)' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Mobile-only toggle header */}
        <div 
          className="show-on-mobile-only" 
          onClick={toggleFooter}
          style={{ cursor: 'pointer', marginBottom: '1rem' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className={`swipe-up-handle ${expanded ? 'expanded' : ''}`} style={{ marginBottom: '0.5rem' }}>
              <div className="swipe-chevron"></div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: 0, textAlign: 'center' }}>
              &copy; 2026 Sharan Estates. All rights reserved.
            </p>
          </div>
        </div>

        {/* Footer Main Grid */}
        <div className="footer-grid-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          
          {/* Brand */}
          <div className="footer-col-mobile" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="footer-brand-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '2px', color: '#FFF', margin: 0 }}>
                SHARAN
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)', letterSpacing: '2px', alignSelf: 'flex-end', paddingBottom: '4px' }}>ESTATES</span>
            </div>
            <p className="footer-desc-mobile" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '2.5rem' }}>
              Elevating real estate investment through visionary PropTech, interactive 3D modeling, and unparalleled global market intelligence.
            </p>
            <div className="footer-socials-mobile" style={{ display: 'flex', gap: '2rem' }}>
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <a key={social} href="#" style={{ color: '#FFF', textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, transition: 'color 0.3s' }}
                   onMouseOver={(e) => e.target.style.color = 'var(--primary-color)'}
                   onMouseOut={(e) => e.target.style.color = '#FFF'}>
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="footer-col-mobile" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="footer-h3-mobile" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary-color)', marginBottom: '2rem' }}>Explore</h3>
            <ul className="footer-links-list-mobile" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { name: 'Dashboard', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Off-Plan Properties', path: '/listings/off-plan' },
                { name: 'Ready Properties', path: '/listings/ready' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s, transform 0.3s', display: 'inline-block' }} 
                     onMouseOver={(e) => { e.target.style.color = '#FFF'; e.target.style.transform = 'translateX(5px)'; }}
                     onMouseOut={(e) => { e.target.style.color = 'rgba(255,255,255,0.7)'; e.target.style.transform = 'translateX(0)'; }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col-mobile" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="footer-h3-mobile" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary-color)', marginBottom: '2rem' }}>Private Newsletter</h3>
            <p className="footer-desc-mobile" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '2rem' }}>
              Subscribe to gain access to exclusive off-market listings, early-stage off-plan releases, and deep market insights.
            </p>
            <div className="footer-newsletter-input-mobile" style={{ display: 'flex', gap: '0.5rem', width: '100%', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <input type="email" placeholder="Enter your email address" style={{ flex: 1, minWidth: 0, padding: '1rem 1.5rem', borderRadius: '4px', border: 'none', background: 'transparent', color: '#FFF', outline: 'none', fontSize: '0.9rem' }} />
              <button style={{ padding: '0.8rem 1.5rem', borderRadius: '4px', background: '#FFF', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.3s', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}
                      onMouseOver={(e) => e.target.style.background = 'var(--primary-color)'}
                      onMouseOut={(e) => e.target.style.background = '#FFF'}>
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Desktop-only disclaimer and bottom section */}
        <div className="hide-on-mobile" style={{ marginTop: '2.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <h4 style={{ fontSize: '0.72rem', color: 'var(--primary-color)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                Disclaimer & Legal Notice
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', lineHeight: 1.6, margin: 0 }}>
                This website is owned and managed by K Estates L.L.C, a real estate agency fully authorized and licensed by the Real Estate Regulatory Agency (RERA) under License Number 1067808 and ORN: 30498. The content provided on this website is for informational purposes only and does not constitute a formal offer, financial advice, or an investment guarantee. All property details, including pricing, payment plans, and availability, are subject to change by the developers without prior notice. Images, renders, and virtual tours are for illustrative and representational purposes only.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.72rem', color: 'var(--primary-color)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                Data Privacy
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', lineHeight: 1.6, margin: 0 }}>
                By submitting your contact information, you authorize K Estates L.L.C to share your details with RERA-registered developers or relevant third parties as necessary to fulfill your request. We may contact you via your registered mobile number or email with project updates and marketing materials.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.72rem', color: 'var(--primary-color)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                Copyright
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', lineHeight: 1.6, margin: 0 }}>
                All website design, text, and graphics are protected by UAE Intellectual Property laws. Any unauthorized reproduction is strictly prohibited. For official inquiries or to verify current property status, please contact us directly using the information provided on our official contact page.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', margin: 0 }}>
              &copy; 2026 Sharan Estates. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#FFF'} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.4)'}>Privacy Policy</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#FFF'} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.4)'}>Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Mobile expanded bottom section */}
        <div className="show-on-mobile-only">
          {expanded && (
            <div className="footer-bottom-mobile" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.5rem' }}>
              <div className="footer-policy-links" style={{ display: 'flex', gap: '2rem' }}>
                <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</a>
              </div>
            </div>
          )}
        </div>

      </div>
    </footer>
  );
}
