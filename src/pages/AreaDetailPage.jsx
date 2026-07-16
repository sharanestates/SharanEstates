import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RevealSection from '../components/RevealSection';

const areaDetailsData = {
  'downtown-dubai': {
    name: 'Downtown Dubai',
    image: '/areas/downtown_dubai.webp',
    tagline: 'The Centre of Now',
    tag: 'Urban Sophistication',
    overview: 'Downtown Dubai is the city\'s bustling central district, famed for housing iconic landmarks including the Burj Khalifa, the Dubai Mall, and the spectacular Dubai Fountain. It represents the pinnacle of luxury high-rise living and global retail gravity.',
    vibe: 'Cosmopolitan, high-energy, and prestigious. Residents enjoy a fast-paced urban lifestyle surrounded by world-class dining, upscale lounges, and artistic hubs like the Dubai Opera.',
    amenities: [
      'The Dubai Mall — world\'s premier retail destination',
      'Burj Park — lush green spaces with views of the fountains',
      'Fine dining along Sheikh Mohammed bin Rashid Boulevard',
      'Immediate access to the Metro network and DIFC financial hub',
    ],
    connectivity: {
      airport: '15 mins',
      marina: '20 mins',
      beach: '12 mins',
      mall: '0 mins',
    },
  },
  'dubai-marina': {
    name: 'Dubai Marina',
    image: '/areas/dubai_marina.webp',
    tagline: 'Waterfront Living Redefined',
    tag: 'Coastal Sophistication',
    overview: 'Dubai Marina is a spectacular man-made canal city built along a 3km stretch of the Persian Gulf. It features iconic futuristic skyscrapers, luxury yachts, and a vibrant promenade with hundreds of retail outlets.',
    vibe: 'Active, waterfront-focused, and social. Perfect for individuals and young families who love beach access, running along the marina walk, and vibrant nightlife.',
    amenities: [
      'Dubai Marina Walk — 7km waterfront pedestrian path',
      'Marina Mall — boutique shopping and dining',
      'Yacht Club with premium berthing facilities',
      'JBR Beach within walking distance',
    ],
    connectivity: {
      airport: '25 mins',
      marina: '0 mins',
      beach: '5 mins',
      mall: '18 mins',
    },
  },
  'palm-jumeirah': {
    name: 'Palm Jumeirah',
    image: '/areas/palm_jumeirah.webp',
    tagline: 'The Eighth Wonder',
    tag: 'Island Luxury',
    overview: 'Palm Jumeirah is Dubai\'s world-famous palm-shaped artificial archipelago. It offers ultra-luxurious beachfront villas, penthouses, and world-renowned resorts like Atlantis the Palm.',
    vibe: 'Resort-style, exclusive, and peaceful. It offers a private beach lifestyle with private docks, high-end beach clubs, and quiet residential fronds.',
    amenities: [
      'Private beach access for all frond villas',
      'The Pointe and Nakheel Mall shopping developments',
      'Boardwalk — 11km sea-facing running track',
      'Michelin-starred dining at premium beachfront resorts',
    ],
    connectivity: {
      airport: '30 mins',
      marina: '8 mins',
      beach: '0 mins',
      mall: '20 mins',
    },
  },
  'business-bay': {
    name: 'Business Bay',
    image: '/areas/business_bay.webp',
    tagline: 'Where Business Meets Lifestyle',
    tag: 'Urban Canal Living',
    overview: 'Business Bay is Dubai\'s central commercial and residential district, built around the extended Dubai Water Canal. It blends corporate headquarters with luxury residences.',
    vibe: 'Modern, professional, and fast-growing. Highly sought after by young professionals and corporate executives seeking proximity to Downtown Dubai.',
    amenities: [
      'Dubai Water Canal boardwalk and running paths',
      'Upscale boutique hotels and canal-side restaurants',
      'Proximity to Safa Park and Jumeirah beach area',
      'Excellent metro and highway infrastructure access',
    ],
    connectivity: {
      airport: '15 mins',
      marina: '18 mins',
      beach: '10 mins',
      mall: '5 mins',
    },
  },
  'jumeirah-beach-residence': {
    name: 'Jumeirah Beach Residence',
    image: '/areas/jumeirah_beach.webp',
    tagline: 'Beachfront Boulevard',
    tag: 'Beach Resort Lifestyle',
    overview: 'JBR is a vibrant waterfront community featuring a 1.7km long residential block facing the Arabian Gulf. It is one of the most visited beach districts in Dubai.',
    vibe: 'Lively, family-friendly, and tourist-focused. Perfect for outdoor enthusiasts who enjoy beach sports, open-air shopping, and beachfront dining.',
    amenities: [
      'The Walk at JBR — seaside dining and shopping street',
      'Direct beach access with public facilities',
      'Views and footbridge access to Ain Dubai & Bluewaters',
      'Wide array of outdoor gyms and running tracks',
    ],
    connectivity: {
      airport: '28 mins',
      marina: '2 mins',
      beach: '0 mins',
      mall: '20 mins',
    },
  },
  'emirates-hills': {
    name: 'Emirates Hills',
    image: '/areas/emirates_hills.webp',
    tagline: 'The Beverly Hills of Dubai',
    tag: 'Ultra-Luxury Gated Community',
    overview: 'Emirates Hills is a highly prestigious gated residential community, home to some of Dubai\'s wealthiest residents. It features custom-built mansions overlooking lakes and golf courses.',
    vibe: 'Quiet, secure, and prestigious. Highly exclusive residential setting for high-profile families valuing absolute privacy and spacious custom estates.',
    amenities: [
      'Montgomerie Championship 18-hole golf course',
      '24/7 high-security gated entry points',
      'Serene community lakes and landscaped parks',
      'Proximity to top-rated international schools',
    ],
    connectivity: {
      airport: '25 mins',
      marina: '10 mins',
      beach: '12 mins',
      mall: '15 mins',
    },
  },
  'dubai-hills-estate': {
    name: 'Dubai Hills Estate',
    image: '/areas/dubai_hills.webp',
    tagline: 'Modern Family Living',
    tag: 'Green Master Community',
    overview: 'Dubai Hills Estate is a massive, green master-planned community designed as a joint venture between Emaar and Meraas. It features a major park, golf course, and a premium shopping mall.',
    vibe: 'Active, green, and family-centric. Highly popular for modern families seeking a community with excellent schools, hospitals, and parks.',
    amenities: [
      'Dubai Hills Golf Club with practice facilities',
      'Dubai Hills Park — 180,000 sqm of green spaces',
      'Dubai Hills Mall with 650+ retail options',
      'Central location with fast access to Downtown and Marina',
    ],
    connectivity: {
      airport: '20 mins',
      marina: '15 mins',
      beach: '15 mins',
      mall: '12 mins',
    },
  },
  'arabian-ranches': {
    name: 'Arabian Ranches',
    image: '/areas/arabian_ranches.webp',
    tagline: 'Desert-Inspired Elegance',
    tag: 'Suburban Villa Living',
    overview: 'Arabian Ranches is one of Dubai\'s first suburban villa communities, featuring spacious Mediterranean and desert-themed villas. It is famed for its lush green scenery.',
    vibe: 'Peaceful, suburban, and close-knit. Ideal for families wanting spacious gardens, quiet streets, community activities, and a retreat from the city center.',
    amenities: [
      'Arabian Ranches Golf Club and equestrian facilities',
      'Community retail centers and medical clinics',
      'Lakes, tennis courts, and swimming pools',
      'Highly rated primary and secondary schools nearby',
    ],
    connectivity: {
      airport: '25 mins',
      marina: '22 mins',
      beach: '25 mins',
      mall: '20 mins',
    },
  },
  'creek-harbour': {
    name: 'Dubai Creek Harbour',
    image: '/areas/creek_harbour.webp',
    tagline: 'The New Icon',
    tag: 'Waterfront Development',
    overview: 'Dubai Creek Harbour is a major new waterfront master community located along the historic Dubai Creek. It is designed to combine modern high-rises with vast pedestrian spaces.',
    vibe: 'Forward-looking, scenic, and promising. Offers spectacular views of the Downtown skyline across the natural waters of the sanctuary.',
    amenities: [
      'Creek Marina and yacht berths',
      'Lush Central Park and waterfront boardwalk',
      'Views of Ras Al Khor Wildlife Sanctuary (mangroves & flamingos)',
      'Modern, sustainable pedestrian infrastructure',
    ],
    connectivity: {
      airport: '12 mins',
      marina: '25 mins',
      beach: '20 mins',
      mall: '10 mins',
    },
  },
  'difc': {
    name: 'DIFC',
    image: '/areas/difc.webp',
    tagline: 'Financial & Cultural Hub',
    tag: 'Global Corporate Gravity',
    overview: 'DIFC is the leading financial hub for the Middle East, Africa, and South Asia. Beyond corporate towers, it features high-end residential lofts, art galleries, and fine dining.',
    vibe: 'Sophisticated, formal, and gallery-focused. Residents live a stylish metropolitan life with immediate access to gourmet restaurants and corporate offices.',
    amenities: [
      'Gate District and Gate Avenue retail galleries',
      'Concentration of award-winning fine dining restaurants',
      'Art galleries and regular cultural events',
      'Fully indoor connections to offices and Metro',
    ],
    connectivity: {
      airport: '12 mins',
      marina: '20 mins',
      beach: '10 mins',
      mall: '4 mins',
    },
  },
  'meydan': {
    name: 'Meydan',
    image: '/areas/meydan.webp',
    tagline: 'Legacy of Champions',
    tag: 'Integrated Sports & Lifestyle',
    overview: 'Meydan is a massive development home to the world-famous horse racing club. It is evolving to include large crystal lagoon developments like District One.',
    vibe: 'Modern, active, and luxury-focused. Famed for its expansive plots, green parks, and the massive crystal lagoon offering swimming and water sports.',
    amenities: [
      'Meydan Racecourse and Grandstand',
      'District One Crystal Lagoon (man-made beach in city)',
      'Meydan One Mall (under construction/partial release)',
      'Championship tennis academy and cycling tracks',
    ],
    connectivity: {
      airport: '18 mins',
      marina: '20 mins',
      beach: '15 mins',
      mall: '8 mins',
    },
  },
  'bluewaters-island': {
    name: 'Bluewaters Island',
    image: '/areas/bluewaters_island.webp',
    tagline: 'Island Sophistication',
    tag: 'Pedestrian Island Living',
    overview: 'Bluewaters Island is a premium man-made island located off the coast of Dubai Marina. It is home to Ain Dubai (the world\'s largest observation wheel) and Caesars Palace resorts.',
    vibe: 'Boutique, exclusive, and pedestrian-friendly. Residents experience modern minimalist low-rise apartment living with immediate access to beaches and premium dining.',
    amenities: [
      'Ain Dubai observation wheel centerpiece',
      'Bespoke pedestrian bridge connection to JBR Beach',
      'Exclusive beach club access and resorts',
      'Sophisticated retail boulevard and seaside cafes',
    ],
    connectivity: {
      airport: '30 mins',
      marina: '5 mins',
      beach: '0 mins',
      mall: '22 mins',
    },
  },
};

export default function AreaDetailPage() {
  const { id } = useParams();
  const detail = areaDetailsData[id] || areaDetailsData['downtown-dubai'];

  const [properties, setProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoadingProperties(true);
    
    // Fetch properties and filter locally to find the ones in this area
    fetch(`${API_BASE}/properties`)
      .then(res => res.json())
      .then(data => {
        const arr = data.data || (Array.isArray(data) ? data : []);
        // Filter properties whose location contains the area name
        const areaNameLower = detail.name.toLowerCase();
        const matched = arr.filter(p => 
          p.location && p.location.toLowerCase().includes(areaNameLower)
        );
        setProperties(matched);
      })
      .catch(err => console.error('Failed to load properties for area:', err))
      .finally(() => setLoadingProperties(false));
  }, [id, detail.name]);

  const getImage = (prop) => {
    if (prop.images && Array.isArray(prop.images) && prop.images.length > 0) return prop.images[0];
    return prop.image || '/listing_villa.webp';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingBottom: '5rem' }}>
      
      {/* ── HERO BANNER ── */}
      <RevealSection>
        <section style={{
          position: 'relative',
          height: '480px',
          background: `url(${detail.image}) center/cover no-repeat`,
          display: 'flex',
          alignItems: 'flex-end',
          paddingTop: '0',
          paddingBottom: '0',
        }}>
        {/* Shadow Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '3rem', width: '100%' }}>
          <p style={{ color: 'var(--primary-color)', fontSize: '0.72rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>
            {detail.tagline}
          </p>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-serif)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: 0,
            lineHeight: 1.1,
            fontWeight: 300,
          }}>
            {detail.name}
          </h1>
        </div>
      </section>
      </RevealSection>
      
      {/* ── DETAILS MAIN CONTENT ── */}
      <section className="container" style={{ padding: '3rem 1.5rem 2rem' }}>
        
        {/* Breadcrumb Back Button */}
        <RevealSection>
          <div style={{ marginBottom: '2.5rem' }}>
          <Link 
            to="/area-guide" 
            style={{ 
              color: 'var(--primary-dark)', 
              textDecoration: 'none', 
              fontSize: '0.75rem', 
              letterSpacing: '1.5px', 
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.25rem',
              background: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0,0.4)',
              borderRadius: '3px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--text-dark)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = 'var(--text-dark)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = 'var(--primary-dark)'; e.currentTarget.style.borderColor = 'rgba(0, 0, 0,0.4)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Area Guide
          </Link>
        </div>
        </RevealSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '4rem',
          alignItems: 'flex-start',
        }} className="property-grid">
          
          {/* Left Column: Description & Lifestyle */}
          <RevealSection style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Overview */}
            <div>
              <div style={{ width: '40px', height: '1px', background: 'var(--primary-color)', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '0.8rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '1rem' }}>
                Overview
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.8, margin: 0 }}>
                {detail.overview}
              </p>
            </div>

            {/* Vibe & Lifestyle */}
            <div>
              <div style={{ width: '40px', height: '1px', background: 'var(--primary-color)', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '0.8rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '1rem' }}>
                The Vibe & Lifestyle
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.8, margin: 0 }}>
                {detail.vibe}
              </p>
            </div>

            {/* Key Highlights / Amenities */}
            <div>
              <div style={{ width: '40px', height: '1px', background: 'var(--primary-color)', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '0.8rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '1.25rem' }}>
                Community Amenities
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {detail.amenities.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-muted)', alignItems: 'center' }}>
                    <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
          </RevealSection>

          {/* Right Column: Side Card Connectivity */}
          <RevealSection delay={150} style={{ width: '100%' }}>
            <div className="classic-property-card" style={{ padding: '2rem', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '0.82rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dark)', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid rgba(0, 0, 0,0.2)', paddingBottom: '0.5rem' }}>
              Average Connectivity
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>📍 Dubai Marina</span>
                <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{detail.connectivity.marina}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>✈️ DXB Airport</span>
                <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{detail.connectivity.airport}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>🏖️ Public Beach</span>
                <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{detail.connectivity.beach}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>🛍️ Dubai Mall</span>
                <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{detail.connectivity.mall}</span>
              </div>
            </div>

            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(0, 0, 0,0.2)', paddingTop: '1.5rem', textAlign: 'center' }}>
              <h4 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Interested in {detail.name}?
              </h4>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Speak with one of our neighborhood specialists to receive off-market listings and payment plan options.
              </p>
              <Link 
                to="/contact" 
                className="btn-solid" 
                style={{ 
                  display: 'block', 
                  padding: '0.8rem 0', 
                  borderRadius: '3px', 
                  fontSize: '0.72rem', 
                  letterSpacing: '1.5px', 
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Inquire Area
              </Link>
            </div>
          </div>
        </RevealSection>

        </div>
      </section>

      {/* ── AREA PROPERTIES GRID ── */}
      <RevealSection>
        <section className="container" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ width: '40px', height: '1px', background: 'var(--primary-color)', marginBottom: '0.75rem' }} />
        <h3 style={{ fontSize: '0.8rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '1.5rem' }}>
          Available Properties in {detail.name}
        </h3>

        {loadingProperties ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Loading properties in this community...</p>
        ) : properties.length === 0 ? (
          <div style={{ padding: '2rem', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0,0.15)', borderRadius: '4px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            There are currently no listed properties specifically located in {detail.name}. Explore other areas or contact our agents for off-market options.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', rowGap: '2.5rem', columnGap: '1.5rem' }} className="listings-grid">
            {properties.map(prop => (
              <div 
                key={prop.id} 
                className="classic-property-card"
                style={{
                  background: '#FFFFFF',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(0, 0, 0,0.25)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s',
                }}
              >
                <Link to={`/property/${prop.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={getImage(prop)} 
                      alt={prop.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => e.target.src = '/listing_villa.webp'}
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.5rem 0.8rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
                      <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}>{prop.price}</div>
                    </div>
                  </div>
                  <div style={{ padding: '0.8rem 0.9rem' }}>
                    <h4 style={{ fontSize: '0.82rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>
                      {prop.title}
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      <span>{prop.property_type || prop.category}</span>
                      <span>{prop.bedrooms_range || prop.beds} Beds</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
      </RevealSection>

    </div>
  );
}
