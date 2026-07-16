const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { pool } = require('./db.cjs');

// Document parsing imports
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const AdmZip = require('adm-zip');

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
    image: "/listing_villa.webp",
    description: "A solid, modern architectural masterpiece with brutalist aesthetics and warm wood accents. Features double-height glass panels, a private infinity pool, and golf course views.",
    beds: 5, baths: 6, size: "6,500 Sq. Ft.",
    category: "villas", type: "ready", location: "Emirates Hills", status: "Available",
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
    image: "/listing_villa.webp",
    description: "An ultra-premium beachfront villa on the Palm Jumeirah crescent with private beach access, a temperature-controlled infinity pool, cinema room, and panoramic Arabian Gulf views.",
    beds: 7, baths: 8, size: "12,000 Sq. Ft.",
    category: "villas", type: "ready", location: "Palm Jumeirah", status: "Available",
    floors: [
      { id: 2, name: "Upper Floor", flats: [{ name: "Master Wing", price: "AED 18,000,000", size: "5,000 Sq. Ft.", beds: 4, baths: 5, status: "Available" }] },
      { id: 1, name: "Ground Floor", flats: [{ name: "Entertainment Wing", price: "AED 14,000,000", size: "7,000 Sq. Ft.", beds: 3, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 3,
    title: "Al Barari Sanctuary Villa",
    price: "AED 22,750,000",
    image: "/listing_villa.webp",
    description: "Set within lush botanical gardens, this eco-luxury villa blends natural stone with organic architecture. Features a private spa, outdoor kitchen, and koi pond courtyard.",
    beds: 6, baths: 7, size: "8,900 Sq. Ft.",
    category: "villas", type: "ready", location: "Al Barari", status: "Available",
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
    image: "/listing_apt.webp",
    description: "Premium high-rise with a concrete and stone facade, integrating vertical gardens and solid structural elements. Open plan living space with custom marble details.",
    beds: 3, baths: 3, size: "2,800 Sq. Ft.",
    category: "apartments", type: "ready", location: "Downtown Dubai", status: "Available",
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
    image: "/listing_apt.webp",
    description: "A contemporary waterfront apartment with floor-to-ceiling windows offering unobstructed Creek Tower views. Italian marble flooring, Miele appliances, and a private balcony terrace.",
    beds: 2, baths: 3, size: "1,850 Sq. Ft.",
    category: "apartments", type: "ready", location: "Dubai Creek Harbour", status: "Available",
    floors: [
      { id: 1, name: "Single Level", flats: [{ name: "Unit 1402", price: "AED 4,600,000", size: "1,850 Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 6,
    title: "DIFC Gate Avenue Loft",
    price: "AED 6,950,000",
    image: "/listing_apt.webp",
    description: "Industrial-chic duplex loft in the financial district with exposed concrete ceilings, double-height living area, private rooftop garden, and direct access to Gate Avenue promenade.",
    beds: 3, baths: 4, size: "3,200 Sq. Ft.",
    category: "apartments", type: "ready", location: "DIFC", status: "Available",
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
    image: "/listing_penthouse.webp",
    description: "Stunning triplex penthouse featuring 360-degree skyline views, private glass elevator, smart home automation, and floor-to-ceiling glass panel walls.",
    beds: 4, baths: 5, size: "4,800 Sq. Ft.",
    category: "penthouses", type: "ready", location: "Dubai Marina", status: "Available",
    floors: [
      { id: 2, name: "Penthouse Upper Deck", flats: [{ name: "PH Upper 502", price: "AED 15,000,000", size: "2,500 Sq. Ft.", beds: 2, baths: 3, status: "Available" }] },
      { id: 1, name: "Penthouse Lower Deck", flats: [{ name: "PH Lower 501", price: "AED 14,000,000", size: "2,300 Sq. Ft.", beds: 2, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 8,
    title: "Burj Vista Sky Mansion",
    price: "AED 45,000,000",
    image: "/listing_penthouse.webp",
    description: "A full-floor sky mansion with direct Burj Khalifa views, private pool terrace, wine cellar, and a helipad. Bespoke interiors by a renowned Italian design house.",
    beds: 5, baths: 7, size: "8,500 Sq. Ft.",
    category: "penthouses", type: "ready", location: "Downtown Dubai", status: "Available",
    floors: [
      { id: 2, name: "Sky Terrace", flats: [{ name: "Pool Deck & Lounge", price: "AED 20,000,000", size: "3,500 Sq. Ft.", beds: 1, baths: 2, status: "Available" }] },
      { id: 1, name: "Main Residence", flats: [{ name: "Grand Living Wing", price: "AED 25,000,000", size: "5,000 Sq. Ft.", beds: 4, baths: 5, status: "Available" }] }
    ]
  },
  {
    id: 9,
    title: "Atlantis Royal Penthouse",
    price: "AED 28,500,000",
    image: "/listing_penthouse.webp",
    description: "An ultra-exclusive penthouse within the Atlantis complex featuring underwater aquarium views, private butler service, and a cantilevered glass-bottom infinity pool.",
    beds: 4, baths: 5, size: "6,200 Sq. Ft.",
    category: "penthouses", type: "ready", location: "Palm Jumeirah", status: "Sold",
    floors: [
      { id: 2, name: "Entertainment Level", flats: [{ name: "Sky Bar & Cinema", price: "AED 12,000,000", size: "2,800 Sq. Ft.", beds: 1, baths: 2, status: "Sold" }] },
      { id: 1, name: "Living Level", flats: [{ name: "Master & Guest Wings", price: "AED 16,500,000", size: "3,400 Sq. Ft.", beds: 3, baths: 3, status: "Sold" }] }
    ]
  },

  // ═══════════════════════════════════════════

  //  OFF-PLAN — EXTRACTED FROM K ESTATES
// ═══════════════════════════════════════════
  {
    id: 19,
    title: "Emaar Oasis",
    price: "AED 12,500,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp", 
    description: "Emaar Oasis is a prestigious master-planned luxury villa community by Emaar Properties, set within The Oasis district in Dubai. Surrounded by tranquil waterways, lush tropical greenery, and resort-style surroundings, this landmark development brings together four exclusive collections — Marèva 1, Marèva 2, Palmiera The Oasis, and Palmiera Collective — offering an exceptional selection of four-, five-, and six-bedroom villas crafted for the most discerning global residents. Each collection reflects contemporary architectural excellence with clean lines, dynamic forms, and seamless integration with the natural landscape.",
    beds: 4, baths: 5, size: "TBD Sq. Ft.",
    category: "villas", type: "off-plan", location: "The Oasis, Dubai", status: "Off-Plan",
    features: ["Lagoon-style Swimming Pools","Private Pools","Beach Access & Pool Lounge","Fitness Zone & Wellness Spa","Jogging & Cycling Tracks","Landscaped Parks & Community Lawns","Children's Play Area","Multipurpose Sports Courts","Retail & Dining Outlets","24/7 Security & Concierge"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(2).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(3).webp"],
    handover: "Q4 2027",
    payment_plan: "80/20",
    property_type: "Villas",
    bedrooms_range: "4-6",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 12,500,000", size: "TBD Sq. Ft.", beds: 4, baths: 5, status: "Available" }] }
    ]
  },
  {
    id: 20,
    title: "Meriva Sunset",
    price: "AED 2,872,828",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(1).webp", 
    description: "Meriva Sunset is an elegant residential building within The Meriva Collection, a masterplanned beachfront development by Ellington Properties on Dubai Islands. Perched at the highest viewpoint of the collection, Meriva Sunset captures uninterrupted ocean panoramas, where elevated terraces, soft interior palettes, and resort-inspired amenities create a lifestyle defined by calm, beauty, and connection to the sea. With one to four bedroom residences, it offers spacious living with premium finishes.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "penthouses", type: "off-plan", location: "Dubai Islands", status: "Off-Plan",
    features: ["Beachfront Living","Ocean Panoramic Views","Elevated Terraces","Resort-Style Pool","State-of-the-art Gymnasium","Spa & Wellness Centre","Children's Play Area","Retail Promenade","BBQ & Social Lounges","24/7 Concierge & Security"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(2).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(3).webp"],
    handover: "Q2 2030",
    payment_plan: "70/30",
    property_type: "Apartments, Penthouses",
    bedrooms_range: "1-4",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 2,872,828", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 21,
    title: "Yas Park Place",
    price: "AED 1,390,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp", 
    description: "Yas Park Place is a contemporary residential development situated on Saadiyat Island, Abu Dhabi — one of the UAE's most culturally rich and naturally stunning locations. This exclusive project offers premium apartments and duplexes designed with modern interiors, open-plan layouts, and floor-to-ceiling windows providing stunning views of the surrounding parklands. With proximity to world-class museums, pristine beaches, and golfing facilities, Yas Park Place delivers an elevated island lifestyle.",
    beds: 2, baths: 3, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Saadiyat Island, Abu Dhabi", status: "Off-Plan",
    features: ["Island Living with Park Views","Floor-to-Ceiling Windows","Open-Plan Modern Layouts","Temperature-Controlled Pool","Fitness Centre & Yoga Studio","Children's Splash Pad","Landscaped Jogging Trails","Close to Louvre Abu Dhabi","Retail & F&B Outlets","Smart Home Integration"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(2).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(3).webp"],
    handover: "Q1 2030",
    payment_plan: "60/40",
    property_type: "Apartments, Duplexes",
    bedrooms_range: "Studio - 3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 1,390,000", size: "TBD Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 22,
    title: "The Orchard at Sobha City",
    price: "AED 9,050,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(1).webp", 
    description: "The Orchard at Sobha City is a premium villa community set within the expansive Sobha Hartland development in Mohammed Bin Rashid City. These estate villas feature grand architectural proportions, private gardens, and meticulously crafted interiors using the finest materials. Surrounded by lush greenery and crystal lagoons, The Orchard offers a serene countryside atmosphere just minutes from Downtown Dubai, making it the perfect blend of tranquility and urban convenience.",
    beds: 4, baths: 5, size: "TBD Sq. Ft.",
    category: "villas", type: "off-plan", location: "Sobha Hartland, MBR City", status: "Off-Plan",
    features: ["Private Gardens & Pools","Crystal Lagoon Access","Grand Double-Height Lobbies","Premium Italian Marble Finishes","Smart Home Automation","Community Clubhouse","Gymnasium & Spa","Children's Nursery & Play Zones","Walking & Cycling Paths","Minutes from Downtown Dubai"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(2).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(3).webp"],
    handover: "Q4 2029",
    payment_plan: "70/30",
    property_type: "Estate Villas",
    bedrooms_range: "4-5",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 9,050,000", size: "TBD Sq. Ft.", beds: 4, baths: 5, status: "Available" }] }
    ]
  },
  {
    id: 23,
    title: "Hudayriyat Golf Estates",
    price: "AED 26,550,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hudayriyat-golf-estates%20(1).webp", 
    description: "Hudayriyat Golf Estates is an ultra-premium development on Hudayriyat Island, Abu Dhabi, featuring an 18-hole championship golf course designed by world-renowned architects. This exclusive community offers townhouses, villas, and mansions with sweeping fairway and ocean views. Every residence is crafted with the finest materials and features expansive living spaces, private pools, and landscaped gardens, delivering the pinnacle of luxury island living in the UAE capital.",
    beds: 3, baths: 4, size: "TBD Sq. Ft.",
    category: "villas", type: "off-plan", location: "Hudayriyat Island, Abu Dhabi", status: "Off-Plan",
    features: ["18-Hole Championship Golf Course","Ocean & Fairway Views","Private Swimming Pools","Expansive Landscaped Gardens","World-Class Clubhouse","Fine Dining Restaurants","Wellness Centre & Spa","Marina & Water Sports","Private Beach Access","Exclusive Gated Community"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hudayriyat-golf-estates%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hudayriyat-golf-estates%20(2).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hudayriyat-golf-estates%20(3).webp"],
    handover: "Q2 2030",
    payment_plan: "60/40",
    property_type: "Townhouses, Villas, Mansions",
    bedrooms_range: "3-6",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 26,550,000", size: "TBD Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 24,
    title: "Cedarwood Estates South",
    price: "AED 13,350,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp", 
    description: "Cedarwood Estates South is a prestigious villa community nestled within Jumeirah Golf Estates, one of Dubai's most sought-after addresses. This exclusive enclave offers meticulously designed villas surrounded by championship golf course fairways and lush, mature landscaping. Each villa features contemporary architecture with open-plan living areas, private pools, and expansive terraces. The development provides a serene retreat while maintaining excellent connectivity to Sheikh Zayed Road and Dubai's key business and leisure destinations.",
    beds: 4, baths: 5, size: "TBD Sq. Ft.",
    category: "villas", type: "off-plan", location: "Jumeirah Golf Estates", status: "Off-Plan",
    features: ["Golf Course Fairway Views","Private Swimming Pools","Contemporary Architecture","Gated Community with 24/7 Security","Clubhouse with F&B","Gymnasium & Tennis Courts","Children's Play Areas","Landscaped Walking Trails","Near Sheikh Zayed Road","Premium Stone & Wood Finishes"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(2).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(3).webp"],
    handover: "Q4 2028",
    payment_plan: "70/30",
    property_type: "Villas",
    bedrooms_range: "4-5",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 13,350,000", size: "TBD Sq. Ft.", beds: 4, baths: 5, status: "Available" }] }
    ]
  },
  {
    id: 25,
    title: "HADO by Beyond",
    price: "AED 2,457,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hado%20(1).webp", 
    description: "HADO by Beyond is a striking contemporary residential tower on Dubai Islands, offering thoughtfully designed apartments and duplexes with panoramic waterfront views. The development combines Japanese-inspired minimalism with modern luxury, featuring clean lines, natural materials, and wellness-focused amenities. Residents enjoy a curated lifestyle with infinity pools, meditation gardens, and artisanal dining experiences — all within a vibrant island community surrounded by pristine beaches and crystal-clear waters.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Islands", status: "Off-Plan",
    features: ["Panoramic Waterfront Views","Japanese-Inspired Design","Infinity Edge Pool","Meditation & Zen Gardens","Co-Working Spaces","Rooftop Lounge & Bar","Beach Access","Smart Home Technology","Children's Adventure Zone","Retail & Artisanal Dining"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hado%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hado%20(2).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hado%20(3).webp"],
    handover: "Q4 2028",
    payment_plan: "60/40",
    property_type: "Apartments, Duplexes",
    bedrooms_range: "1-3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 2,457,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 26,
    title: "Grand Polo Club &amp; Resort by Emaar Properties",
    price: "AED 3,500,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/grand%20polo%20(1).webp", 
    description: "Grand Polo Club & Resort by Emaar Properties is an extraordinary equestrian-inspired luxury community, offering villas and townhouses set around world-class polo grounds in Dubai Investments Park. This landmark development combines the timeless elegance of polo culture with contemporary Arabian architecture, creating a one-of-a-kind residential experience. Residents enjoy access to riding academies, members-only clubhouses, fine dining, and expansive green landscapes.",
    beds: 3, baths: 4, size: "TBD Sq. Ft.",
    category: "villas", type: "off-plan", location: "Dubai Investments Park (DIP)", status: "Off-Plan",
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/grand%20polo%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/grand%20polo%20(2).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/grand%20polo%20(3).webp"],
    handover: "Q4 2029",
    payment_plan: "70/30",
    property_type: "Villas, Townhouses",
    bedrooms_range: "3-5",
    features: ["World-Class Polo Grounds","Equestrian Centre & Riding Academy","Members-Only Clubhouse","Fine Dining & Lounge","Infinity Pool & Spa","Landscaped Boulevards","Children's Activity Centre","Retail Village","Championship Sports Courts","24/7 Gated Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 3,500,000", size: "TBD Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 27,
    title: "Palm Central at Palm Jebel Ali",
    price: "AED 2,500,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(1).webp", 
    description: "Palm Central at Palm Jebel Ali is a landmark mixed-use development situated at the heart of the iconic Palm Jebel Ali. Offering premium apartments, townhouses, and penthouses, this vibrant community provides residents with direct beach access, waterfront promenades, and panoramic Arabian Gulf views. The development features a modern architectural design with floor-to-ceiling glazing, open-plan interiors, and world-class retail and entertainment facilities right at your doorstep.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "penthouses", type: "off-plan", location: "Palm Jebel Ali", status: "Off-Plan",
    features: ["Direct Beach Access","Arabian Gulf Panoramic Views","Waterfront Promenade","Floor-to-Ceiling Glazing","Resort-Style Infinity Pool","World-Class Retail Hub","Gourmet Dining Options","Wellness Spa & Gymnasium","Water Sports Facilities","Electric Shuttle Service"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(2).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(3).webp"],
    handover: "Q3 2029",
    payment_plan: "60/40",
    property_type: "Apartments, Townhouses, Penthouses",
    bedrooms_range: "1-4",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 2,500,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 28,
    title: "Crestlane by Meraas",
    price: "AED 2,700,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(1).webp", 
    description: "Crestlane by Meraas is a sophisticated urban residential development in the heart of City Walk, Dubai's premier lifestyle destination. This boutique collection of apartments combines contemporary design with the vibrant energy of City Walk's retail, dining, and entertainment ecosystem. Every residence features premium finishes, expansive balconies, and intelligent layouts designed for modern urban living. With seamless access to La Mer Beach, Jumeirah, and Downtown Dubai, Crestlane represents the epitome of connected city living.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "City Walk, Dubai", status: "Off-Plan",
    features: ["City Walk Lifestyle Address","Premium Interior Finishes","Expansive Private Balconies","Rooftop Infinity Pool","State-of-the-art Fitness Centre","Near La Mer Beach","Direct Retail & Dining Access","Concierge & Valet Parking","Children's Discovery Zone","Smart Home Integration"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(2).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(3).webp"],
    handover: "Q2 2029",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 2,700,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 29,
    title: "Sera by Emaar Properties",
    price: "AED 2,100,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(1).webp", 
    description: "Sera by Emaar Properties is a waterfront residential masterpiece located in Mina Rashid, Dubai's historic port district transformed into a world-class maritime destination. This collection of apartments and townhouses offers stunning views of the marina, Dubai skyline, and the Arabian Gulf. With interiors inspired by nautical elegance — featuring maritime blues, natural woods, and open-plan designs — Sera delivers a refined coastal lifestyle with direct access to the Queen Elizabeth 2 hotel, yacht clubs, and premium dining.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Mina Rashid, Dubai", status: "Off-Plan",
    features: ["Marina & Skyline Views","Nautical-Inspired Interiors","Direct Waterfront Access","Near Queen Elizabeth 2 Hotel","Yacht Club & Marina Berths","Infinity Pool Overlooking Gulf","Premium Fitness Centre","Landscaped Promenade","Gourmet Dining District","24/7 Security & Concierge"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(2).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(3).webp"],
    handover: "Q4 2029",
    payment_plan: "70/30",
    property_type: "Apartments, Townhouses",
    bedrooms_range: "1-3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 2,100,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 30,
    title: "Solaya by Meraas",
    price: "AED 7,500,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(1).webp", 
    description: "Solaya by Meraas is a premium beachfront residential development situated in La Mer, one of Dubai's most vibrant seaside destinations. This exclusive collection of apartments and penthouses offers direct beach access, panoramic ocean views, and resort-style living year-round. The architecture blends Mediterranean warmth with contemporary sophistication, featuring sun-drenched terraces, natural stone finishes, and flowing open-plan layouts. Residents enjoy La Mer's lively promenade with boutique shopping, artisanal cafés, and water parks just steps from their front door.",
    beds: 2, baths: 3, size: "TBD Sq. Ft.",
    category: "penthouses", type: "off-plan", location: "La Mer, Dubai", status: "Off-Plan",
    features: ["Direct Beach Access","Panoramic Ocean Views","Mediterranean-Inspired Design","Sun-Drenched Private Terraces","Resort-Style Infinity Pool","Beachfront Promenade","Boutique Shopping & Cafés","Water Park Access","Wellness Spa & Gym","24/7 Concierge Service"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(2).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(3).webp"],
    handover: "Q2 2029",
    payment_plan: "60/40",
    property_type: "Apartments, Penthouses",
    bedrooms_range: "2-4",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 7,500,000", size: "TBD Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },


  {
    id: 50,
    title: "CREEK WATERS 2",
    price: "AED 1,500,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp", 
    description: "CREEK WATERS 2 is a premium off-plan development by Emaar Properties located in Dubai Creek Harbour. This exclusive project offers luxury apartments with 1-3 bedroom configurations, featuring contemporary architecture, premium finishes, and world-class amenities. Handover is scheduled for Q2 2028 with an attractive 60/40 payment plan. Contact us for the complete brochure and floor plans.",
    beds: 4, baths: 5, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/x84hv3zztllo6bo/AADG_aUYtGdVvkWhsYGmRHjZa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    handover: "Q2 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 33,00,000", size: "TBD Sq. Ft.", beds: 4, baths: 5, status: "Available" }] }
    ]
  },
  {
    id: 51,
    title: "CREEK WATERS",
    price: "AED 1,400,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp", 
    description: "CREEK WATERS is a premium off-plan development by Emaar Properties located in Dubai Creek Harbour. This exclusive project offers luxury apartments with 1-3 bedroom configurations, featuring contemporary architecture, premium finishes, and world-class amenities. Handover is scheduled for Q4 2027 with an attractive 60/40 payment plan. Contact us for the complete brochure and floor plans.",
    beds: 2, baths: 3, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/15z1nti843ki58j/AACaegzr_wEPXmQWFiU0sjRCa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    handover: "Q4 2027",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 21,00,000", size: "TBD Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 52,
    title: "CEDAR",
    price: "AED 1,300,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(1).webp", 
    description: "CEDAR is a premium off-plan development by Emaar Properties located in Dubai Creek Harbour. This exclusive project offers luxury apartments with 1-3 bedroom configurations, featuring contemporary architecture, premium finishes, and world-class amenities. Handover is scheduled for Q1 2028 with an attractive 70/30 payment plan. Contact us for the complete brochure and floor plans.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/6fbg0f59c4ucnpg/AAAe1AdOnoZp1v7LOXDmlp9ga",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    handover: "Q1 2028",
    payment_plan: "70/30",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 63,00,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 53,
    title: "SAVANNA",
    price: "AED 1,600,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hudayriyat-golf-estates%20(1).webp", 
    description: "SAVANNA is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q3 2028 with an attractive 60/40 payment plan.",
    beds: 2, baths: 3, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/o7ge7ho0iwddqi5/AADPlzRKK1rzbw4-SEzvV0Yda",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    handover: "Q3 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 35,00,000", size: "TBD Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 54,
    title: "PALACE RESIDENCES NORTH",
    price: "AED 56,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp", 
    description: "PALACE RESIDENCES NORTH is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q1 2028 with an attractive 60/40 payment plan.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/lpldcudc0nqumx5/AAA9ZX5obboWVpAvJpcFYiOsa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(1).webp"],
    handover: "Q1 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 56,00,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 55,
    title: "THE COVE",
    price: "AED 57,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp", 
    description: "THE COVE is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q2 2027 with an attractive 60/40 payment plan.",
    beds: 3, baths: 4, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/lxc4asgssdf5k3z/AAAlIvlYJO-jZdar2vPDT1sQa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(1).webp"],
    handover: "Q2 2027",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 57,00,000", size: "TBD Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 56,
    title: "CREEK EDGE",
    price: "AED 93,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp", 
    description: "CREEK EDGE is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q4 2027 with an attractive 60/40 payment plan.",
    beds: 3, baths: 4, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/ed5q7x67f17zuwy/AACSLFIouTOsEzCXdL2BmdYYa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hado%20(1).webp"],
    handover: "Q4 2027",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 93,00,000", size: "TBD Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 57,
    title: "CREEK CRESCENT",
    price: "AED 24,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(1).webp", 
    description: "CREEK CRESCENT is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments, penthouses with 1-4 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q3 2027 with an attractive 60/40 payment plan.",
    beds: 2, baths: 3, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/d1npl62n2hecbrl/AADOWuwF5lLyXgPRnccoeb0Za",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(1).webp"],
    handover: "Q3 2027",
    payment_plan: "60/40",
    property_type: "Apartments, Penthouses",
    bedrooms_range: "1-4",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 24,00,000", size: "TBD Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 58,
    title: "ORCHID",
    price: "AED 29,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hudayriyat-golf-estates%20(1).webp", 
    description: "ORCHID is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q2 2027 with an attractive 60/40 payment plan.",
    beds: 2, baths: 3, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/h4vdq7tc2xbyiin/AABmRnQgLJpiLMUY6mHWEUs3a",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(1).webp"],
    handover: "Q2 2027",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 29,00,000", size: "TBD Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 59,
    title: "LOTUS",
    price: "AED 87,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp", 
    description: "LOTUS is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q1 2027 with an attractive 60/40 payment plan.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/8wi3dj36cy7hb6z/AAB6JHq54CH4la5mt7xbR7iTa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hado%20(1).webp"],
    handover: "Q1 2027",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 87,00,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 60,
    title: "CREEK PALACE",
    price: "AED 81,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp", 
    description: "CREEK PALACE is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments, penthouses with 1-4 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q4 2026 with an attractive 60/40 payment plan.",
    beds: 2, baths: 3, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/sx0fdn1xfthhcom/AABQHmiLDJiqaV7QTE1GKjyDa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(1).webp"],
    handover: "Q4 2026",
    payment_plan: "60/40",
    property_type: "Apartments, Penthouses",
    bedrooms_range: "1-4",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 81,00,000", size: "TBD Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 61,
    title: "ROSEWATER",
    price: "AED 2,000,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp", 
    description: "ROSEWATER is a premium off-plan development by Emaar Properties located in The Valley, Dubai. This exclusive project offers luxury townhouses with 3-4 bedroom configurations, featuring contemporary architecture, premium finishes, and world-class amenities. Handover is scheduled for Q4 2027 with an attractive 60/40 payment plan. Contact us for the complete brochure and floor plans.",
    beds: 2, baths: 3, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "The Valley, Dubai", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/1ff5hx1eiehg89l/AAC-SlInz9ASxLOvErFrMcvOa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    handover: "Q4 2027",
    payment_plan: "60/40",
    property_type: "Townhouses",
    bedrooms_range: "3-4",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 51,00,000", size: "TBD Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 62,
    title: "GROVE",
    price: "AED 1,800,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(1).webp", 
    description: "GROVE is a premium off-plan development by Emaar Properties located in Dubai Hills Estate. This exclusive project offers luxury apartments with 1-3 bedroom configurations, featuring contemporary architecture, premium finishes, and world-class amenities. Handover is scheduled for Q2 2028 with an attractive 60/40 payment plan. Contact us for the complete brochure and floor plans.",
    beds: 4, baths: 5, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Hills Estate", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/fip5hhpmd5l6zm8/AADkfAfDGNiXpB8YetbeabJoa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    handover: "Q2 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 45,00,000", size: "TBD Sq. Ft.", beds: 4, baths: 5, status: "Available" }] }
    ]
  },
  {
    id: 63,
    title: "BAYSHORE",
    price: "AED 2,100,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hudayriyat-golf-estates%20(1).webp", 
    description: "BAYSHORE is a premium off-plan development by Emaar Properties located in Rashid Yachts & Marina. This exclusive project offers luxury apartments with 1-3 bedroom configurations, featuring contemporary architecture, premium finishes, and world-class amenities. Handover is scheduled for Q1 2029 with an attractive 60/40 payment plan. Contact us for the complete brochure and floor plans.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Rashid Yachts & Marina", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/9wpou9zro9hi72s/AADWDvkoDAVUJtCj1OtwVg7Ha",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    handover: "Q1 2029",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 22,00,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 64,
    title: "SUMMER",
    price: "AED 1,200,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp", 
    description: "SUMMER is a premium off-plan development by Emaar Properties located in Dubai Hills Estate. This exclusive project offers luxury apartments with 1-3 bedroom configurations, featuring contemporary architecture, premium finishes, and world-class amenities. Handover is scheduled for Q3 2028 with an attractive 60/40 payment plan. Contact us for the complete brochure and floor plans.",
    beds: 3, baths: 4, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Hills Estate", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/g7ukj5v290hqy0h/AABMaBarLFNU3i2_3D5OOtVya",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    handover: "Q3 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 32,00,000", size: "TBD Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 65,
    title: "SURF",
    price: "AED 1,900,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp", 
    description: "SURF is a premium off-plan development by Emaar Properties located in Dubai Islands. This exclusive project offers luxury apartments with 1-3 bedroom configurations, featuring contemporary architecture, premium finishes, and world-class amenities. Handover is scheduled for Q4 2028 with an attractive 60/40 payment plan. Contact us for the complete brochure and floor plans.",
    beds: 4, baths: 5, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Islands", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/gbi5q5crp7i6ezp/AABO54AduNOSkEEuUVSUQZmea",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    handover: "Q4 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 65,00,000", size: "TBD Sq. Ft.", beds: 4, baths: 5, status: "Available" }] }
    ]
  },
  {
    id: 66,
    title: "VIDA RESIDENCES CREEK BEACH",
    price: "AED 63,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp", 
    description: "VIDA RESIDENCES CREEK BEACH is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary hotel residences with Studio-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q1 2028 with an attractive 60/40 payment plan.",
    beds: 2, baths: 3, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/k8mshkxa83h768a/AADfTM1eAuuxNzntcHXYySP2a",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(1).webp"],
    handover: "Q1 2028",
    payment_plan: "60/40",
    property_type: "Hotel Residences",
    bedrooms_range: "Studio-3",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 63,00,000", size: "TBD Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 67,
    title: "PALACE RESIDENCES",
    price: "AED 3,200,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(1).webp", 
    description: "PALACE RESIDENCES is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments, penthouses with 1-4 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q2 2027 with an attractive 60/40 payment plan.",
    beds: 2, baths: 3, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/yx7dg2ktkw0dahy/AABukxGRK0UGYfhwSKHpfCpAa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    handover: "Q4 2028",
    payment_plan: "60/40",
    property_type: "Apartments, Penthouses",
    bedrooms_range: "1-4",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 64,00,000", size: "TBD Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 68,
    title: "DCH CENTRAL PARK",
    price: "AED 54,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hudayriyat-golf-estates%20(1).webp", 
    description: "DCH CENTRAL PARK is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q2 2028 with an attractive 60/40 payment plan.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/pjgk5pss5ussdlm/AAAaLxt3PlIjk3ZHXO7qypgGa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(1).webp"],
    handover: "Q2 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 54,00,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 69,
    title: "CREEK GATE",
    price: "AED 37,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp", 
    description: "CREEK GATE is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q1 2027 with an attractive 60/40 payment plan.",
    beds: 4, baths: 5, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/905o4vb8ql7f3uz/AACxQtkKDduwpDtxZ1G8qaO-a",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(1).webp"],
    handover: "Q1 2027",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 37,00,000", size: "TBD Sq. Ft.", beds: 4, baths: 5, status: "Available" }] }
    ]
  },
  {
    id: 70,
    title: "CREEKSIDE 18",
    price: "AED 47,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp", 
    description: "CREEKSIDE 18 is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-4 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q4 2026 with an attractive 60/40 payment plan.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/10crd5x288ks3ly/AABYor_ymXDESVgrisOoXr1pa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hado%20(1).webp"],
    handover: "Q4 2026",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-4",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 47,00,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 71,
    title: "CREEK RISE",
    price: "AED 88,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp", 
    description: "CREEK RISE is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q3 2026 with an attractive 60/40 payment plan.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/sh/28zd6qu75svn2mu/AACD6rXgFbqgtwtImYdE51MRa",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(1).webp"],
    handover: "Q3 2026",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 88,00,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 72,
    title: "AEON",
    price: "AED 62,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(1).webp", 
    description: "AEON is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with Studio-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q1 2029 with an attractive 60/40 payment plan.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/45m10jxw6f1h7slclbrp7/h?rlkey=q0kegrv5fdi8yzsm3mq39bnl0&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(1).webp"],
    handover: "Q1 2029",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "Studio-3",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 62,00,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 73,
    title: "ORIA",
    price: "AED 71,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hudayriyat-golf-estates%20(1).webp", 
    description: "ORIA is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments, penthouses with 1-4 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q4 2028 with an attractive 60/40 payment plan.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/h8f7z0ssn8mc14a2nbex7/h?rlkey=uu0lggt6f0ij2pwxuji57zr2r&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hado%20(1).webp"],
    handover: "Q4 2028",
    payment_plan: "60/40",
    property_type: "Apartments, Penthouses",
    bedrooms_range: "1-4",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 71,00,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 74,
    title: "PALACE RESIDENCES CREEK BLUE",
    price: "AED 94,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp", 
    description: "PALACE RESIDENCES CREEK BLUE is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments, penthouses with 1-4 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q3 2028 with an attractive 60/40 payment plan.",
    beds: 3, baths: 4, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/5qfyx2cnccgjj15wze7sn/ACStkDMBzV_m3BW6b3XV5IQ?rlkey=ilnjif7wk6bduq8bbg6pit09p&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(1).webp"],
    handover: "Q3 2028",
    payment_plan: "60/40",
    property_type: "Apartments, Penthouses",
    bedrooms_range: "1-4",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 94,00,000", size: "TBD Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 75,
    title: "VALO",
    price: "AED 30,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp", 
    description: "VALO is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q2 2028 with an attractive 60/40 payment plan.",
    beds: 3, baths: 4, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/cyyeokziesxsntdti8imh/APGsYrTzKyflwLvrxxhYs98?rlkey=e88dt2vgnzcqu8ni6vtcynnz8&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(1).webp"],
    handover: "Q2 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 30,00,000", size: "TBD Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 76,
    title: "MOOR",
    price: "AED 83,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp", 
    description: "MOOR is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q1 2028 with an attractive 60/40 payment plan.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/nzi3pivgj9m17joyyxw7u/AGCUi5Nh1iXoBa8HHt4Pptw?rlkey=7glx5efl964mkcafk8f6qxc12&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hado%20(1).webp"],
    handover: "Q1 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 83,00,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 77,
    title: "MANGROVE",
    price: "AED 1,600,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(1).webp", 
    description: "MANGROVE is a premium off-plan development by Emaar Properties located in Dubai Creek Harbour. This exclusive project offers luxury apartments with 1-3 bedroom configurations, featuring contemporary architecture, premium finishes, and world-class amenities. Handover is scheduled for Q4 2028 with an attractive 60/40 payment plan. Contact us for the complete brochure and floor plans.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/smaew9pzr305i94nak2zf/APXhtOO4D8LEyoH_OIzZkgg?rlkey=uft98h2rll3u8jrjjw076xjji&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    handover: "Q4 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 25,00,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  {
    id: 78,
    title: "ARLO",
    price: "AED 46,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hudayriyat-golf-estates%20(1).webp", 
    description: "ARLO is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with Studio-2 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q3 2027 with an attractive 60/40 payment plan.",
    beds: 4, baths: 5, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/6byt4t0sov7a6sbcqugdf/AMv8PrRabBOEXW1eR0JLwgA?rlkey=4okb870qrw26qmqwoun2vdndq&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(1).webp"],
    handover: "Q3 2027",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "Studio-2",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 46,00,000", size: "TBD Sq. Ft.", beds: 4, baths: 5, status: "Available" }] }
    ]
  },
  {
    id: 79,
    title: "ALTUS",
    price: "AED 88,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp", 
    description: "ALTUS is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q4 2027 with an attractive 60/40 payment plan.",
    beds: 3, baths: 4, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/2aqrynek0mjsz4sz9lyam/AHqZ4xFPluvWKOj718D_frA?rlkey=04wxprrsu8py3kqxij2ycw4rj&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(1).webp"],
    handover: "Q4 2027",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 88,00,000", size: "TBD Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 80,
    title: "ADDRESS RESIDENCES",
    price: "AED 35,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp", 
    description: "ADDRESS RESIDENCES is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary hotel residences with 1-4 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q2 2028 with an attractive 60/40 payment plan.",
    beds: 3, baths: 4, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/o38lcykk6kt2m9jk4iq8z/ANjpu9P6sQ6cxtuDbzM3pPE?rlkey=lzgvic3lqnro6j7l0wmhyl59l&dl=0 ",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hado%20(1).webp"],
    handover: "Q2 2028",
    payment_plan: "60/40",
    property_type: "Hotel Residences",
    bedrooms_range: "1-4",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 35,00,000", size: "TBD Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 81,
    title: "ALBERO",
    price: "AED 73,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp", 
    description: "ALBERO is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q1 2028 with an attractive 60/40 payment plan.",
    beds: 4, baths: 5, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/wsd4umzin48jvm9eqbfu9/AKpwbQI7cNKI79gtVzJvD6o?rlkey=96pk1yxb6yzqy7rmz5s7jjb9w&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(1).webp"],
    handover: "Q1 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 73,00,000", size: "TBD Sq. Ft.", beds: 4, baths: 5, status: "Available" }] }
    ]
  },
  {
    id: 82,
    title: "ALTAN",
    price: "AED 88,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(1).webp", 
    description: "ALTAN is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q2 2028 with an attractive 60/40 payment plan.",
    beds: 4, baths: 5, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/pmcq57ejfd3fdfi54az5m/AHETKnhWs0-b_NSBDTplFYI?rlkey=ew4ko6qlhxacaqmwjbn0jew8s&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(1).webp"],
    handover: "Q2 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 88,00,000", size: "TBD Sq. Ft.", beds: 4, baths: 5, status: "Available" }] }
    ]
  },
  {
    id: 83,
    title: "SILVA",
    price: "AED 38,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hudayriyat-golf-estates%20(1).webp", 
    description: "SILVA is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q3 2028 with an attractive 60/40 payment plan.",
    beds: 3, baths: 4, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/rkynvaiov13y876h2bof3/AAP1IJOIFAmrsnvwHWuAoQs?rlkey=tro1ogsdjb0ncwl3subhk8dxg&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hado%20(1).webp"],
    handover: "Q3 2028",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 38,00,000", size: "TBD Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 84,
    title: "MONTIVA BY VIDA",
    price: "AED 31,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp", 
    description: "MONTIVA BY VIDA is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary hotel residences with Studio-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q4 2028 with an attractive 60/40 payment plan.",
    beds: 3, baths: 4, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/hs9bwxqc47xbi438veu8m/AJ7bj2sFrxLiXcGKjOFshi0?rlkey=zp2zcislu1fchnzjsgxi3u7zn&st=edsfgdt4&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(1).webp"],
    handover: "Q4 2028",
    payment_plan: "60/40",
    property_type: "Hotel Residences",
    bedrooms_range: "Studio-3",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 31,00,000", size: "TBD Sq. Ft.", beds: 3, baths: 4, status: "Available" }] }
    ]
  },
  {
    id: 85,
    title: "LYVIA BY PALACE",
    price: "AED 56,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp", 
    description: "LYVIA BY PALACE is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments, penthouses with 1-4 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q1 2029 with an attractive 60/40 payment plan.",
    beds: 2, baths: 3, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/y5b3i7x53byfk94xq5xu8/AHqOrwntFIiOJvbWgoZruBk?rlkey=89t0tyx6ny4p5lidm6ibhvwse&st=mp14de5k&dl=0",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/meriva-sunset%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/palm%20central%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/solaya%20(1).webp"],
    handover: "Q1 2029",
    payment_plan: "60/40",
    property_type: "Apartments, Penthouses",
    bedrooms_range: "1-4",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 56,00,000", size: "TBD Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 86,
    title: "CREEK BAY",
    price: "AED 63,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp", 
    description: "CREEK BAY is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q2 2029 with an attractive 60/40 payment plan.",
    beds: 2, baths: 3, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/9yoltuso6uijiodue2p2x/AAtLVPIh4hxxLp123jfBAnY?rlkey=gnpx563jygldyey3d2qx0s819&st=ky30dmek&dl=0  ",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/yas-park-place%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/cedarwood-south%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/hado%20(1).webp"],
    handover: "Q2 2029",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Waterfront Living","Dubai Creek Harbour Views","Floor-to-Ceiling Windows","Resort-Style Pool","State-of-the-art Gymnasium","Children's Play Area","Retail & Dining Promenade","Concierge & Valet","Smart Home Technology","24/7 Security"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 63,00,000", size: "TBD Sq. Ft.", beds: 2, baths: 3, status: "Available" }] }
    ]
  },
  {
    id: 87,
    title: "CREEK HAVEN",
    price: "AED 89,00,000",
    image: "https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/the-orchard-at-sobha-city%20(1).webp", 
    description: "CREEK HAVEN is a premium off-plan residential development by Emaar Properties, ideally situated in Dubai Creek Harbour — one of Dubai's most dynamic and sought-after waterfront destinations. This project offers contemporary apartments with 1-3 bedroom configurations, featuring modern architecture, premium finishes, and spectacular views. Residents enjoy access to world-class amenities, vibrant retail, and direct waterfront living. Handover scheduled for Q3 2029 with an attractive 60/40 payment plan.",
    beds: 1, baths: 2, size: "TBD Sq. Ft.",
    category: "apartments", type: "off-plan", location: "Dubai Creek Harbour", status: "Off-Plan",
    dropbox_link: "https://www.dropbox.com/scl/fo/5a0op8y0r0sbxehratz48/ABbbiGDwD4rsicBLjsOAz1Y?rlkey=atxfczyox8mslidzk2otuwd5u&st=wayr65gr&dl=0 ",
    features: ["Smart Home System Integration","State-of-the-art Gymnasium","Infinity Edge Swimming Pool","24/7 Concierge and Security","Landscaped Gardens and Parks","Retail and Dining Outlets Nearby"],
    images: ["https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/emaar-oasis%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/sera%20(1).webp","https://phpstack-1577143-6149876.cloudwaysapps.com/images/properties/crestlane%20(1).webp"],
    handover: "Q3 2029",
    payment_plan: "60/40",
    property_type: "Apartments",
    bedrooms_range: "1-3",
    features: ["Premium Finishes Throughout","Open-Plan Living Layouts","Private Balconies","Infinity Edge Pool","Wellness Spa","Co-Working Lounge","Landscaped Gardens","BBQ Terraces","Covered Parking","Close to Dubai Creek Tower"],
    floors: [
      { id: 1, name: "Standard Unit", flats: [{ name: "Typical Unit", price: "AED 89,00,000", size: "TBD Sq. Ft.", beds: 1, baths: 2, status: "Available" }] }
    ]
  },
  
  
  
  
  
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

// Disk cache persistence for memory database fallback
const propertiesJsonPath = path.join(__dirname, 'properties.json');
const inquiriesJsonPath = path.join(__dirname, 'inquiries.json');

function savePropertiesToDisk() {
  try {
    fs.writeFileSync(propertiesJsonPath, JSON.stringify(fallbackProperties, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write properties to disk:', err.message);
  }
}

function saveInquiriesToDisk() {
  try {
    fs.writeFileSync(inquiriesJsonPath, JSON.stringify(fallbackInquiries, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write inquiries to disk:', err.message);
  }
}

// Load properties from disk cache if exists
try {
  if (fs.existsSync(propertiesJsonPath)) {
    const data = fs.readFileSync(propertiesJsonPath, 'utf8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      fallbackProperties.length = 0;
      fallbackProperties.push(...parsed);
      console.log(`Loaded ${fallbackProperties.length} properties from properties.json disk cache.`);
    }
  } else {
    savePropertiesToDisk();
  }
} catch (e) {
  console.warn('Failed to load properties.json disk cache:', e.message);
}

// Load inquiries from disk cache if exists
try {
  if (fs.existsSync(inquiriesJsonPath)) {
    const data = fs.readFileSync(inquiriesJsonPath, 'utf8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      fallbackInquiries.length = 0;
      fallbackInquiries.push(...parsed);
      console.log(`Loaded ${fallbackInquiries.length} inquiries from inquiries.json disk cache.`);
    }
  } else {
    saveInquiriesToDisk();
  }
} catch (e) {
  console.warn('Failed to load inquiries.json disk cache:', e.message);
}

// Blogs fallback data
const blogsJsonPath = path.join(__dirname, 'blogs.json');
let fallbackBlogs = [];

function saveBlogsToDisk() {
  try {
    fs.writeFileSync(blogsJsonPath, JSON.stringify(fallbackBlogs, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write blogs to disk:', err.message);
  }
}

// Load blogs from disk cache if exists
try {
  if (fs.existsSync(blogsJsonPath)) {
    const data = fs.readFileSync(blogsJsonPath, 'utf8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      fallbackBlogs = parsed;
      console.log(`Loaded ${fallbackBlogs.length} blogs from blogs.json disk cache.`);
    }
  }
} catch (e) {
  console.warn('Failed to load blogs.json disk cache:', e.message);
}


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
    try {
      await pool.query('ALTER TABLE properties ADD COLUMN IF NOT EXISTS images JSON DEFAULT \'[]\'::json');
      await pool.query('ALTER TABLE properties ADD COLUMN IF NOT EXISTS features JSON DEFAULT \'[]\'::json');
      await pool.query('ALTER TABLE properties ADD COLUMN IF NOT EXISTS handover VARCHAR(100)');
      await pool.query('ALTER TABLE properties ADD COLUMN IF NOT EXISTS payment_plan VARCHAR(100)');
      await pool.query('ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_type VARCHAR(255)');
      await pool.query('ALTER TABLE properties ADD COLUMN IF NOT EXISTS bedrooms_range VARCHAR(100)');
      await pool.query('ALTER TABLE properties ADD COLUMN IF NOT EXISTS dropbox_link VARCHAR(500)');
      await pool.query('ALTER TABLE properties ADD COLUMN IF NOT EXISTS starred BOOLEAN DEFAULT false');
    } catch (alterErr) {
      console.warn('ALTER TABLE properties columns error:', alterErr.message);
    }
    console.log('Database tables verified/created successfully.');
    await pool.query("DELETE FROM properties WHERE type = 'rent'");
    console.log('Removed any rent category properties from database.');

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
          (title, price, image, description, beds, baths, size, category, type, location, status, floors, images, features, handover, payment_plan, property_type, bedrooms_range, dropbox_link, starred) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        `;
        const values = [
          prop.title,
          prop.price,
          prop.image,
          prop.description,
          parseInt(prop.beds) || 0,
          parseInt(prop.baths) || 0,
          prop.size || '',
          prop.category,
          prop.type,
          prop.location || 'Prime District',
          prop.status || 'Available',
          JSON.stringify(prop.floors || []),
          JSON.stringify(prop.images || []),
          JSON.stringify(prop.features || []),
          prop.handover || '',
          prop.payment_plan || '',
          prop.property_type || '',
          prop.bedrooms_range || '',
          prop.dropbox_link || '',
          prop.starred === true || prop.starred === 'true'
        ];
        await pool.query(sql, values);
      }
      console.log(`Seeded default properties successfully.`);
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

  // Override credentials for Lakshay
  if (username === 'Lakshay' && password === 'Lakshay@123') {
    console.log('Lakshay logged in successfully via credential override');
    const token = jwt.sign({ id: 999, username: 'Lakshay' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, username: 'Lakshay' });
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
  const { category, type, search, page, limit } = req.query;
  
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

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 50; // default 50 for admin if no limit provided

  try {
    const result = await pool.query(sql, params);
    
    let allData = result.rows;
    const total = allData.length;
    const totalPages = Math.ceil(total / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginated = allData.slice(startIndex, endIndex);

    res.json({
      data: paginated,
      total,
      page: pageNum,
      totalPages,
      limit: limitNum
    });
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
    
    const total = filtered.length;
    const totalPages = Math.ceil(total / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginated = filtered.slice(startIndex, endIndex);

    res.json({
      data: paginated,
      total,
      page: pageNum,
      totalPages,
      limit: limitNum
    });
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

// AI Document Parsing & Scanning Route (Admin Only)
app.post('/api/properties/upload-doc', authenticateToken, async (req, res) => {
  const { fileData, fileName, mimeType } = req.body;
  if (!fileData || !mimeType) {
    return res.status(400).json({ error: 'File data and mimeType are required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(400).json({ 
      error: 'GEMINI_API_KEY is not configured in the server environment. Please add it to your Render environment variables.' 
    });
  }

  try {
    const fileBuffer = Buffer.from(fileData.split(',')[1] || fileData, 'base64');
    let extractedText = '';
    let extractedImages = [];

    // 1. Extract content from the document based on MimeType
    if (mimeType === 'application/pdf') {
      const pdfData = await pdfParse(fileBuffer);
      extractedText = pdfData.text || '';
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword'
    ) {
      // Extract text from Word Docx
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      extractedText = result.value || '';

      // Extract embedded images from Word Docx zip structure (word/media/*)
      try {
        const zip = new AdmZip(fileBuffer);
        const zipEntries = zip.getEntries();
        zipEntries.forEach(entry => {
          if (entry.entryName.startsWith('word/media/')) {
            const data = entry.getData();
            const base64 = data.toString('base64');
            const ext = path.extname(entry.entryName).toLowerCase().replace('.', '');
            const mime = ext === 'png' ? 'image/png' : (ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png');
            extractedImages.push(`data:${mime};base64,${base64}`);
          }
        });
      } catch (zipErr) {
        console.warn('Could not extract images from docx archive:', zipErr.message);
      }
    } else if (mimeType.startsWith('image/')) {
      // For images, we can send the image directly to Gemini multimodally
      extractedText = ''; // Handled multimodally below
    } else {
      return res.status(400).json({ error: 'Unsupported file format. Please upload PDF, Docx, or Image files.' });
    }

    // 2. Prepare Gemini request payload
    let parts = [];
    const prompt = `You are a real estate parser for Sharan Estates. Extract all property information from the provided document/file and output exactly a valid JSON object matching the schema below. Do not output markdown, backticks, or any conversational text. Just output a raw JSON block.
    
    JSON Schema:
    {
      "title": "string (luxury property title)",
      "price": "string (e.g. 'AED 12,500,000' or 'AED 1,500,000+')",
      "description": "string (detailed compelling description)",
      "beds": number,
      "baths": number,
      "size": "string (e.g. '4,500 Sq. Ft.')",
      "category": "villas or apartments",
      "type": "ready or off-plan",
      "location": "string (e.g. 'Palm Jumeirah', 'Downtown Dubai')",
      "status": "Available",
      "features": ["array of strings, e.g. private pool, skyline view, beachfront"],
      "handover": "string (e.g. 'Q4 2028' or empty)",
      "payment_plan": "string (e.g. '60/40 payment plan' or empty)",
      "property_type": "string (e.g. 'Apartment', 'Penthouse', 'Villa')",
      "bedrooms_range": "string (e.g. '5 Beds' or '2 - 3 Beds')"
    }`;

    parts.push({ text: prompt });

    if (mimeType.startsWith('image/')) {
      // Send image directly to Gemini
      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: fileData.split(',')[1] || fileData
        }
      });
    } else {
      // Send text extracted from PDF/Docx
      if (!extractedText || extractedText.trim().length === 0) {
        return res.status(400).json({ error: 'No readable text could be extracted from this document.' });
      }
      parts.push({ text: `Document content:\n\n${extractedText}` });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.1
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API Error: ${errText}`);
    }

    const geminiData = await response.json();
    let resultText = '';
    
    if (geminiData.candidates && geminiData.candidates[0] && geminiData.candidates[0].content && geminiData.candidates[0].content.parts[0]) {
      resultText = geminiData.candidates[0].content.parts[0].text;
    }

    if (!resultText) {
      throw new Error('Gemini API returned an empty response.');
    }

    // Parse extracted JSON
    let propertyDetails = {};
    try {
      propertyDetails = JSON.parse(resultText.trim());
    } catch (parseErr) {
      // Fallback cleaner in case response has markdown wrapper
      const match = resultText.match(/\{[\s\S]*\}/);
      if (match) {
        propertyDetails = JSON.parse(match[0]);
      } else {
        throw new Error('Failed to parse AI output as JSON.');
      }
    }

    // Attach any extracted images (docx only, or fallback for image uploads)
    if (mimeType.startsWith('image/')) {
      // Use the uploaded image itself as the property image
      propertyDetails.image = fileData;
      propertyDetails.images = [fileData];
    } else if (extractedImages.length > 0) {
      propertyDetails.image = extractedImages[0];
      propertyDetails.images = extractedImages;
    } else {
      propertyDetails.image = '';
      propertyDetails.images = [];
    }

    res.json(propertyDetails);

  } catch (err) {
    console.error('Document parsing / AI extraction failed:', err.message);
    res.status(500).json({ error: `Failed to scan document: ${err.message}` });
  }
});

// Create Property (Admin Only)
app.post('/api/properties', authenticateToken, async (req, res) => {
  const { title, price, image, description, beds, baths, size, category, type, location, status, floors, images, features, handover, payment_plan, property_type, bedrooms_range } = req.body;
  
  if (!title || !price || !image || !category || !type) {
    return res.status(400).json({ error: 'Missing required property fields' });
  }

  try {
    const sql = `
      INSERT INTO properties 
      (title, price, image, description, beds, baths, size, category, type, location, status, dropbox_link, floors, images, features, handover, payment_plan, property_type, bedrooms_range, starred) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) 
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
      req.body.dropbox_link || '',
      JSON.stringify(floors || []),
      JSON.stringify(images || []),
      JSON.stringify(features || []),
      handover || '',
      payment_plan || '',
      property_type || '',
      bedrooms_range || '',
      req.body.starred === true || req.body.starred === 'true'
    ];

    const result = await pool.query(sql, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.warn('Create property database insert failed, using memory/JSON fallback:', err.message);
    
    // Generate new ID
    const newId = fallbackProperties.length > 0 
      ? Math.max(...fallbackProperties.map(p => p.id)) + 1 
      : 1;

    const newProperty = {
      id: newId,
      title,
      price,
      image,
      description: description || '',
      beds: parseInt(beds) || 0,
      baths: parseInt(baths) || 0,
      size: size || '',
      category,
      type,
      location: location || 'Prime District',
      status: status || 'Available',
      dropbox_link: req.body.dropbox_link || '',
      floors: floors || [],
      images: images || [],
      features: features || [],
      handover: handover || '',
      payment_plan: payment_plan || '',
      property_type: property_type || '',
      bedrooms_range: bedrooms_range || '',
      starred: req.body.starred === true || req.body.starred === 'true',
      created_at: new Date().toISOString()
    };
    
    fallbackProperties.push(newProperty);
    savePropertiesToDisk();
    res.status(201).json(newProperty);
  }
});

// Update Property (Admin Only)
app.put('/api/properties/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, price, image, description, beds, baths, size, category, type, location, status, floors, images, features, handover, payment_plan, property_type, bedrooms_range } = req.body;

  if (!title || !price || !image || !category || !type) {
    return res.status(400).json({ error: 'Missing required property fields' });
  }

  try {
    const sql = `
      UPDATE properties 
      SET title = $1, price = $2, image = $3, description = $4, beds = $5, baths = $6, 
          size = $7, category = $8, type = $9, location = $10, status = $11, dropbox_link = $12, 
          floors = $13, images = $14, features = $15, handover = $16, payment_plan = $17, 
          property_type = $18, bedrooms_range = $19, starred = $20
      WHERE id = $21 
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
      req.body.dropbox_link || '',
      JSON.stringify(floors || []),
      JSON.stringify(images || []),
      JSON.stringify(features || []),
      handover || '',
      payment_plan || '',
      property_type || '',
      bedrooms_range || '',
      req.body.starred === true || req.body.starred === 'true',
      id
    ];

    const result = await pool.query(sql, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.warn('Update property database update failed, using memory/JSON fallback:', err.message);
    const index = fallbackProperties.findIndex(p => p.id.toString() === id.toString());
    if (index === -1) {
      return res.status(404).json({ error: 'Property not found in memory database' });
    }

    const updatedProperty = {
      ...fallbackProperties[index],
      title,
      price,
      image,
      description: description || '',
      beds: parseInt(beds) || 0,
      baths: parseInt(baths) || 0,
      size: size || '',
      category,
      type,
      location: location || 'Prime District',
      status: status || 'Available',
      dropbox_link: req.body.dropbox_link || '',
      floors: floors || [],
      images: images || [],
      features: features || [],
      handover: handover || '',
      payment_plan: payment_plan || '',
      property_type: property_type || '',
      bedrooms_range: bedrooms_range || '',
      starred: req.body.starred === true || req.body.starred === 'true'
    };

    fallbackProperties[index] = updatedProperty;
    savePropertiesToDisk();
    res.json(updatedProperty);
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
    console.warn('Delete property database query failed, using memory/JSON fallback:', err.message);
    const index = fallbackProperties.findIndex(p => p.id.toString() === id.toString());
    if (index === -1) {
      return res.status(404).json({ error: 'Property not found in memory database' });
    }
    const deleted = fallbackProperties.splice(index, 1)[0];
    savePropertiesToDisk();
    res.json({ message: 'Property deleted successfully', deletedProperty: deleted });
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

// ═══════════════════════════════════════════
//  BLOG ENDPOINTS
// ═══════════════════════════════════════════

// Get All Blogs (Public)
app.get('/api/blogs', async (req, res) => {
  const { category } = req.query;
  try {
    let blogs = [...fallbackBlogs].sort((a, b) => b.id - a.id);
    if (category) {
      blogs = blogs.filter(b => b.category.toLowerCase() === category.toLowerCase());
    }
    res.json(blogs);
  } catch (err) {
    console.warn('Fetch blogs failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get Single Blog (Public)
app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = fallbackBlogs.find(b => b.id.toString() === id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    console.warn('Fetch blog failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Create Blog (Admin Only)
app.post('/api/blogs', authenticateToken, async (req, res) => {
  const { title, category, readTime, image, excerpt, content, featured, attachments } = req.body;
  try {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const newBlog = {
      id: Math.max(...fallbackBlogs.map(b => b.id), 0) + 1,
      title: title || 'Untitled Blog',
      category: category || 'General',
      date: dateStr,
      readTime: readTime || '5 min read',
      image: image || '',
      excerpt: excerpt || '',
      content: content || '',
      featured: featured || false,
      attachments: attachments || []
    };
    fallbackBlogs.push(newBlog);
    saveBlogsToDisk();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error('Create blog failed:', err.message);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

// Update Blog (Admin Only)
app.put('/api/blogs/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const index = fallbackBlogs.findIndex(b => b.id.toString() === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    const updatedBlog = { ...fallbackBlogs[index], ...req.body, id: fallbackBlogs[index].id };
    fallbackBlogs[index] = updatedBlog;
    saveBlogsToDisk();
    res.json(updatedBlog);
  } catch (err) {
    console.error('Update blog failed:', err.message);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

// Delete Blog (Admin Only)
app.delete('/api/blogs/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const index = fallbackBlogs.findIndex(b => b.id.toString() === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    const deleted = fallbackBlogs.splice(index, 1)[0];
    saveBlogsToDisk();
    res.json({ message: 'Blog deleted successfully', deletedBlog: deleted });
  } catch (err) {
    console.error('Delete blog failed:', err.message);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});


// ═══════════════════════════════════════════
//  SERVE FRONTEND (Production - Render)
// ═══════════════════════════════════════════
// In production, serve the Vite-built React app from /dist
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  
  // Serve static files from the Vite build output
  app.use(express.static(distPath));

  // For any non-API route, send the React app's index.html (SPA client-side routing)
  app.get(/.*/, (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

// Start Server and Init Database
const startServer = async () => {
  try {
    await initDb();
  } catch (err) {
    console.warn('Database init warning (fallback active):', err.message);
  }
};

// Always listen — works on both local dev and Render
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await startServer();
});

// Export for Vercel Serverless Functions (backwards compatibility)
module.exports = app;
