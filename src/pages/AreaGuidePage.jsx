import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RevealSection from '../components/RevealSection';
import useSEO from '../components/useSEO';

const areas = [
  {
    id: 'downtown-dubai',
    name: 'Downtown Dubai',
    image: '/areas/downtown_dubai.webp',
    tagline: 'The Centre of Now',
    propertyTypes: 'Apartments, Penthouses',
    priceFrom: 'AED 1.2M',
    highlights: ['Burj Khalifa', 'Dubai Mall', 'Dubai Fountain', 'Opera District'],
    description: 'Home to the world\'s tallest building and Dubai\'s premier address. A vibrant mix of luxury residences, fine dining, and world-class entertainment.',
  },
  {
    id: 'dubai-marina',
    name: 'Dubai Marina',
    image: '/areas/dubai_marina.webp',
    tagline: 'Waterfront Living Redefined',
    propertyTypes: 'Apartments, Penthouses',
    priceFrom: 'AED 900K',
    highlights: ['Marina Walk', 'JBR Beach', 'The Beach Mall', 'Yacht Club'],
    description: 'An iconic waterfront community featuring a stunning man-made marina, luxury towers, and a vibrant lifestyle scene along the Arabian Gulf.',
  },
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    image: '/areas/palm_jumeirah.webp',
    tagline: 'The Eighth Wonder',
    propertyTypes: 'Villas, Apartments, Penthouses',
    priceFrom: 'AED 2.5M',
    highlights: ['Atlantis', 'Private Beaches', 'The Pointe', 'Nakheel Mall'],
    description: 'The world\'s largest man-made island offering unparalleled beachfront living with panoramic views of the Arabian Gulf skyline.',
  },
  {
    id: 'business-bay',
    name: 'Business Bay',
    image: '/areas/business_bay.webp',
    tagline: 'Where Business Meets Lifestyle',
    propertyTypes: 'Apartments, Offices',
    priceFrom: 'AED 750K',
    highlights: ['Dubai Canal', 'Bay Avenue', 'Marasi Drive', 'Business Hub'],
    description: 'Dubai\'s central business district extending along the Dubai Canal, blending commercial towers with premium residential living.',
  },
  {
    id: 'jumeirah-beach-residence',
    name: 'Jumeirah Beach Residence',
    image: '/areas/jumeirah_beach.webp',
    tagline: 'Beachfront Boulevard',
    propertyTypes: 'Apartments, Penthouses',
    priceFrom: 'AED 1.1M',
    highlights: ['The Walk', 'Ain Dubai', 'Beach Access', 'Bluewaters'],
    description: 'A dynamic beachfront community with a 1.7km stretch of pristine sand, offering resort-style living steps from the ocean.',
  },
  {
    id: 'emirates-hills',
    name: 'Emirates Hills',
    image: '/areas/emirates_hills.webp',
    tagline: 'The Beverly Hills of Dubai',
    propertyTypes: 'Luxury Villas',
    priceFrom: 'AED 15M',
    highlights: ['Montgomerie Golf', 'Gated Community', 'Lake Views', 'Ultra-Luxury'],
    description: 'Dubai\'s most exclusive gated community featuring sprawling mansions, championship golf courses, and unmatched privacy for ultra-high-net-worth residents.',
  },
  {
    id: 'dubai-hills-estate',
    name: 'Dubai Hills Estate',
    image: '/areas/dubai_hills.webp',
    tagline: 'Modern Family Living',
    propertyTypes: 'Villas, Apartments, Townhouses',
    priceFrom: 'AED 1.0M',
    highlights: ['Dubai Hills Mall', '18-Hole Golf', 'Central Park', 'King\'s College'],
    description: 'A master-planned mega-development by Emaar offering the perfect balance of urban convenience and suburban tranquillity.',
  },
  {
    id: 'arabian-ranches',
    name: 'Arabian Ranches',
    image: '/areas/arabian_ranches.webp',
    tagline: 'Desert-Inspired Elegance',
    propertyTypes: 'Villas, Townhouses',
    priceFrom: 'AED 2.0M',
    highlights: ['Arabian Ranches Golf', 'Equestrian Centre', 'Community Parks', 'Retail Village'],
    description: 'A prestigious desert-inspired villa community offering spacious homes, world-class golf, and equestrian facilities in a tranquil setting.',
  },
  {
    id: 'creek-harbour',
    name: 'Dubai Creek Harbour',
    image: '/areas/creek_harbour.webp',
    tagline: 'The New Icon',
    propertyTypes: 'Apartments, Penthouses, Villas',
    priceFrom: 'AED 1.3M',
    highlights: ['Creek Tower', 'Ras Al Khor', 'Island Park', 'Harbour Retail'],
    description: 'A visionary waterfront development set to become Dubai\'s next iconic address, blending nature with futuristic architecture.',
  },
  {
    id: 'difc',
    name: 'DIFC',
    image: '/areas/difc.webp',
    tagline: 'Financial & Cultural Hub',
    propertyTypes: 'Apartments, Lofts',
    priceFrom: 'AED 1.8M',
    highlights: ['Gate District', 'Art Galleries', 'Fine Dining', 'Financial Hub'],
    description: 'The financial centre of the Middle East, offering sophisticated urban living amid world-class galleries, restaurants, and corporate headquarters.',
  },
  {
    id: 'meydan',
    name: 'Meydan',
    image: '/areas/meydan.webp',
    tagline: 'Legacy of Champions',
    propertyTypes: 'Villas, Apartments, Townhouses',
    priceFrom: 'AED 1.5M',
    highlights: ['Meydan Racecourse', 'Crystal Lagoon', 'MBR City', 'District One'],
    description: 'Anchored by the world-famous racecourse, Meydan is evolving into a premium lifestyle destination with crystal lagoons and luxury villas.',
  },
  {
    id: 'bluewaters-island',
    name: 'Bluewaters Island',
    image: '/areas/bluewaters_island.webp',
    tagline: 'Island Sophistication',
    propertyTypes: 'Apartments, Penthouses',
    priceFrom: 'AED 2.2M',
    highlights: ['Ain Dubai', 'Cove Beach', 'Retail Promenade', 'Island Living'],
    description: 'A boutique island destination home to Ain Dubai, offering exclusive waterfront residences with panoramic sea and skyline views.',
  },
];

function AreaCard({ area, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <RevealSection delay={index * 40} style={{ width: '100%' }}>
      <Link to={`/area-guide/${area.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          className="area-guide-card"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: 'relative',
            borderRadius: '4px',
            overflow: 'hidden',
            aspectRatio: '4 / 3',
            cursor: 'pointer',
            boxShadow: hovered ? '0 20px 50px rgba(0,0,0,0.2)' : '0 4px 15px rgba(0,0,0,0.08)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          }}
        >
          {/* Image */}
          <img
            src={area.image}
            alt={area.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />

          {/* Dark gradient overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: hovered
              ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.15) 100%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
            transition: 'background 0.5s',
          }} />

          {/* Content */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: hovered ? '1.75rem' : '1.25rem',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            {/* Tagline - only shows on hover */}
            <p style={{
              color: 'var(--primary-color)',
              fontSize: '0.6rem',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '0.35rem',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.4s ease 0.1s',
            }}>
              {area.tagline}
            </p>

            {/* Area Name */}
            <h3 style={{
              color: '#FFFFFF',
              fontSize: hovered ? '1.1rem' : '0.95rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: 0,
              transition: 'all 0.4s',
              marginBottom: hovered ? '0.6rem' : '0',
            }}>
              {area.name}
            </h3>

            {/* Extra info on hover */}
            <div style={{
              overflow: 'hidden',
              maxHeight: hovered ? '80px' : '0',
              opacity: hovered ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.5px' }}>
                  {area.propertyTypes}
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--primary-color)', fontWeight: 600, letterSpacing: '1px' }}>
                  From {area.priceFrom}
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary-color)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}>
                Explore Area
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </RevealSection>
  );
}


export default function AreaGuidePage() {
  useSEO(
    'Dubai Area Guides',
    'Explore Dubai\'s premier residential communities, from beachfront waterfronts to luxury villa communities and emerging areas.'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Waterfront', 'Urban', 'Villa Communities', 'Emerging'];

  const categoryMap = {
    'Waterfront': ['dubai-marina', 'palm-jumeirah', 'jumeirah-beach-residence', 'bluewaters-island', 'creek-harbour'],
    'Urban': ['downtown-dubai', 'business-bay', 'difc'],
    'Villa Communities': ['emirates-hills', 'arabian-ranches', 'dubai-hills-estate'],
    'Emerging': ['meydan', 'creek-harbour'],
  };

  const filtered = areas.filter(area => {
    const matchesSearch = !searchQuery ||
      area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.propertyTypes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || (categoryMap[activeCategory] && categoryMap[activeCategory].includes(area.id));
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)' }}>

      {/* ── HERO ── */}
      <RevealSection>
        <section style={{
          position: 'relative',
          minHeight: '540px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'var(--text-dark)',
          paddingTop: '0',
          paddingBottom: '0',
        }}>
        {/* Subtle decorative elements */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 60%, rgba(0, 0, 0,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 25%, rgba(0, 0, 0,0.04) 0%, transparent 40%)',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '700px',
          border: '1px solid rgba(0, 0, 0,0.05)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: 'clamp(7rem, 14vw, 9rem) 1.5rem clamp(4rem, 8vw, 5rem)',
          maxWidth: '800px',
        }}>
          <div style={{ width: '40px', height: '1px', background: '#eab308', margin: '0 auto 1.5rem' }} />
          <p style={{
            color: '#eab308',
            fontSize: '0.7rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}>
            Dubai Area Guide
          </p>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            lineHeight: 1.15,
            marginBottom: '1.75rem',
            fontWeight: 300,
          }}>
            Navigate the Best Places<br />
            <span style={{ color: '#eab308' }}>to Live in Dubai</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
          }}>
            As the Dubai 2040 Urban Master Plan reshapes the city, understanding where to invest has never mattered more. Explore our curated guide to Dubai's most prestigious districts.
          </p>

          {/* Search Bar */}
          <div style={{
            maxWidth: '480px',
            margin: '0 auto',
            position: 'relative',
          }}>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }}
            >
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search areas by name or property type..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1.2rem 0.9rem 3rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(0, 0, 0,0.2)',
                borderRadius: '3px',
                color: '#fff',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s, background 0.3s',
                letterSpacing: '0.5px',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            />
          </div>
        </div>
      </section>
      </RevealSection>

      {/* ── INTRO + STATS ── */}
      <RevealSection>
        <section style={{
          background: '#FFFFFF',
          borderBottom: '1px solid rgba(0, 0, 0,0.15)',
        }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '3.5rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
          {[
            { value: '12+', label: 'Premium Areas' },
            { value: '2040', label: 'Urban Vision' },
            { value: '$2B+', label: 'Portfolio Managed' },
            { value: '30+', label: 'Nationalities Served' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: '130px' }}>
              <div style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 300,
                color: 'var(--primary-dark)',
                fontFamily: 'var(--font-serif)',
                letterSpacing: '2px',
                marginBottom: '0.2rem',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.62rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: 600,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
      </RevealSection>

      {/* ── FEATURED AREAS GRID ── */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Header */}
          <RevealSection>
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ width: '40px', height: '1px', background: 'var(--primary-color)', marginBottom: '1rem' }} />
                  <p style={{
                    color: 'var(--primary-dark)',
                  fontSize: '0.68rem',
                  letterSpacing: '3.5px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}>Explore Dubai</p>
                <h2 style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--text-dark)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 300,
                  margin: 0,
                }}>
                  Featured Areas
                </h2>
              </div>

              {/* Category Filters */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                {categories.map(cat => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: '0.6rem 0',
                        border: 'none',
                        background: 'transparent',
                        color: isActive ? '#000000' : 'rgba(0, 0, 0, 0.45)',
                        fontSize: '0.72rem',
                        fontWeight: isActive ? 600 : 500,
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'color 0.3s ease',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        outline: 'none',
                      }}
                      onMouseOver={(e) => { if (!isActive) e.target.style.color = '#000000'; }}
                      onMouseOut={(e) => { if (!isActive) e.target.style.color = 'rgba(0, 0, 0, 0.45)'; }}
                    >
                      {cat}
                      {/* Elegant Golden Line */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-1px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: '#eab308',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealSection>

          {/* Area Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
          }} className="area-guide-grid">
            {filtered.map((area, i) => (
              <AreaCard key={area.id} area={area} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No areas found matching your search. Try a different keyword.
            </div>
          )}
        </div>
      </section>

      {/* ── INTRO TEXT ── */}
      <RevealSection>
        <section style={{
          background: 'var(--primary-dark)',
          padding: 'clamp(3.5rem, 7vw, 5rem) 1.5rem',
        }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: '40px', height: '1px', background: '#eab308', margin: '0 auto 1.5rem' }} />
          <h2 style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontFamily: 'var(--font-serif)',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: 300,
            marginBottom: '1.5rem',
          }}>
            Why Location <span style={{ color: '#eab308' }}>Matters</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.9rem',
            lineHeight: 1.85,
            marginBottom: '1.25rem',
          }}>
            As the Dubai 2040 Urban Master Plan reshapes entire corridors of the city and Al Maktoum International Airport expands into the world's largest aviation hub, understanding where you want to be in Dubai has never mattered more.
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.9rem',
            lineHeight: 1.85,
            marginBottom: '1.25rem',
          }}>
            From the institutional gravity of DIFC to the waterfront sophistication of Dubai Marina, each area carries its own story, its own demand drivers, and its own long-term trajectory.
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.9rem',
            lineHeight: 1.85,
            marginBottom: '2rem',
          }}>
            Our area guides are built to help you navigate that landscape with clarity — not just where things stand today, but where they're heading.
          </p>
          <Link
            to="/contact"
            className="btn-solid"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.85rem 2.2rem',
              borderRadius: '3px',
              fontSize: '0.72rem',
              letterSpacing: '2px',
              textDecoration: 'none',
            }}
          >
            Speak with a Consultant
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </section>
      </RevealSection>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1024px) {
          .area-guide-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .area-guide-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
