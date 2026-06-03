import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

const warningLightsData = [
  {
    id: 'engine',
    name: 'Motor Arıza Işığı (Check Engine)',
    code: 'MIL / ECU',
    color: 'yellow',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9h3v1h1V8h2V6h4v2h2v2h1V9h3v5h-3v1h-1v2h-2v2H8v-2H6v-2H5v-1H2V9z" />
        <circle cx="11" cy="12" r="1.5" fill="currentColor" />
        <path d="M15 12h2" />
      </svg>
    ),
    officialName: 'Motor Kontrol Ünitesi (MIL) Uyarı Lambası',
    esnafTranslation: 'Görsel olarak "musluk" sembolüne benzer. Araba beyni bir arıza kaydetti demektir. Sakin ol ama ihmal etme. Ateşleme bujisi, enjektörler, MAF sensörü veya katalizör gitmiş olabilir. En kısa sürede motorcuya gitmen lazım.',
    severity: 'Orta - Yüksek',
    master: 'Nuri Usta (Motorcu)',
    solution: 'Bilgisayarlı Teşhis & Sensör Kontrolü',
    action: 'Aracı aşırı zorlamadan rölantide servise sürün.'
  },
  {
    id: 'oil',
    name: 'Yağ Basınç Işığı',
    code: 'OIL PRESSURE',
    color: 'red',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14c0-2 2-3.5 4.5-3.5h2.5L12 7h3l-1.5 3.5h4c2 0 3 1 3 3v1c0 1.5-1.5 2.5-3 2.5H7.5C5 17 3 15.5 3 14z" />
        <path d="M21 12.5c1 0 1.5.5 1.5 1.5s-.5 1.5-1.5 1.5" />
        <path d="M13 7V3h3" />
        <path d="M1.5 13h1" />
      </svg>
    ),
    officialName: 'Düşük Motor Yağı Basıncı Göstergesi',
    esnafTranslation: 'Kırmızı "çaydanlık" ışığı yandıysa şakası yok! Motor yağsız kalmış veya yağ pompası bozulmuş demektir. Hemen güvenli bir yerde dur, kontağı kapat. Çubuğu çekip yağı kontrol et. Bu ışıkla devam edersen motor kilitlenir (yatak sarar), komple motor yaptırmak zorunda kalırsın.',
    severity: 'Kritik (Hemen Durun!)',
    master: 'Nuri Usta (Motorcu)',
    solution: 'Yağ Seviye Kontrolü, Yağ Pompası veya Müşür Değişimi',
    action: 'Kontağı kapatın ve aracı servise çekici ile getirin.'
  },
  {
    id: 'battery',
    name: 'Akü Şarj Işığı',
    code: 'BATTERY / ALT',
    color: 'red',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M7 3v3M17 3v3M7 11h4M15 11h4M17 9v4" />
      </svg>
    ),
    officialName: 'Alternatör (Şarj Sistemi) Arıza Göstergesi',
    esnafTranslation: 'Sanıldığı gibi "akün bitti" demek değildir; alternatörün (şarj dinamon) aküyü beslemiyor demektir. Farı, radyoyu, klimayı kapatıp hemen elektrikçiye sür. Stop edersen araba bir daha marş almayabilir.',
    severity: 'Yüksek (Elektrik Kaybı)',
    master: 'Selim Usta (Elektrikçi)',
    solution: 'Alternatör Revizyonu veya Konjektör Değişimi',
    action: 'Gereksiz tüm elektrik donanımını kapatıp en yakın elektrikçiye sürün.'
  },
  {
    id: 'brake',
    name: 'Fren Sistemi Işığı',
    code: 'BRAKE SYSTEM',
    color: 'red',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="7" />
        <path d="M12 8v5M12 16h.01" />
        <path d="M4.22 4.22a11 11 0 0 0 0 15.56M19.78 4.22a11 11 0 0 1 0 15.56" />
      </svg>
    ),
    officialName: 'Fren Hidroliği Seviyesi / El Freni Uyarısı',
    esnafTranslation: 'Kırmızı ünlemli yuvarlak. El freni inikken bu ışık yanıyorsa, fren hidroliğin kritik seviyenin altına inmiş veya balataların tamamen bitmiştir. Basınca fren pedalın boşalabilir. Tehlikeli bir durumdur.',
    severity: 'Kritik (Güvenlik Riski)',
    master: 'Nuri Usta (Motorcu/Mekanik)',
    solution: 'Balata Değişimi, Hidrolik Sızıntı Kontrolü',
    action: 'Düşük hızda dikkatle kontrol edin, gerekirse çekici çağırın.'
  },
  {
    id: 'coolant',
    name: 'Hararet Işığı',
    code: 'TEMP / COOLANT',
    color: 'red',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v8.17a5 5 0 1 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M12 9h2M12 6h2M12 12h2M8 17h8" />
      </svg>
    ),
    officialName: 'Soğutma Suyu Aşırı Sıcaklık Uyarısı',
    esnafTranslation: 'Kırmızı termometre suya girmiş gibi görünür. Motor hararet yaptı demektir! Silindir kapak contasını yakmak üzeresin. Hemen arabayı durdur, rölantide çalıştır (klima kapalı, kalorifer sıcakta olsun ki motor ısısı dağılsın). Su deposunun kapağını sakın hemen açma, yüzüne fışkırır.',
    severity: 'Kritik (Motor Hasarı)',
    master: 'Nuri Usta (Motorcu)',
    solution: 'Fan, Devirdaim Pompası, Termostat veya Radyatör Tamiri',
    action: 'Aracı gölgeye çekip motorun soğumasını bekleyin, su seviyesini kontrol edin.'
  },
  {
    id: 'tpms',
    name: 'Lastik Basınç Işığı',
    code: 'TPMS',
    color: 'yellow',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 16a8.5 8.5 0 0 1-1-4.5 8 8 0 0 1 16 0 8.5 8.5 0 0 1-1 4.5" />
        <path d="M7.5 18.5a6 6 0 0 0 9 0" />
        <path d="M12 8v4M12 15h.01" />
        <path d="M3 11h1.5M19.5 11H21" />
      </svg>
    ),
    officialName: 'Lastik Basınç İzleme Sistemi (TPMS) Göstergesi',
    esnafTranslation: 'Altı tırtıklı, içinde ünlem olan sarı kase sembolü. Dört lastikten birinin basıncı düşmüş demektir. Çivi batmış veya sibop kaçırıyor olabilir. Benzinliğe çekip havaları eşitle, sönmezse lastikçiye uğraman gerekir.',
    severity: 'Düşük - Orta',
    master: 'Genel Oto Servis (Genel Hizmet)',
    solution: 'Lastik Hava Basınç Ayarı, Yama Yapılması',
    action: 'Lastik basınçlarını kontrol ettirin ve gerekirse kalibre edin.'
  },
  {
    id: 'glowplug',
    name: 'Kızdırma Bujisi Işığı',
    code: 'GLOW PLUG',
    color: 'yellow',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14c1.5-3 3.5-3 5 0 1.5 3 3.5 3 5 0 1.5-3 3.5-3 5 0" />
        <path d="M4 11c1.5-3 3.5-3 5 0 1.5 3 3.5 3 5 0 1.5-3 3.5-3 5 0" />
      </svg>
    ),
    officialName: 'Dizel Isıtma Bujisi Göstergesi',
    esnafTranslation: 'Dizel arabalardaki sarı helezon/yay sembolü. Motor soğukken marş basmadan sönmesini beklediğin ışık. Seyir halindeyken yanıp sönmeye başlarsa kızdırma bujilerinden biri bozulmuştur ya da enjektör/yakıt sistemi arıza kaydetmiştir.',
    severity: 'Orta',
    master: 'Selim Usta (Elektrikçi) & Nuri Usta',
    solution: 'Kızdırma Bujisi Değişimi, Yakıt Hattı Revizyonu',
    action: 'Motor ısındıktan sonra elektrikçiye gösterilmesi gerekir.'
  },
  {
    id: 'brake-wear',
    name: 'Balata Aşınma Işığı',
    code: 'BRAKE WEAR',
    color: 'yellow',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="6" />
        <path d="M4 7a9 9 0 0 0 0 10M20 7a9 9 0 0 1 0 10" strokeDasharray="3 2" />
      </svg>
    ),
    officialName: 'Fren Balatası Aşınma Sınırı Uyarı Lambası',
    esnafTranslation: 'Etrafında kesik çizgiler olan sarı yuvarlak. Ön fren balataların aşınmış ve bitmeye yakın demektir. Demir demire sürtüp diskleri çizmeden önce en fazla 1000-2000 km içinde servise uğrayıp fren balatalarını yeniletmelisin.',
    severity: 'Orta (Zamanlı Bakım)',
    master: 'Nuri Usta (Mekanik)',
    solution: 'Fren Balatası Değişimi & Disk Taşlama/Değişim',
    action: 'Frenlerinizden ses gelmesini beklemeden balata değişimi randevusu alın.'
  },
  {
    id: 'dpf',
    name: 'Partikül Filtresi Işığı',
    code: 'DPF FILTER',
    color: 'yellow',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="8" width="14" height="8" rx="2" />
        <circle cx="8" cy="11" r="1" fill="currentColor" />
        <circle cx="11" cy="13" r="1" fill="currentColor" />
        <circle cx="14" cy="10" r="1" fill="currentColor" />
        <circle cx="16" cy="13" r="1" fill="currentColor" />
        <path d="M2 12h3M19 12h3" />
      </svg>
    ),
    officialName: 'Dizel Partikül Filtresi (DPF) Tıkanıklık Göstergesi',
    esnafTranslation: 'Egzoz kutusu içinde noktalar olan sarı simge. Özellikle şehir içinde dur-kalk sürmekten egzoz filtresi kurumla tıkanmış. Çözümü basit: Otobana çık, aracı 3. veya 4. viteste, 3000 devir civarında 15-20 dakika yüksek devirde sür. Kendi kendine temizlenecektir (rejenerasyon). Sönmezse usta temizliği gerekir.',
    severity: 'Orta',
    master: 'Nuri Usta (Motorcu)',
    solution: 'DPF Rejenerasyonu veya İlaçlı Makine Temizliği',
    action: 'Yüksek devirli otoban sürüşü yapın, sönmezse servise başvurun.'
  }
];

export default function WarningLights({ setActiveTab }) {
  const [selectedLight, setSelectedLight] = useState(warningLightsData[0]);

  return (
    <section className="warning-lights-section">
      <div className="section-header">
        <span className="badge">Esnaf Dilinden Tercüme</span>
        <h2>Gösterge Paneli Arıza Işıkları Rehberi</h2>
        <p className="section-desc">
          Panelinizde yanan ikaz ışığını seçin; ne anlama geldiğini, ne kadar acil olduğunu ve sanayi ustalarının diliyle ne yapmanız gerektiğini anında öğrenin.
        </p>
      </div>

      <div className="warning-lights-layout glass-card">
        {/* Cockpit Simulation Visual Frame */}
        <div className="cockpit-viewport glass">
          <div className="cockpit-dashboard-overlay">
            {/* Supercar digital cockpit style side arcs */}
            <div className="cockpit-gauge speed-gauge">
              <div className="gauge-arc"></div>
              <div className="gauge-value">120</div>
              <div className="gauge-label">KM/H</div>
            </div>

            <div className="cockpit-gauge rpm-gauge">
              <div className="gauge-arc"></div>
              <div className="gauge-value">2.4</div>
              <div className="gauge-label">RPM x1000</div>
            </div>
          </div>

          <div className="cockpit-screen">
            <h4 className="cockpit-screen-title">INTERAKTİF GÖSTERGE PANELİ</h4>
            
            {/* Grid of warning icons */}
            <div className="lights-grid">
              {warningLightsData.map((light) => {
                const isActive = selectedLight.id === light.id;
                return (
                  <button
                    key={light.id}
                    onClick={() => setSelectedLight(light)}
                    className={`light-btn ${isActive ? 'active' : ''} color-${light.color}`}
                    style={{
                      '--glow-color': light.glowColor,
                      '--light-color': light.color === 'red' ? '#ef4444' : '#f59e0b'
                    }}
                    title={light.name}
                  >
                    <div className="light-icon-wrapper">
                      {light.icon}
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="cockpit-screen-hint">
              <HelpCircle size={12} />
              <span>İncelemek istediğiniz ikaz lambasının üzerine tıklayın.</span>
            </div>
          </div>
        </div>

        {/* Informative Translation Details */}
        <div className="warning-details-panel">
          <div className="details-header">
            <div 
              className="details-icon-glow"
              style={{
                backgroundColor: selectedLight.color === 'red' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                border: `1px solid ${selectedLight.color === 'red' ? '#ef4444' : '#f59e0b'}`,
                color: selectedLight.color === 'red' ? '#ef4444' : '#f59e0b'
              }}
            >
              <div className="w-12 h-12 flex items-center justify-center p-2">
                {selectedLight.icon}
              </div>
            </div>
            <div className="details-header-text">
              <span className="details-official-badge">{selectedLight.code}</span>
              <h3>{selectedLight.name}</h3>
              <p className="official-name-text"><strong>Kitapçık Adı:</strong> {selectedLight.officialName}</p>
            </div>
          </div>

          <div className="translation-bubble">
            <div className="bubble-arrow"></div>
            <span className="bubble-label">🗣️ Usta Diliyle (Sanayi Tercümesi):</span>
            <p className="translation-text">{selectedLight.esnafTranslation}</p>
          </div>

          <div className="details-meta-grid">
            <div className="meta-item">
              <span className="m-lbl">Aciliyet Derecesi</span>
              <span className={`m-val ${selectedLight.color === 'red' ? 'text-danger' : 'text-warning'}`}>
                {selectedLight.color === 'red' ? '🚨 ' : '⚠️ '} {selectedLight.severity}
              </span>
            </div>
            <div className="meta-item">
              <span className="m-lbl">Hangi Usta Bakar?</span>
              <span className="m-val text-primary-theme">{selectedLight.master}</span>
            </div>
          </div>

          <div className="resolution-card">
            <ShieldCheck size={18} className="res-icon" />
            <div className="res-text">
              <strong>Önerilen Eylem:</strong> {selectedLight.action}
              <br />
              <strong>Atölye Çözümü:</strong> {selectedLight.solution}
            </div>
          </div>

          <button 
            className="glow-btn details-booking-btn"
            onClick={() => setActiveTab('appointment')}
          >
            Bu Arıza İçin Randevu Al
          </button>
        </div>
      </div>
    </section>
  );
}
