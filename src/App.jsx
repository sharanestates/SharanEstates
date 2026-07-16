import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';
import Listings from './pages/Listings';
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlaceholderPage from './pages/PlaceholderPage';
import CareersPage from './pages/CareersPage';
import BlogsPage from './pages/BlogsPage';
import AreaGuidePage from './pages/AreaGuidePage';
import ListWithUsPage from './pages/ListWithUsPage';
import AreaDetailPage from './pages/AreaDetailPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';

function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      syncTouch: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 2.6,
      infinite: false,
    });

    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.lenis = null;
    };
  }, []);

  // Reset scroll position on route change to make sure scroll reveals trigger correctly
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact Us" description="Reach out to our luxury consultants to discuss your real estate portfolio." email="contactus@sharanestates.com" />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/list-with-us" element={<ListWithUsPage />} />
          <Route path="/area-guide" element={<AreaGuidePage />} />
          <Route path="/area-guide/:id" element={<AreaDetailPage />} />
          <Route path="/market-trends" element={<PlaceholderPage title="Market Trends" description="Deep analytics and intelligence on the global luxury real estate market. Coming soon." />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/listings/:type" element={<Listings />} />
          <Route path="/listings/:type/:category" element={<Listings />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
