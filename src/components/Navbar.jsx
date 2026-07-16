import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import RegisterInterestModal from './RegisterInterestModal';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Desktop dropdown states
  const [buyOpen, setBuyOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  
  // Mobile specific dropdown states
  const [mobileBuyOpen, setMobileBuyOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll(); // initialize
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const shouldShowOpaque = isScrolled || !isHomePage;

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

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
    background: 'rgba(255, 255, 255, 0.96)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(0, 0, 0, 0.25)',
    borderRadius: '4px',
    padding: '0.5rem 0',
    minWidth: '180px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
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
    padding: '0.7rem 1.5rem',
    color: 'var(--text-dark)',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'background 0.2s, color 0.2s',
  };

  const navBackground = shouldShowOpaque 
    ? 'rgba(255, 255, 255, 0.96)' 
    : 'transparent';
  const navBorderBottom = shouldShowOpaque 
    ? '1px solid rgba(0, 0, 0, 0.08)' 
    : 'none';
  const navShadow = shouldShowOpaque ? '0 8px 32px rgba(0, 0, 0, 0.04)' : 'none';
  const navBlur = shouldShowOpaque ? 'blur(15px)' : 'none';

  const linkStyle = {
    color: shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF',
    fontSize: '0.82rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  };

  const buttonStyle = {
    background: shouldShowOpaque ? 'var(--text-dark)' : 'transparent',
    color: '#FFFFFF',
    border: shouldShowOpaque ? '1px solid var(--text-dark)' : '1px solid rgba(255, 255, 255, 0.8)',
    padding: '0.7rem 1.6rem',
    borderRadius: '2px',
    fontSize: '0.82rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  return (
    <nav className="pill-nav" style={{ 
      zIndex: 1000,
      background: navBackground,
      borderBottom: navBorderBottom,
      boxShadow: navShadow,
      backdropFilter: navBlur,
      WebkitBackdropFilter: navBlur,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      paddingTop: shouldShowOpaque ? '0.4rem' : '0.8rem',
      paddingBottom: shouldShowOpaque ? '0.4rem' : '0.8rem',
      paddingLeft: 'clamp(1rem, 4vw, 3.5rem)',
      paddingRight: 'clamp(1rem, 4vw, 3.5rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%'
    }}>
      <Link to="/" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.1rem',
          border: shouldShowOpaque ? '1px solid var(--text-dark)' : '1px solid rgba(255, 255, 255, 0.8)',
          padding: '0.7rem 1.4rem',
          borderRadius: '2px',
          color: shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF',
          transition: 'all 0.4s ease',
          backgroundColor: 'transparent'
        }}
        className="navbar-brand-logo"
        onMouseOver={e => {
          e.currentTarget.style.borderColor = '#FFFFFF';
          e.currentTarget.style.background = shouldShowOpaque ? 'var(--text-dark)' : 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.color = shouldShowOpaque ? '#FFFFFF' : '#FFFFFF';
        }}
        onMouseOut={e => {
          e.currentTarget.style.borderColor = shouldShowOpaque ? 'var(--text-dark)' : 'rgba(255, 255, 255, 0.8)';
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF';
        }}
        >
          {/* Left Initials */}
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.6rem',
            fontWeight: 600,
            letterSpacing: '1.5px',
            lineHeight: 1,
            transition: 'color 0.4s ease'
          }}>
            SE
          </span>

          {/* Vertical Divider */}
          <div className="logo-divider-desktop" style={{
            width: '1px',
            height: '24px',
            backgroundColor: shouldShowOpaque ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.35)',
            transition: 'background-color 0.4s ease'
          }} />

          {/* Right Brand Name */}
          <span className="logo-text-desktop" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontWeight: 600,
            letterSpacing: '3.5px',
            textTransform: 'uppercase',
            lineHeight: 1,
            transition: 'color 0.4s ease'
          }}>
            Sharan Estates
          </span>
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <ul className="nav-links desktop-nav" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
        
        {/* Buy Dropdown */}
        <li 
          style={{ position: 'relative', cursor: 'pointer', padding: '0.5rem 0' }}
          onMouseEnter={() => setBuyOpen(true)}
          onMouseLeave={() => setBuyOpen(false)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.2px', transition: 'color 0.3s ease' }}>
            Buy <ChevronDown size={12} style={{ transition: 'transform 0.3s', transform: buyOpen ? 'rotate(180deg)' : 'none', opacity: 0.8 }} />
          </div>
          <div style={{ ...dropdownStyle, opacity: buyOpen ? 1 : 0, visibility: buyOpen ? 'visible' : 'hidden', marginTop: buyOpen ? '0.5rem' : '1rem' }}>
            <Link to="/listings/off-plan" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Off-Plan Properties</Link>
            <Link to="/listings/ready" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Ready Properties</Link>
          </div>
        </li>

        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/about" style={linkStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF'}>About Us</Link>
        </li>
        
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/contact" style={linkStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF'}>Contact Us</Link>
        </li>
        
        {/* More Dropdown */}
        <li 
          style={{ position: 'relative', cursor: 'pointer', padding: '0.5rem 0' }}
          onMouseEnter={() => setMoreOpen(true)}
          onMouseLeave={() => setMoreOpen(false)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.2px', transition: 'color 0.3s ease' }}>
            More <ChevronDown size={12} style={{ transition: 'transform 0.3s', transform: moreOpen ? 'rotate(180deg)' : 'none', opacity: 0.8 }} />
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

      {/* Register Interest CTA */}
      <div className="desktop-nav">
        <button 
          style={buttonStyle} 
          onClick={() => setIsModalOpen(true)}
          onMouseOver={e => { 
            e.currentTarget.style.background = '#FFFFFF'; 
            e.currentTarget.style.color = '#000000'; 
            e.currentTarget.style.borderColor = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF'; 
          }}
          onMouseOut={e => { 
            e.currentTarget.style.background = shouldShowOpaque ? 'var(--text-dark)' : 'transparent'; 
            e.currentTarget.style.color = '#FFFFFF'; 
            e.currentTarget.style.borderColor = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF'; 
          }}
        >
          Register Interest
        </button>
      </div>

      <button 
        className="mobile-menu-btn" 
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          padding: '0.5rem',
          color: shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF' 
        }} 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} strokeWidth={1.25} /> : <Menu size={24} strokeWidth={1.25} />}
      </button>

      <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        
        <Link to="/listings/off-plan" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Explore Off-Plan</Link>
        <Link to="/listings/ready" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Explore Ready Property</Link>

        <Link to="/about" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>About Us</Link>
        <Link to="/contact" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Us</Link>

        <Link to="/area-guide" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Area Guide</Link>
        <Link to="/market-trends" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Market Trends</Link>
        <Link to="/blogs" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Blogs</Link>
        <Link to="/list-with-us" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>List With Us</Link>
        <Link to="/careers" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Careers</Link>

        <div className="mobile-nav-item" style={{ borderBottom: 'none', marginTop: '0.5rem' }}>
          <button className="btn-solid" style={{ width: '100%' }} onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}>Register Interest</button>
        </div>
      </div>
      
      <RegisterInterestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
