import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getThemeColor = () => {
      const style = getComputedStyle(document.documentElement);
      const appEl = document.querySelector('.app-container');
      if (appEl) {
        const appStyle = getComputedStyle(appEl);
        return appStyle.getPropertyValue('--primary').trim() || '#f97316';
      }
      return '#f97316';
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction - subtle attraction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          this.x += dx * 0.001;
          this.y += dy * 0.001;
        }

        // Pulsing opacity
        this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(time * this.pulseSpeed + this.pulseOffset));

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw(ctx, color) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = this.currentOpacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 249, g: 115, b: 22 };
    };

    const init = () => {
      resize();
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 80);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = getThemeColor();
      const rgb = hexToRgb(color);

      particles.forEach(p => {
        p.update(time);
        p.draw(ctx, `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', () => { resize(); init(); });
    window.addEventListener('mousemove', handleMouse);
    
    init();
    animate(0);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
    />
  );
}
