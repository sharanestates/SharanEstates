import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', color: '#FFFFFF', padding: '4rem 0 2rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glow */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(211, 185, 138, 0.1) 0%, transparent 70%)', zIndex: 0, filter: 'blur(60px)' }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)', zIndex: 0, filter: 'blur(60px)' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '2px', color: '#FFF', margin: 0 }}>
                SHARAN
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)', letterSpacing: '2px', alignSelf: 'flex-end', paddingBottom: '4px' }}>ESTATES</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
              Elevating real estate investment through visionary PropTech, interactive 3D modeling, and unparalleled global market intelligence.
            </p>
            <div style={{ display: 'flex', gap: '2rem' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary-color)', marginBottom: '2rem' }}>Explore</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { name: 'Dashboard', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Rent Listings', path: '/listings/rent/apartments' },
                { name: 'Buy Properties', path: '/listings/buy/villas' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '1.05rem', transition: 'color 0.3s, transform 0.3s', display: 'inline-block' }} 
                     onMouseOver={(e) => { e.target.style.color = '#FFF'; e.target.style.transform = 'translateX(5px)'; }}
                     onMouseOut={(e) => { e.target.style.color = 'rgba(255,255,255,0.7)'; e.target.style.transform = 'translateX(0)'; }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary-color)', marginBottom: '2rem' }}>Private Newsletter</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
              Subscribe to gain access to exclusive off-market listings, early-stage off-plan releases, and deep market insights.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <input type="email" placeholder="Enter your email address" style={{ flex: 1, minWidth: 0, padding: '1rem 1.5rem', borderRadius: '50px', border: 'none', background: 'transparent', color: '#FFF', outline: 'none', fontSize: '1rem' }} />
              <button style={{ padding: '1rem 2rem', borderRadius: '50px', background: '#FFF', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.3s' }}
                      onMouseOver={(e) => e.target.style.background = 'var(--primary-color)'}
                      onMouseOut={(e) => e.target.style.background = '#FFF'}>
                Subscribe
              </button>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.5rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', margin: 0 }}>
            &copy; 2026 Sharan Estates. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#FFF'} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.4)'}>Privacy Policy</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#FFF'} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.4)'}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
