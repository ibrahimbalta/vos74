import React, { useState } from 'react';
import { Search, ChevronRight, FileText, CheckCircle, AlertTriangle, Play, HelpCircle, Star, MessageCircle, Camera, Image, X } from 'lucide-react';

export default function Tracker({ activeRepairs, updateRepairStatus, addExtraCostApproval, setTestimonials }) {
  const [plateQuery, setPlateQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [trackingCar, setTrackingCar] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [selectedPhotoModal, setSelectedPhotoModal] = useState(null);

  const handleSubmitReview = () => {
    if (!commentText.trim() || !trackingCar) return;

    const firstJob = trackingCar.jobsDone && trackingCar.jobsDone.length > 0
      ? (typeof trackingCar.jobsDone[0] === 'object' ? trackingCar.jobsDone[0].name : trackingCar.jobsDone[0])
      : 'Genel Bakım';

    const newTestimonial = {
      name: trackingCar.owner,
      vehicle: trackingCar.model,
      rating: rating,
      text: commentText,
      date: 'Az önce',
      service: firstJob,
      avatar: trackingCar.owner.split(' ').map(n => n[0]).join('').toUpperCase()
    };

    if (setTestimonials) {
      setTestimonials(prev => [newTestimonial, ...prev]);
    }
    setFeedbackSubmitted(true);
  };

  const cleanPlate = (p) => p.toUpperCase().replace(/\s+/g, '');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!plateQuery) return;
    
    const cleanQuery = cleanPlate(plateQuery);
    const found = activeRepairs.find(c => cleanPlate(c.plate) === cleanQuery);
    
    setTrackingCar(found || null);
    setSearched(true);
    setSuccessMsg('');
  };

  const handleApproval = (id, extraCost, item) => {
    if (addExtraCostApproval) {
      addExtraCostApproval(id, extraCost, item);
      setSuccessMsg(`Onay Verildi: ${item} (+${extraCost} TL) başarıyla eklendi!`);
      // Update local view state
      setTimeout(() => {
        const updated = activeRepairs.find(c => c.id === id);
        setTrackingCar({ ...updated });
      }, 100);
    }
  };

  const steps = [
    { label: 'Kabul Edildi', val: 'kabul' },
    { label: 'Arıza Tespiti', val: 'ariza' },
    { label: 'Onarımda', val: 'onarim' },
    { label: 'Test Sürüşü', val: 'test' },
    { label: 'Teslime Hazır', val: 'hazir' }
  ];

  const getStepIndex = (status) => {
    return steps.findIndex(s => s.val === status);
  };

  return (
    <section className="tracker-section">
      <div className="section-header">
        <span className="badge">Müşteri Takip Sistemi</span>
        <h2>Canlı Servis Takip</h2>
        <p className="section-desc">
          Aracınızın tamir sürecini plakanızla canlı olarak adım adım izleyin, sürpriz maliyetlerle karşılaşmayın.
        </p>
      </div>

      <div className="tracker-box-layout">
        {/* Search Panel */}
        <div className="tracker-search-panel glass">
          <h3>Plaka Sorgulama</h3>
          <p>Aracınızın durumunu görmek için plakanızı boşluk bırakmadan girin.</p>
          
          <form onSubmit={handleSearch} className="tracker-search-form">
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Örn: 34ABC123" 
                value={plateQuery}
                onChange={(e) => setPlateQuery(e.target.value)}
              />
              <button type="submit" className="glow-btn">
                <Search size={18} />
                <span>Sorgula</span>
              </button>
            </div>
          </form>


        </div>

        {/* Results Panel */}
        {searched && (
          <div className="tracker-result-wrapper">
            {trackingCar ? (
              <div className="tracker-result-card glass-card">
                <div className="car-detail-header">
                  <div>
                    <span className="plate-badge-large">{trackingCar.plate}</span>
                    <h4>{trackingCar.model}</h4>
                    <span className="owner-sub">Araç Sahibi: {trackingCar.owner}</span>
                  </div>
                  <div className="delivery-time-box">
                    <span className="time-lbl">Tahmini Teslim</span>
                    <span className="time-val">{trackingCar.deliveryTime}</span>
                  </div>
                </div>

                {/* Progress Tracker bar */}
                <div className="progress-timeline-wrapper">
                  <div className="timeline-bar">
                    <div 
                      className="timeline-progress-fill" 
                      style={{ width: `${(getStepIndex(trackingCar.status) / (steps.length - 1)) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="timeline-steps">
                    {steps.map((st, sIdx) => {
                      const isActive = st.val === trackingCar.status;
                      const isCompleted = getStepIndex(trackingCar.status) >= sIdx;
                      return (
                        <div 
                          key={sIdx} 
                          className={`timeline-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                        >
                          <div className="step-circle">
                            {isCompleted && !isActive ? '✓' : sIdx + 1}
                          </div>
                          <span className="step-label">{st.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Details list */}
                <div style={{ maxWidth: '600px', margin: '32px auto 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="detail-box glass" style={{ padding: '24px', borderRadius: '16px' }}>
                    <h5 style={{ fontSize: '1.1rem', margin: '0 0 16px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={18} style={{ color: 'var(--primary)' }} />
                      <span>Aracınıza Yapılan İşlemler</span>
                    </h5>
                    <ul className="details-checklist" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {trackingCar.jobsDone && trackingCar.jobsDone.length > 0 ? (
                        trackingCar.jobsDone.map((j, jIdx) => {
                          const jobName = typeof j === 'object' ? j.name : j;
                          return (
                            <li key={jIdx} className="checked-job" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                              <CheckCircle size={16} className="check-icon" style={{ color: 'var(--primary)', marginTop: '3px', flexShrink: 0 }} />
                              <span>{jobName}</span>
                            </li>
                          );
                        })
                      ) : (
                        <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>Kabul işlemleri tamamlandı, arıza tespiti bekleniyor.</li>
                      )}
                    </ul>
                    {trackingCar.notes && (
                      <div className="mechanic-note" style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                        <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '4px' }}>Usta Notu:</strong>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{trackingCar.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Sorumlu Usta / Teknisyen Bilgisi */}
                  {trackingCar.assignedUsta && (
                    <div className="detail-box glass" style={{ padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>👨‍🔧</div>
                      <div>
                        <h6 style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Servis Sorumlu Ustası</h6>
                        <h5 style={{ margin: '2px 0 0 0', fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{trackingCar.assignedUsta}</h5>
                      </div>
                    </div>
                  )}

                  {/* Aracın Servis Görselleri Galeri Bölümü */}
                  <div className="detail-box glass" style={{ padding: '24px', borderRadius: '16px' }}>
                    <h5 style={{ fontSize: '1.1rem', margin: '0 0 16px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Camera size={18} style={{ color: 'var(--primary)' }} />
                      <span>Aracınızın Servis Fotoğrafları</span>
                    </h5>

                    {trackingCar.photos && trackingCar.photos.length > 0 ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
                        {trackingCar.photos.map((photo, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setSelectedPhotoModal(photo)}
                            style={{ 
                              borderRadius: '12px', 
                              overflow: 'hidden', 
                              border: '1px solid var(--border-color)', 
                              cursor: 'pointer',
                              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                              background: 'rgba(0,0,0,0.4)',
                              position: 'relative'
                            }}
                            className="photo-card-hover"
                          >
                            <div style={{ width: '100%', height: '100px', overflow: 'hidden' }}>
                              <img 
                                src={photo.url} 
                                alt={photo.title || 'Servis Fotoğrafı'} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </div>
                            <div style={{ padding: '8px' }}>
                              <span style={{ fontSize: '0.68rem', color: 'var(--primary)', fontWeight: 'bold', background: 'rgba(6,182,212,0.12)', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginBottom: '4px' }}>
                                {photo.category || 'Servis'}
                              </span>
                              <h6 style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                {photo.title || 'Fotoğraf #' + (idx + 1)}
                              </h6>
                              {photo.date && (
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                                  {photo.date}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '20px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                        <Camera size={32} style={{ color: 'var(--text-muted)', marginBottom: '8px', opacity: 0.5 }} />
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          Henüz bu araç için servis görseli yüklenmedi.
                        </p>
                        <small style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                          Ustalarımız onarım ve kontrol aşamalarında çektikleri fotoğrafları buraya yükleyecektir.
                        </small>
                      </div>
                    )}
                  </div>

                  {/* CUSTOMER REVIEW FORM - only when car is ready */}
                  {trackingCar.status === 'hazir' && (
                    <div className="customer-review-section no-print" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(6, 182, 212, 0.01))', border: '1px dashed var(--primary)', borderRadius: '16px' }}>
                      {!feedbackSubmitted ? (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <MessageCircle size={20} className="text-gradient" />
                            <h5 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 'bold' }}>Hizmetimizi Değerlendirin</h5>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                            Aracınız teslime hazır! Deneyiminizi puanlayın ve yorumunuzla diğer müşterilere yol gösterin.
                          </p>

                          {/* Star Rating */}
                          <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', display: 'block', color: 'var(--text-secondary)' }}>Puanınız</label>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              {[1, 2, 3, 4, 5].map((starVal) => (
                                <button
                                  key={starVal}
                                  type="button"
                                  onClick={() => setRating(starVal)}
                                  onMouseEnter={() => setHoverRating(starVal)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    transition: 'transform 0.2s ease',
                                    transform: (hoverRating >= starVal || (!hoverRating && rating >= starVal)) ? 'scale(1.2)' : 'scale(1)'
                                  }}
                                >
                                  <Star
                                    size={28}
                                    fill={(hoverRating >= starVal || (!hoverRating && rating >= starVal)) ? '#f59e0b' : 'transparent'}
                                    color={(hoverRating >= starVal || (!hoverRating && rating >= starVal)) ? '#f59e0b' : 'var(--text-secondary)'}
                                  />
                                </button>
                              ))}
                              <span style={{ marginLeft: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)', alignSelf: 'center', fontWeight: 'bold' }}>
                                {rating}/5
                              </span>
                            </div>
                          </div>

                          {/* Comment Textarea */}
                          <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', display: 'block', color: 'var(--text-secondary)' }}>Yorumunuz</label>
                            <textarea
                              rows="3"
                              placeholder="Aldığınız hizmeti değerlendirin... (Örn: Ustalar çok ilgiliydi, aracım çok temiz teslim edildi.)"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.9rem', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
                            />
                          </div>

                          <button
                            className="glow-btn"
                            onClick={handleSubmitReview}
                            disabled={!commentText.trim()}
                            style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem', opacity: commentText.trim() ? 1 : 0.5, fontWeight: 'bold' }}
                          >
                            <Star size={16} style={{ marginRight: '6px' }} />
                            <span>Yorumu Gönder</span>
                          </button>
                        </>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                            <CheckCircle size={32} style={{ color: '#22c55e' }} />
                          </div>
                          <h5 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 'bold' }}>Teşekkür Ederiz!</h5>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                            Değerlendirmeniz başarıyla kaydedildi. Yorumunuz ana sayfamızda yayınlanacaktır. Bizleri tercih ettiğiniz için teşekkürler! 🙏
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="no-result-card glass">
                <AlertTriangle size={36} className="warn-icon" />
                <h4>Araç Bulunamadı</h4>
                <p>Girdiğiniz plakaya ait aktif bir servis kaydı bulunmamaktadır. Plakayı kontrol edip tekrar deneyin veya demo plakaları tıklayın.</p>
              </div>
            )}
          </div>
        )}

        {/* Lightbox Modal for Photo View */}
      {selectedPhotoModal && (
        <div 
          onClick={() => setSelectedPhotoModal(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{
              maxWidth: '700px',
              width: '100%',
              background: '#111827',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setSelectedPhotoModal(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              <X size={18} />
            </button>

            <div style={{ width: '100%', maxHeight: '450px', overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={selectedPhotoModal.url} 
                alt={selectedPhotoModal.title} 
                style={{ maxWidth: '100%', maxHeight: '450px', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '16px 20px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold', background: 'rgba(6,182,212,0.15)', padding: '3px 8px', borderRadius: '4px' }}>
                {selectedPhotoModal.category || 'Servis Görseli'}
              </span>
              <h4 style={{ margin: '8px 0 4px', fontSize: '1.1rem', color: '#fff' }}>
                {selectedPhotoModal.title}
              </h4>
              {selectedPhotoModal.date && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Tarih / Saat: {selectedPhotoModal.date}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
