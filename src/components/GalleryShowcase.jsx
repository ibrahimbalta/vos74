import React, { useState, useEffect } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const defaultGalleryItems = [
  {
    src: '/hero_bg.png',
    title: 'Profesyonel Atölye Ortamı',
    desc: 'Son teknoloji ekipmanlarla donatılmış 800m² kapalı atölye alanımız.',
    tag: 'Atölye'
  },
  {
    src: '/workshop_panorama.png',
    title: 'Çoklu Lift Sistemi',
    desc: '5 adet hidrolik lift ile eş zamanlı servis kapasitesi.',
    tag: 'Kapasite'
  },
  {
    src: '/obd_bg.png',
    title: 'Bilgisayarlı Teşhis',
    desc: 'BOSCH OBD-III Pro cihazı ile hassas arıza tespiti.',
    tag: 'Teknoloji'
  },
  {
    src: '/before_engine.png',
    title: 'Onarım Öncesi Durum',
    desc: 'Her onarım sürecini fotoğraflarla belgeliyoruz.',
    tag: 'Belgeleme'
  },
  {
    src: '/after_engine.png',
    title: 'Onarım Sonrası Kalite',
    desc: 'Fabrika standartlarında onarım ve yenileme çalışmaları.',
    tag: 'Kalite'
  }
];

export default function GalleryShowcase({ galleryItems = [] }) {
  const activeGalleryItems = galleryItems.length > 0 ? galleryItems : defaultGalleryItems;

  const [lightbox, setLightbox] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (lightbox === null) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((prev) => (prev + 1) % activeGalleryItems.length);
      if (e.key === 'ArrowLeft') setLightbox((prev) => (prev - 1 + activeGalleryItems.length) % activeGalleryItems.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  return (
    <section className="gallery-section">
      <ScrollReveal>
        <div className="section-header">
          <span className="badge">📸 Atölye Galeri</span>
          <h2>Atölyemizi <span className="text-gradient">Yakından Tanıyın</span></h2>
          <p className="section-desc">
            Modern ekipman, temiz çalışma ortamı ve profesyonel kadromuzla hizmetinizdeyiz.
          </p>
        </div>
      </ScrollReveal>

      <div className="gallery-masonry">
        {activeGalleryItems.map((item, idx) => (
          <ScrollReveal key={idx} delay={idx * 100} direction={idx % 2 === 0 ? 'up' : 'scale'}>
            <div
              className={`gallery-item glass-card ${hoveredIdx === idx ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setLightbox(idx)}
            >
              <div className="gallery-img-wrapper">
                <img src={item.src} alt={item.title} loading="lazy" />
                <div className="gallery-img-overlay">
                  <Maximize2 size={24} />
                  <span>Büyüt</span>
                </div>
              </div>
              <div className="gallery-item-info">
                <span className="gallery-tag">
                  <Camera size={12} />
                  {item.tag}
                </span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>
              <X size={24} />
            </button>
            <button
              className="lightbox-nav lightbox-prev"
              onClick={() => setLightbox((prev) => (prev - 1 + activeGalleryItems.length) % activeGalleryItems.length)}
            >
              <ChevronLeft size={28} />
            </button>
            <img
              src={activeGalleryItems[lightbox].src}
              alt={activeGalleryItems[lightbox].title}
              className="lightbox-img"
            />
            <button
              className="lightbox-nav lightbox-next"
              onClick={() => setLightbox((prev) => (prev + 1) % activeGalleryItems.length)}
            >
              <ChevronRight size={28} />
            </button>
            <div className="lightbox-caption">
              <Sparkles size={16} />
              <div>
                <strong>{activeGalleryItems[lightbox].title}</strong>
                <p>{activeGalleryItems[lightbox].desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
