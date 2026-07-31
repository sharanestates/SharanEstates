import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RevealSection from '../components/RevealSection';
import useSEO from '../components/useSEO';

export default function AdvisoryPage() {
  useSEO(
    'Private Real Estate Advisory',
    'Sharan Private Advisory provides considered guidance and curated access to exceptional residential opportunities across Dubai.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pillars = [
    {
      number: '01',
      title: 'ACQUISITION',
      description: 'Identifying exceptional residences and opportunities aligned with each client’s long-term objectives.',
      details: [
        'Curated off-market and prime market searches',
        'Rigorous property inspection and valuation analysis',
        'Discreet representation throughout acquisition',
      ],
    },
    {
      number: '02',
      title: 'ADVISORY',
      description: 'Providing considered guidance across selection, negotiation, and overall investment strategy.',
      details: [
        'Independent perspective free from transactional pressure',
        'Market timing, yield, and capital appreciation analysis',
        'Strategic negotiation to protect client capital',
      ],
    },
    {
      number: '03',
      title: 'ACCESS',
      description: 'Connecting clients with curated opportunities and trusted relationships beyond the conventional market.',
      details: [
        'Exclusive developer previews and off-market releases',
        'Direct lines to Dubai’s premier private sellers',
        'Seamless coordination with trusted legal & wealth advisors',
      ],
    },
  ];

  const processSteps = [
    {
      step: '01',
      name: 'Understand',
      title: 'Deep Brief & Objectives',
      description: 'We listen first. We take the time to understand your lifestyle requirements, investment horizon, and privacy expectations before making any recommendations.',
    },
    {
      step: '02',
      name: 'Curate',
      title: 'Tailored Selection',
      description: 'Rather than presenting an overwhelming catalogue, we filter the entire Dubai market down to a hand-picked portfolio of 3 to 5 highly relevant opportunities.',
    },
    {
      step: '03',
      name: 'Advise',
      title: 'Independent Valuation',
      description: 'We provide clear, data-informed analysis of pricing, developer track record, and long-term potential, guiding you with complete transparency.',
    },
    {
      step: '04',
      name: 'Acquire',
      title: 'Discreet Execution',
      description: 'From offer structure to contract completion, we manage the entire transaction with meticulous care, protecting your interests at every stage.',
    },
  ];

  return (
    <div style={{ background: '#FFFFFF', color: '#111111', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* HERO SECTION */}
      <RevealSection>
        <section style={{ padding: 'clamp(3.5rem, 7vw, 6rem) 1.5rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.7rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.5)',
            fontWeight: 600,
            marginBottom: '1rem',
          }}>
            OUR APPROACH
          </p>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            fontFamily: 'var(--font-serif)',
            fontWeight: 300,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            color: '#111111',
          }}>
            Real Estate Advisory, Considered Differently.
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(0,0,0,0.7)',
            lineHeight: 1.8,
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
          }}>
            Our role extends beyond introducing properties. We provide considered guidance across acquisition, advisory and access, helping clients make confident decisions in Dubai's evolving real-estate market.
          </p>

          <div style={{ width: '40px', height: '1px', background: 'rgba(0,0,0,0.2)', margin: '0 auto' }} />
        </section>
      </RevealSection>

      {/* THREE PILLARS */}
      <RevealSection>
        <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem', background: '#FDFDFB', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
              gap: '2.5rem',
            }}>
              {pillars.map((pillar) => (
                <div
                  key={pillar.number}
                  style={{
                    padding: '2.5rem 2rem',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  }}
                  className="editorial-card-item"
                >
                  <span style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', letterSpacing: '3px', color: 'rgba(0,0,0,0.35)' }}>
                    {pillar.number}
                  </span>

                  <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', letterSpacing: '2px', textTransform: 'uppercase', color: '#111111', margin: 0, fontWeight: 400 }}>
                    {pillar.title}
                  </h2>

                  <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.65)', lineHeight: 1.7, margin: 0 }}>
                    {pillar.description}
                  </p>

                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '0.5rem 0' }} />

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {pillar.details.map((detail, idx) => (
                      <li key={idx} style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#111111', opacity: 0.4 }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* A PERSONALIZED PROCESS */}
      <RevealSection>
        <section style={{ padding: 'clamp(4.5rem, 8vw, 7rem) 1.5rem', background: '#FFFFFF' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{ fontSize: '0.68rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', fontWeight: 600, marginBottom: '0.75rem' }}>
                A PERSONALIZED PROCESS
              </p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontFamily: 'var(--font-serif)', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#111111', fontWeight: 300, margin: 0 }}>
                Four Steps To Considered Acquisition
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '2rem' }}>
              {processSteps.map((item) => (
                <div
                  key={item.step}
                  style={{
                    padding: '2rem 1.5rem',
                    background: '#FDFDFB',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                    {item.step} — {item.name.toUpperCase()}
                  </span>
                  <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: '#111111', margin: 0, fontWeight: 400, letterSpacing: '1px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.65, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* CTA BANNER */}
      <RevealSection>
        <section style={{
          background: 'var(--primary-dark)',
          color: '#FFFFFF',
          padding: 'clamp(4.5rem, 8vw, 6.5rem) 1.5rem',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.4)', margin: '0 auto 1.5rem' }} />
            
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', letterSpacing: '3.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
              PRIVATE CONSULTATION
            </p>

            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: 'var(--font-serif)', color: '#FFFFFF', letterSpacing: '2px', textTransform: 'uppercase', lineHeight: 1.2, fontWeight: 300, marginBottom: '1.5rem' }}>
              Begin a Private Conversation
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 2.5rem' }}>
              Whether seeking a personal residence or expanding an institutional portfolio, our senior advisory team is at your service.
            </p>

            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 2.4rem',
                borderRadius: '2px',
                fontSize: '0.72rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                background: '#FFFFFF',
                color: '#000000',
                fontWeight: 600,
              }}
            >
              Request Private Consultation →
            </Link>
          </div>
        </section>
      </RevealSection>

    </div>
  );
}
