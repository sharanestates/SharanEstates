import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import RegisterInterestModal from './RegisterInterestModal';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Desktop dropdown states
  const [buyOpen, setBuyOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  
  // Mobile specific dropdown states
  const [mobileBuyOpen, setMobileBuyOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const toggleMobileMenu = (menu) => {
    if (menu === 'buy') {
      setMobileBuyOpen(!mobileBuyOpen);
      setMobileMoreOpen(false);
    } else if (menu === 'more') {
      setMobileMoreOpen(!mobileMoreOpen);
      setMobileBuyOpen(false);
    }
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0,0,0,0.05)',
    borderRadius: '12px',
    padding: '0.5rem 0',
    minWidth: '180px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    zIndex: 1000,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s ease',
    marginTop: '1rem'
  };

  const dropdownItemStyle = {
    padding: '0.8rem 1.5rem',
    color: 'var(--text-dark)',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: 500,
    transition: 'background 0.2s, color 0.2s',
  };

  return (
    <nav className="pill-nav" style={{ zIndex: 1000 }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none' }}>
        <div className="nav-logo-icon-mobile" style={{
          width: '32px', height: '32px', background: 'var(--primary-color)', color: '#FFF', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          borderRadius: '4px', fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: '1.2rem',
          border: '1px solid var(--primary-dark)', boxShadow: '0 2px 8px rgba(211, 185, 138, 0.3)'
        }}>
          S
        </div>
        <div className="nav-logo-text-mobile" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, marginTop: '2px' }}>
          <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '2px', color: 'var(--text-dark)', margin: 0, textTransform: 'uppercase' }}>
            SHARAN
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '2.5px', textTransform: 'uppercase', marginTop: '2px' }}>ESTATES</span>
        </div>
      </Link>
      
      <ul className="nav-links desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
        
        {/* Buy Dropdown */}
        <li 
          style={{ position: 'relative', cursor: 'pointer', padding: '0.5rem 0' }}
          onMouseEnter={() => setBuyOpen(true)}
          onMouseLeave={() => setBuyOpen(false)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Buy <ChevronDown size={14} style={{ transition: 'transform 0.3s', transform: buyOpen ? 'rotate(180deg)' : 'none' }} />
          </div>
          <div style={{ ...dropdownStyle, opacity: buyOpen ? 1 : 0, visibility: buyOpen ? 'visible' : 'hidden', marginTop: buyOpen ? '0.5rem' : '1rem' }}>
            <Link to="/listings/off-plan" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Off-Plan Properties</Link>
            <Link to="/listings/ready" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Ready Properties</Link>
          </div>
        </li>

        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/about" style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0.5rem 0' }}>About Us</Link>
        </li>
        
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/contact" style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0.5rem 0' }}>Contact Us</Link>
        </li>

        {/* More Dropdown */}
        <li 
          style={{ position: 'relative', cursor: 'pointer', padding: '0.5rem 0' }}
          onMouseEnter={() => setMoreOpen(true)}
          onMouseLeave={() => setMoreOpen(false)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
            More <ChevronDown size={14} style={{ transition: 'transform 0.3s', transform: moreOpen ? 'rotate(180deg)' : 'none' }} />
          </div>
          <div style={{ ...dropdownStyle, opacity: moreOpen ? 1 : 0, visibility: moreOpen ? 'visible' : 'hidden', marginTop: moreOpen ? '0.5rem' : '1rem' }}>
            <Link to="/area-guide" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Area Guide</Link>
            <Link to="/market-trends" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Market Trends</Link>
            <Link to="/blogs" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Blogs</Link>
            <Link to="/list-with-us" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>List With Us</Link>
            <Link to="/careers" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Careers</Link>
          </div>
        </li>

      </ul>

      <div className="desktop-nav">
        <button className="btn-solid" onClick={() => setIsModalOpen(true)}>Register Interest</button>
      </div>

      <button className="mobile-menu-btn" style={{ display: 'none' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        
        {/* Mobile Buy */}
        <div className="mobile-nav-item" style={{ display: 'flex', flexDirection: 'column' }}>
          <div 
            onClick={() => toggleMobileMenu('buy')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '0.5rem 0' }}
          >
            <span style={{ color: 'var(--text-dark)', fontSize: '0.95rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Buy</span>
            <ChevronDown size={16} style={{ transition: 'transform 0.3s', transform: mobileBuyOpen ? 'rotate(180deg)' : 'none' }} />
          </div>
          <div style={{ display: mobileBuyOpen ? 'flex' : 'none', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1rem', marginTop: '0.5rem', borderLeft: '2px solid var(--primary-color)' }}>
            <Link to="/listings/off-plan" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Off-Plan Properties</Link>
            <Link to="/listings/ready" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Ready Properties</Link>
          </div>
        </div>

        <Link to="/about" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>About Us</Link>
        <Link to="/contact" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Us</Link>

        {/* Mobile More */}
        <div className="mobile-nav-item" style={{ display: 'flex', flexDirection: 'column' }}>
          <div 
            onClick={() => toggleMobileMenu('more')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '0.5rem 0' }}
          >
            <span style={{ color: 'var(--text-dark)', fontSize: '0.95rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>More</span>
            <ChevronDown size={16} style={{ transition: 'transform 0.3s', transform: mobileMoreOpen ? 'rotate(180deg)' : 'none' }} />
          </div>
          <div style={{ display: mobileMoreOpen ? 'flex' : 'none', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1rem', marginTop: '0.5rem', borderLeft: '2px solid var(--primary-color)' }}>
            <Link to="/area-guide" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Area Guide</Link>
            <Link to="/market-trends" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Market Trends</Link>
            <Link to="/blogs" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Blogs</Link>
            <Link to="/list-with-us" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>List With Us</Link>
            <Link to="/careers" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Careers</Link>
          </div>
        </div>

        <div className="mobile-nav-item" style={{ borderBottom: 'none', marginTop: '0.5rem' }}>
          <button className="btn-solid" style={{ width: '100%' }} onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}>Register Interest</button>
        </div>
      </div>
      
      <RegisterInterestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
