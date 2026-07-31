import { useEffect } from 'react';

/**
 * A custom hook to dynamically set document title, meta description, OpenGraph tags,
 * canonical URL, and JSON-LD structured data.
 * 
 * @param {string} title - The title of the page.
 * @param {string} description - The meta description of the page.
 * @param {string} [image] - Optional image URL for OpenGraph.
 */
export default function useSEO(title, description, image) {
  useEffect(() => {
    const siteName = 'Sharan Private Advisory';
    const defaultTitle = 'Sharan Private Advisory | Dubai Luxury Real Estate';
    const defaultDescription = 'Sharan Private Advisory provides considered guidance and curated access to exceptional residential opportunities across Dubai.';
    const defaultImage = 'https://sharanestates.com/dubai_luxury_1.webp';

    const pageTitle = title ? `${title} | ${siteName}` : defaultTitle;
    const pageDescription = description || defaultDescription;
    const pageImage = image || defaultImage;
    const canonicalUrl = window.location.href.split('?')[0];

    // Set Document Title
    document.title = pageTitle;

    // Helper to set or create meta tags
    const setMetaTag = (selector, attrName, attrValue, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard Meta Description
    setMetaTag('meta[name="description"]', 'name', 'description', pageDescription);

    // OpenGraph Meta Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', pageDescription);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', pageImage);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', siteName);

    // Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // JSON-LD Structured Data for RealEstateAgent
    let scriptJsonLd = document.querySelector('script[id="json-ld-schema"]');
    if (!scriptJsonLd) {
      scriptJsonLd = document.createElement('script');
      scriptJsonLd.setAttribute('id', 'json-ld-schema');
      scriptJsonLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptJsonLd);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      'name': siteName,
      'url': 'https://sharanestates.com',
      'logo': 'https://sharanestates.com/logo-white.png',
      'image': pageImage,
      'description': pageDescription,
      'areaServed': {
        '@type': 'AdministrativeArea',
        'name': 'Dubai',
      },
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Dubai',
        'addressCountry': 'United Arab Emirates',
      },
      'priceRange': '$$$$',
    };

    scriptJsonLd.textContent = JSON.stringify(schemaData);
  }, [title, description, image]);
}
