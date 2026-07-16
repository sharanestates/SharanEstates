import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveFloorPlan({ propertyType, floorsData }) {
  const [hoveredFloor, setHoveredFloor] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);

  const isVilla = propertyType === 'villa';
  
  // High-fidelity default schematic structure containing levels and flats
  const defaultFloors = isVilla ? [
    {
      id: 3,
      name: 'Rooftop Terrace',
      flats: [
        { name: 'Sky Lounge Suite', price: '$800,000', size: '1,500 Sq. Ft.', beds: 2, baths: 2, status: 'Available' }
      ]
    },
    {
      id: 2,
      name: 'Level 2 - Bedrooms',
      flats: [
        { name: 'Master Flat A', price: '$1,500,000', size: '2,200 Sq. Ft.', beds: 4, baths: 4, status: 'Sold' },
        { name: 'Guest Flat B', price: '$1,200,000', size: '1,800 Sq. Ft.', beds: 3, baths: 3, status: 'Available' }
      ]
    },
    {
      id: 1,
      name: 'Level 1 - Living',
      flats: [
        { name: 'Garden Unit 101', price: '$2,200,000', size: '2,500 Sq. Ft.', beds: 3, baths: 4, status: 'Available' }
      ]
    }
  ] : [
    {
      id: 5,
      name: 'Penthouse Level',
      flats: [
        { name: 'PH 501', price: '$3,500,000', size: '3,000 Sq. Ft.', beds: 5, baths: 5, status: 'Available' }
      ]
    },
    {
      id: 4,
      name: 'Level 4',
      flats: [
        { name: 'Flat 401', price: '$1,200,000', size: '1,400 Sq. Ft.', beds: 3, baths: 2, status: 'Sold' },
        { name: 'Flat 402', price: '$1,150,000', size: '1,350 Sq. Ft.', beds: 3, baths: 2, status: 'Available' }
      ]
    },
    {
      id: 3,
      name: 'Level 3',
      flats: [
        { name: 'Flat 301', price: '$1,100,000', size: '1,300 Sq. Ft.', beds: 3, baths: 2, status: 'Available' },
        { name: 'Flat 302', price: '$1,100,000', size: '1,300 Sq. Ft.', beds: 3, baths: 2, status: 'Available' }
      ]
    },
    {
      id: 2,
      name: 'Level 2',
      flats: [
        { name: 'Flat 201', price: '$900,000', size: '1,100 Sq. Ft.', beds: 2, baths: 2, status: 'Available' },
        { name: 'Flat 202', price: '$900,000', size: '1,100 Sq. Ft.', beds: 2, baths: 2, status: 'Available' }
      ]
    },
    {
      id: 1,
      name: 'Level 1',
      flats: [
        { name: 'Lobby Retail', price: 'Commercial', size: '2,000 Sq. Ft.', beds: 0, baths: 2, status: 'Commercial' }
      ]
    }
  ];

  const floors = floorsData && floorsData.length > 0 ? floorsData : defaultFloors;

  return (
    <div className="flex-col-mobile gap-mobile" style={{ display: 'flex', gap: '2rem', minHeight: '100%', flexWrap: 'wrap' }}>
      
      {/* 3D Stacked Floor Plan Representation */}
      <div style={{ flex: '1 1 280px', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', perspective: '1000px' }}>
        <div style={{ marginBottom: '1rem', alignSelf: 'flex-start', background: 'var(--primary-color)', color: '#FFF', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
          Interactive Level Selection
        </div>

        {floors.map((floor) => {
          const isSelected = selectedFloor?.id === floor.id;
          const isHovered = hoveredFloor === floor.id;
          
          // Determine status based on units inside
          const flatsList = floor.flats || [];
          const allSold = flatsList.length > 0 && flatsList.every(f => f.status === 'Sold');
          const hasCommercial = flatsList.some(f => f.status === 'Commercial');
          
          let statusText = 'Available';
          if (allSold) statusText = 'Sold Out';
          else if (hasCommercial) statusText = 'Commercial';
          else if (flatsList.length === 0) statusText = 'Empty';

          let bgColor = 'rgba(255, 255, 255, 0.4)';
          let borderColor = 'rgba(255, 255, 255, 0.6)';
          
          if (allSold) {
            bgColor = 'rgba(200, 200, 200, 0.3)';
          } else if (isSelected) {
            bgColor = 'rgba(0, 0, 0, 0.8)';
            borderColor = 'var(--primary-dark)';
          } else if (isHovered) {
            bgColor = 'rgba(255, 255, 255, 0.8)';
            borderColor = 'var(--primary-color)';
          }

          return (
            <motion.div
              key={floor.id}
              onHoverStart={() => setHoveredFloor(floor.id)}
              onHoverEnd={() => setHoveredFloor(null)}
              onClick={() => setSelectedFloor(floor)}
              animate={{
                scale: isHovered ? 1.02 : 1,
                x: isHovered ? -10 : 0,
                z: isHovered ? 20 : 0
              }}
              style={{
                height: '45px',
                background: bgColor,
                border: `1px solid ${borderColor}`,
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1rem',
                backdropFilter: 'blur(10px)',
                boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.1)' : '0 4px 10px rgba(0,0,0,0.02)',
                transition: 'background 0.3s, border 0.3s',
                transformStyle: 'preserve-3d'
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: isSelected ? '#FFF' : 'var(--text-dark)' }}>{floor.name}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: allSold ? '#999' : isSelected ? '#FFF' : 'var(--primary-dark)' }}>
                {statusText} ({flatsList.length} Units)
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Panel displaying flat details for selected level */}
      <div style={{ flex: '1.2 1 340px', width: '100%', background: '#FFFFFF', borderRadius: '4px', padding: '2rem', border: '1px solid rgba(0, 0, 0, 0.3)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          {selectedFloor ? (
            <motion.div
              key={selectedFloor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>{selectedFloor.name}</h3>
              <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'var(--primary-color)', color: '#FFF', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1.5rem', alignSelf: 'flex-start' }}>
                Unit Configuration
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1, maxHeight: '420px', paddingRight: '0.5rem' }}>
                {selectedFloor.flats && selectedFloor.flats.length > 0 ? (
                  selectedFloor.flats.map((flat, idx) => (
                    <div key={idx} style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '4px', padding: '1.5rem', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.95rem', color: 'var(--text-dark)', fontFamily: 'var(--font-serif)' }}>{flat.name}</strong>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          borderRadius: '2px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          background: flat.status === 'Available' ? 'var(--primary-color)' : flat.status === 'Sold' ? '#EAEAEA' : '#fef3c7',
                          color: flat.status === 'Available' ? '#FFF' : flat.status === 'Sold' ? 'var(--text-muted)' : '#92400e'
                        }}>
                          {flat.status}
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <div>Price: <strong style={{ color: 'var(--primary-dark)' }}>{flat.price}</strong></div>
                        <div>Size: <strong style={{ color: 'var(--text-dark)' }}>{flat.size || 'N/A'}</strong></div>
                        <div>Rooms: <strong style={{ color: 'var(--text-dark)' }}>{flat.beds} Beds</strong></div>
                        <div>Baths: <strong style={{ color: 'var(--text-dark)' }}>{flat.baths} Baths</strong></div>
                      </div>
                      
                      {flat.status === 'Available' && (
                        <button className="btn-classic" style={{ 
                          padding: '0.8rem', 
                          fontSize: '0.75rem', 
                          borderRadius: '0',
                          background: 'transparent',
                          color: 'var(--text-dark)',
                          border: '2px solid var(--text-dark)',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '2px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          marginTop: '0.5rem'
                        }} 
                        onMouseOver={(e) => { e.target.style.background = 'var(--text-dark)'; e.target.style.color = '#FFF'; }}
                        onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-dark)'; }}
                        onClick={() => alert(`Registering interest for ${flat.name} at ${selectedFloor.name}!`)}>
                          Register Interest
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem' }}>No individual units configured on this level.</p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-muted)' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.2 }}>🏢</div>
              <p>Select a level from the building schematic stack on the left to explore individual flats, configuration sizes, prices, and status.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
