import React from 'react';
import { Wrench, CheckCircle, Flame, Zap, Power } from 'lucide-react';

export default function WorkshopMonitor({ activeRepairs }) {
  
  // Map active repairs to workshop bays dynamically
  const getBayStatus = (bayId) => {
    return activeRepairs.find(r => r.bayId === bayId) || null;
  };

  const bays = [
    { id: 'lift1', name: 'Lift 1 (Mekanik)', type: 'lift', icon: Wrench },
    { id: 'lift2', name: 'Lift 2 (Motor)', type: 'lift', icon: Wrench },
    { id: 'lift3', name: 'Lift 3 (Hızlı Bakım)', type: 'lift', icon: Wrench },
    { id: 'electric', name: 'İstasyon 4 (Oto Elektrik)', type: 'electric', icon: Zap },
    { id: 'paint', name: 'Boya Fırını & Estetik', type: 'paint', icon: Flame }
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'kabul': return 'status-kabul';
      case 'ariza': return 'status-ariza';
      case 'onarim': return 'status-onarim';
      case 'test': return 'status-test';
      case 'hazir': return 'status-hazir';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'kabul': return 'Araç Kabul Girişi';
      case 'ariza': return 'Detaylı Arıza Tespiti';
      case 'onarim': return 'Aktif Onarım / Tamir';
      case 'test': return 'Test Sürüşü Aşaması';
      case 'hazir': return 'Teslime Hazır';
      default: return 'Bilinmiyor';
    }
  };

  return (
    <section className="workshop-monitor-section">
      <div className="section-header">
        <span className="badge">Canlı Atölye Takibi</span>
        <h2>Lift ve Servis Alanı Monitörü</h2>
        <p className="section-desc">
          Atölyemizdeki liftlerin doluluk oranını ve hangi alanda hangi aracın tamir gördüğünü canlı olarak buradan izleyin.
        </p>
      </div>

      <div className="bays-grid">
        {bays.map((bay) => {
          const car = getBayStatus(bay.id);
          const BayIcon = bay.icon;
          const isOccupied = !!car;

          return (
            <div className={`glass-card bay-card ${isOccupied ? 'occupied' : 'empty'}`} key={bay.id}>
              {/* Bay Header */}
              <div className="bay-header">
                <div className="bay-title-box">
                  <BayIcon size={18} className="bay-icon" />
                  <h4>{bay.name}</h4>
                </div>
                <span className={`bay-occupancy-badge ${isOccupied ? 'full' : 'vacant'}`}>
                  {isOccupied ? 'DOLU' : 'MÜSAİT'}
                </span>
              </div>

              {/* Bay Body */}
              {isOccupied ? (
                <div className="bay-body occupied-body">
                  <div className="bay-car-plate">
                    <span className="plate-badge-large">{car.plate}</span>
                  </div>
                  
                  <div className="bay-car-info">
                    <h5>{car.model}</h5>
                    <span className="bay-customer-lbl">Müşteri: {car.owner}</span>
                    {car.assignedUsta && (
                      <span className="bay-usta-lbl" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--primary)', marginTop: '4px', fontWeight: 'bold' }}>
                        🛠️ Usta: {car.assignedUsta}
                      </span>
                    )}
                  </div>

                  <div className="bay-status-row">
                    <span className="status-dot-blink"></span>
                    <span className={`status-text-badge ${getStatusBadgeClass(car.status)}`}>
                      {getStatusText(car.status)}
                    </span>
                  </div>

                  {/* Lift visualization graphic */}
                  <div className="lift-visual-meter">
                    <div className="lift-pillar left"></div>
                    <div className="lift-platform" style={{ 
                      bottom: car.status === 'onarim' ? '50%' : 
                              car.status === 'ariza' ? '35%' : 
                              car.status === 'hazir' ? '10%' : '20%' 
                    }}>
                      <div className="visual-car-shape">🚗</div>
                    </div>
                    <div className="lift-pillar right"></div>
                  </div>

                  <div className="bay-jobs-snippet">
                    <small>Son İşlem:</small>
                    <p>
                      {car.jobsDone[car.jobsDone.length - 1]
                        ? (typeof car.jobsDone[car.jobsDone.length - 1] === 'object'
                          ? car.jobsDone[car.jobsDone.length - 1].name
                          : car.jobsDone[car.jobsDone.length - 1])
                        : 'Kabul işlemleri tamamlandı.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bay-body empty-body">
                  <div className="power-icon-box">
                    <Power size={32} className="power-icon" />
                  </div>
                  <h5>Lift Boş</h5>
                  <p>Yeni araç kabulü veya bakım randevusu için kullanıma hazırdır.</p>
                  <div className="lift-visual-meter empty-meter">
                    <div className="lift-pillar left"></div>
                    <div className="lift-platform empty-pos"></div>
                    <div className="lift-pillar right"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
