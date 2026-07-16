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
    <footer className={`footer-wrapper ${expanded ? 'expanded' : 'collapsed'}`} style={{ background: '#0a0a0a', color: '#FFFFFF', padding: '3rem 0 1.5rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glow */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, transparent 70%)', zIndex: 0, filter: 'blur(60px)' }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)', zIndex: 0, filter: 'blur(60px)' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        


        {/* Footer Main Grid */}
        <div className="footer-grid-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          
          {/* Brand */}
          <div className="footer-col-mobile" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.1rem',
              border: '1px solid rgba(255, 255, 255, 0.45)',
              padding: '0.7rem 1.4rem',
              borderRadius: '2px',
              color: '#FFFFFF',
              marginBottom: '1.25rem',
              width: 'fit-content'
            }}>
              {/* Left Initials */}
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                fontWeight: 600,
                letterSpacing: '1.5px',
                lineHeight: 1
              }}>
                SE
              </span>

              {/* Vertical Divider */}
              <div style={{
                width: '1px',
                height: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.25)'
              }} />

              {/* Right Brand Name */}
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                fontWeight: 600,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                lineHeight: 1
              }}>
                Sharan Estates
              </span>
            </div>
            <p className="footer-desc-mobile" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Elevating real estate investment through visionary PropTech, interactive 3D modeling, and unparalleled global market intelligence.
            </p>
            <div className="footer-socials-mobile" style={{ display: 'flex', gap: '1.5rem' }}>
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
            <h3 className="footer-h3-mobile" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary-color)', marginBottom: '1.25rem' }}>Explore</h3>
            <ul className="footer-links-list-mobile" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
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
            <h3 className="footer-h3-mobile" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary-color)', marginBottom: '1.25rem' }}>Private Newsletter</h3>
            <p className="footer-desc-mobile" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Subscribe to gain access to exclusive off-market listings, early-stage off-plan releases, and deep market insights.
            </p>
            <div className="footer-newsletter-input-mobile" style={{ display: 'flex', gap: '0.4rem', width: '100%', maxWidth: '380px', background: 'rgba(255,255,255,0.05)', padding: '0.3rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <input type="email" placeholder="Enter your email address" style={{ flex: 1, minWidth: 0, padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', background: 'transparent', color: '#FFF', outline: 'none', fontSize: '0.82rem' }} />
              <button style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: '#FFF', color: '#000', border: 'none', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.3s ease', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                      onMouseOver={(e) => e.target.style.background = 'var(--primary-color)'}
                      onMouseOut={(e) => e.target.style.background = '#FFF'}>
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Disclaimer and bottom section */}
        <div className="footer-bottom-wrapper" style={{ marginTop: '1.5rem' }}>
          <div className="footer-disclaimer-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.54rem', lineHeight: 1.5, margin: 0, textAlign: 'center' }}>
                Disclaimer: Sharan Estates is a real estate agency licensed by the Real Estate Regulatory Agency (RERA) under License Number 1067808 and ORN: 30498. The content provided on this website is for informational purposes only. Renders, virtual tours, and images are for illustrative and representational purposes only and subject to change by developers. Read our full <Link to="/privacy-policy" style={{ color: 'rgba(0,0,0,0.5)', textDecoration: 'underline' }}>Disclaimer & Privacy Policy</Link> and <Link to="/terms-of-service" style={{ color: 'rgba(0,0,0,0.5)', textDecoration: 'underline' }}>Terms of Service</Link>.
              </p>
            </div>
          </div>

          <div className="footer-copyright-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', margin: 0 }}>
              &copy; 2026 Sharan Estates. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <Link to="/privacy-policy" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#FFF'} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.4)'}>Privacy Policy</Link>
              <Link to="/terms-of-service" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#FFF'} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.4)'}>Terms of Service</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
