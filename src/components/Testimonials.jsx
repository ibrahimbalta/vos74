import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MessageCircle, Shield } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const defaultTestimonials = [
  {
    name: 'Can Yılmaz',
    vehicle: 'Opel Astra 1.6 CDTI',
    rating: 5,
    text: 'Aracımın motor ışığı yandığında buraya geldim. OBD cihazıyla 5 dakikada arızayı buldular. Ateşleme bobini değişimi yapıldı, araç fabrika ayarında çalışıyor. Şeffaflıkları müthiş, her adımı telefondan takip ettim.',
    date: '2 hafta önce',
    service: 'Motor Arıza Tespit',
    avatar: 'CY'
  },
  {
    name: 'Ayşe Karaca',
    vehicle: 'Renault Megane 4',
    rating: 5,
    text: 'Şanzıman sorunu yaşıyordum, başka servislerde "komple değişecek" dediler. Burada solenoid temizliği ile çözüldü, binlerce lira tasarruf ettim. Güvenilir ve dürüst bir ekip.',
    date: '1 ay önce',
    service: 'Şanzıman Onarımı',
    avatar: 'AK'
  },
  {
    name: 'Mehmet Demir',
    vehicle: 'BMW 320i F30',
    rating: 5,
    text: 'Kaporta boyamda mükemmel iş çıkardılar. Renk uyumu birebir tuttu, fabrika çıkışı gibi oldu. Üstelik 2 yıl garanti verdiler. Kesinlikle tavsiye ederim.',
    date: '3 hafta önce',
    service: 'Kaporta & Boya',
    avatar: 'MD'
  },
  {
    name: 'Serkan Kaya',
    vehicle: 'VW Golf 1.4 TSI',
    rating: 5,
    text: 'Periyodik bakım için geldim, araçta fark etmediğim fren aşınmasını da tespit edip hemen müdahale ettiler. Canlı lift görüntüsünü izlemek çok hoş bir deneyimdi.',
    date: '1 hafta önce',
    service: 'Periyodik Bakım',
    avatar: 'SK'
  },
  {
    name: 'Elif Yıldırım',
    vehicle: 'Toyota Corolla Hybrid',
    rating: 5,
    text: 'Elektrik sisteminde sürekli arıza yapan aracımı getirdim, CAN-Bus hattındaki problemi çok hızlı buldular. Hibrit konusunda da uzmanlar, gönül rahatlığıyla teslim edebilirsiniz.',
    date: '5 gün önce',
    service: 'Elektrik & Hibrit Sistem',
    avatar: 'EY'
  }
];

export default function Testimonials({ testimonials = [] }) {
  const activeTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setDirection('next');
      setActiveIndex((prev) => (prev + 1) % activeTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeTestimonials]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setDirection('prev');
    setActiveIndex((prev) => (prev - 1 + activeTestimonials.length) % activeTestimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % activeTestimonials.length);
  };

  const active = activeTestimonials[activeIndex];

  return (
    <section className="testimonials-section">
      <ScrollReveal>
        <div className="section-header">
          <span className="badge">💬 Müşteri Deneyimleri</span>
          <h2>Ustalarımıza Güvenen <span className="text-gradient">Binlerce Müşteri</span></h2>
          <p className="section-desc">
            Gerçek müşterilerimizin deneyimlerini okuyun. Kalitemiz, şeffaflığımız ve güvenilirliğimiz ile sektörde fark yaratıyoruz.
          </p>
        </div>
      </ScrollReveal>

      <div className="testimonial-showcase">
        {/* Main Testimonial Card */}
        <div className="testimonial-main-card glass-card" key={activeIndex}>
          <div className="testimonial-quote-icon">
            <Quote size={40} />
          </div>

          <div className={`testimonial-content-anim slide-${direction}`}>
            <div className="testimonial-stars">
              {[...Array(active.rating)].map((_, i) => (
                <Star key={i} size={18} className="star-filled" />
              ))}
            </div>

            <p className="testimonial-text">{active.text}</p>

            <div className="testimonial-service-badge">
              <Shield size={14} />
              <span>{active.service}</span>
            </div>

            <div className="testimonial-author">
              <div className="testimonial-avatar">
                <span>{active.avatar}</span>
              </div>
              <div className="testimonial-author-info">
                <strong>{active.name}</strong>
                <span className="testimonial-vehicle">{active.vehicle}</span>
                <span className="testimonial-date">{active.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="testimonial-controls">
          <button className="testimonial-nav-btn" onClick={handlePrev}>
            <ChevronLeft size={20} />
          </button>

          <div className="testimonial-dots">
            {activeTestimonials.map((_, idx) => (
              <button
                key={idx}
                className={`testimonial-dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveIndex(idx);
                }}
              />
            ))}
          </div>

          <button className="testimonial-nav-btn" onClick={handleNext}>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Side Preview Cards */}
        <div className="testimonial-preview-strip">
          {activeTestimonials.map((t, idx) => (
            <button
              key={idx}
              className={`preview-card glass ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => { setIsAutoPlaying(false); setActiveIndex(idx); }}
            >
              <div className="preview-avatar">
                <span>{t.avatar}</span>
              </div>
              <div className="preview-info">
                <strong>{t.name}</strong>
                <span>{t.vehicle}</span>
              </div>
              <div className="preview-stars">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={10} className="star-filled-mini" />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
