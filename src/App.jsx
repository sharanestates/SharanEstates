import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';
import Listings from './pages/Listings';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/listings/:type/:category" element={<Listings />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
