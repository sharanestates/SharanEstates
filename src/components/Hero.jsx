import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const titleRef = useRef();
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" style={{ alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 className="hero-title" ref={titleRef}>
          Sharan Estates
        </h1>
        <p className="hero-subtitle">Redefining Luxury Living</p>
        <button className="btn-primary">Explore Properties</button>
      </div>
    </section>
  );
}
