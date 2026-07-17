import React, { useEffect } from 'react';
import useSEO from '../components/useSEO';

export default function TermsPage() {
  useSEO(
    'Terms of Service',
    'Review the terms of service for using the Sharan Estates real estate portal, including usage policies, intellectual property rights, and liability disclaimers.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--primary-dark)', fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
            Legal Documents
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', textTransform: 'uppercase', letterSpacing: '2px', margin: 0, fontWeight: 300 }}>
            Terms of Service
          </h1>
          <div style={{ width: '50px', height: '1px', background: 'var(--primary-color)', margin: '1.5rem auto 0' }} />
        </div>

        {/* Content Card */}
        <div className="classic-property-card" style={{ padding: '3rem', background: '#FFFFFF', borderRadius: '4px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Section 1: Acceptable Use */}
            <div>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
                1. Acceptable Use of Web Platform
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                By accessing this portal, you agree to comply with all applicable local and federal laws of the UAE. You are prohibited from executing automated data scraping, crawling, or extracting property list payloads without the express written permission of Sharan Estates.
              </p>
            </div>

            {/* Section 2: Intellectual Property */}
            <div>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
                2. Copyright & Intellectual Property
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: '0 0 1rem' }}>
                All design layouts, logos, structural texts, proprietary algorithms, 3D assets, custom icons, and visual graphics featured on this website are protected under United Arab Emirates (UAE) intellectual property and copyright laws.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                Any unauthorized reproduction, modification, translation, or distribution of this site\'s elements or proprietary contents is strictly prohibited and subject to legal prosecution.
              </p>
            </div>

            {/* Section 3: Licensing & Registration */}
            <div>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
                3. Agency Licensing Declarations
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                Sharan Estates operates in strict compliance with the Real Estate Regulatory Agency (RERA) standards. Official license metrics (RERA License: 1067808, ORN: 30498) are maintained for validation. Any inquiries regarding local broker certificates or project registrations can be submitted through our contact channels.
              </p>
            </div>

            {/* Section 4: Limitation of Liability */}
            <div>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
                4. Limitation of Liability
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                Sharan Estates holds no liability for any direct, indirect, or consequential damages resulting from transaction dependencies based on calculations, mortgage estimations, or pricing assumptions made on this website. Users are advised to coordinate with registered financial advisors and verified sales consultants prior to committing to purchase contracts.
              </p>
            </div>

          </div>

        </div>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Last updated: July 2026. For official legal inquiries, contact <a href="mailto:contactus@sharanestates.com" style={{ color: 'var(--primary-dark)', fontWeight: 600, textDecoration: 'none' }}>contactus@sharanestates.com</a>
        </div>

      </div>
    </div>
  );
}
