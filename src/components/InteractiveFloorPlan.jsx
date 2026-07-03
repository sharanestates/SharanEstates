import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveFloorPlan({ propertyType, floorsData }) {
  const [hoveredFloor, setHoveredFloor] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);

  // Dummy floor data (varying by property type for realism)
  const isVilla = propertyType === 'villa';
  
  const defaultFloors = isVilla ? [
    { id: 3, name: 'Rooftop Terrace', price: '$800,000', status: 'Available', yield: '4.5%', features: 'Private Pool, BBQ Area' },
    { id: 2, name: 'Level 2 - Bedrooms', price: '$1,500,000', status: 'Sold', yield: 'N/A', features: 'Master Suite, 3 Guest Rooms' },
    { id: 1, name: 'Level 1 - Living', price: '$2,200,000', status: 'Available', yield: '5.2%', features: 'Open Kitchen, Dining, Garden Access' },
  ] : [
    { id: 5, name: 'Penthouse Level', price: '$3,500,000', status: 'Available', yield: '6.1%', features: 'Panoramic Views, Private Elevator' },
    { id: 4, name: 'Executive Level 4', price: '$1,200,000', status: 'Sold', yield: 'N/A', features: '4 Beds, Balcony' },
    { id: 3, name: 'Executive Level 3', price: '$1,150,000', status: 'Available', yield: '5.8%', features: '4 Beds, Balcony' },
    { id: 2, name: 'Standard Level 2', price: '$850,000', status: 'Available', yield: '5.5%', features: '3 Beds, Shared Amenities' },
    { id: 1, name: 'Ground / Retail', price: 'Not for Sale', status: 'Commercial', yield: 'N/A', features: 'Lobby, Concierge, Cafe' },
  ];

  const floors = floorsData && floorsData.length > 0 ? floorsData : defaultFloors;

  return (
    <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
      
      {/* 3D Stacked Floor Plan Representation */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '8px', perspective: '1000px' }}>
        <div style={{ marginBottom: '1rem', alignSelf: 'flex-start', background: 'var(--primary-color)', color: '#FFF', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
          Interactive Unit Selection
        </div>

        {floors.map((floor) => {
          const isSelected = selectedFloor?.id === floor.id;
          const isHovered = hoveredFloor === floor.id;
          const isSold = floor.status === 'Sold';
          
          let bgColor = 'rgba(255, 255, 255, 0.4)';
          let borderColor = 'rgba(255, 255, 255, 0.6)';
          
          if (isSold) {
            bgColor = 'rgba(200, 200, 200, 0.3)';
          } else if (isSelected) {
            bgColor = 'rgba(211, 185, 138, 0.8)';
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
              onClick={() => !isSold && floor.status !== 'Commercial' && setSelectedFloor(floor)}
              animate={{
                scale: isHovered && !isSold ? 1.02 : 1,
                x: isHovered && !isSold ? -10 : 0,
                z: isHovered && !isSold ? 20 : 0
              }}
              style={{
                height: floor.id === floors.length && !isVilla ? '80px' : '60px',
                background: bgColor,
                border: `2px solid ${borderColor}`,
                borderRadius: '8px',
                cursor: isSold || floor.status === 'Commercial' ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1.5rem',
                backdropFilter: 'blur(10px)',
                boxShadow: isHovered && !isSold ? '0 10px 30px rgba(0,0,0,0.1)' : '0 4px 10px rgba(0,0,0,0.02)',
                transition: 'background 0.3s, border 0.3s',
                transformStyle: 'preserve-3d'
              }}
            >
              <div style={{ fontWeight: 600, color: isSelected ? '#FFF' : 'var(--text-dark)' }}>{floor.name}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: isSold ? '#999' : isSelected ? '#FFF' : 'var(--primary-dark)' }}>
                {floor.status}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Panel */}
      <div style={{ flex: 1, background: '#FFFFFF', borderRadius: '24px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          {selectedFloor ? (
            <motion.div
              key={selectedFloor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>{selectedFloor.name}</h3>
              <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'var(--primary-color)', color: '#FFF', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '2rem', alignSelf: 'flex-start' }}>
                Selected for Booking
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Price</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-dark)' }}>{selectedFloor.price}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Est. Rental Yield</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-dark)' }}>{selectedFloor.yield}</p>
                </div>
              </div>
              
              <div style={{ marginBottom: 'auto' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Features</p>
                <p style={{ color: 'var(--text-dark)', lineHeight: 1.5 }}>{selectedFloor.features}</p>
              </div>

              <button className="btn-solid" style={{ width: '100%', marginTop: '2rem', padding: '1.2rem' }}>
                Proceed to Booking & KYC
              </button>
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
              <p>Select an available floor/unit from the building schematic to view details and proceed with booking.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
