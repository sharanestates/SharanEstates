import React from 'react';

/* ────────────────────────────────────────────────────────────
   Each partner object contains a rich SVG logo mark that goes
   beyond a plain text label — it includes monograms, icons,
   and brand-accurate geometry for a classic premium look.
   ──────────────────────────────────────────────────────────── */

const EmaarLogo = () => (
  <svg viewBox="0 0 180 56" fill="currentColor" style={{ height: '36px', width: 'auto' }}>
    {/* Diamond accent above */}
    <polygon points="90,4 96,12 90,20 84,12" opacity="0.85" />
    {/* Wordmark */}
    <text x="90" y="46" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="20" fontWeight="700" letterSpacing="5">EMAAR</text>
  </svg>
);

const MeraasLogo = () => (
  <svg viewBox="0 0 200 56" fill="currentColor" style={{ height: '36px', width: 'auto' }}>
    {/* Stylised 'M' arc mark */}
    <path d="M74 28 L82 12 L90 26 L98 12 L106 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    {/* Wordmark */}
    <text x="100" y="48" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="17" fontWeight="600" letterSpacing="5">MERAAS</text>
  </svg>
);

const NakhéelLogo = () => (
  <svg viewBox="0 0 200 60" fill="currentColor" style={{ height: '38px', width: 'auto' }}>
    {/* Palm frond icon */}
    <g transform="translate(100,4)">
      {/* Centre trunk */}
      <line x1="0" y1="16" x2="0" y2="4" stroke="currentColor" strokeWidth="1.6" />
      {/* Left fronds */}
      <path d="M0,10 Q-8,2 -14,-2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M0,12 Q-10,6 -16,4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Right fronds */}
      <path d="M0,10 Q8,2 14,-2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M0,12 Q10,6 16,4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Top frond */}
      <path d="M0,10 Q0,0 0,-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </g>
    {/* Wordmark */}
    <text x="100" y="52" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="19" fontWeight="600" letterSpacing="4">NAKHEEL</text>
  </svg>
);

const OmniyatLogo = () => (
  <svg viewBox="0 0 200 56" fill="currentColor" style={{ height: '36px', width: 'auto' }}>
    {/* Circle mark — O representing Omniyat's oval brand mark */}
    <circle cx="100" cy="14" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="100" cy="14" r="4" />
    {/* Wordmark */}
    <text x="100" y="48" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="18" fontWeight="600" letterSpacing="4" fontStyle="italic">OMNIYAT</text>
  </svg>
);

const SelectGroupLogo = () => (
  <svg viewBox="0 0 200 60" fill="currentColor" style={{ height: '38px', width: 'auto' }}>
    {/* Bracketed 'S' monogram */}
    <text x="100" y="22" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="14" fontWeight="400" letterSpacing="6">SELECT</text>
    {/* Thin rule */}
    <line x1="62" y1="28" x2="138" y2="28" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <text x="100" y="48" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="14" fontWeight="400" letterSpacing="6">GROUP</text>
  </svg>
);

const EllingtonLogo = () => (
  <svg viewBox="0 0 210 60" fill="currentColor" style={{ height: '38px', width: 'auto' }}>
    {/* E monogram square */}
    <rect x="83" y="3" width="16" height="16" fill="currentColor" />
    <rect x="85" y="7" width="9" height="1.5" fill="white" />
    <rect x="85" y="10" width="7" height="1.5" fill="white" />
    <rect x="85" y="13" width="9" height="1.5" fill="white" />
    {/* Wordmark */}
    <text x="105" y="16" textAnchor="start" fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="14" fontWeight="600" letterSpacing="2">ELLINGTON</text>
    {/* Subtitle */}
    <text x="105" y="30" textAnchor="start" fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="9" fontWeight="400" letterSpacing="3" opacity="0.55">PROPERTIES</text>
    {/* Thin bottom rule */}
    <line x1="83" y1="36" x2="175" y2="36" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
  </svg>
);

const HHLogo = () => (
  <svg viewBox="0 0 200 60" fill="currentColor" style={{ height: '38px', width: 'auto' }}>
    {/* H & H lettermark */}
    <text x="100" y="24" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="26" fontWeight="700" letterSpacing="2">H&amp;H</text>
    {/* Rule */}
    <line x1="64" y1="30" x2="136" y2="30" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <text x="100" y="46" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="9.5" fontWeight="400" letterSpacing="3" opacity="0.65">DEVELOPMENT</text>
  </svg>
);

const SobhaLogo = () => (
  <svg viewBox="0 0 200 60" fill="currentColor" style={{ height: '38px', width: 'auto' }}>
    {/* Stylised hexagonal 'S' emblem */}
    <polygon points="100,4 112,11 112,25 100,32 88,25 88,11"
      fill="none" stroke="currentColor" strokeWidth="1.8" />
    <text x="100" y="22" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="16" fontWeight="700">S</text>
    {/* Wordmark */}
    <text x="100" y="48" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="14" fontWeight="600" letterSpacing="5">SOBHA</text>
  </svg>
);

export default function DeveloperLogos() {
  const partners = [
    { name: 'EMAAR',          Logo: EmaarLogo },
    { name: 'MERAAS',         Logo: MeraasLogo },
    { name: 'NAKHEEL',        Logo: NakhéelLogo },
    { name: 'OMNIYAT',        Logo: OmniyatLogo },
    { name: 'SELECT GROUP',   Logo: SelectGroupLogo },
    { name: 'ELLINGTON',      Logo: EllingtonLogo },
    { name: 'H&H DEVELOPMENT',Logo: HHLogo },
    { name: 'SOBHA REALTY',   Logo: SobhaLogo },
  ];

  return (
    <div className="developer-logos-grid">
      {partners.map((partner) => (
        <div key={partner.name} className="developer-card-item">
          <div className="developer-logo-mark">
            <partner.Logo />
          </div>
        </div>
      ))}
    </div>
  );
}
