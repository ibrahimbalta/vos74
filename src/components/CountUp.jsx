import React, { useState, useEffect, useRef } from 'react';

export default function CountUp({ end, duration = 2000, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const numericEnd = typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) : end;
    let startTime = null;
    let frame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing: easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(eased * numericEnd);
      
      setCount(current);
      
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, end, duration]);

  const formatNumber = (num) => {
    return num.toLocaleString('tr-TR');
  };

  return (
    <span ref={ref} className="count-up-value">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}
