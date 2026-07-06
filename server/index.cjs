const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { pool } = require('./db.cjs');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'sharan_estates_fallback_secret_key';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const fallbackProperties = [
  // ═══════════════════════════════════════════
  //  BUY — VILLAS (3)
  // ═══════════════════════════════════════════
  {
    id: 1,
    title: "The Concrete Oasis Villa",
    price: "AED 18,500,000",
    image: "/listing_villa.png",
    description: "A solid, modern architectural masterpiece with brutalist aesthetics and warm wood accents. Features double-height glass panels, a private infinity pool, and golf course views.",
    beds: 5, baths: 6, size: "6,500 Sq. Ft.",
    category: "villas", type: "buy", location: "Emirates Hills", status: "Available",
    floors: [
      { id: 3, name: "Rooftop Terrace", flats: [{ name: "Sky Lounge Suite", price: "AED 4,000,000", size: "1,500 Sq. Ft.", beds: 2, baths: 2, status: "Available" }] },
      { id: 2, name: "Level 2 - Bedrooms", flats: [{ name: "Master Suite A", price: "AED 8,500,000", size: "2,200 Sq. Ft.", beds: 4, baths: 4, status: "Sold" }, { name: "Guest Room B", price: "AED 6,000,000", size: "1,800 Sq. Ft.", beds: 3, baths: 3, status: "Available" }] },
      { id: 1, name: "Level 1 - Living", flats: [{ name: "Main Lounge & Patio", price: "AED 10,000,000", size: "2,500 Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 2,
    title: "Palm Crescent Estate",
    price: "AED 32,000,000",
    image: "/listing_villa.png",
    description: "An ultra-premium beachfront villa on the Palm Jumeirah crescent with private beach access, a temperature-controlled infinity pool, cinema room, and panoramic Arabian Gulf views.",
    beds: 7, baths: 8, size: "12,000 Sq. Ft.",
    category: "villas", type: "buy", location: "Palm Jumeirah", status: "Available",
    floors: [
      { id: 2, name: "Upper Floor", flats: [{ name: "Master Wing", price: "AED 18,000,000", size: "5,000 Sq. Ft.", beds: 4, baths: 5, status: "Available" }] },
      { id: 1, name: "Ground Floor", flats: [{ name: "Entertainment Wing", price: "AED 14,000,000", size: "7,000 Sq. Ft.", beds: 3, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 3,
    title: "Al Barari Sanctuary Villa",
    price: "AED 22,750,000",
    image: "/listing_villa.png",
    description: "Set within lush botanical gardens, this eco-luxury villa blends natural stone with organic architecture. Features a private spa, outdoor kitchen, and koi pond courtyard.",
    beds: 6, baths: 7, size: "8,900 Sq. Ft.",
    category: "villas", type: "buy", location: "Al Barari", status: "Available",
    floors: [
      { id: 2, name: "Private Quarters", flats: [{ name: "Master Suite", price: "AED 12,000,000", size: "3,500 Sq. Ft.", beds: 3, baths: 4, status: "Available" }, { name: "Guest Pavilion", price: "AED 5,000,000", size: "2,000 Sq. Ft.", beds: 2, baths: 2, status: "Available" }] },
      { id: 1, name: "Ground Living", flats: [{ name: "Grand Hall & Garden", price: "AED 5,750,000", size: "3,400 Sq. Ft.", beds: 1, baths: 1, status: "Available" }] }
    ]
  },

  // ═══════════════════════════════════════════
  //  BUY — APARTMENTS (3)
  // ═══════════════════════════════════════════
  {
    id: 4,
    title: "Skyline Stone Residences",
    price: "AED 8,200,000",
    image: "/listing_apt.png",
    description: "Premium high-rise with a concrete and stone facade, integrating vertical gardens and solid structural elements. Open plan living space with custom marble details.",
    beds: 3, baths: 3, size: "2,800 Sq. Ft.",
    category: "apartments", type: "buy", location: "Downtown Dubai", status: "Available",
    floors: [
      { id: 3, name: "Level 3 - Penthouses", flats: [{ name: "Penthouse 301", price: "AED 12,000,000", size: "3,200 Sq. Ft.", beds: 4, baths: 4, status: "Available" }] },
      { id: 2, name: "Level 2 - Standard units", flats: [{ name: "Flat 201", price: "AED 8,200,000", size: "2,800 Sq. Ft.", beds: 3, baths: 3, status: "Available" }, { name: "Flat 202", price: "AED 7,900,000", size: "2,600 Sq. Ft.", beds: 3, baths: 3, status: "Sold" }] },
      { id: 1, name: "Level 1 - Lobby & Commercial", flats: [{ name: "Lobby Office", price: "Commercial", size: "1,500 Sq. Ft.", beds: 0, baths: 2, status: "Commercial" }] }
    ]
  },
  {
    id: 5,
    title: "Creek Harbour Residence",
    price: "AED 4,600,000",
    image: "/listing_apt.png",
    description: "A contemporary waterfront apartment with floor-to-ceiling windows offering unobstructed Creek Tower views. Italian marble flooring, Miele appliances, and a private balcony terrace.",
    beds: 2, baths: 3, size: "1,850 Sq. Ft.",
    category: "apartments", type: "buy", location: "Dubai Creek Harbour", status: "Available",
    floors: [
      { id: 1, name: "Single Level", flats: [{ name: "Unit 1402", price: "AED 4,600,000", size: "1,850 Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 6,
    title: "DIFC Gate Avenue Loft",
    price: "AED 6,950,000",
    image: "/listing_apt.png",
    description: "Industrial-chic duplex loft in the financial district with exposed concrete ceilings, double-height living area, private rooftop garden, and direct access to Gate Avenue promenade.",
    beds: 3, baths: 4, size: "3,200 Sq. Ft.",
    category: "apartments", type: "buy", location: "DIFC", status: "Available",
    floors: [
      { id: 2, name: "Upper Loft", flats: [{ name: "Loft Mezzanine", price: "AED 3,500,000", size: "1,400 Sq. Ft.", beds: 2, baths: 2, status: "Available" }] },
      { id: 1, name: "Main Level", flats: [{ name: "Living & Kitchen", price: "AED 3,450,000", size: "1,800 Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },

  // ═══════════════════════════════════════════
  //  BUY — PENTHOUSES (3)
  // ═══════════════════════════════════════════
  {
    id: 7,
    title: "Golden Crest Penthouse",
    price: "AED 14,000,000",
    image: "/listing_penthouse.png",
    description: "Stunning triplex penthouse featuring 360-degree skyline views, private glass elevator, smart home automation, and floor-to-ceiling glass panel walls.",
    beds: 4, baths: 5, size: "4,800 Sq. Ft.",
    category: "penthouses", type: "buy", location: "Dubai Marina", status: "Available",
    floors: [
      { id: 2, name: "Penthouse Upper Deck", flats: [{ name: "PH Upper 502", price: "AED 15,000,000", size: "2,500 Sq. Ft.", beds: 2, baths: 3, status: "Available" }] },
      { id: 1, name: "Penthouse Lower Deck", flats: [{ name: "PH Lower 501", price: "AED 14,000,000", size: "2,300 Sq. Ft.", beds: 2, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 8,
    title: "Burj Vista Sky Mansion",
    price: "AED 45,000,000",
    image: "/listing_penthouse.png",
    description: "A full-floor sky mansion with direct Burj Khalifa views, private pool terrace, wine cellar, and a helipad. Bespoke interiors by a renowned Italian design house.",
    beds: 5, baths: 7, size: "8,500 Sq. Ft.",
    category: "penthouses", type: "buy", location: "Downtown Dubai", status: "Available",
    floors: [
      { id: 2, name: "Sky Terrace", flats: [{ name: "Pool Deck & Lounge", price: "AED 20,000,000", size: "3,500 Sq. Ft.", beds: 1, baths: 2, status: "Available" }] },
      { id: 1, name: "Main Residence", flats: [{ name: "Grand Living Wing", price: "AED 25,000,000", size: "5,000 Sq. Ft.", beds: 4, baths: 5, status: "Available" }] }
    ]
  },
  {
    id: 9,
    title: "Atlantis Royal Penthouse",
    price: "AED 28,500,000",
    image: "/listing_penthouse.png",
    description: "An ultra-exclusive penthouse within the Atlantis complex featuring underwater aquarium views, private butler service, and a cantilevered glass-bottom infinity pool.",
    beds: 4, baths: 5, size: "6,200 Sq. Ft.",
    category: "penthouses", type: "buy", location: "Palm Jumeirah", status: "Sold",
    floors: [
      { id: 2, name: "Entertainment Level", flats: [{ name: "Sky Bar & Cinema", price: "AED 12,000,000", size: "2,800 Sq. Ft.", beds: 1, baths: 2, status: "Sold" }] },
      { id: 1, name: "Living Level", flats: [{ name: "Master & Guest Wings", price: "AED 16,500,000", size: "3,400 Sq. Ft.", beds: 3, baths: 3, status: "Sold" }] }
    ]
  },

  // ═══════════════════════════════════════════
  //  RENT — VILLAS (3)
  // ═══════════════════════════════════════════
  {
    id: 10,
    title: "Jumeirah Bay Island Villa",
    price: "AED 850,000/yr",
    image: "/listing_villa.png",
    description: "A sprawling contemporary villa on the exclusive Jumeirah Bay Island with private marina berth, landscaped gardens, outdoor entertainment pavilion, and dedicated staff quarters.",
    beds: 6, baths: 7, size: "9,200 Sq. Ft.",
    category: "villas", type: "rent", location: "Jumeirah Bay Island", status: "Available",
    floors: [
      { id: 2, name: "Private Floor", flats: [{ name: "Master Wing", price: "AED 400,000/yr", size: "3,800 Sq. Ft.", beds: 3, baths: 4, status: "Available" }] },
      { id: 1, name: "Ground Floor", flats: [{ name: "Living & Pool Area", price: "AED 450,000/yr", size: "5,400 Sq. Ft.", beds: 3, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 11,
    title: "Arabian Ranches Polo Villa",
    price: "AED 420,000/yr",
    image: "/listing_villa.png",
    description: "A Mediterranean-inspired villa overlooking the polo grounds with terracotta roofing, hand-laid mosaic tiles, a private garden with mature palms, and a temperature-controlled pool.",
    beds: 5, baths: 5, size: "5,600 Sq. Ft.",
    category: "villas", type: "rent", location: "Arabian Ranches", status: "Available",
    floors: [
      { id: 2, name: "Upper Floor", flats: [{ name: "Family Bedrooms", price: "AED 200,000/yr", size: "2,400 Sq. Ft.", beds: 3, baths: 3, status: "Available" }] },
      { id: 1, name: "Ground Floor", flats: [{ name: "Reception & Kitchen", price: "AED 220,000/yr", size: "3,200 Sq. Ft.", beds: 2, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 12,
    title: "District One Crystal Lagoon Villa",
    price: "AED 1,200,000/yr",
    image: "/listing_villa.png",
    description: "Ultra-luxury waterfront villa directly on the crystal lagoon with private beach, rooftop infinity pool, smart home integration, and panoramic Burj Khalifa sightlines.",
    beds: 7, baths: 8, size: "14,000 Sq. Ft.",
    category: "villas", type: "rent", location: "MBR City - District One", status: "Available",
    floors: [
      { id: 3, name: "Rooftop", flats: [{ name: "Infinity Pool Deck", price: "AED 300,000/yr", size: "3,000 Sq. Ft.", beds: 1, baths: 1, status: "Available" }] },
      { id: 2, name: "Bedroom Floor", flats: [{ name: "Master Suite", price: "AED 450,000/yr", size: "4,500 Sq. Ft.", beds: 4, baths: 5, status: "Available" }] },
      { id: 1, name: "Grand Floor", flats: [{ name: "Entertainment Hall", price: "AED 450,000/yr", size: "6,500 Sq. Ft.", beds: 2, baths: 2, status: "Available" }] }
    ]
  },

  // ═══════════════════════════════════════════
  //  RENT — APARTMENTS (3)
  // ═══════════════════════════════════════════
  {
    id: 13,
    title: "Address Fountain Views Suite",
    price: "AED 280,000/yr",
    image: "/listing_apt.png",
    description: "A fully serviced luxury apartment with direct Dubai Fountain views, hotel-style concierge, valet parking, rooftop infinity pool access, and Burj Khalifa panorama.",
    beds: 2, baths: 3, size: "1,650 Sq. Ft.",
    category: "apartments", type: "rent", location: "Downtown Dubai", status: "Available",
    floors: [
      { id: 1, name: "Single Level", flats: [{ name: "Unit 2204", price: "AED 280,000/yr", size: "1,650 Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 14,
    title: "Bluewaters Waterfront Apartment",
    price: "AED 195,000/yr",
    image: "/listing_apt.png",
    description: "A sleek coastal apartment on Bluewaters Island with Ain Dubai views, open-plan living, premium appliances, resort-style amenities, and direct beach walkway access.",
    beds: 2, baths: 2, size: "1,400 Sq. Ft.",
    category: "apartments", type: "rent", location: "Bluewaters Island", status: "Available",
    floors: [
      { id: 1, name: "Single Level", flats: [{ name: "Unit 1801", price: "AED 195,000/yr", size: "1,400 Sq. Ft.", beds: 2, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 15,
    title: "City Walk Grand Residence",
    price: "AED 320,000/yr",
    image: "/listing_apt.png",
    description: "An expansive duplex apartment in the heart of City Walk with private terrace, designer interiors by Fendi Casa, smart automation, and dedicated parking for three vehicles.",
    beds: 3, baths: 4, size: "2,900 Sq. Ft.",
    category: "apartments", type: "rent", location: "City Walk", status: "Available",
    floors: [
      { id: 2, name: "Upper Level", flats: [{ name: "Bedroom Suite", price: "AED 160,000/yr", size: "1,300 Sq. Ft.", beds: 2, baths: 2, status: "Available" }] },
      { id: 1, name: "Lower Level", flats: [{ name: "Living & Dining", price: "AED 160,000/yr", size: "1,600 Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },

  // ═══════════════════════════════════════════
  //  RENT — PENTHOUSES (3)
  // ═══════════════════════════════════════════
  {
    id: 16,
    title: "One at Palm Sky Penthouse",
    price: "AED 1,500,000/yr",
    image: "/listing_penthouse.png",
    description: "An iconic full-floor penthouse atop the One at Palm Jumeirah tower with 270-degree sea views, private pool, chef's kitchen, cinema room, and personal elevator lobby.",
    beds: 5, baths: 6, size: "7,800 Sq. Ft.",
    category: "penthouses", type: "rent", location: "Palm Jumeirah", status: "Available",
    floors: [
      { id: 2, name: "Rooftop Terrace", flats: [{ name: "Pool & Sky Lounge", price: "AED 600,000/yr", size: "3,000 Sq. Ft.", beds: 1, baths: 2, status: "Available" }] },
      { id: 1, name: "Main Residence", flats: [{ name: "Grand Living & Suites", price: "AED 900,000/yr", size: "4,800 Sq. Ft.", beds: 4, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 17,
    title: "Marina Gate Crown Penthouse",
    price: "AED 650,000/yr",
    image: "/listing_penthouse.png",
    description: "A dramatic duplex penthouse crowning the Marina Gate towers with a wraparound terrace, private jacuzzi, floor-to-ceiling marina views, and designer furnishings included.",
    beds: 4, baths: 5, size: "5,200 Sq. Ft.",
    category: "penthouses", type: "rent", location: "Dubai Marina", status: "Available",
    floors: [
      { id: 2, name: "Upper Floor", flats: [{ name: "Sky Master Suite", price: "AED 300,000/yr", size: "2,200 Sq. Ft.", beds: 2, baths: 3, status: "Available" }] },
      { id: 1, name: "Lower Floor", flats: [{ name: "Entertainment Hall", price: "AED 350,000/yr", size: "3,000 Sq. Ft.", beds: 2, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 18,
    title: "FIVE JBR Royal Penthouse",
    price: "AED 900,000/yr",
    image: "/listing_penthouse.png",
    description: "A fully furnished luxury penthouse in the FIVE hotel tower featuring resort living, private beach club access, rooftop plunge pool, daily housekeeping, and panoramic JBR beach views.",
    beds: 3, baths: 4, size: "4,100 Sq. Ft.",
    category: "penthouses", type: "rent", location: "JBR", status: "Available",
    floors: [
      { id: 1, name: "Single Level", flats: [{ name: "Royal Suite PH-01", price: "AED 900,000/yr", size: "4,100 Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },

  // ═══════════════════════════════════════════
  //  OFF-PLAN — VILLAS (3)
  // ═══════════════════════════════════════════
  {
    id: 19,
    title: "The Oasis by Emaar Villa",
    price: "AED 40,000,000",
    image: "/listing_villa.png",
    description: "An upcoming ultra-luxury gated community by Emaar featuring lagoon-front mansions with private docks, Foster+Partners architecture, and lush tropical landscaping. Handover 2027.",
    beds: 7, baths: 9, size: "15,000 Sq. Ft.",
    category: "villas", type: "off-plan", location: "The Oasis, Dubai", status: "Off-Plan",
    floors: [
      { id: 3, name: "Rooftop Pavilion", flats: [{ name: "Sky Garden Suite", price: "AED 10,000,000", size: "3,000 Sq. Ft.", beds: 1, baths: 2, status: "Available" }] },
      { id: 2, name: "Upper Residence", flats: [{ name: "Family Wing", price: "AED 15,000,000", size: "5,500 Sq. Ft.", beds: 4, baths: 5, status: "Available" }] },
      { id: 1, name: "Ground Reception", flats: [{ name: "Grand Entrance & Pool", price: "AED 15,000,000", size: "6,500 Sq. Ft.", beds: 2, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 20,
    title: "Damac Lagoons Portofino Villa",
    price: "AED 5,200,000",
    image: "/listing_villa.png",
    description: "A Mediterranean-themed villa in the Damac Lagoons community with crystal lagoon access, private garden, water-inspired park amenities, and smart home features. Completion Q4 2026.",
    beds: 4, baths: 5, size: "3,800 Sq. Ft.",
    category: "villas", type: "off-plan", location: "Damac Lagoons", status: "Off-Plan",
    floors: [
      { id: 2, name: "Bedroom Level", flats: [{ name: "Bedroom Wing", price: "AED 2,600,000", size: "1,800 Sq. Ft.", beds: 3, baths: 3, status: "Available" }] },
      { id: 1, name: "Ground Level", flats: [{ name: "Living & Garden", price: "AED 2,600,000", size: "2,000 Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 21,
    title: "Tilal Al Ghaf Harmony Villa",
    price: "AED 8,900,000",
    image: "/listing_villa.png",
    description: "A nature-inspired sustainable villa within the Tilal Al Ghaf master-planned community featuring a swimmable lagoon, solar panels, recycled materials, and biophilic design. Handover 2027.",
    beds: 5, baths: 6, size: "5,500 Sq. Ft.",
    category: "villas", type: "off-plan", location: "Tilal Al Ghaf", status: "Off-Plan",
    floors: [
      { id: 2, name: "Upper Floor", flats: [{ name: "Private Suites", price: "AED 4,500,000", size: "2,500 Sq. Ft.", beds: 3, baths: 4, status: "Available" }] },
      { id: 1, name: "Ground Floor", flats: [{ name: "Open Living & Terrace", price: "AED 4,400,000", size: "3,000 Sq. Ft.", beds: 2, baths: 2, status: "Available" }] }
    ]
  },

  // ═══════════════════════════════════════════
  //  OFF-PLAN — APARTMENTS (3)
  // ═══════════════════════════════════════════
  {
    id: 22,
    title: "Emaar Beachfront Grand Bleu",
    price: "AED 3,800,000",
    image: "/listing_apt.png",
    description: "A premium beachfront apartment designed by Elie Saab with bespoke interiors, private beach access, resort-style infinity pool, and full sea views. Handover 2026.",
    beds: 2, baths: 3, size: "1,700 Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Emaar Beachfront", status: "Off-Plan",
    floors: [
      { id: 1, name: "Single Level", flats: [{ name: "Unit 1605", price: "AED 3,800,000", size: "1,700 Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 23,
    title: "Sobha Hartland Wave Grande",
    price: "AED 2,400,000",
    image: "/listing_apt.png",
    description: "A modern high-rise apartment in Sobha Hartland with lagoon views, European oak flooring, Bosch integrated kitchen, resort-style amenities, and direct MBR City connectivity. Completion 2027.",
    beds: 1, baths: 2, size: "950 Sq. Ft.",
    category: "apartments", type: "off-plan", location: "MBR City - Sobha Hartland", status: "Off-Plan",
    floors: [
      { id: 1, name: "Single Level", flats: [{ name: "Unit 2308", price: "AED 2,400,000", size: "950 Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 24,
    title: "Binghatti Mercedes Tower Residence",
    price: "AED 5,600,000",
    image: "/listing_apt.png",
    description: "A cutting-edge branded residence in the Binghatti Mercedes-Benz tower with automotive-inspired interiors, private elevator lobby, AMG fitness center, and Downtown skyline views. Handover 2028.",
    beds: 3, baths: 3, size: "2,100 Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Business Bay", status: "Off-Plan",
    floors: [
      { id: 1, name: "Single Level", flats: [{ name: "Unit 4201", price: "AED 5,600,000", size: "2,100 Sq. Ft.", beds: 3, baths: 3, status: "Available" }] }
    ]
  },

  // ═══════════════════════════════════════════
  //  OFF-PLAN — PENTHOUSES (3)
  // ═══════════════════════════════════════════
  {
    id: 25,
    title: "Bugatti Residences Sky Penthouse",
    price: "AED 65,000,000",
    image: "/listing_penthouse.png",
    description: "The world's first Bugatti-branded penthouse with a car elevator to your living room, riveted titanium panels, private rooftop helipad, and a cantilevered glass-bottom pool. Handover 2028.",
    beds: 5, baths: 7, size: "11,000 Sq. Ft.",
    category: "penthouses", type: "off-plan", location: "Business Bay", status: "Off-Plan",
    floors: [
      { id: 3, name: "Helipad & Sky Pool", flats: [{ name: "Rooftop Amenity", price: "AED 20,000,000", size: "3,000 Sq. Ft.", beds: 0, baths: 1, status: "Available" }] },
      { id: 2, name: "Living Level", flats: [{ name: "Grand Salon & Garage", price: "AED 25,000,000", size: "4,500 Sq. Ft.", beds: 2, baths: 3, status: "Available" }] },
      { id: 1, name: "Bedroom Level", flats: [{ name: "Master & Guest Suites", price: "AED 20,000,000", size: "3,500 Sq. Ft.", beds: 3, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 26,
    title: "Dorchester Collection Penthouse",
    price: "AED 38,000,000",
    image: "/listing_penthouse.png",
    description: "A branded penthouse within the Dorchester Collection hotel-residence with five-star hotel services, private chef kitchen, art gallery hallway, and unobstructed Palm views. Completion 2027.",
    beds: 4, baths: 5, size: "7,200 Sq. Ft.",
    category: "penthouses", type: "off-plan", location: "Palm Jumeirah", status: "Off-Plan",
    floors: [
      { id: 2, name: "Terrace Level", flats: [{ name: "Infinity Pool Terrace", price: "AED 15,000,000", size: "2,800 Sq. Ft.", beds: 1, baths: 2, status: "Available" }] },
      { id: 1, name: "Main Residence", flats: [{ name: "Living & Bedroom Wing", price: "AED 23,000,000", size: "4,400 Sq. Ft.", beds: 3, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 27,
    title: "Como Residences Crown",
    price: "AED 52,000,000",
    image: "/listing_penthouse.png",
    description: "The crown jewel of Nakheel's Como Residences — a full-floor penthouse with private rooftop garden, observatory lounge, indoor waterfall feature, and 360° Palm and Marina views. Handover 2028.",
    beds: 6, baths: 7, size: "9,500 Sq. Ft.",
    category: "penthouses", type: "off-plan", location: "Palm Jumeirah", status: "Off-Plan",
    floors: [
      { id: 3, name: "Observatory", flats: [{ name: "Sky Lounge", price: "AED 12,000,000", size: "2,000 Sq. Ft.", beds: 0, baths: 1, status: "Available" }] },
      { id: 2, name: "Upper Residence", flats: [{ name: "Master Wing", price: "AED 20,000,000", size: "3,500 Sq. Ft.", beds: 3, baths: 4, status: "Available" }] },
      { id: 1, name: "Main Living", flats: [{ name: "Grand Hall & Suites", price: "AED 20,000,000", size: "4,000 Sq. Ft.", beds: 3, baths: 2, status: "Available" }] }
    ]
  }
];

const fallbackInquiries = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+971 50 123 4567",
    property_type: "villa",
    property_id: 1,
    status: "Pending",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    phone: "+971 52 987 6543",
    property_type: "apartment",
    property_id: 2,
    status: "Contacted",
    created_at: new Date().toISOString()
  }
];

// Initialize Database Tables
async function initDb() {
  try {
    console.log('Initializing database tables...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute schema creation
    await pool.query(schemaSql);
    try {
      await pool.query('ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS message TEXT');
    } catch (alterErr) {
      console.warn('ALTER TABLE inquiries error (can be ignored if column exists):', alterErr.message);
    }
    console.log('Database tables verified/created successfully.');

    // Seed default admin if table is empty
    const adminCheck = await pool.query('SELECT * FROM admins LIMIT 1');
    if (adminCheck.rows.length === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      const passwordHash = await bcrypt.hash(password, 10);
      
      await pool.query(
        'INSERT INTO admins (username, password_hash) VALUES ($1, $2)',
        [username, passwordHash]
      );
      console.log(`Default admin created: Username: ${username}`);
    }

    // Seed default properties if table is empty
    const propertyCheck = await pool.query('SELECT * FROM properties LIMIT 1');
    if (propertyCheck.rows.length === 0) {
      console.log('Seeding default properties...');
      for (const prop of fallbackProperties) {
        const sql = `
          INSERT INTO properties 
          (title, price, image, description, beds, baths, size, category, type, location, status, floors) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `;
        const values = [
          prop.title,
          prop.price,
          prop.image,
          prop.description,
          parseInt(prop.beds),
          parseInt(prop.baths),
          prop.size,
          prop.category,
          prop.type,
          prop.location,
          prop.status,
          JSON.stringify(prop.floors)
        ];
        await pool.query(sql, values);
      }
      console.log('Seeded 3 default properties successfully.');
    }
  } catch (err) {
    console.error('Error initializing database:', err.message);
  }
}

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// --- AUTH ROUTES ---

// Admin Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const admin = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, username: admin.username });
  } catch (err) {
    console.warn('Login database query failed, trying memory fallback:', err.message);
    const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (username === defaultUsername && password === defaultPassword) {
      console.log('User logged in successfully via local memory admin fallback');
      const token = jwt.sign({ id: 0, username: defaultUsername }, JWT_SECRET, { expiresIn: '24h' });
      return res.json({ token, username: defaultUsername });
    }
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Verify Token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, username: req.user.username });
});


// --- PROPERTIES ROUTES ---

// Get All Properties
app.get('/api/properties', async (req, res) => {
  const { category, type, search } = req.query;
  
  let sql = 'SELECT * FROM properties';
  const params = [];
  const clauses = [];

  if (category) {
    params.push(category);
    clauses.push(`category = $${params.length}`);
  }
  if (type) {
    params.push(type);
    clauses.push(`type = $${params.length}`);
  }
  if (search) {
    params.push(`%${search}%`);
    clauses.push(`(title ILIKE $${params.length} OR description ILIKE $${params.length} OR location ILIKE $${params.length})`);
  }

  if (clauses.length > 0) {
    sql += ' WHERE ' + clauses.join(' AND ');
  }
  
  sql += ' ORDER BY id DESC';

  try {
    const result = await pool.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    console.warn('Fetch properties failed (falling back to memory database):', err.message);
    
    // Filter memory fallback data
    let filtered = [...fallbackProperties];
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    if (type) {
      filtered = filtered.filter(p => p.type === type);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p =>
        (p.title && p.title.toLowerCase().includes(searchLower)) ||
        (p.description && p.description.toLowerCase().includes(searchLower)) ||
        (p.location && p.location.toLowerCase().includes(searchLower))
      );
    }
    res.json(filtered);
  }
});

// Get Single Property
app.get('/api/properties/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM properties WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.warn('Fetch property by id failed (falling back to memory database):', err.message);
    const mockProp = fallbackProperties.find(p => p.id.toString() === id);
    if (mockProp) {
      res.json(mockProp);
    } else {
      res.status(404).json({ error: 'Property not found in fallback database' });
    }
  }
});

// Create Property (Admin Only)
app.post('/api/properties', authenticateToken, async (req, res) => {
  const { title, price, image, description, beds, baths, size, category, type, location, status, floors } = req.body;
  
  if (!title || !price || !image || !category || !type) {
    return res.status(400).json({ error: 'Missing required property fields' });
  }

  try {
    const sql = `
      INSERT INTO properties 
      (title, price, image, description, beds, baths, size, category, type, location, status, floors) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
      RETURNING *
    `;
    const values = [
      title, 
      price, 
      image, 
      description || '', 
      parseInt(beds) || 0, 
      parseInt(baths) || 0,
      size || '', 
      category, 
      type, 
      location || 'Prime District', 
      status || 'Available',
      JSON.stringify(floors || [])
    ];

    const result = await pool.query(sql, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create property error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Property (Admin Only)
app.put('/api/properties/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, price, image, description, beds, baths, size, category, type, location, status, floors } = req.body;

  if (!title || !price || !image || !category || !type) {
    return res.status(400).json({ error: 'Missing required property fields' });
  }

  try {
    const sql = `
      UPDATE properties 
      SET title = $1, price = $2, image = $3, description = $4, beds = $5, baths = $6, 
          size = $7, category = $8, type = $9, location = $10, status = $11, floors = $12 
      WHERE id = $13 
      RETURNING *
    `;
    const values = [
      title, 
      price, 
      image, 
      description, 
      parseInt(beds) || 0, 
      parseInt(baths) || 0,
      size || '', 
      category, 
      type, 
      location, 
      status,
      JSON.stringify(floors || []),
      id
    ];

    const result = await pool.query(sql, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update property error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Property (Admin Only)
app.delete('/api/properties/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM properties WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json({ message: 'Property deleted successfully', deletedProperty: result.rows[0] });
  } catch (err) {
    console.error('Delete property error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// --- INQUIRIES ROUTES ---

// Submit Inquiry (Public)
app.post('/api/inquiries', async (req, res) => {
  const { name, email, phone, propertyType, propertyId, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const sql = `
      INSERT INTO inquiries 
      (name, email, phone, property_type, property_id, message) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *
    `;
    const values = [
      name, 
      email, 
      phone || '', 
      propertyType || 'villa', 
      propertyId || null,
      message || ''
    ];

    const result = await pool.query(sql, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.warn('Inquiry submission database insert failed, using memory fallback:', err.message);
    const newInquiry = {
      id: fallbackInquiries.length + 1,
      name,
      email,
      phone: phone || '',
      property_type: propertyType || 'villa',
      property_id: propertyId || null,
      message: message || '',
      status: 'Pending',
      created_at: new Date().toISOString()
    };
    fallbackInquiries.push(newInquiry);
    res.status(201).json(newInquiry);
  }
});

// Get All Inquiries (Admin Only)
app.get('/api/inquiries', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inquiries ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.warn('Fetch inquiries failed (falling back to memory database):', err.message);
    res.json(fallbackInquiries);
  }
});

// Update Inquiry Status (Admin Only)
app.put('/api/inquiries/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const result = await pool.query(
      'UPDATE inquiries SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.warn('Update inquiry failed (falling back to memory database):', err.message);
    const inquiry = fallbackInquiries.find(inq => inq.id.toString() === id);
    if (inquiry) {
      inquiry.status = status;
      res.json(inquiry);
    } else {
      res.status(404).json({ error: 'Inquiry not found in fallback database' });
    }
  }
});

// Delete Inquiry (Admin Only)
app.delete('/api/inquiries/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM inquiries WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json({ message: 'Inquiry deleted successfully', deletedInquiry: result.rows[0] });
  } catch (err) {
    console.warn('Delete inquiry failed (falling back to memory database):', err.message);
    const index = fallbackInquiries.findIndex(inq => inq.id.toString() === id);
    if (index !== -1) {
      const deleted = fallbackInquiries.splice(index, 1)[0];
      res.json({ message: 'Inquiry deleted successfully', deletedInquiry: deleted });
    } else {
      res.status(404).json({ error: 'Inquiry not found in fallback database' });
    }
  }
});


// Start Server and Init Database (Only if not running in Vercel Serverless environment)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await initDb();
  });
} else {
  // Try to initialize the DB asynchronously on cold start
  initDb().catch(console.error);
}

// Export for Vercel Serverless Functions
module.exports = app;
