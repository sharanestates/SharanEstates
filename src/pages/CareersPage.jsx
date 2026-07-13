import React, { useState } from 'react';

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

function JobCard({ job, onApply }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: '#fff',
      border: '1px solid rgba(211,185,138,0.25)',
      borderRadius: '6px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      transition: 'box-shadow 0.2s',
    }}>
      {/* Card Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ padding: '1.5rem 2rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.6rem' }}>
            <span style={{ padding: '0.2rem 0.65rem', background: 'rgba(211,185,138,0.15)', color: 'var(--primary-dark)', border: '1px solid rgba(211,185,138,0.3)', borderRadius: '2px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {job.department}
            </span>
            <span style={{ padding: '0.2rem 0.65rem', background: 'var(--bg-light)', color: 'var(--text-muted)', borderRadius: '2px', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px' }}>
              {job.type}
            </span>
          </div>
          <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
            {job.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            <span>📍</span>
            <span>{job.location}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onApply(job); }}
            style={{ padding: '0.55rem 1.2rem', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.5px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
          >
            Apply Now
          </button>
          <span style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s' }}>▾</span>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div style={{ padding: '0 2rem 1.75rem', borderTop: '1px solid rgba(211,185,138,0.2)' }}>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.9rem', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
            {job.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="job-details-grid">
            <div>
              <h4 style={{ fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary-dark)', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'var(--font-sans)' }}>
                Requirements
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {job.requirements.map((r, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--primary-dark)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary-dark)', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'var(--font-sans)' }}>
                What We Offer
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {job.benefits.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    <span style={{ fontSize: '0.8rem', flexShrink: 0 }}>⭐</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => onApply(job)}
            style={{ marginTop: '1.5rem', padding: '0.7rem 2rem', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
          >
            Apply for This Position →
          </button>
        </div>
      )}
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
    await new Promise(r => setTimeout(r, 1000)); // Simulate send
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
    >
      <div style={{ background: '#fff', borderRadius: '8px', maxWidth: '540px', width: '100%', boxShadow: '0 30px 70px rgba(0,0,0,0.35)', overflow: 'hidden' }}>
        {/* Modal Header */}
        <div style={{ background: '#0a0a0a', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--primary-dark)', fontSize: '0.68rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.25rem' }}>Join Our Team</p>
            <h3 style={{ color: '#fff', fontSize: '1.15rem', fontFamily: 'var(--font-serif)', margin: 0 }}>{job.title}</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888', fontSize: '1.6rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>

        <div style={{ padding: '2rem' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { key: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your full name' },
                { key: 'email', label: 'Email *', type: 'email', placeholder: 'your@email.com' },
                { key: 'phone', label: 'Phone *', type: 'tel', placeholder: '+971 50 000 0000' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    required
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Upload CV *</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={e => setFile(e.target.files[0])}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '4px', fontSize: '0.85rem', fontFamily: 'var(--font-sans)', boxSizing: 'border-box', background: 'var(--bg-light)' }}
                />
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>PDF, DOC or DOCX. Max 5MB.</p>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Cover Note (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us why you're a great fit..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'var(--font-sans)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ padding: '0.9rem', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.75 : 1, transition: 'background 0.2s' }}
                onMouseEnter={e => !loading && (e.currentTarget.style.background = 'var(--primary-dark)')}
                onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
              >
                {loading ? 'Submitting...' : 'Submit Application →'}
              </button>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
                Or email your CV to <a href="mailto:careers@sharanestates.com" style={{ color: 'var(--primary-dark)' }}>careers@sharanestates.com</a>
              </p>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Application Received!</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Thank you for applying for the <strong>{job.title}</strong> position. Our HR team will review your application and be in touch within 5 business days.
              </p>
              <button onClick={onClose} style={{ padding: '0.7rem 2rem', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>Close</button>
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

  const departments = ['All', 'Sales', 'Marketing', 'Operations', 'Creative'];
  const filtered = activeFilter === 'All' ? jobOpenings : jobOpenings.filter(j => j.department === activeFilter);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)' }}>
      {activeJob && <ApplyModal job={activeJob} onClose={() => setActiveJob(null)} />}

      {/* ── Hero ── */}
      <div style={{ position: 'relative', minHeight: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#0a0a0a' }}>
        {/* Background pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(211,185,138,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(211,185,138,0.05) 0%, transparent 40%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(211,185,138,0.02) 40px, rgba(211,185,138,0.02) 80px)' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '7rem 1.5rem 4rem', maxWidth: '800px' }}>
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.72rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.25rem' }}>
            Join Our Team
          </p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#fff', fontFamily: 'var(--font-serif)', letterSpacing: '2px', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Build Your Career at<br />
            <span style={{ color: 'var(--primary-dark)' }}>Sharan Estates</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 2rem' }}>
            We are a team of passionate real estate professionals dedicated to delivering exceptional outcomes for our clients. Join us to work with the finest properties in Dubai and beyond.
          </p>
          <a
            href="#openings"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', background: 'var(--primary-dark)', color: '#0a0a0a', border: 'none', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity 0.2s' }}
          >
            View Open Positions ↓
          </a>
        </div>
      </div>

      {/* ── Why Join Us ── */}
      <div style={{ padding: '5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>Our Culture</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Why Work With Us?
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: '🏆', title: 'Top-Tier Projects', desc: 'Represent the most prestigious developments from Emaar, Meraas, Sobha, and more across Dubai and Abu Dhabi.' },
            { icon: '💰', title: 'Exceptional Earnings', desc: 'Industry-leading commission structures with uncapped earning potential and performance bonuses.' },
            { icon: '📈', title: 'Career Growth', desc: 'Clear progression paths from consultant to senior roles with mentorship from experienced leaders.' },
            { icon: '🌍', title: 'Global Network', desc: 'Work with international investors, HNWI clients, and a diverse team from over 30 nationalities.' },
            { icon: '🎓', title: 'Training & Development', desc: 'Continuous learning with developer training sessions, market workshops, and professional certifications.' },
            { icon: '🤝', title: 'Collaborative Team', desc: 'A culture built on transparency, integrity, and mutual success. We celebrate every win together.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid rgba(211,185,138,0.2)', borderRadius: '6px', padding: '1.75rem', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Job Openings ── */}
      <div id="openings" style={{ background: '#F9F6F0', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--primary-dark)', fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>Now Hiring</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
              Open Positions
            </h2>
            {/* Department filter */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setActiveFilter(dept)}
                  style={{ padding: '0.45rem 1.1rem', border: '1px solid rgba(211,185,138,0.4)', borderRadius: '30px', background: activeFilter === dept ? '#0a0a0a' : 'transparent', color: activeFilter === dept ? '#fff' : 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.5px' }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map(job => (
              <JobCard key={job.id} job={job} onApply={setActiveJob} />
            ))}
          </div>

          {/* Open Application */}
          <div style={{ marginTop: '3rem', background: '#0a0a0a', borderRadius: '8px', padding: '2.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--primary-dark)', fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>Don't see your role?</p>
            <h3 style={{ color: '#fff', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>Send an Open Application</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
              We're always looking for exceptional talent. Share your CV and tell us how you can contribute to Sharan Estates.
            </p>
            <a
              href="mailto:careers@sharanestates.com"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', background: 'var(--primary-dark)', color: '#0a0a0a', textDecoration: 'none', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s' }}
            >
              ✉️ careers@sharanestates.com
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .job-details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
