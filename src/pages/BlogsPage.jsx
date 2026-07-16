import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RevealSection from '../components/RevealSection';

const defaultCategories = ['All', 'Market Trends', 'Investment', 'Guides', 'Architecture', 'Lifestyle', 'News'];

function FeaturedCard({ post, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="classic-property-card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        animation: `fadeSlideUp 0.6s ease ${index * 0.1}s both`,
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        height: '280px',
        overflow: 'hidden',
      }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
          onError={e => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, var(--text-dark) 0%, #2a2a2a 100%)';
          }}
        />
        {/* Category Badge */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          padding: '0.3rem 0.85rem',
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(6px)',
          borderRadius: '2px',
          color: 'var(--primary-color)',
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          {post.category}
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: '1.75rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }}>{post.date}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--primary-color)' }} />
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }}>{post.readTime}</span>
        </div>

        <h3 style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-serif)',
          color: 'var(--text-dark)',
          fontWeight: 300,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          lineHeight: 1.4,
          marginBottom: '0.75rem',
          transition: 'color 0.3s',
          ...(hovered ? { color: 'var(--primary-dark)' } : {}),
        }}>
          {post.title}
        </h3>

        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          flex: 1,
        }}>
          {post.excerpt}
        </p>

        <div style={{
          marginTop: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--primary-dark)',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          transition: 'gap 0.3s',
          ...(hovered ? { gap: '0.8rem' } : {}),
        }}>
          Read Article
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </article>
  );
}

function BlogListCard({ post, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="classic-property-card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        animation: `fadeSlideUp 0.5s ease ${index * 0.08}s both`,
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{
        width: '260px',
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
      }} className="blog-list-image">
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
          onError={e => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, var(--text-dark) 0%, #2a2a2a 100%)';
          }}
        />
      </div>

      {/* Content */}
      <div style={{
        padding: '1.5rem 1.75rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{
            padding: '0.2rem 0.65rem',
            background: 'rgba(0, 0, 0,0.1)',
            color: 'var(--primary-dark)',
            border: '1px solid rgba(0, 0, 0,0.2)',
            borderRadius: '2px',
            fontSize: '0.58rem',
            fontWeight: 600,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}>
            {post.category}
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }}>{post.date}</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }}>{post.readTime}</span>
        </div>

        <h3 style={{
          fontSize: '0.95rem',
          fontFamily: 'var(--font-serif)',
          color: hovered ? 'var(--primary-dark)' : 'var(--text-dark)',
          fontWeight: 300,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          lineHeight: 1.4,
          marginBottom: '0.6rem',
          transition: 'color 0.3s',
        }}>
          {post.title}
        </h3>

        <p style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {post.excerpt}
        </p>

        <div style={{
          marginTop: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: hovered ? '0.8rem' : '0.5rem',
          color: 'var(--primary-dark)',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          transition: 'gap 0.3s',
        }}>
          Read More
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </article>
  );
}


export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch blogs from API
    fetch(`${API_BASE}/blogs`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setBlogPosts(Array.isArray(data) ? data : []))
      .catch(() => setBlogPosts([]));
  }, []);

  // Build dynamic categories from fetched data + defaults
  const blogCategories = [...new Set(blogPosts.map(p => p.category).filter(Boolean))];
  const categories = ['All', ...new Set([...defaultCategories.slice(1), ...blogCategories])];

  const filtered = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filtered.filter(p => p.featured);
  const remainingPosts = filtered.filter(p => !p.featured);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)' }}>

      {/* ── HERO ── */}
      <RevealSection>
        <section style={{
          position: 'relative',
          minHeight: '480px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'var(--text-dark)',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 25% 55%, rgba(0, 0, 0,0.06) 0%, transparent 50%), radial-gradient(circle at 75% 30%, rgba(0, 0, 0,0.04) 0%, transparent 40%)',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px', height: '600px',
            border: '1px solid rgba(0, 0, 0,0.05)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: 'clamp(7rem, 14vw, 9rem) 1.5rem clamp(4rem, 8vw, 5rem)',
            maxWidth: '760px',
          }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--primary-color)', margin: '0 auto 1.5rem' }} />
            <p style={{
              color: 'var(--primary-color)',
              fontSize: '0.7rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}>
              Insights & Analysis
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
              The Sharan Estates<br />
              <span style={{ color: 'var(--primary-color)' }}>Journal</span>
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              maxWidth: '520px',
              margin: '0 auto',
            }}>
              Expert perspectives on Dubai's luxury real estate landscape — market intelligence, investment strategies, and lifestyle insights for discerning investors.
            </p>
          </div>
        </section>
      </RevealSection>

      {/* ── FILTERS BAR ── */}
      <section style={{
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(0, 0, 0,0.15)',
        position: 'sticky',
        top: '0',
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          {/* Category Filters */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.4rem 1rem',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'var(--text-dark)' : 'rgba(0, 0, 0,0.3)',
                  borderRadius: '2px',
                  background: activeCategory === cat ? 'var(--text-dark)' : 'transparent',
                  color: activeCategory === cat ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.63rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', minWidth: '200px' }}>
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}
            >
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.9rem 0.6rem 2.5rem',
                background: 'var(--bg-light)',
                border: '1px solid rgba(0, 0, 0,0.25)',
                borderRadius: '3px',
                color: 'var(--text-dark)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-dark)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(0, 0, 0,0.25)'}
            />
          </div>
        </div>
      </section>

      {/* ── FEATURED POSTS ── */}
      {featuredPosts.length > 0 && (
        <RevealSection>
          <section style={{ padding: '3rem 1.5rem 0' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ width: '40px', height: '1px', background: 'var(--primary-color)', marginBottom: '0.75rem' }} />
                <p style={{
                  color: 'var(--primary-dark)',
                  fontSize: '0.68rem',
                  letterSpacing: '3.5px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}>Featured Articles</p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
              }} className="featured-blog-grid">
                {featuredPosts.map((post, i) => (
                  <FeaturedCard key={post.id} post={post} index={i} />
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* ── ALL POSTS ── */}
      <RevealSection>
        <section style={{ padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {remainingPosts.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ width: '40px', height: '1px', background: 'var(--primary-color)', marginBottom: '0.75rem' }} />
                <p style={{
                  color: 'var(--primary-dark)',
                  fontSize: '0.68rem',
                  letterSpacing: '3.5px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}>Latest Articles</p>
              </div>
            )}

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              {remainingPosts.map((post, i) => (
                <BlogListCard key={post.id} post={post} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                No articles found matching your criteria. Try a different search or category.
              </div>
            )}
          </div>
        </section>
      </RevealSection>

      {/* ── NEWSLETTER CTA ── */}
      <RevealSection>
        <section style={{
          background: 'var(--text-dark)',
          padding: '3rem 1.5rem',
        }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--primary-color)', margin: '0 auto 1.25rem' }} />
          <h2 style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            fontFamily: 'var(--font-serif)',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: 300,
            marginBottom: '0.75rem',
          }}>
            Stay <span style={{ color: 'var(--primary-color)' }}>Informed</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.88rem',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}>
            Subscribe to our weekly newsletter for curated market insights and exclusive investment opportunities delivered to your inbox.
          </p>

          <div style={{
            display: 'flex',
            gap: '0.5rem',
            maxWidth: '450px',
            margin: '0 auto',
          }} className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              style={{
                flex: 1,
                padding: '0.85rem 1.2rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '3px',
                color: '#fff',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-color)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
            />
            <button
              className="btn-solid"
              style={{
                padding: '0.85rem 1.8rem',
                borderRadius: '3px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                flexShrink: 0,
              }}
            >
              Subscribe
            </button>
          </div>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.75rem' }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </RevealSection>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .featured-blog-grid {
            grid-template-columns: 1fr !important;
          }
          .blog-list-image {
            width: 160px !important;
          }
          .newsletter-form {
            flex-direction: column !important;
          }
        }
        @media (max-width: 580px) {
          .blog-list-image {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
