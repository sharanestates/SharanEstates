import React, { useEffect } from 'react';
import useSEO from '../components/useSEO';

export default function PrivacyPolicyPage() {
  useSEO(
    'Privacy Policy',
    'Read the privacy policy and legal disclaimer of Sharan Estates regarding data collection, communications, and third-party listings.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ width: '40px', height: '1px', background: '#eab308', margin: '0 auto 1rem' }} />
          <p style={{ color: '#eab308', fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
            Legal Documents
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)', textTransform: 'uppercase', letterSpacing: '2px', margin: 0, fontWeight: 300 }}>
            Disclaimer & Privacy Policy
          </h1>
          <div style={{ width: '50px', height: '1px', background: '#eab308', margin: '1.5rem auto 0' }} />
        </div>

        {/* Content Card */}
        <div className="classic-property-card" style={{ padding: '3rem', background: '#FFFFFF', borderRadius: '4px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Section 1: Introduction */}
            <div>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
                1. Disclaimer & Legal Notice
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: '0 0 1rem' }}>
                This website is owned and operated by Sharan Estates, a luxury real estate consultancy based in Dubai, United Arab Emirates. The information provided on this platform is intended for general guidance and informational purposes only.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                It does not constitute a formal financial offer, investment advice, or guaranteed yield forecasts. While we strive to maintain accurate listings, all details including pricing, payment structures, project layouts, and unit availability are subject to modification by developers without prior notice. Original architectural renders, virtual tours, and photographs are for illustrative purposes.
              </p>
            </div>

            {/* Section 2: Data Collection */}
            <div>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
                2. Data Collection & Privacy Policy
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: '0 0 1rem' }}>
                At Sharan Estates, we value your privacy. When you register interest or inquire about specific listings, we collect necessary contact information (name, phone number, email address, property preferences) to provide personalized advisory services.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                By submitting your contact coordinates on this portal, you authorize Sharan Estates to share your inquiries with relevant RERA-registered developers or partners solely to fulfill your specific property request.
              </p>
            </div>

            {/* Section 3: Communications */}
            <div>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
                3. Registered Communications
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                We may periodically reach out to you via your registered email or mobile number with updates regarding new launches, market analysis reports, or follow-up details on properties you selected. You retain the right to unsubscribe or request your data be removed from our marketing systems at any point by contacting us directly.
              </p>
            </div>

            {/* Section 4: External Links */}
            <div>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
                4. Third-Party Links & API Data
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                Our website displays information from third-party developers, floor plan software, and other online sources. Sharan Estates holds no responsibility or liability for content, cookies, or privacy practices on external links or third-party web portals.
              </p>
            </div>

          </div>

        </div>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Last updated: July 2026. For questions, contact us at <a href="mailto:contactus@sharanestates.com" style={{ color: 'var(--primary-dark)', fontWeight: 600, textDecoration: 'none' }}>contactus@sharanestates.com</a>
        </div>

      </div>
    </div>
  );
}
