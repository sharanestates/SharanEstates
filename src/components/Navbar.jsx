import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import RegisterInterestModal from './RegisterInterestModal';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [rentOpen, setRentOpen] = useState(false);
  const [offPlanOpen, setOffPlanOpen] = useState(false);

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--text-dark)' }}>
          SHARAN
        </h1>
        <span style={{ fontSize: '0.7rem', color: 'var(--primary-dark)', letterSpacing: '1px', alignSelf: 'flex-end', paddingBottom: '3px' }}>ESTATES</span>
      </div>
      
      <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
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

      <button className="btn-solid" onClick={() => setIsModalOpen(true)}>Register Interest</button>
      
      <RegisterInterestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
