import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import RevealSection from '../components/RevealSection';
import useRealTimeSync from '../components/useRealTimeSync';
import useSEO from '../components/useSEO';

export default function Listings() {
  const { type, category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const pageParam = parseInt(searchParams.get('page')) || 1;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(pageParam);

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  const loadProperties = (silent = false) => {
    if (!silent) setLoading(true);
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    if (type) params.set('type', type);
    if (searchQuery) params.set('search', searchQuery);
    params.set('page', currentPage);
    params.set('limit', 15);

    fetch(`${API_BASE}/properties?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        const arr = data.data || (Array.isArray(data) ? data : []);
        setProperties(arr);
        if (data.totalPages) setTotalPages(data.totalPages);
      })
      .catch(() => setProperties([]))
      .finally(() => {
        if (!silent) setLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProperties(false);
  }, [type, category, searchQuery, currentPage]);

  useRealTimeSync((message) => {
    if (message.type === 'PROPERTY_CHANGE') {
      console.log('Real-time listings update triggered');
      loadProperties(true);
    }
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const typeLabel = type === 'off-plan' ? 'Off-Plan Properties' : type === 'rent' ? 'For Rent' : 'For Sale';
  const isOffPlan = type === 'off-plan';

  useSEO(
    typeLabel,
    `Browse our curated portfolio of premium ${typeLabel.toLowerCase()} properties across Dubai & Abu Dhabi.`
  );

  const getImage = (prop) => {
    if (prop.images && Array.isArray(prop.images) && prop.images.length > 0) return prop.images[0];
    return prop.image || '/listing_villa.webp';
  };

  const cardStyle = {
    background: '#FFFFFF',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(0, 0, 0,0.25)',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  };

  return (
    <div style={{ paddingTop: '7rem', minHeight: '100vh', background: 'var(--bg-light)', paddingBottom: '5rem' }}>
      <RevealSection>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>
            Sharan Estates
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', textTransform: 'uppercase', letterSpacing: '2px', lineHeight: 1.2 }}>
            {searchQuery ? `Results for "${searchQuery}"` : typeLabel}
          </h1>
          {!searchQuery && (
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0.75rem auto 0', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Browse our curated portfolio of premium off-plan projects across Dubai & Abu Dhabi.
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text-muted)' }}>
            <div style={{ width: '36px', height: '36px', border: '3px solid rgba(0, 0, 0,0.3)', borderTopColor: 'var(--primary-dark)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
            <p>Loading properties...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && properties.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text-muted)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)' }}>No Properties Found</h3>
            <p>{searchQuery ? `No results for "${searchQuery}". Try a different term.` : 'Our portfolio is being updated. Check back shortly.'}</p>
          </div>
        )}

        {/* Property Grid — 5 columns */}
        {!loading && properties.length > 0 && (
          <div className="listings-grid-5" style={{ display: 'grid', rowGap: '2.5rem', columnGap: '1.5rem', marginBottom: '3rem' }}>
            {properties.map(prop => (
              <div
                key={prop.id}
                style={cardStyle}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
              >
                {/* ── Image section (clickable) ── */}
                <Link to={`/property/${prop.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ height: '185px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={getImage(prop)}
                      alt={prop.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.src = '/listing_villa.webp'; }}
                    />
                    {/* Price gradient overlay */}
                    {prop.price && (
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.55rem 0.8rem', background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)' }}>
                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.62rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>From</div>
                        <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>{prop.price}</div>
                      </div>
                    )}
                    {/* Status badge */}
                    <div style={{ position: 'absolute', top: '0.55rem', right: '0.55rem', background: 'var(--primary-dark)', color: '#fff', padding: '0.2rem 0.6rem', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', borderRadius: '2px' }}>
                      {isOffPlan ? 'Off-Plan' : (prop.status || 'Available')}
                    </div>
                  </div>

                  {/* ── Info section ── */}
                  <div style={{ padding: '0.85rem 0.9rem 0.6rem' }}>
                    {/* Location */}
                    {prop.location && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.68rem', marginBottom: '0.25rem' }}>
                        <span>📍</span>
                        <span>{prop.location}</span>
                      </div>
                    )}
                    {/* Title */}
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.3, margin: '0 0 0.55rem' }}>
                      {prop.title}
                    </h3>
                    {/* Metadata table */}
                    <div style={{ borderTop: '1px solid rgba(0, 0, 0,0.2)', paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.18rem' }}>
                      {(prop.property_type || prop.category) && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Type</span>
                          <span style={{ color: 'var(--text-dark)', fontWeight: 500, textAlign: 'right', maxWidth: '62%' }}>{prop.property_type || prop.category}</span>
                        </div>
                      )}
                      {prop.handover && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Handover</span>
                          <span style={{ color: 'var(--text-dark)', fontWeight: 500 }}>{prop.handover}</span>
                        </div>
                      )}
                      {(prop.bedrooms_range || prop.beds) && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Bedrooms</span>
                          <span style={{ color: 'var(--text-dark)', fontWeight: 500 }}>{prop.bedrooms_range || prop.beds}</span>
                        </div>
                      )}
                      {prop.payment_plan && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Payment Plan</span>
                          <span style={{ color: 'var(--primary-dark)', fontWeight: 600 }}>{prop.payment_plan}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>

                {/* ── CTA Buttons ── */}
                <div style={{ display: 'flex', gap: '0.4rem', padding: '0.5rem 0.9rem 0.85rem', marginTop: 'auto' }}>
                  <a
                    href="tel:+971000000000"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', padding: '0.42rem 0', background: 'var(--bg-light)', border: '1px solid rgba(0, 0, 0,0.3)', borderRadius: '3px', color: 'var(--text-dark)', fontSize: '0.67rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.5px' }}
                  >
                    📞 Call
                  </a>
                  <a
                    href={`https://wa.me/971000000000?text=I'm interested in ${encodeURIComponent(prop.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', padding: '0.42rem 0', background: 'var(--primary-dark)', border: 'none', borderRadius: '3px', color: '#fff', fontSize: '0.67rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.5px' }}
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', paddingBottom: '2rem' }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ padding: '0.55rem 1.1rem', background: currentPage === 1 ? '#eee' : '#0a0a0a', color: currentPage === 1 ? '#999' : '#fff', border: 'none', borderRadius: '4px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
            >← Prev</button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
                acc.push(p);
                return acc;
                }, [])
              .map((p, i) =>
                p === '...'
                  ? <span key={`e-${i}`} style={{ padding: '0 0.3rem', color: 'var(--text-muted)' }}>…</span>
                  : <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      style={{ width: '36px', height: '36px', background: p === currentPage ? '#0a0a0a' : '#fff', color: p === currentPage ? '#fff' : 'var(--text-dark)', border: p === currentPage ? 'none' : '1px solid rgba(0,0,0,0.15)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: p === currentPage ? 700 : 400 }}
                    >{p}</button>
              )
            }

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ padding: '0.55rem 1.1rem', background: currentPage === totalPages ? '#eee' : '#0a0a0a', color: currentPage === totalPages ? '#999' : '#fff', border: 'none', borderRadius: '4px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
            >Next →</button>
          </div>
        )}
      </div>
    </RevealSection>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .listings-grid-5 {
          grid-template-columns: repeat(5, 1fr);
        }
        @media (max-width: 1250px) { .listings-grid-5 { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (max-width: 990px)  { .listings-grid-5 { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px)  { .listings-grid-5 { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px)  { .listings-grid-5 { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
