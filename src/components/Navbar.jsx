import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import RegisterInterestModal from './RegisterInterestModal';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [rentOpen, setRentOpen] = useState(false);
  const [offPlanOpen, setOffPlanOpen] = useState(false);
  
  // Mobile specific dropdown states
  const [mobileBuyOpen, setMobileBuyOpen] = useState(false);
  const [mobileRentOpen, setMobileRentOpen] = useState(false);
  const [mobileOffPlanOpen, setMobileOffPlanOpen] = useState(false);

  const toggleMobileMenu = (menu) => {
    if (menu === 'buy') {
      setMobileBuyOpen(!mobileBuyOpen);
      setMobileRentOpen(false);
      setMobileOffPlanOpen(false);
    } else if (menu === 'rent') {
      setMobileRentOpen(!mobileRentOpen);
      setMobileBuyOpen(false);
      setMobileOffPlanOpen(false);
    } else if (menu === 'offPlan') {
      setMobileOffPlanOpen(!mobileOffPlanOpen);
      setMobileBuyOpen(false);
      setMobileRentOpen(false);
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
        <div className="nav-logo-text-mobile" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <h1 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '1px', color: 'var(--text-dark)', margin: 0 }}>
            SHARAN
          </h1>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>ESTATES</span>
        </div>
      </Link>
      
      <ul className="nav-links desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ display: 'flex', alignItems: 'center' }}><Link to="/" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>Dashboard</Link></li>
        
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
            <Link to="/listings/buy/apartments" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Apartments</Link>
            <Link to="/listings/buy/penthouses" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Penthouses</Link>
            <Link to="/listings/buy/villas" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Villas</Link>
          </div>
        </li>

        {/* Rent Dropdown */}
        <li 
          style={{ position: 'relative', cursor: 'pointer', padding: '0.5rem 0' }}
          onMouseEnter={() => setRentOpen(true)}
          onMouseLeave={() => setRentOpen(false)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Rent <ChevronDown size={14} style={{ transition: 'transform 0.3s', transform: rentOpen ? 'rotate(180deg)' : 'none' }} />
          </div>
          <div style={{ ...dropdownStyle, opacity: rentOpen ? 1 : 0, visibility: rentOpen ? 'visible' : 'hidden', marginTop: rentOpen ? '0.5rem' : '1rem' }}>
            <Link to="/listings/rent/apartments" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Apartments</Link>
            <Link to="/listings/rent/penthouses" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Penthouses</Link>
            <Link to="/listings/rent/villas" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Villas</Link>
          </div>
        </li>

        {/* Off-Plan Dropdown */}
        <li 
          style={{ position: 'relative', cursor: 'pointer', padding: '0.5rem 0' }}
          onMouseEnter={() => setOffPlanOpen(true)}
          onMouseLeave={() => setOffPlanOpen(false)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Off-Plan <ChevronDown size={14} style={{ transition: 'transform 0.3s', transform: offPlanOpen ? 'rotate(180deg)' : 'none' }} />
          </div>
          <div style={{ ...dropdownStyle, opacity: offPlanOpen ? 1 : 0, visibility: offPlanOpen ? 'visible' : 'hidden', marginTop: offPlanOpen ? '0.5rem' : '1rem' }}>
            <Link to="/listings/off-plan/apartments" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Apartments</Link>
            <Link to="/listings/off-plan/penthouses" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Penthouses</Link>
            <Link to="/listings/off-plan/villas" style={dropdownItemStyle} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = 'var(--text-dark)'}>Villas</Link>
          </div>
        </li>

        <li style={{ display: 'flex', alignItems: 'center' }}><Link to="/#properties" style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0.5rem 0' }}>Catalogue</Link></li>
        <li style={{ display: 'flex', alignItems: 'center' }}><Link to="/about" style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0.5rem 0' }}>About Us</Link></li>
      </ul>

      <div className="desktop-nav">
        <button className="btn-solid" onClick={() => setIsModalOpen(true)}>Register Interest</button>
      </div>

      <button className="mobile-menu-btn" style={{ display: 'none' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500 }}>Dashboard</Link>
        
        {/* Mobile Buy */}
        <div className="mobile-nav-item" style={{ display: 'flex', flexDirection: 'column' }}>
          <div 
            onClick={() => toggleMobileMenu('buy')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '0.5rem 0' }}
          >
            <span style={{ color: 'var(--text-dark)', fontSize: '0.95rem', fontWeight: 500 }}>Buy</span>
            <ChevronDown size={16} style={{ transition: 'transform 0.3s', transform: mobileBuyOpen ? 'rotate(180deg)' : 'none' }} />
          </div>
          <div style={{ display: mobileBuyOpen ? 'flex' : 'none', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1rem', marginTop: '0.5rem', borderLeft: '2px solid var(--primary-color)' }}>
            <Link to="/listings/buy/apartments" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Apartments</Link>
            <Link to="/listings/buy/penthouses" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Penthouses</Link>
            <Link to="/listings/buy/villas" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Villas</Link>
          </div>
        </div>

        {/* Mobile Rent */}
        <div className="mobile-nav-item" style={{ display: 'flex', flexDirection: 'column' }}>
          <div 
            onClick={() => toggleMobileMenu('rent')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '0.5rem 0' }}
          >
            <span style={{ color: 'var(--text-dark)', fontSize: '0.95rem', fontWeight: 500 }}>Rent</span>
            <ChevronDown size={16} style={{ transition: 'transform 0.3s', transform: mobileRentOpen ? 'rotate(180deg)' : 'none' }} />
          </div>
          <div style={{ display: mobileRentOpen ? 'flex' : 'none', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1rem', marginTop: '0.5rem', borderLeft: '2px solid var(--primary-color)' }}>
            <Link to="/listings/rent/apartments" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Apartments</Link>
            <Link to="/listings/rent/penthouses" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Penthouses</Link>
            <Link to="/listings/rent/villas" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Villas</Link>
          </div>
        </div>

        {/* Mobile Off-Plan */}
        <div className="mobile-nav-item" style={{ display: 'flex', flexDirection: 'column' }}>
          <div 
            onClick={() => toggleMobileMenu('offPlan')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '0.5rem 0' }}
          >
            <span style={{ color: 'var(--text-dark)', fontSize: '0.95rem', fontWeight: 500 }}>Off-Plan</span>
            <ChevronDown size={16} style={{ transition: 'transform 0.3s', transform: mobileOffPlanOpen ? 'rotate(180deg)' : 'none' }} />
          </div>
          <div style={{ display: mobileOffPlanOpen ? 'flex' : 'none', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1rem', marginTop: '0.5rem', borderLeft: '2px solid var(--primary-color)' }}>
            <Link to="/listings/off-plan/apartments" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Apartments</Link>
            <Link to="/listings/off-plan/penthouses" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Penthouses</Link>
            <Link to="/listings/off-plan/villas" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Villas</Link>
          </div>
        </div>
        <Link to="/#properties" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500 }}>Catalogue</Link>
        <Link to="/about" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 500 }}>About Us</Link>
        <div className="mobile-nav-item" style={{ borderBottom: 'none', marginTop: '0.5rem' }}>
          <button className="btn-solid" style={{ width: '100%' }} onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}>Register Interest</button>
        </div>
      </div>
      
      <RegisterInterestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
