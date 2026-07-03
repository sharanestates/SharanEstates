import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const textRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" style={{ justifyContent: 'center' }}>
      <div className="container" ref={textRef}>
        <h2 style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '2rem' }}>
          The Standard of Excellence
        </h2>
        <p style={{ fontSize: '1.5rem', lineHeight: '1.6', maxWidth: '800px', color: 'var(--text-muted)' }}>
          At Sharan Estates, we don't just build homes; we curate lifestyles. 
          Our avant-garde approach blends modern architectural brilliance with unparalleled luxury, 
          ensuring that every property we offer is a masterpiece of design and comfort. 
          Experience real estate in a new dimension.
        </p>
      </div>
    </section>
  );
}
