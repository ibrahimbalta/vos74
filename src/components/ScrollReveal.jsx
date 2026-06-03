import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, direction = 'up', delay = 0, className = '' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const directionMap = {
    up: 'reveal-up',
    down: 'reveal-down',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
    fade: 'reveal-fade'
  };

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${directionMap[direction] || 'reveal-up'} ${isVisible ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
