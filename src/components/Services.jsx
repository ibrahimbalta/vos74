import React from 'react';
import { Calendar, ChevronRight, Activity, Cpu, Hammer, ShieldAlert, Check } from 'lucide-react';

export default function Services({ branchInfo, setActiveTab }) {
  
  // Icon mapper based on service titles or index
  const getIcon = (idx) => {
    switch (idx) {
      case 0: return Cpu;
      case 1: return Activity;
      case 2: return Hammer;
      default: return ShieldAlert;
    }
  };

  return (
    <section className="services-section">
      <div className="section-header">
        <span className="badge">Garantili Hizmetler</span>
        <h2>Hizmet Yelpazemiz</h2>
        <p className="section-desc">
          En son teknoloji arıza tespit cihazlarımız ve tecrübeli usta ekibimiz ile arıza veya bakım işlemlerinizi garantili olarak gerçekleştiriyoruz.
        </p>
      </div>

      <div className="services-grid">
        {branchInfo.services.map((service, idx) => {
          const ServiceIcon = getIcon(idx);
          return (
            <div className="glass-card service-card" key={service.id}>
              <div className="service-icon-box">
                <ServiceIcon size={24} className="service-icon" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              
              <div className="service-features-list">
                <span>✓ Hızlı Teşhis</span>
                <span>✓ Garantili İşçilik</span>
              </div>

              <div className="service-price-tag">
                <span className="price-label">Ortalama Fiyat:</span>
                <span className="price-value">{service.price}</span>
              </div>

              <div className="service-actions-single">
                <button 
                  className="glow-btn full-width"
                  onClick={() => setActiveTab('appointment')}
                >
                  <Calendar size={14} />
                  <span>Randevu Oluştur</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="service-guarantee glass">
        <div className="guarantee-icon">🛡️</div>
        <div className="guarantee-text">
          <h4>1 Yıl Parça ve İşçilik Garantisi</h4>
          <p>Servisimizde yapılan tüm tamir işlemlerinde kullanılan yedek parçalar ve işçiliğimiz 1 yıl / 20.000 km garanti kapsamındadır.</p>
        </div>
      </div>
    </section>
  );
}
