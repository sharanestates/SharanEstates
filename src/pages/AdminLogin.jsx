import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
      background: '#FAFAFA',
      padding: '2rem',
      position: 'relative',
      fontFamily: 'var(--font-sans)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        padding: '3rem 2.5rem',
        background: '#FFFFFF',
        borderRadius: '6px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img
            src="/logo.png"
            alt="Sharan Estates"
            style={{ height: '48px', width: 'auto', margin: '0 auto 1.25rem', display: 'block' }}
          />
          <h2 style={{
            fontSize: '1.8rem',
            color: '#000000',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '1px',
            marginBottom: '0.4rem',
            textTransform: 'uppercase',
            fontWeight: 300
          }}>
            Advisory Console
          </h2>
          <p style={{
            color: '#64748B',
            fontSize: '0.75rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 600,
            margin: 0
          }}>
            Private Client Wealth Management
          </p>
        </div>

        {error && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            padding: '0.8rem 1rem',
            borderRadius: '4px',
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: 500
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#475569',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '0.5rem'
            }}>
              Administrator Username
            </label>
            <input
              type="text"
              required
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '3px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#0F172A',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000000'}
              onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              color: '#475569',
              fontSize: '0.75rem',
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
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '3px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#0F172A',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000000'}
              onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: '2px',
              border: '1px solid #000000',
              background: '#000000',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              if (!loading) e.currentTarget.style.background = '#262626';
            }}
            onMouseOut={(e) => {
              if (!loading) e.currentTarget.style.background = '#000000';
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Console'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem' }}>
          <Link
            to="/"
            style={{
              color: '#64748B',
              fontSize: '0.75rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.color = '#000000'}
            onMouseOut={(e) => e.target.style.color = '#64748B'}
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
