import React from 'react';

export default function PlaceholderPage({ title, description, email }) {
  return (
    <div style={{ paddingTop: '10rem', minHeight: '80vh', background: 'var(--bg-light)', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
          {title}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
          {description}
        </p>
        
        {email && (
          <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.3)', display: 'inline-block' }}>
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Get in Touch</h3>
            <a href={`mailto:${email}`} style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', fontWeight: 600, textDecoration: 'none' }}>
              {email}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
