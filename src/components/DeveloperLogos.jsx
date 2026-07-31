import React from 'react';

export default function DeveloperLogos() {
  const partners = [
    {
      name: 'EMAAR',
      subtitle: 'PROPERTIES',
      svg: (
        <svg viewBox="0 0 160 40" fill="currentColor" style={{ height: '22px', width: 'auto' }}>
          <text x="80" y="24" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="22" fontWeight="600" letterSpacing="4">EMAAR</text>
        </svg>
      )
    },
    {
      name: 'MERAAS',
      subtitle: 'HOLDING',
      svg: (
        <svg viewBox="0 0 160 40" fill="currentColor" style={{ height: '22px', width: 'auto' }}>
          <text x="80" y="24" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="22" fontWeight="600" letterSpacing="5">MERAAS</text>
        </svg>
      )
    },
    {
      name: 'NAKHEEL',
      subtitle: 'DEVELOPMENTS',
      svg: (
        <svg viewBox="0 0 160 40" fill="currentColor" style={{ height: '22px', width: 'auto' }}>
          <text x="80" y="24" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="22" fontWeight="600" letterSpacing="4">NAKHEEL</text>
        </svg>
      )
    },
    {
      name: 'OMNIYAT',
      subtitle: 'LUXURY REAL ESTATE',
      svg: (
        <svg viewBox="0 0 160 40" fill="currentColor" style={{ height: '22px', width: 'auto' }}>
          <text x="80" y="24" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="22" fontWeight="600" letterSpacing="4">OMNIYAT</text>
        </svg>
      )
    },
    {
      name: 'SELECT GROUP',
      subtitle: 'DEVELOPMENT',
      svg: (
        <svg viewBox="0 0 180 40" fill="currentColor" style={{ height: '22px', width: 'auto' }}>
          <text x="90" y="24" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="19" fontWeight="600" letterSpacing="3">SELECT GROUP</text>
        </svg>
      )
    },
    {
      name: 'ELLINGTON',
      subtitle: 'PROPERTIES',
      svg: (
        <svg viewBox="0 0 170 40" fill="currentColor" style={{ height: '22px', width: 'auto' }}>
          <text x="85" y="24" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="20" fontWeight="600" letterSpacing="4">ELLINGTON</text>
        </svg>
      )
    },
    {
      name: 'H&H DEVELOPMENT',
      subtitle: 'DUBAI',
      svg: (
        <svg viewBox="0 0 200 40" fill="currentColor" style={{ height: '22px', width: 'auto' }}>
          <text x="100" y="24" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="18" fontWeight="600" letterSpacing="3">H&amp;H DEVELOPMENT</text>
        </svg>
      )
    },
    {
      name: 'SOBHA REALTY',
      subtitle: 'LUXURY HOMES',
      svg: (
        <svg viewBox="0 0 170 40" fill="currentColor" style={{ height: '22px', width: 'auto' }}>
          <text x="85" y="24" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="20" fontWeight="600" letterSpacing="4">SOBHA REALTY</text>
        </svg>
      )
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))',
      gap: '1rem',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {partners.map((partner) => (
        <div
          key={partner.name}
          style={{
            padding: '1.4rem 0.8rem',
            background: '#FDFDFB',
            border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: '2px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            transition: 'all 0.3s ease'
          }}
          className="developer-card-item"
        >
          <div style={{ color: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {partner.svg}
          </div>
          <span style={{
            fontSize: '0.52rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.45)',
            fontWeight: 600
          }}>
            {partner.subtitle}
          </span>
        </div>
      ))}
    </div>
  );
}
