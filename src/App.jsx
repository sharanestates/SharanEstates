import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';
import Listings from './pages/Listings';
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlaceholderPage from './pages/PlaceholderPage';
import CareersPage from './pages/CareersPage';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact Us" description="Reach out to our luxury consultants to discuss your real estate portfolio." email="contactus@sharanestates.com" />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/list-with-us" element={<PlaceholderPage title="List With Us" description="Showcase your property to our exclusive global network of buyers." email="contactus@sharanestates.com" />} />
          <Route path="/area-guide" element={<PlaceholderPage title="Area Guide" description="Comprehensive insights into Dubai's most prestigious districts. Coming soon." />} />
          <Route path="/market-trends" element={<PlaceholderPage title="Market Trends" description="Deep analytics and intelligence on the global luxury real estate market. Coming soon." />} />
          <Route path="/blogs" element={<PlaceholderPage title="Insights & Blogs" description="Our latest thoughts on real estate around the globe. Check back weekly for new updates." />} />
          <Route path="/listings/:type" element={<Listings />} />
          <Route path="/listings/:type/:category" element={<Listings />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
