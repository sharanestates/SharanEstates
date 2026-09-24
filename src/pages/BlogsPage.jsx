import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RevealSection from '../components/RevealSection';
import useRealTimeSync from '../components/useRealTimeSync';
import useSEO from '../components/useSEO';

const defaultCategories = ['All', 'Market Trends', 'Investment', 'Guides', 'Architecture', 'Lifestyle', 'News'];

function ArticleModal({ post, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!post) return null;

  // Render markdown-like sections cleanly
  const paragraphs = (post.content || post.excerpt || '').split('\n\n');

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          color: '#111111',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '4px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          animation: 'fadeSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close article"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.65)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#000000'; e.currentTarget.style.transform = 'scale(1.08)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.65)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Hero Image */}
        <div style={{ position: 'relative', height: '320px', width: '100%', overflow: 'hidden', background: '#111111' }}>
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #111111 0%, #2a2a2a 100%)';
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '2rem',
            right: '2rem',
          }}>
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.8rem',
              background: '#FFFFFF',
              color: '#000000',
              borderRadius: '2px',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
            }}>
              {post.category}
            </span>
            <div style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem' }}>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
            fontWeight: 400,
            lineHeight: 1.3,
            color: '#111111',
            margin: '0 0 1.5rem',
            letterSpacing: '0.5px',
          }}>
            {post.title}
          </h1>

          {/* Executive Summary callout */}
          <div style={{
            padding: '1.25rem 1.5rem',
            background: 'rgba(0, 0, 0, 0.03)',
            borderLeft: '3px solid #111111',
            borderRadius: '2px',
            marginBottom: '2rem',
          }}>
            <p style={{
              fontSize: '0.92rem',
              fontStyle: 'italic',
              color: '#333333',
              lineHeight: 1.7,
              margin: 0,
            }}>
              "{post.excerpt}"
            </p>
          </div>

          {/* Formatted Content */}
          <div style={{ fontSize: '0.95rem', lineHeight: 1.85, color: '#333333' }}>
            {paragraphs.map((para, idx) => {
              if (para.startsWith('### ')) {
                return (
                  <h3
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      color: '#111111',
                      marginTop: '2rem',
                      marginBottom: '0.75rem',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={idx} style={{ marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>
                  {para}
                </p>
              );
            })}
          </div>

          {/* Advisory Consultation Box */}
          <div style={{
            marginTop: '3.5rem',
            padding: '2rem',
            background: '#0B0B0B',
            color: '#FFFFFF',
            borderRadius: '3px',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: '0.65rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 600,
              marginBottom: '0.5rem',
            }}>
              Private Real Estate Advisory
            </p>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.4rem',
              fontWeight: 300,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              margin: '0 0 0.8rem',
            }}>
              Discuss Opportunities With Sharan Estates
            </h3>
            <p style={{
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '540px',
              margin: '0 auto 1.5rem',
              lineHeight: 1.65,
            }}>
              Connect directly with our advisory partners for confidential guidance on acquisitions, market intelligence, and private allocations.
            </p>
            <Link
              to="/contact"
              onClick={onClose}
              style={{
                display: 'inline-block',
                padding: '0.85rem 2.2rem',
                background: '#FFFFFF',
                color: '#000000',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                transition: 'background 0.3s, color 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; }}
            >
              Request Private Consultation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ post, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="classic-property-card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        animation: `fadeSlideUp 0.6s ease ${index * 0.1}s both`,
        cursor: 'pointer',
        background: '#FFFFFF',
        color: '#000000',
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
          color: '#FFFFFF',
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
          <span style={{ fontSize: '0.68rem', color: '#666666', fontWeight: 500 }}>{post.date}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#000000' }} />
          <span style={{ fontSize: '0.68rem', color: '#666666', fontWeight: 500 }}>{post.readTime}</span>
        </div>

        <h3 style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-serif)',
          color: hovered ? '#1A1A1A' : '#000000',
          fontWeight: 300,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          lineHeight: 1.4,
          marginBottom: '0.75rem',
          transition: 'color 0.3s',
        }}>
          {post.title}
        </h3>

        <p style={{
          fontSize: '0.82rem',
          color: '#444444',
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
          color: '#000000',
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

function BlogListCard({ post, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="classic-property-card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        animation: `fadeSlideUp 0.5s ease ${index * 0.08}s both`,
        cursor: 'pointer',
        background: '#FFFFFF',
        color: '#000000',
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
          loading="lazy"
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
            background: 'rgba(0, 0, 0,0.06)',
            color: '#000000',
            border: '1px solid rgba(0, 0, 0,0.15)',
            borderRadius: '2px',
            fontSize: '0.58rem',
            fontWeight: 600,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}>
            {post.category}
          </span>
          <span style={{ fontSize: '0.68rem', color: '#666666', fontWeight: 500 }}>{post.date}</span>
          <span style={{ fontSize: '0.68rem', color: '#666666', fontWeight: 500 }}>{post.readTime}</span>
        </div>

        <h3 style={{
          fontSize: '0.95rem',
          fontFamily: 'var(--font-serif)',
          color: hovered ? '#1A1A1A' : '#000000',
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
          color: '#444444',
          lineHeight: 1.7,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {post.excerpt}
        </p>

        <div style={{
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: '#000000',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          transition: 'gap 0.3s',
          ...(hovered ? { gap: '0.7rem' } : {}),
        }}>
          Read Article
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </article>
  );
}

export default function BlogsPage() {
  useSEO(
    'Insights & Market News',
    'Stay up to date with the latest Dubai real estate market reports, investment insights, guides, and lifestyle news from Sharan Estates.'
  );

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  const loadBlogs = () => {
    fetch(`${API_BASE}/blogs`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setBlogPosts(Array.isArray(data) ? data : []))
      .catch(() => setBlogPosts([]));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadBlogs();
  }, []);

  useRealTimeSync((message) => {
    if (message.type === 'BLOG_CHANGE') {
      console.log('Real-time blogs update triggered');
      loadBlogs();
    }
  });

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
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>

      {/* ── HERO ── */}
      <RevealSection>
        <section style={{
          position: 'relative',
          minHeight: '480px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0F0F0F',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 25% 55%, rgba(255, 255, 255, 0.03) 0%, transparent 50%), radial-gradient(circle at 75% 30%, rgba(255, 255, 255, 0.02) 0%, transparent 40%)',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px', height: '600px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '2rem 1.5rem',
            maxWidth: '750px',
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.72rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1rem',
            }}>
              Perspectives &amp; Intelligence
            </p>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
              fontFamily: 'var(--font-serif)',
              color: '#FFFFFF',
              fontWeight: 300,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
            }}>
              Market Insights
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              maxWidth: '560px',
              margin: '0 auto',
            }}>
              Expert perspectives on Dubai's luxury real estate landscape, investment intelligence, and regulatory architecture.
            </p>
          </div>
        </section>
      </RevealSection>

      {/* ── FILTER TABS + SEARCH BAR ── */}
      <section style={{
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: '64px',
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          {/* Categories */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            paddingBottom: '0.2rem',
            scrollbarWidth: 'none',
          }}>
            {categories.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.4rem 0',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '1.5px',
                    color: isActive ? '#000000' : 'rgba(0, 0, 0, 0.45)',
                    position: 'relative',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.3s ease',
                    textTransform: 'uppercase',
                    outline: 'none',
                  }}
                  onMouseOver={(e) => { if (!isActive) e.target.style.color = '#000000'; }}
                  onMouseOut={(e) => { if (!isActive) e.target.style.color = 'rgba(0, 0, 0, 0.45)'; }}
                >
                  {cat}
                  <div style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: '#000000',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }} />
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', minWidth: '240px', flex: '1 1 auto', maxWidth: '320px' }}>
            <svg
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
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
                padding: '0.75rem 1.2rem 0.75rem 2.8rem',
                background: 'rgba(0, 0, 0, 0.03)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '3px',
                color: '#000000',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.4)'; e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)'; e.currentTarget.style.boxShadow = 'none'; }}
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
                  <FeaturedCard key={post.id} post={post} index={i} onClick={() => setSelectedPost(post)} />
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
                <BlogListCard key={post.id} post={post} index={i} onClick={() => setSelectedPost(post)} />
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

      {/* ── ARTICLE MODAL READER ── */}
      {selectedPost && (
        <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      {/* ── NEWSLETTER CTA ── */}
      <RevealSection>
        <section style={{
          background: 'var(--primary-dark)',
          padding: '3.5rem 1.5rem',
        }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.3)', margin: '0 auto 1.25rem' }} />
          <h2 style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            fontFamily: 'var(--font-serif)',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: 300,
            marginBottom: '0.75rem',
          }}>
            Stay Informed
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.65)',
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
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '3px',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#FFFFFF'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
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
                background: '#FFFFFF',
                color: '#000000',
                border: '1px solid #FFFFFF',
                cursor: 'pointer',
                transition: 'background 0.3s, color 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#000000';
              }}
            >
              Subscribe to Insights →
            </button>
          </div>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.75rem' }}>
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
