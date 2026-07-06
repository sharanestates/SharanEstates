import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Save token & username
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', data.username);
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #1e1b18 0%, #0f0f11 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Blur Spheres for premium look */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(211, 185, 138, 0.1)',
        filter: 'blur(80px)',
        top: '10%',
        left: '20%',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(181, 155, 106, 0.05)',
        filter: 'blur(100px)',
        bottom: '10%',
        right: '15%',
        zIndex: 0
      }} />

      <div className="glossy-glass" style={{
        width: '100%',
        maxWidth: '450px',
        padding: '3rem 2.5rem',
        zIndex: 1,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.03)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{
            fontSize: '2.2rem',
            color: '#FFFFFF',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '1px',
            marginBottom: '0.5rem'
          }}>
            SHARAN ESTATES
          </h2>
          <p style={{
            color: 'var(--primary-color)',
            fontSize: '0.85rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            Admin Control Panel
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#fca5a5',
            padding: '0.8rem 1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '0.5rem'
            }}>
              Username
            </label>
            <input
              type="text"
              required
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1.2rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#FFFFFF',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '0.5rem'
            }}>
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1.2rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#FFFFFF',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-solid"
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '700',
              background: 'var(--primary-color)',
              color: '#000000',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(211, 185, 138, 0.3)'
            }}
          >
            {loading ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD'}
          </button>
        </form>
      </div>
    </div>
  );
}
