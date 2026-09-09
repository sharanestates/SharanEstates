import React from 'react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/971545501096?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20Sharan%20Private%20Advisory%20services."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp the Advisory Team"
      className="whatsapp-float-btn"
      onMouseOver={(e) => {
        e.currentTarget.style.background = '#FFFFFF';
        e.currentTarget.style.color = '#000000';
        e.currentTarget.style.borderColor = '#FFFFFF';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = '#0D0D0D';
        e.currentTarget.style.color = '#FFFFFF';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="whatsapp-float-icon"
        style={{ flexShrink: 0 }}
      >
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.487 1.333 5.006l-1.417 5.176 5.297-1.39c1.463.799 3.111 1.218 4.774 1.219h.004c5.505 0 9.989-4.478 9.99-9.985.001-2.669-1.036-5.178-2.923-7.064-1.888-1.887-4.397-2.924-7.068-2.946zm5.836 14.184c-.244.688-1.42 1.314-1.956 1.393-.535.079-1.229.112-3.528-.788-2.939-1.15-4.832-4.14-4.978-4.334-.146-.194-1.196-1.593-1.196-3.037 0-1.444.756-2.155 1.024-2.447.268-.292.585-.365.78-.365.195 0 .39.001.56.01.18.009.424-.068.663.506.244.584.829 2.022.902 2.168.073.146.122.316.024.511-.098.195-.146.316-.293.487-.146.17-.308.38-.44.511-.146.146-.3.305-.129.598.17.292.756 1.246 1.62 2.017 1.112.993 2.047 1.3 2.339 1.446.292.146.463.122.634-.073.17-.195.731-.852.926-1.144.195-.292.39-.244.658-.146.268.098 1.706.804 2.001.95.292.146.487.219.56.341.073.122.073.706-.171 1.394z" />
      </svg>
      <span className="whatsapp-float-text">WhatsApp the Advisory Team →</span>
    </a>
  );
}
