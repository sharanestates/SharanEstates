import { useEffect } from 'react';

/**
 * A custom hook to dynamically set document title and meta description.
 * @param {string} title - The title of the page.
 * @param {string} description - The meta description of the page.
 */
export default function useSEO(title, description) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Sharan Estates`;
    } else {
      document.title = 'Sharan Estates | Luxury Real Estate Dubai';
    }

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    
    if (description) {
      metaDesc.setAttribute('content', description);
    } else {
      metaDesc.setAttribute('content', 'Sharan Estates is a premier luxury real estate agency in Dubai, offering premium villas, penthouses, off-plan projects, and investment advisory.');
    }
  }, [title, description]);
}
