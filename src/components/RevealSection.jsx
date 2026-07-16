import React, { useEffect, useRef, useState } from 'react';

export default function RevealSection({ children, delay = 0, style = {}, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -10px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'perspective(1200px) rotateX(0deg) translateY(0) scale(1)' 
          : 'perspective(1200px) rotateX(6deg) translateY(65px) scale(0.96)',
        transformOrigin: 'top center',
        transition: `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
      className={className}
    >
      {children}
    </div>
  );
}
