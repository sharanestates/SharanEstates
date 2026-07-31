import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', color: '#FFFFFF', paddingTop: '3.5rem', paddingBottom: '0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background radial subtle glows */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '35%', height: '35%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(50px)' }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '35%', height: '35%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(50px)' }}></div>

      <div className="footer-inner-container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem', boxSizing: 'border-box' }}>
        
        {/* ── DESKTOP LAYOUT ─────────────────────────────────────── */}
        {/* Row 1: Brand left + Nav columns right */}
        <div className="footer-desktop-top-row">

          {/* Brand + Description + Socials */}
          <div className="footer-brand-col">
            <img 
              src="/logo-white.png" 
              alt="Sharan Estates" 
              className="footer-logo-img"
            />
            <p className="footer-brand-desc">
              Sharan Real Estate was founded on the belief that exceptional real estate is built on trust, discretion, and enduring relationships. Delivering bespoke advisory to homeowners and private investors worldwide.
            </p>
            <div className="footer-social-links">
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <a 
                  key={social} 
                  href="#" 
                  className="footer-social-link"
                  onMouseOver={(e) => { e.target.style.color = '#FFFFFF'; }}
                  onMouseOut={(e) => { e.target.style.color = 'rgba(255,255,255,0.65)'; }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="footer-nav-cols">

            {/* Explore */}
            <div className="footer-nav-col">
              <h4 className="footer-nav-heading">Explore</h4>
              <ul className="footer-nav-list">
                {[
                  { name: 'Buy Ready Properties', path: '/listings/ready' },
                  { name: 'New Developments & Off-Plan', path: '/listings/off-plan' },
                  { name: 'Sell With Us', path: '/list-with-us' },
                  { name: 'Private Client Advisory', path: '/contact' },
                ].map(link => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="footer-nav-link"
                      onMouseOver={(e) => { e.target.style.color = '#FFFFFF'; e.target.style.transform = 'translateX(4px)'; }}
                      onMouseOut={(e) => { e.target.style.color = 'rgba(255,255,255,0.65)'; e.target.style.transform = 'translateX(0)'; }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-nav-col">
              <h4 className="footer-nav-heading">Resources</h4>
              <ul className="footer-nav-list">
                {[
                  { name: 'Dubai Area Guide', path: '/area-guide' },
                  { name: 'Market Intelligence', path: '/market-trends' },
                  { name: 'Perspectives & Articles', path: '/blogs' },
                  { name: 'About Sharan Estates', path: '/about' },
                ].map(link => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="footer-nav-link"
                      onMouseOver={(e) => { e.target.style.color = '#FFFFFF'; e.target.style.transform = 'translateX(4px)'; }}
                      onMouseOut={(e) => { e.target.style.color = 'rgba(255,255,255,0.65)'; e.target.style.transform = 'translateX(0)'; }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Thin Divider */}
        <div className="footer-divider"></div>

        {/* Row 2: Newsletter full-width */}
        <div className="footer-newsletter-row">
          <div className="footer-newsletter-text">
            <h4 className="footer-nav-heading" style={{ marginBottom: '0.35rem' }}>Private Newsletter</h4>
            <p className="footer-newsletter-desc">
              Subscribe to receive discreet access to curated off-market portfolios and exclusive market insights.
            </p>
          </div>
          <div className="footer-newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="footer-email-input"
            />
            <button 
              className="footer-subscribe-btn"
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-color)'}
              onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Thin Divider */}
        <div className="footer-divider"></div>

        {/* ── MOBILE LAYOUT ─────────────────────────────────────── */}
        {/* Mobile-only vertical stack (hidden on desktop) */}
        <div className="footer-mobile-stack">

          <div className="footer-section-brand">
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img src="/logo-white.png" alt="Sharan Estates" className="footer-logo-img" />
            </div>
            <p className="footer-brand-desc">
              Sharan Real Estate was founded on the belief that exceptional real estate is built on trust, discretion, and enduring relationships.
            </p>
            <div className="footer-social-links">
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <a key={social} href="#" className="footer-social-link"
                  onMouseOver={(e) => { e.target.style.color = '#FFFFFF'; }}
                  onMouseOut={(e) => { e.target.style.color = 'rgba(255,255,255,0.65)'; }}>
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-nav-col">
            <h4 className="footer-nav-heading">Explore</h4>
            <ul className="footer-nav-list">
              {[
                { name: 'Buy Ready Properties', path: '/listings/ready' },
                { name: 'New Developments & Off-Plan', path: '/listings/off-plan' },
                { name: 'Sell With Us', path: '/list-with-us' },
                { name: 'Private Client Advisory', path: '/contact' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-nav-link"
                    onMouseOver={(e) => { e.target.style.color = '#FFF'; }}
                    onMouseOut={(e) => { e.target.style.color = 'rgba(255,255,255,0.65)'; }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-nav-col">
            <h4 className="footer-nav-heading">Resources</h4>
            <ul className="footer-nav-list">
              {[
                { name: 'Dubai Area Guide', path: '/area-guide' },
                { name: 'Market Intelligence', path: '/market-trends' },
                { name: 'Perspectives & Articles', path: '/blogs' },
                { name: 'About Sharan Estates', path: '/about' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-nav-link"
                    onMouseOver={(e) => { e.target.style.color = '#FFF'; }}
                    onMouseOut={(e) => { e.target.style.color = 'rgba(255,255,255,0.65)'; }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-newsletter-section-mobile">
            <h4 className="footer-nav-heading">Private Newsletter</h4>
            <p className="footer-newsletter-desc">
              Subscribe to receive discreet access to curated off-market portfolios and market insights.
            </p>
            <div className="footer-newsletter-form">
              <input type="email" placeholder="Enter your email address" className="footer-email-input" />
              <button className="footer-subscribe-btn"
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-color)'}
                onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}>
                Subscribe
              </button>
            </div>
          </div>

          <div className="footer-divider"></div>
        </div>

        {/* ── BOTTOM LEGAL BAR (shared) ─────────────────────────── */}
        <div className="footer-legal-section">
          <p className="footer-disclaimer-text">
            Disclaimer: Sharan Estates is a real estate agency licensed by the Real Estate Regulatory Agency (RERA) under License Number 1067808 and ORN: 30498. The content provided on this website is for informational purposes only. Renders, virtual tours, and images are for illustrative and representational purposes only and subject to change by developers.
          </p>
          <div className="footer-legal-links">
            <Link to="/privacy-policy" className="footer-legal-link"
              onMouseOver={e=>e.target.style.color='#FFF'} 
              onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.6)'}>
              Privacy Policy
            </Link>
            <span className="footer-legal-sep">|</span>
            <Link to="/terms-of-service" className="footer-legal-link"
              onMouseOver={e=>e.target.style.color='#FFF'} 
              onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.6)'}>
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="footer-copyright-bar">
          <p className="footer-copyright-text">
            &copy; 2026 Sharan Estates. All rights reserved.
          </p>
        </div>

        {/* Mobile scroll buffer */}
        <div className="footer-scroll-buffer"></div>

      </div>
    </footer>
  );
}
