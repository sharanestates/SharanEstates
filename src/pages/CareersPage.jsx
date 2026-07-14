import React, { useState, useEffect } from 'react';

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Property Consultant',
    department: 'Sales',
    location: 'Dubai, UAE',
    type: 'Full-Time',
    description: 'Drive sales for our off-plan and ready property portfolio. You will work closely with HNW clients, developers, and international investors to deliver premium real estate solutions.',
    requirements: [
      'Minimum 3 years of UAE real estate experience',
      'RERA certified (DLD registration preferred)',
      'Proven track record in luxury property sales',
      'Strong network of HNW clients and investors',
      'Excellent English communication skills; Arabic is a plus',
    ],
    benefits: ['Competitive base + uncapped commission', 'Medical insurance', 'Visa sponsorship', 'Career growth opportunities'],
  },
  {
    id: 2,
    title: 'Off-Plan Sales Specialist',
    department: 'Sales',
    location: 'Dubai, UAE',
    type: 'Full-Time',
    description: "Specialize in off-plan property sales across Dubai's most prestigious developers. You'll represent projects from Emaar, Meraas, Sobha, and other top-tier developers to a global clientele.",
    requirements: [
      'Minimum 2 years off-plan sales experience in Dubai',
      "Deep knowledge of Dubai's master-planned communities",
      'RERA certificate or willingness to obtain',
      'Strong presentation and negotiation skills',
      'Self-motivated with ability to work independently',
    ],
    benefits: ['High commission structure', 'Developer incentives & overrides', 'Marketing support & leads', 'Visa & medical insurance'],
  },
  {
    id: 3,
    title: 'Marketing Executive',
    department: 'Marketing',
    location: 'Dubai, UAE',
    type: 'Full-Time',
    description: "Lead our digital marketing efforts to elevate the Sharan Estates brand across social media, email campaigns, property portals, and paid advertising channels.",
    requirements: [
      '2+ years experience in real estate or luxury brand marketing',
      'Proficiency in Meta Ads, Google Ads, and email platforms',
      'Content creation and copywriting skills',
      'Experience with property portals (Bayut, Property Finder)',
      'Strong analytical and reporting skills',
    ],
    benefits: ['Competitive salary', 'Creative freedom & ownership', 'Medical insurance', 'Professional development budget'],
  },
  {
    id: 4,
    title: 'Client Relations Manager',
    department: 'Operations',
    location: 'Dubai, UAE',
    type: 'Full-Time',
    description: "Be the face of Sharan Estates for our high-net-worth clients. Manage end-to-end client relationships from initial inquiry through to post-handover support and re-investment.",
    requirements: [
      'Minimum 3 years in luxury client services or real estate',
      'Exceptional interpersonal and communication skills',
      'CRM software experience (Salesforce, HubSpot, etc.)',
      'Ability to manage multiple accounts simultaneously',
      'Multilingual preferred (Arabic, Russian, Chinese a plus)',
    ],
    benefits: ['Base salary + performance bonus', 'Career advancement pathway', 'Visa & medical', 'Annual flight allowance'],
  },
  {
    id: 5,
    title: 'Property Photographer & Videographer',
    department: 'Creative',
    location: 'Dubai, UAE',
    type: 'Full-Time / Freelance',
    description: "Capture stunning imagery and cinematic video tours of luxury properties across Dubai and Abu Dhabi. Your work will directly drive sales and brand perception.",
    requirements: [
      'Portfolio demonstrating luxury real estate photography',
      'Proficiency with drone photography (GCAA certified)',
      'Video editing skills (Premiere Pro, DaVinci Resolve)',
      'Own professional camera equipment preferred',
      'Flexible schedule for shoots across UAE',
    ],
    benefits: ['Competitive package or project rate', 'Flexible working', 'Equipment allowance', 'High-profile portfolio building'],
  },
];

const cultureValues = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
    ),
    title: 'Top-Tier Projects',
    desc: 'Represent the most prestigious developments from Emaar, Meraas, Sobha, and more across Dubai and Abu Dhabi.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Exceptional Earnings',
    desc: 'Industry-leading commission structures with uncapped earning potential and performance bonuses.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Career Growth',
    desc: 'Clear progression paths from consultant to senior roles with mentorship from experienced leaders.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Global Network',
    desc: 'Work with international investors, HNWI clients, and a diverse team from over 30 nationalities.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: 'Training & Development',
    desc: 'Continuous learning with developer training sessions, market workshops, and professional certifications.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Collaborative Culture',
    desc: 'A culture built on transparency, integrity, and mutual success. We celebrate every win together.',
  },
];


function JobCard({ job, isOpen, onToggle, onApply, index }) {
  return (
    <div
      className="careers-job-card"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(211,185,138,0.25)',
        borderRadius: '4px',
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        boxShadow: isOpen ? '0 12px 35px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.03)',
        borderColor: isOpen ? 'rgba(211,185,138,0.6)' : 'rgba(211,185,138,0.25)',
        animation: `fadeSlideUp 0.5s ease ${index * 0.08}s both`,
      }}
    >
      {/* Header */}
      <div
        onClick={onToggle}
        style={{
          padding: '1.5rem 2rem',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          transition: 'background 0.3s',
        }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'rgba(249,246,240,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <h3 style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--text-dark)',
              fontWeight: 300,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              {job.title}
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{
              padding: '0.2rem 0.7rem',
              background: 'rgba(211,185,138,0.12)',
              color: 'var(--primary-dark)',
              border: '1px solid rgba(211,185,138,0.25)',
              borderRadius: '2px',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}>
              {job.department}
            </span>
            <span style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {job.location}
            </span>
            <span style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              fontWeight: 500,
            }}>
              {job.type}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onApply(job); }}
            className="btn-solid"
            style={{
              padding: '0.55rem 1.4rem',
              borderRadius: '3px',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '1.5px',
            }}
          >
            Apply
          </button>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: '1px solid rgba(211,185,138,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            background: isOpen ? 'var(--text-dark)' : 'transparent',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#fff' : 'var(--primary-dark)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Expandable Details */}
      <div style={{
        maxHeight: isOpen ? '600px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{ padding: '0 2rem 2rem', borderTop: '1px solid rgba(211,185,138,0.15)' }}>
          <p style={{
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            fontSize: '0.88rem',
            marginTop: '1.5rem',
            marginBottom: '1.75rem',
          }}>
            {job.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }} className="job-details-grid">
            <div>
              <h4 style={{
                fontSize: '0.68rem',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: 'var(--primary-dark)',
                fontWeight: 600,
                marginBottom: '1rem',
                fontFamily: 'var(--font-sans)',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid rgba(211,185,138,0.2)',
              }}>
                Requirements
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {job.requirements.map((r, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--primary-dark)', fontWeight: 600, flexShrink: 0, fontSize: '0.7rem', marginTop: '0.15rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: '0.68rem',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: 'var(--primary-dark)',
                fontWeight: 600,
                marginBottom: '1rem',
                fontFamily: 'var(--font-sans)',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid rgba(211,185,138,0.2)',
              }}>
                What We Offer
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {job.benefits.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--primary-dark)', flexShrink: 0, fontSize: '0.7rem', marginTop: '0.15rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(211,185,138,0.15)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => onApply(job)}
              className="btn-solid"
              style={{
                padding: '0.75rem 2.2rem',
                borderRadius: '3px',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '2px',
              }}
            >
              Apply for This Position →
            </button>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              or email <a href="mailto:careers@sharanestates.com" style={{ color: 'var(--primary-dark)', textDecoration: 'none', fontWeight: 600 }}>careers@sharanestates.com</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    border: '1px solid rgba(211,185,138,0.3)',
    borderRadius: '3px',
    fontSize: '0.88rem',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    background: '#FAFAF8',
    color: 'var(--text-dark)',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div style={{
        background: '#fff',
        borderRadius: '4px',
        maxWidth: '520px',
        width: '100%',
        boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        animation: 'slideUp 0.4s ease',
        border: '1px solid rgba(211,185,138,0.2)',
      }}>
        {/* Modal Header */}
        <div style={{
          background: 'var(--text-dark)',
          padding: '1.75rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, var(--primary-dark), var(--primary-color), var(--primary-dark))',
          }} />
          <div>
            <p style={{
              color: 'var(--primary-color)',
              fontSize: '0.62rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '0.35rem',
            }}>Apply Now</p>
            <h3 style={{
              color: '#fff',
              fontSize: '1.1rem',
              fontFamily: 'var(--font-serif)',
              margin: 0,
              fontWeight: 300,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}>{job.title}</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1.2rem',
              cursor: 'pointer',
              lineHeight: 1,
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          >×</button>
        </div>

        <div style={{ padding: '2rem' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+971 50 000 0000' },
              ].map(f => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label} *</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    required
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-dark)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(211,185,138,0.3)'}
                  />
                </div>
              ))}
              <div>
                <label style={labelStyle}>Upload CV *</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={e => setFile(e.target.files[0])}
                  style={{
                    ...inputStyle,
                    padding: '0.7rem',
                    background: 'var(--bg-light)',
                    cursor: 'pointer',
                  }}
                />
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>PDF, DOC or DOCX — Max 5MB</p>
              </div>
              <div>
                <label style={labelStyle}>Cover Note <span style={{ fontWeight: 400, opacity: 0.7 }}>(Optional)</span></label>
                <textarea
                  rows={3}
                  placeholder="Tell us why you're a great fit..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-dark)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(211,185,138,0.3)'}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-solid"
                style={{
                  padding: '0.95rem',
                  borderRadius: '3px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  width: '100%',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Submitting...' : 'Submit Application →'}
              </button>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
                Or email directly: <a href="mailto:careers@sharanestates.com" style={{ color: 'var(--primary-dark)', textDecoration: 'none', fontWeight: 600 }}>careers@sharanestates.com</a>
              </p>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(211,185,138,0.12)',
                border: '2px solid var(--primary-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h4 style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-dark)',
                marginBottom: '0.6rem',
                fontSize: '1.2rem',
                fontWeight: 300,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}>Application Received</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '360px', margin: '0 auto 1.5rem' }}>
                Thank you for applying for the <strong>{job.title}</strong> position. Our HR team will review your application and reach out within 5 business days.
              </p>
              <button
                onClick={onClose}
                className="btn-solid"
                style={{ padding: '0.7rem 2.5rem', borderRadius: '3px', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px' }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default function CareersPage() {
  const [activeJob, setActiveJob] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const departments = ['All', 'Sales', 'Marketing', 'Operations', 'Creative'];
  const filtered = activeFilter === 'All' ? jobOpenings : jobOpenings.filter(j => j.department === activeFilter);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)' }}>
      {activeJob && <ApplyModal job={activeJob} onClose={() => setActiveJob(null)} />}

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        minHeight: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--text-dark)',
      }}>
        {/* Subtle background decorations */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(211,185,138,0.06) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(211,185,138,0.04) 0%, transparent 40%)',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          border: '1px solid rgba(211,185,138,0.06)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          border: '1px solid rgba(211,185,138,0.04)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: 'clamp(6rem, 12vw, 8rem) 1.5rem clamp(4rem, 8vw, 5rem)',
          maxWidth: '760px',
        }}>
          <div style={{
            width: '40px',
            height: '1px',
            background: 'var(--primary-color)',
            margin: '0 auto 1.5rem',
          }} />
          <p style={{
            color: 'var(--primary-color)',
            fontSize: '0.7rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}>
            Careers at Sharan Estates
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
            Shape the Future of<br />
            <span style={{ color: 'var(--primary-color)' }}>Luxury Real Estate</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
          }}>
            Join a team of passionate professionals dedicated to delivering exceptional outcomes. Build your career with the finest properties in Dubai and beyond.
          </p>
          <a
            href="#openings"
            className="btn-solid"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.9rem 2.2rem',
              borderRadius: '3px',
              fontSize: '0.72rem',
              letterSpacing: '2px',
              textDecoration: 'none',
            }}
          >
            View Open Positions
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ── OUR CULTURE ── */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{
            width: '40px',
            height: '1px',
            background: 'var(--primary-color)',
            margin: '0 auto 1rem',
          }} />
          <p style={{
            color: 'var(--primary-dark)',
            fontSize: '0.68rem',
            letterSpacing: '3.5px',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}>Our Culture</p>
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontFamily: 'var(--font-serif)',
            color: 'var(--text-dark)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: 300,
            marginBottom: '1rem',
          }}>
            Why Work With Us
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto',
          }}>
            We foster an environment where ambition meets opportunity, and every team member contributes to our legacy of excellence.
          </p>
        </div>

        {/* Culture Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }} className="culture-grid">
          {cultureValues.map((item, i) => (
            <div
              key={i}
              className="classic-property-card"
              style={{
                padding: '2rem 1.75rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: `fadeSlideUp 0.6s ease ${i * 0.1}s both`,
              }}
            >
              {/* Icon Container */}
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(211,185,138,0.08)',
                border: '1px solid rgba(211,185,138,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                color: 'var(--primary-dark)',
                transition: 'all 0.4s',
              }}>
                {item.icon}
              </div>

              <h3 style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-dark)',
                fontWeight: 300,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}>
                {item.title}
              </h3>

              <div style={{
                width: '24px',
                height: '1px',
                background: 'var(--primary-color)',
                marginBottom: '0.75rem',
              }} />

              <p style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider Stats Bar ── */}
      <section style={{
        background: 'var(--text-dark)',
        padding: '2.5rem 1.5rem',
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
          {[
            { value: '5+', label: 'Open Positions' },
            { value: '30+', label: 'Nationalities' },
            { value: '100%', label: 'Visa Sponsorship' },
            { value: '∞', label: 'Growth Potential' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: '120px' }}>
              <div style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 300,
                color: 'var(--primary-color)',
                fontFamily: 'var(--font-serif)',
                letterSpacing: '2px',
                marginBottom: '0.25rem',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.62rem',
                color: 'rgba(255,255,255,0.45)',
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

      {/* ── OPEN POSITIONS ── */}
      <section id="openings" style={{ padding: 'clamp(4rem, 8vw, 6rem) 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              width: '40px',
              height: '1px',
              background: 'var(--primary-color)',
              margin: '0 auto 1rem',
            }} />
            <p style={{
              color: 'var(--primary-dark)',
              fontSize: '0.68rem',
              letterSpacing: '3.5px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}>Now Hiring</p>
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontFamily: 'var(--font-serif)',
              color: 'var(--text-dark)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 300,
              marginBottom: '1.5rem',
            }}>
              Open Positions
            </h2>

            {/* Department Filter Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setActiveFilter(dept)}
                  style={{
                    padding: '0.45rem 1.2rem',
                    border: '1px solid',
                    borderColor: activeFilter === dept ? 'var(--text-dark)' : 'rgba(211,185,138,0.35)',
                    borderRadius: '2px',
                    background: activeFilter === dept ? 'var(--text-dark)' : 'transparent',
                    color: activeFilter === dept ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                index={i}
                isOpen={expandedId === job.id}
                onToggle={() => setExpandedId(expandedId === job.id ? null : job.id)}
                onApply={setActiveJob}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
            }}>
              No positions currently open in this department. Check back soon or send an open application below.
            </div>
          )}

          {/* Open Application CTA */}
          <div style={{
            marginTop: '3rem',
            background: 'var(--text-dark)',
            borderRadius: '4px',
            padding: '3rem 2.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Subtle decorative circles */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '120px',
              height: '120px',
              border: '1px solid rgba(211,185,138,0.08)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              width: '80px',
              height: '80px',
              border: '1px solid rgba(211,185,138,0.06)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{
                color: 'var(--primary-color)',
                fontSize: '0.65rem',
                letterSpacing: '3.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}>Don't See Your Role?</p>
              <h3 style={{
                color: '#fff',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.3rem',
                marginBottom: '0.75rem',
                fontWeight: 300,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>Send an Open Application</h3>
              <div style={{
                width: '30px',
                height: '1px',
                background: 'var(--primary-color)',
                margin: '0 auto 1rem',
              }} />
              <p style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '0.88rem',
                lineHeight: 1.75,
                marginBottom: '1.75rem',
                maxWidth: '440px',
                margin: '0 auto 1.75rem',
              }}>
                We're always seeking exceptional talent. Share your CV and tell us how you can contribute to the Sharan Estates vision.
              </p>
              <a
                href="mailto:careers@sharanestates.com"
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                careers@sharanestates.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .careers-job-card:hover {
          border-color: rgba(211,185,138,0.5) !important;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06) !important;
        }
        @media (max-width: 768px) {
          .culture-grid {
            grid-template-columns: 1fr !important;
          }
          .job-details-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .culture-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
