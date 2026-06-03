import React, { useState, useEffect } from 'react';
import { Calendar, User, FileText, ChevronRight, ChevronLeft, Check, Clock } from 'lucide-react';

export default function Appointment({ branchInfo, prefilledAppointment, addAppointment, appointments, workingHours, setActiveTab }) {
  const [step, setStep] = useState(1);
  const [vehicleBrand, setVehicleBrand] = useState('Fiat');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('2018');
  const [vehiclePlate, setVehiclePlate] = useState('');
  
  const [selectedService, setSelectedService] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  // Prefill if redirected from calculator
  useEffect(() => {
    if (prefilledAppointment) {
      if (prefilledAppointment.brand) setVehicleBrand(prefilledAppointment.brand);
      if (prefilledAppointment.year) setVehicleYear(prefilledAppointment.year);
      if (prefilledAppointment.service) {
        setSelectedService(prefilledAppointment.service);
      }
      if (prefilledAppointment.note) setIssueDescription(prefilledAppointment.note);
      setStep(2); // Jump to service step if prefilled
    }
  }, [prefilledAppointment]);

  const timeSlots = (workingHours || []).map(hour => {
    // Check if there is an approved appointment for this date and time
    const isBooked = (appointments || []).some(apt => 
      apt.date === appointmentDate && 
      apt.time === hour && 
      apt.status === 'approved'
    );
    return {
      time: hour,
      status: isBooked ? 'Dolu' : 'Boş'
    };
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = 'APT-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceNumber(ref);

    const newAppointment = {
      id: ref,
      plate: vehiclePlate || '34PLK99',
      brand: vehicleBrand,
      model: vehicleModel || 'Bilinmiyor',
      year: vehicleYear,
      service: selectedService || 'Genel Kontrol',
      date: appointmentDate || new Date().toISOString().split('T')[0],
      time: selectedTimeSlot || '10:00',
      ownerName: customerName || 'Misafir Müşteri',
      phone: customerPhone || '555-123-4567',
      notes: `${issueDescription} ${customerNotes ? '| ' + customerNotes : ''}`,
      status: 'pending' // pending, approved, completed
    };

    if (addAppointment) {
      addAppointment(newAppointment);
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="appointment-success-container glass-card pulse-glow">
        <div className="success-icon-badge">
          <Check size={40} />
        </div>
        <h3>Randevunuz Alındı!</h3>
        <p className="success-subtitle">Bilgileriniz atölyemize başarıyla iletilmiştir. Ustanız en kısa sürede onaylayacaktır.</p>
        
        <div className="ref-details glass">
          <div className="ref-row">
            <span>Takip Referans No:</span>
            <strong className="text-gradient">{referenceNumber}</strong>
          </div>
          <div className="ref-row">
            <span>Randevu Tarihi:</span>
            <strong>{appointmentDate} | {selectedTimeSlot}</strong>
          </div>
          <div className="ref-row">
            <span>Araç Bilgisi:</span>
            <strong>{vehicleBrand} {vehicleModel} ({vehiclePlate.toUpperCase()})</strong>
          </div>
        </div>

        <p className="tracker-tip">
          💡 Araç tesliminden sonra bu referans numarası veya plakanız ile <strong>Servis Takip</strong> panelinden tamir durumunu canlı izleyebilirsiniz.
        </p>

        <div className="success-actions">
          <button 
            className="glow-btn"
            onClick={() => {
              setIsSubmitted(false);
              setStep(1);
              setVehicleModel('');
              setVehiclePlate('');
              setSelectedService('');
              setIssueDescription('');
              setCustomerName('');
              setCustomerPhone('');
              setCustomerNotes('');
              setActiveTab('home');
            }}
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="appointment-section">
      <div className="section-header">
        <span className="badge">Zamandan Tasarruf</span>
        <h2>Online Randevu Sistemi</h2>
        <p className="section-desc">
          İstediğiniz gün ve saati seçerek servis randevunuzu kolayca oluşturun, sanayide bekleme sürenizi sıfıra indirin.
        </p>
      </div>

      <div className="appointment-layout">
        {/* Step Indicator Panel */}
        <div className="step-progress-panel glass">
          <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-num">{step > 1 ? '✓' : '1'}</span>
            <span className="step-lbl">Araç Bilgileri</span>
          </div>
          <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-num">{step > 2 ? '✓' : '2'}</span>
            <span className="step-lbl">Hizmet Seçimi</span>
          </div>
          <div className={`step-item ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
            <span className="step-num">{step > 3 ? '✓' : '3'}</span>
            <span className="step-lbl">Tarih & Saat</span>
          </div>
          <div className={`step-item ${step >= 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}>
            <span className="step-num">{step > 4 ? '✓' : '4'}</span>
            <span className="step-lbl">Müşteri Detay</span>
          </div>
        </div>

        {/* Wizard Form Panel */}
        <div className="appointment-form-panel glass-card">
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: VEHICLE INFO */}
            {step === 1 && (
              <div className="form-step-content">
                <h4>Araç Detaylarını Girin</h4>
                <p className="step-desc-text">Aracınızı tanımamız için temel detayları doldurun.</p>
                
                <div className="form-group">
                  <label>Araç Plakası *</label>
                  <input 
                    type="text" 
                    placeholder="Örn: 34ABC123" 
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Araç Markası *</label>
                    <select value={vehicleBrand} onChange={(e) => setVehicleBrand(e.target.value)}>
                      <option value="Fiat">Fiat</option>
                      <option value="Renault">Renault</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Ford">Ford</option>
                      <option value="Toyota">Toyota</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes">Mercedes</option>
                      <option value="Opel">Opel</option>
                      <option value="Peugeot">Peugeot</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Araç Modeli / Serisi *</label>
                    <input 
                      type="text" 
                      placeholder="Örn: Egea, Golf, Focus" 
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Araç Model Yılı</label>
                  <select value={vehicleYear} onChange={(e) => setVehicleYear(e.target.value)}>
                    {Array.from({ length: 20 }, (_, i) => 2026 - i).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* STEP 2: SERVICE DETAILS */}
            {step === 2 && (
              <div className="form-step-content">
                <h4>Hizmet ve Şikayet Seçimi</h4>
                <p className="step-desc-text">Hangi hizmeti almak istediğinizi ve araçtaki sorunları belirtin.</p>

                <div className="form-group">
                  <label>İstenecek Hizmet *</label>
                  <select 
                    value={selectedService} 
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                  >
                    <option value="">Hizmet Seçiniz...</option>
                    {branchInfo.services.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Araç Şikayeti / İstek Detayı</label>
                  <textarea 
                    rows="4" 
                    placeholder="Lütfen araçtaki sesleri, sarsıntıları veya eklemek istediğiniz diğer detayları buraya yazın..."
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            )}

            {/* STEP 3: DATE & TIME */}
            {step === 3 && (
              <div className="form-step-content">
                <h4>Tarih ve Saat Seçimi</h4>
                <p className="step-desc-text">Size en uygun çalışma saati dilimini belirleyin.</p>

                <div className="form-group">
                  <label>Randevu Tarihi *</label>
                  <input 
                    type="date" 
                    value={appointmentDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      setAppointmentDate(e.target.value);
                      setSelectedTimeSlot(''); // reset slot when date changes
                    }}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Boş Saat Dilimleri *</label>
                  <div className="time-slots-grid">
                    {timeSlots.map((ts, idx) => {
                      const isFull = ts.status === 'Dolu';
                      const isSelected = selectedTimeSlot === ts.time;
                      return (
                        <button
                          type="button"
                          key={idx}
                          disabled={isFull}
                          onClick={() => setSelectedTimeSlot(ts.time)}
                          className={`time-slot-card ${isFull ? 'full' : ''} ${isSelected ? 'selected' : ''}`}
                        >
                          <Clock size={14} />
                          <span>{ts.time}</span>
                          <small className="slot-status">{ts.status}</small>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CUSTOMER DETAILS */}
            {step === 4 && (
              <div className="form-step-content">
                <h4>İletişim ve Müşteri Bilgileri</h4>
                <p className="step-desc-text">İletişim kurabilmemiz için iletişim detaylarınızı girin.</p>

                <div className="form-group">
                  <label>Adınız Soyadınız *</label>
                  <input 
                    type="text" 
                    placeholder="Örn: Ahmet Yılmaz" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Telefon Numarası *</label>
                  <input 
                    type="tel" 
                    placeholder="Örn: 0555 123 45 67" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Varsa Eklemek İstediğiniz Not</label>
                  <textarea 
                    rows="3" 
                    placeholder="Ustanıza iletmek istediğiniz özel notlar..."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
            )}

            {/* Navigation buttons inside Form */}
            <div className="form-nav-buttons">
              {step > 1 ? (
                <button type="button" onClick={handleBack} className="glow-btn-secondary">
                  <ChevronLeft size={16} />
                  <span>Geri</span>
                </button>
              ) : (
                <div></div>
              )}

              {step < 4 ? (
                <button type="button" onClick={handleNext} className="glow-btn">
                  <span>İleri</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button type="submit" className="glow-btn pulse-glow">
                  <span>Kaydı Tamamla</span>
                  <Check size={16} />
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
