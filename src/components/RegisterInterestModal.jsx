import React, { useState } from 'react';

export default function RegisterInterestModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'villa'
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 800);
  };

  // Overlay styles for a glassmorphic background
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '1rem'
  };

  const modalStyle = {
    background: '#FFFFFF',
    padding: '2rem',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '450px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    animation: 'slideUp 0.3s ease-out'
  };

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.8rem 1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.1)',
    background: '#f9f9f9',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.3s'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--text-dark)'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .interest-input:focus {
            border-color: var(--primary-color) !important;
          }
        `}
      </style>
      
      {/* Stop propagation so clicking inside the modal doesn't close it */}
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'rgba(0,0,0,0.5)', transition: 'color 0.3s' }}
          onMouseOver={(e) => e.target.style.color = '#000'}
          onMouseOut={(e) => e.target.style.color = 'rgba(0,0,0,0.5)'}
        >
          &times;
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(211, 185, 138, 0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.5rem' }}>
              ✓
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Request Received</h2>
            <p style={{ color: 'rgba(0,0,0,0.6)', lineHeight: '1.6' }}>
              Thank you for your interest. A Sharan Estates luxury consultant will be in touch with you shortly.
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Register Interest</h2>
            <p style={{ color: 'rgba(0,0,0,0.6)', marginBottom: '2rem' }}>Provide your details below and our advisory team will reach out with exclusive opportunities.</p>

            <form onSubmit={handleSubmit}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input required type="text" name="name" className="interest-input" style={inputStyle} placeholder="John Doe" value={formData.name} onChange={handleChange} />
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <input required type="email" name="email" className="interest-input" style={inputStyle} placeholder="john@example.com" value={formData.email} onChange={handleChange} />
              </div>

              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" name="phone" className="interest-input" style={inputStyle} placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} />
              </div>

              <div>
                <label style={labelStyle}>Primary Interest</label>
                <select name="propertyType" className="interest-input" style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} value={formData.propertyType} onChange={handleChange}>
                  <option value="villa">Luxury Villas</option>
                  <option value="apartment">Penthouses & Apartments</option>
                  <option value="offplan">Off-Plan Investments</option>
                  <option value="commercial">Commercial Real Estate</option>
                </select>
              </div>

              <button type="submit" className="btn-solid" style={{ width: '100%', boxSizing: 'border-box', marginTop: '0.5rem', padding: '1rem', fontSize: '1rem', borderRadius: '8px' }}>
                REQUEST CONSULTATION
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
