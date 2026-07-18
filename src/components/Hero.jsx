import React, { useState } from 'react';
import { Calendar, Search, Award, Users, CheckCircle, Clock, Zap, ArrowRight, Check, Sparkles } from 'lucide-react';
import CountUp from './CountUp';

const vagModels = [
  {
    id: 'vw',
    name: 'VW Golf 7 / Passat B8',
    features: [
      { id: 'sweep', name: 'Kadran Selamlama (Gauge Sweep)', desc: 'Kontak açıldığında kadran ibrelerinin sona vurup geri dönmesi.' },
      { id: 'fuel', name: 'Ek Yakıt Göstergesi', desc: 'Yol bilgisayarında depodaki eksik litre miktarının gösterilmesi.' },
      { id: 'lock', name: 'Korna Kilit Onayı', desc: 'Kapılar kilitlendiğinde kısa bir korna sesi ile geri bildirim.' },
      { id: 'tsc', name: 'Torque Steer (TSC) Aktivasyonu', desc: 'Ani kalkışlarda direksiyonun sağa sola çekmesini önleme.' },
      { id: 'theme', name: 'Hayalet Kadran Renkleri', desc: 'Gösterge paneli ve multimedya ekranında 30 farklı renk seçeneği.' }
    ]
  },
  {
    id: 'seat',
    name: 'Seat Leon MK3 / Ibiza V',
    features: [
      { id: 'sweep', name: 'Kadran Selamlama (Gauge Sweep)', desc: 'Kontak açıldığında kadran ibrelerinin sona vurup geri dönmesi.' },
      { id: 'lap', name: 'Tur Zamanlayıcı (Lap Timer)', desc: 'Yol bilgisayarında yarış pisti kronometresinin aktif edilmesi.' },
      { id: 'mirror', name: 'Ayna İndirme (Mirror Tilt)', desc: 'Geri vitese alındığında sağ dikiz aynasının kaldırımı göstermesi.' },
      { id: 'ambient', name: 'Ambiyans Renk Kodlaması', desc: 'Kapı panellerindeki led aydınlatmalara ekstra renk tonları.' },
      { id: 'lock', name: 'Korna Kilit Onayı', desc: 'Kapılar kilitlendiğinde kısa bir korna sesi ile geri bildirim.' }
    ]
  },
  {
    id: 'skoda',
    name: 'Skoda Octavia A7 / Superb 3',
    features: [
      { id: 'sweep', name: 'Kadran Selamlama (Gauge Sweep)', desc: 'Kontak açıldığında kadran ibrelerinin sona vurup geri dönmesi.' },
      { id: 'school', name: 'Sürüş Okulu Modu (Driving School)', desc: 'Multimedya ekranında anlık sinyal ve hız gösterim özelliği.' },
      { id: 'keyclose', name: 'Kumandadan Bagaj Kapatma', desc: 'Elektrikli bagaj kapağının kumandadan da kapatılabilmesi.' },
      { id: 'throttle', name: 'Audi Gaz Pedalı Tepkisi', desc: 'Gaz pedalındaki hantallığın yazılımsal olarak giderilmesi.' },
      { id: 'lock', name: 'Korna Kilit Onayı', desc: 'Kapılar kilitlendiğinde kısa bir korna sesi ile geri bildirim.' }
    ]
  },
  {
    id: 'audi',
    name: 'Audi A3 8V / A4 B9',
    features: [
      { id: 'sweep', name: 'Kadran Selamlama (Gauge Sweep)', desc: 'Kontak açıldığında kadran ibrelerinin sona vurup geri dönmesi.' },
      { id: 'lap', name: 'Tur Zamanlayıcı (Lap Timer)', desc: 'Yol bilgisayarında yarış pisti kronometresinin aktif edilmesi.' },
      { id: 'assist', name: 'Uzun Far Asistanı (High Beam)', desc: 'Karşıdan araç gelince otomatik kısa fara geçen sistem.' },
      { id: 'sline', name: 'S-Line Karşılama Logosu', desc: 'MMI ekranı açılışında S-Line animasyon görseli.' }
    ]
  }
];

export default function Hero({ branchInfo, setActiveTab, activeRepairsCount, setPrefilledAppointment }) {
  const [selectedModelId, setSelectedModelId] = useState('vw');
  const [selectedFeatures, setSelectedFeatures] = useState({});

  const currentModel = vagModels.find(m => m.id === selectedModelId);

  const handleFeatureToggle = (featureId) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  const handleBookCoding = () => {
    const selectedList = currentModel.features
      .filter(f => selectedFeatures[f.id])
      .map(f => f.name);

    if (selectedList.length === 0) {
      alert("Lütfen en az bir adet gizli özellik seçiniz.");
      return;
    }

    const brandMap = {
      vw: 'Volkswagen',
      seat: 'Seat',
      skoda: 'Skoda',
      audi: 'Audi'
    };

    if (setPrefilledAppointment) {
      setPrefilledAppointment({
        brand: brandMap[selectedModelId],
        year: '2018',
        service: 'ODIS/VAG-COM Teşhis',
        note: `Açılmak istenen gizli özellikler: ${selectedList.join(', ')}`
      });
    }

    setActiveTab('appointment');
  };

  return (
    <section className="hero-section">
      {/* Background ambient light effects */}
      <div className="ambient-glow bg-blur-1"></div>
      <div className="ambient-glow bg-blur-2"></div>

      <div className="hero-content-wrapper">
        <div className="hero-left">
          <span className="badge pulse-glow">⚙️ Akıllı Sanayi Altyapısı</span>
          <h1 className="hero-title">
            Vos74 VAG Grubu <span className="text-gradient">Özel Servisi</span>
          </h1>
          <p className="hero-subtitle">
            {branchInfo.subtitle || 'Canlı lift durumları, şeffaf arıza takip paneli ve yedek parça mağazamız ile Bartın\'da Volkswagen, Audi, Skoda ve Seat araçlarınıza profesyonel servis desteği sunuyoruz.'}
          </p>
          
          <div className="hero-actions">
            <button 
              className="glow-btn hero-cta-main"
              onClick={() => setActiveTab('appointment')}
            >
              <Calendar size={18} />
              <span>Online Randevu Al</span>
              <ArrowRight size={16} className="cta-arrow" />
            </button>
            
            <button 
              className="glow-btn-secondary"
              onClick={() => setActiveTab('tracker')}
            >
              <Search size={18} />
              <span>Araç Durumu Sorgula</span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="hero-trust-badges">
            <div className="trust-item">
              <Zap size={14} />
              <span>Aynı Gün Servis</span>
            </div>
            <div className="trust-item">
              <CheckCircle size={14} />
              <span>1 Yıl Garanti</span>
            </div>
            <div className="trust-item">
              <Award size={14} />
              <span>Sertifikalı Usta</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          {/* Main Visual: Master Kadir Gül with glass overlay */}
          <div className="hero-visual-frame glass-card master-frame">
            <img 
              src="/kadir_usta.png" 
              alt="Kadir Gül - Vos74 Baş Usta" 
              className="hero-master-img" 
            />
            <div className="hero-master-gradient-overlay"></div>
            <div className="master-title-badge">
              <span className="master-name">Kadir Gül</span>
              <span className="master-role">Vos74 Özel Servis Sahibi & Baş Usta</span>
            </div>
            {/* Animated scanner line on the image */}
            <div className="hero-scan-line"></div>
          </div>
        </div>
      </div>

      {/* HİZMETLERİMİZ - Profesyonel Çözümler Bölümü (1. Görseldeki Birebir Tasarım) */}
      <div className="home-services-showcase glass-card">
        <div className="showcase-header">
          <span className="showcase-badge">⟐ HİZMETLERİMİZ</span>
          <h2>Araçlarınız İçin Profesyonel Çözümler</h2>
          <p>VAG grubu araçlarınıza özel geniş hizmet yelpazemizle yanınızdayız.</p>
        </div>

        {/* 6'lı Hizmet Kartları Grid */}
        <div className="showcase-cards-grid">
          <div className="showcase-card glass" onClick={() => setActiveTab('appointment')}>
            <div className="card-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10h2v4H4zM20 10h2v4h-2zM8 6h8v2H8zM8 16h8v2H8z" />
                <rect x="6" y="8" width="12" height="8" rx="2" />
                <path d="M12 10v4M10 12h4" />
              </svg>
            </div>
            <h4>Periyodik Bakım</h4>
            <p>Üretici standartlarında periyodik bakım hizmetleri.</p>
            <span className="card-link">Detayları Gör →</span>
          </div>

          <div className="showcase-card glass" onClick={() => setActiveTab('appointment')}>
            <div className="card-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M8 8v8M12 8v8M16 8v8M8 12h8" />
              </svg>
            </div>
            <h4>DSG Şanzıman</h4>
            <p>DSG şanzıman bakım, onarım ve mekatronik.</p>
            <span className="card-link">Detayları Gör →</span>
          </div>

          <div className="showcase-card glass" onClick={() => setActiveTab('appointment')}>
            <div className="card-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="6" width="14" height="12" rx="2" />
                <circle cx="9" cy="9" r="1" fill="currentColor" />
                <circle cx="12" cy="9" r="1" fill="currentColor" />
                <circle cx="15" cy="9" r="1" fill="currentColor" />
                <circle cx="9" cy="12" r="1" fill="currentColor" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
                <circle cx="15" cy="12" r="1" fill="currentColor" />
                <circle cx="9" cy="15" r="1" fill="currentColor" />
                <circle cx="12" cy="15" r="1" fill="currentColor" />
                <circle cx="15" cy="15" r="1" fill="currentColor" />
                <path d="M2 12h3M19 12h3" />
              </svg>
            </div>
            <h4>DPF & EGR Temizliği</h4>
            <p>DPF, EGR ve karbon temizliği ile maksimum performans.</p>
            <span className="card-link">Detayları Gör →</span>
          </div>

          <div className="showcase-card glass" onClick={() => setActiveTab('appointment')}>
            <div className="card-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="3" />
                <circle cx="12" cy="6" r="1" fill="currentColor" />
                <circle cx="12" cy="18" r="1" fill="currentColor" />
                <circle cx="6" cy="12" r="1" fill="currentColor" />
                <circle cx="18" cy="12" r="1" fill="currentColor" />
                <path d="M16 4a9 9 0 0 1 4 4" />
              </svg>
            </div>
            <h4>Fren Sistemi</h4>
            <p>Fren balata, disk, hidrolik kontrol ve bakım hizmetleri.</p>
            <span className="card-link">Detayları Gör →</span>
          </div>

          <div className="showcase-card glass" onClick={() => setActiveTab('appointment')}>
            <div className="card-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10h2v4H3zM19 10h2v4h-2z" />
                <rect x="5" y="8" width="14" height="8" rx="2" />
                <path d="M13 10l-2 3h3l-2 3" />
              </svg>
            </div>
            <h4>Motor Arıza & Onarım</h4>
            <p>Motor arıza tespiti, mekanik onarım ve performans artırma.</p>
            <span className="card-link">Detayları Gör →</span>
          </div>

          <div className="showcase-card glass" onClick={() => setActiveTab('appointment')}>
            <div className="card-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4v16M19 4v16M2 14h20" />
                <rect x="7" y="9" width="10" height="5" rx="1" />
                <circle cx="9" cy="14" r="1.5" />
                <circle cx="15" cy="14" r="1.5" />
              </svg>
            </div>
            <h4>Genel Servis Hizmetleri</h4>
            <p>Arıza tespiti, mekanik, elektrik, süspansiyon ve daha fazlası.</p>
            <span className="card-link">Detayları Gör →</span>
          </div>
        </div>

        {/* Güven Rozetleri Barı */}
        <div className="showcase-trust-bar glass">
          <div className="trust-bar-item">
            <div className="trust-icon"><Shield size={22} /></div>
            <div>
              <strong>Garantili İşçilik</strong>
              <span>Tüm işlerimiz garantimiz altında</span>
            </div>
          </div>

          <div className="trust-bar-item">
            <div className="trust-icon"><Award size={22} /></div>
            <div>
              <strong>Orijinal Yedek Parça</strong>
              <span>%100 orijinal ve kaliteli ürünler</span>
            </div>
          </div>

          <div className="trust-bar-item">
            <div className="trust-icon"><Clock size={22} /></div>
            <div>
              <strong>Aynı Gün Teslim</strong>
              <span>Çoğu işlemi aynı günde teslim</span>
            </div>
          </div>

          <div className="trust-bar-item">
            <div className="trust-icon"><Users size={22} /></div>
            <div>
              <strong>VAG Uzmanı</strong>
              <span>Uzman kadro, profesyonel hizmet</span>
            </div>
          </div>
        </div>

        {/* Online Randevu Al Butonu */}
        <div className="showcase-cta-wrapper">
          <button 
            type="button" 
            className="glow-btn showcase-cta-btn"
            onClick={() => setActiveTab('appointment')}
          >
            <Calendar size={18} />
            <span>Online Randevu Al</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
