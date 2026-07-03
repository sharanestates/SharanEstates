import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Layers } from 'lucide-react';
import Building3D from './Building3D';
import Tilt from 'react-parallax-tilt';

export default function ScannerCard() {
  return (
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} transitionSpeed={1500} style={{ width: '100%', maxWidth: '800px' }}>
      <div className="glass-panel card-3d" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(255, 255, 255, 0.8)', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <Layers size={20} color="var(--primary-dark)" />
            3D Building Scanner
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Interactive Floor Plan Selector</div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          
          {/* Left: 3D Canvas */}
          <div style={{ flex: '1 1 300px', height: '400px', background: '#F9F9F9', borderRadius: '12px', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.7rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', zIndex: 2 }}>
              Drag to Rotate | Select segments
            </div>
            <Canvas camera={{ position: [0, 2, 8], fov: 40 }} style={{ pointerEvents: 'auto' }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 10, 5]} intensity={2} color="#FFFBF0" />
              <Environment preset="city" />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
              <Building3D color="#FAFAFA" accent="#D3B98A" scale={0.9} rotationSpeed={0} />
            </Canvas>
          </div>

          {/* Right: Property Details */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '200px', position: 'relative' }}>
              <img src="/light_exterior.png" alt="Villa" className="image-glossy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))', pointerEvents: 'none' }}></div>
            </div>
            <div style={{ padding: '0.5rem' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--primary-dark)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Signature Residences | Level 1-39
              </p>
              <h3 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>The Golden Crest Villa & Condos</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Exclusive lower-level residences with private gardens, golf course view, and custom modular kitchens.
              </p>
              <h4 style={{ color: 'var(--primary-dark)', fontSize: '1.2rem', marginTop: '1rem' }}>AED 18,500,000</h4>
            </div>
          </div>

        </div>

        {/* Levels Selector Bottom */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ background: '#F5F5F5', padding: '0.8rem 1rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.3s' }}>All Levels</div>
          <div style={{ background: '#F5F5F5', padding: '0.8rem 1rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.3s' }}><span style={{ color: '#FF9800' }}>●</span> L70-75 Penthouse</div>
          <div style={{ background: '#F5F5F5', padding: '0.8rem 1rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.3s' }}><span style={{ color: '#A1887F' }}>●</span> L40-69 Executive</div>
          <div style={{ background: '#1A1A1A', color: '#FFF', padding: '0.8rem 1rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}><span style={{ color: 'var(--primary-color)' }}>●</span> L1-39 Residences</div>
        </div>

      </div>
    </Tilt>
  );
}
