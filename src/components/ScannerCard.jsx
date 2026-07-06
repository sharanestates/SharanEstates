import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Layers } from 'lucide-react';
import Building3D from './Building3D';
import Tilt from 'react-parallax-tilt';

export default function ScannerCard() {
  const [activeLevel, setActiveLevel] = useState('residences');

  const levelData = {
    all: {
      subtitle: 'Full Tower Portfolio | L1-75',
      title: 'The Golden Crest Tower',
      desc: 'Complete architectural schematic of the modern residences, containing standard flats, premium executive floors, and luxury penthouses.',
      price: 'AED 8,200,000 - 35,000,000',
      image: '/light_exterior.png'
    },
    penthouse: {
      subtitle: 'Penthouse Collection | Level 70-75',
      title: 'Triplex Sky Penthouses',
      desc: 'Elite top-tier triplex residences. Private glass elevators, rooftop infinity pools, and 360-degree views of the skyline and ocean.',
      price: 'AED 35,000,000',
      image: '/listing_penthouse.png'
    },
    executive: {
      subtitle: 'Executive Suites | Level 40-69',
      title: 'Bespoke Executive Flats',
      desc: 'Spacious half-floor layouts featuring bespoke marble finishing, automated floor-to-ceiling shades, and private wellness spas.',
      price: 'AED 14,500,000',
      image: '/interior_lounge.png'
    },
    residences: {
      subtitle: 'Signature Residences | Level 1-39',
      title: 'The Golden Crest Condos',
      desc: 'Exclusive lower-level residences with private gardens, direct access to golf course paths, and custom handcrafted modular kitchens.',
      price: 'AED 18,500,000',
      image: '/exterior_patio.png'
    }
  };

  const currentData = levelData[activeLevel];

  return (
    <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1500} scale={1.01} transitionSpeed={1000} style={{ width: '100%', maxWidth: '800px' }}>
      <div className="glass-panel card-3d" style={{ display: 'flex', flexDirection: 'column', padding: '2rem', background: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(211, 185, 138, 0.2)', boxShadow: '0 30px 70px rgba(0,0,0,0.06)', borderRadius: '28px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.2rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-dark)', fontSize: '1.1rem', letterSpacing: '0.5px' }}>
            <Layers size={22} color="var(--primary-dark)" style={{ filter: 'drop-shadow(0 2px 4px rgba(211,185,138,0.2))' }} />
            3D Building Scanner
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Interactive Viewport</div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          
          {/* Left: 3D Canvas / Hologram Viewport */}
          <div style={{ flex: '1.2 1 300px', height: '420px', background: '#0D0D0F', borderRadius: '18px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 0 35px rgba(0,0,0,0.85), 0 10px 30px rgba(0,0,0,0.15)' }}>
            
            {/* Holographic scanner effect overlays */}
            <div className="holoscene-grid" />
            <div className="scanner-scanline" />
            
            <div style={{ position: 'absolute', bottom: '1.2rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(13, 13, 15, 0.85)', border: '1px solid rgba(211, 185, 138, 0.25)', backdropFilter: 'blur(8px)', padding: '0.4rem 1.2rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-color)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', zIndex: 3, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Drag to Rotate | Select segments
            </div>
            
            <Canvas camera={{ position: [0, 2, 8], fov: 40 }} style={{ pointerEvents: 'auto' }}>
              <ambientLight intensity={1.8} />
              <directionalLight position={[5, 10, 5]} intensity={2.5} color="#FFFDF0" />
              <Environment preset="city" />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
              <Building3D color="#F5F2EB" accent="#D3B98A" scale={0.9} rotationSpeed={0} />
            </Canvas>
          </div>

          {/* Right: Dynamic Property Details */}
          <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '1.2rem' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', height: '220px', position: 'relative', boxShadow: '0 8px 25px rgba(0,0,0,0.08)', border: '1px solid var(--border-color)' }}>
              <img src={currentData.image} alt={currentData.title} className="image-glossy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))', pointerEvents: 'none' }}></div>
            </div>
            
            <div style={{ padding: '0.2rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--primary-dark)', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {currentData.subtitle}
              </p>
              <h3 style={{ fontSize: '1.4rem', margin: '0 0 0.6rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)' }}>{currentData.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                {currentData.desc}
              </p>
              <h4 style={{ color: 'var(--primary-dark)', fontSize: '1.4rem', fontWeight: 700, marginTop: '1.2rem', fontFamily: 'var(--font-serif)' }}>{currentData.price}</h4>
            </div>
          </div>

        </div>

        {/* Levels Selector Bottom */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginTop: '1.8rem' }}>
          <button 
            className={`level-btn ${activeLevel === 'all' ? 'active' : ''}`}
            onClick={() => setActiveLevel('all')}
          >
            <span>All Levels</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>L1-75</span>
          </button>
          
          <button 
            className={`level-btn ${activeLevel === 'penthouse' ? 'active' : ''}`}
            onClick={() => setActiveLevel('penthouse')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#FF9800', fontSize: '0.7rem' }}>●</span> Penthouse
            </span>
            <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>L70-75</span>
          </button>

          <button 
            className={`level-btn ${activeLevel === 'executive' ? 'active' : ''}`}
            onClick={() => setActiveLevel('executive')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#A1887F', fontSize: '0.7rem' }}>●</span> Executive
            </span>
            <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>L40-69</span>
          </button>

          <button 
            className={`level-btn ${activeLevel === 'residences' ? 'active' : ''}`}
            onClick={() => setActiveLevel('residences')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'var(--primary-color)', fontSize: '0.7rem' }}>●</span> Residences
            </span>
            <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>L1-39</span>
          </button>
        </div>

      </div>
    </Tilt>
  );
}
