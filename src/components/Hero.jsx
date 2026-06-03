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

      {/* VAG Gizli Özellik Sihirbazı */}
      <div className="vag-wizard-container glass-card pulse-glow">
        <div className="wizard-header">
          <div className="wizard-badge">⚡ VAG Kodlama Servisi</div>
          <h3>Vos74 Gizli Özellik Aktivasyon Sihirbazı</h3>
          <p>Aracınızın markasını seçin ve fabrikasyon olarak kapalı olan konfor özelliklerini keşfedin.</p>
        </div>

        <div className="wizard-body">
          {/* Model Selector Buttons */}
          <div className="model-selectors">
            {vagModels.map(model => (
              <button
                key={model.id}
                type="button"
                onClick={() => {
                  setSelectedModelId(model.id);
                  setSelectedFeatures({}); // reset selections when model changes
                }}
                className={`model-btn ${selectedModelId === model.id ? 'active' : ''}`}
              >
                <span>{model.name}</span>
              </button>
            ))}
          </div>

          {/* Features Grid */}
          <div className="features-grid-wizard">
            {currentModel.features.map(f => (
              <div 
                key={f.id} 
                onClick={() => handleFeatureToggle(f.id)}
                className={`feature-card-wizard glass ${selectedFeatures[f.id] ? 'selected' : ''}`}
              >
                <div className="feature-checkbox">
                  {selectedFeatures[f.id] && <Check size={14} className="check-icon" />}
                </div>
                <div className="feature-info">
                  <h4>{f.name}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Footer / CTA */}
        <div className="wizard-cta-footer">
          <div className="selection-summary">
            <span>Seçili Özellik: <strong>{Object.values(selectedFeatures).filter(Boolean).length} adet</strong></span>
            <span className="price-estimation">Ortalama Süre: <strong>{Object.values(selectedFeatures).filter(Boolean).length > 0 ? '30-45 Dk' : '0 Dk'}</strong></span>
          </div>
          <button 
            type="button"
            className="glow-btn"
            onClick={handleBookCoding}
          >
            <Sparkles size={16} />
            <span>Seçili Özellikleri Aktif Etmek İçin Randevu Al</span>
          </button>
        </div>
      </div>
    </section>
  );
}
