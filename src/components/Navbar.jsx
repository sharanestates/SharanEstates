import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import RegisterInterestModal from './RegisterInterestModal';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shouldShowOpaque = isMobile || isScrolled || !isHomePage;

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
    fontSize: '0.72rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    whiteSpace: 'nowrap'
  };

  const buttonStyle = {
    background: shouldShowOpaque ? 'var(--text-dark)' : 'transparent',
    color: '#FFFFFF',
    border: shouldShowOpaque ? '1px solid var(--text-dark)' : '1px solid rgba(255, 255, 255, 0.75)',
    padding: '0.45rem 1.1rem',
    borderRadius: '2px',
    fontSize: '0.68rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap'
  };

  return (
    <nav className="pill-nav" style={{ 
      zIndex: 1000,
      background: navBackground,
      borderBottom: navBorderBottom,
      boxShadow: navShadow,
      backdropFilter: navBlur,
      WebkitBackdropFilter: navBlur,
      transition: 'all 0.3s ease',
      paddingTop: isMobile ? '0.35rem' : (shouldShowOpaque ? '0.45rem' : '0.6rem'),
      paddingBottom: isMobile ? '0.35rem' : (shouldShowOpaque ? '0.45rem' : '0.6rem'),
      paddingLeft: isMobile ? '1rem' : 'clamp(1.5rem, 4vw, 3.5rem)',
      paddingRight: isMobile ? '1rem' : 'clamp(1.5rem, 4vw, 3.5rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <Link to="/" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          color: shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF',
          transition: 'all 0.3s ease',
          backgroundColor: 'transparent'
        }}
        className="navbar-brand-logo"
        onMouseOver={e => {
          e.currentTarget.style.opacity = '0.85';
        }}
        onMouseOut={e => {
          e.currentTarget.style.opacity = '1';
        }}
        >
          <img 
            src={shouldShowOpaque ? '/logo.png' : '/logo-white.png'} 
            alt="Sharan Estates" 
            style={{ 
              height: isMobile ? '26px' : (shouldShowOpaque ? '32px' : '36px'), 
              width: 'auto', 
              objectFit: 'contain',
              display: 'block',
              transition: 'height 0.3s ease'
            }} 
          />
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <ul className="nav-links desktop-nav" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '1.4rem', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/listings/ready" style={linkStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF'}>Buy</Link>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/listings/off-plan" style={linkStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF'}>New Developments</Link>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/area-guide" style={linkStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF'}>Area Guide</Link>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/market-trends" style={linkStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF'}>Market Trends</Link>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/blogs" style={linkStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF'}>Blogs</Link>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/list-with-us" style={linkStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF'}>Sell With Us</Link>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/about" style={linkStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF'}>About Us</Link>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/contact" style={linkStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF'}>Private Client Enquiry</Link>
        </li>
      </ul>

      {/* Speak with an Advisor CTA */}
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
          Speak With An Advisor
        </button>
      </div>

      <button 
        className="mobile-menu-btn" 
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          padding: '0.3rem',
          margin: 0,
          display: isMobile ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          color: shouldShowOpaque ? 'var(--text-dark)' : '#FFFFFF',
          transition: 'color 0.3s ease'
        }} 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={22} strokeWidth={1.5} color={shouldShowOpaque ? '#000000' : '#FFFFFF'} /> : <Menu size={22} strokeWidth={1.5} color={shouldShowOpaque ? '#000000' : '#FFFFFF'} />}
      </button>

      <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/listings/ready" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Buy</Link>
        <Link to="/listings/off-plan" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>New Developments</Link>
        <Link to="/area-guide" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Area Guide</Link>
        <Link to="/market-trends" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Market Trends</Link>
        <Link to="/blogs" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Blogs</Link>
        <Link to="/list-with-us" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Sell With Us</Link>
        <Link to="/about" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>About Us</Link>
        <Link to="/contact" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Private Client Enquiry</Link>

        <div className="mobile-nav-item" style={{ borderBottom: 'none', marginTop: '0.5rem' }}>
          <button className="btn-solid" style={{ width: '100%', fontSize: '0.8rem', padding: '0.9rem 1rem' }} onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}>Speak With An Advisor</button>
        </div>
      </div>
      
      <RegisterInterestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
