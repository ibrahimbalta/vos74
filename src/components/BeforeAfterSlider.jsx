import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function BeforeAfterSlider({ beforeAfterData }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Keep track of container width to prevent before-image from sliding/compressing
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleResize = () => {
      setContainerWidth(containerRef.current.offsetWidth);
    };
    
    // Initial size
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSliderChange = (e) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section className="before-after-section">
      <div className="section-header">
        <span className="badge">Kusursuz İşçilik</span>
        <h2>Önce & Sonra Kalite Kanıtı</h2>
        <p className="section-desc">
          Atölyemizde yapılan işlemlerin kalitesini gözlerinizle görün. Kaydırıcıyı sağa sola sürükleyerek usta elinin farkını inceleyebilirsiniz.
        </p>
      </div>

      <div className="slider-wrapper-outer">
        <div 
          className="before-after-container glass-card" 
          ref={containerRef}
        >
          {/* AFTER IMAGE (Bottom Layer) */}
          <div className="slider-image after-layer">
            <img src={beforeAfterData?.afterImage || "/after_engine.png"} alt="Usta sonrası temiz motor" />
            <div className="slider-badge after-badge">
              <Sparkles size={14} />
              <span>USTA ELİ DEĞDİKTEN SONRA</span>
            </div>
          </div>

          {/* BEFORE IMAGE (Top Layer, Width Resized dynamically) */}
          <div 
            className="slider-image before-layer" 
            style={{ width: `${sliderPos}%` }}
          >
            <div 
              className="before-img-wrapper" 
              style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
            >
              <img src={beforeAfterData?.beforeImage || "/before_engine.png"} alt="Eski kirli motor" />
            </div>
            
            <div className="slider-badge before-badge">
              <AlertCircle size={14} />
              <span>İŞLEMDEN ÖNCE</span>
            </div>
          </div>

          {/* SLIDER BAR & HANDLE */}
          <div className="slider-handle-line" style={{ left: `${sliderPos}%` }}>
            <div className="slider-handle-button pulse-glow">
              <span className="handle-arrow">◀</span>
              <span className="handle-wrench">🛠️</span>
              <span className="handle-arrow">▶</span>
            </div>
          </div>

          {/* Transparent Input Range Overlaid */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderPos} 
            onChange={handleSliderChange} 
            className="slider-input-range"
            aria-label="Önce-sonra karşılaştırma sürgüsü"
          />
        </div>
      </div>
      
      <div className="slider-caption-tips">
        <p>💡 <strong>Görsel Örnek:</strong> {beforeAfterData?.description || "85.000 Km'deki Volkswagen Golf motorunun detaylı arıza giderimi, sızıntı temizliği ve motor koruma pasta-detay işlemi."}</p>
      </div>
    </section>
  );
}
