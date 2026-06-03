import React, { useState } from 'react';
import { Search, ChevronRight, FileText, CheckCircle, AlertTriangle, Play, HelpCircle, Star, MessageCircle } from 'lucide-react';

export default function Tracker({ activeRepairs, updateRepairStatus, addExtraCostApproval, setTestimonials }) {
  const [plateQuery, setPlateQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [trackingCar, setTrackingCar] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

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

                {/* Details grid */}
                <div className="car-details-grid">
                  <div className="detail-box glass">
                    <h5>Yapılan İşlemler</h5>
                    <ul className="details-checklist">
                      {trackingCar.jobsDone.map((j, jIdx) => {
                        const jobName = typeof j === 'object' ? j.name : j;
                        const jobCost = typeof j === 'object' ? j.cost : 0;
                        return (
                          <li key={jIdx} className="checked-job" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <CheckCircle size={14} className="check-icon" />
                              <span>{jobName}</span>
                            </div>
                            <span style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '0.85rem' }}>{jobCost} TL</span>
                          </li>
                        );
                      })}
                    </ul>
                    {trackingCar.notes && (
                      <div className="mechanic-note">
                        <strong>Usta Notu:</strong>
                        <p>{trackingCar.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="detail-box glass invoice-details tracker-print-area">
                    <h5>Maliyet & Onay Listesi</h5>
                    {trackingCar.jobsDone && trackingCar.jobsDone.map((j, jIdx) => {
                      const jobName = typeof j === 'object' ? j.name : j;
                      const jobCost = typeof j === 'object' ? j.cost : 0;
                      return (
                        <div key={`job-${jIdx}`} className="invoice-row">
                          <span>{jobName}</span>
                          <strong>{jobCost} TL</strong>
                        </div>
                      );
                    })}
                    
                    {trackingCar.extraItems && trackingCar.extraItems.map((ex, exIdx) => (
                      <div key={exIdx} className="invoice-row extra">
                        <span>➕ {ex.name}</span>
                        <strong>{ex.cost} TL</strong>
                      </div>
                    ))}

                    <div className="invoice-total">
                      <span>Toplam Tutar</span>
                      <span className="total-price text-gradient">
                        {(trackingCar.jobsDone ? trackingCar.jobsDone.reduce((acc, current) => acc + (current.cost || 0), 0) : 0) +
                         (trackingCar.extraItems ? trackingCar.extraItems.reduce((acc, current) => acc + current.cost, 0) : 0)} TL
                      </span>
                    </div>

                    <button 
                      onClick={() => window.print()}
                      className="glow-btn-secondary full-width no-print"
                      style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px', padding: '10px 16px', fontSize: '0.85rem' }}
                    >
                      <FileText size={16} />
                      <span>Faturayı Yazdır / PDF Kaydet</span>
                    </button>

                    {/* Pending Approval simulation */}
                    {trackingCar.pendingApproval && (
                      <div className="pending-approval-card pulse-glow no-print" style={{ marginTop: '16px' }}>
                        <div className="approval-desc">
                          <AlertTriangle size={18} className="warn-icon" />
                          <div>
                            <strong>Ekstra Onarım Talebi</strong>
                            <p>{trackingCar.pendingApproval.item} aşınmış/hasarlı, değişmesi gerekiyor. (+{trackingCar.pendingApproval.cost} TL)</p>
                          </div>
                        </div>
                        
                        {successMsg ? (
                          <div className="success-banner">{successMsg}</div>
                        ) : (
                          <div className="approval-actions">
                            <button 
                              className="approve-btn"
                              onClick={() => handleApproval(trackingCar.id, trackingCar.pendingApproval.cost, trackingCar.pendingApproval.item)}
                            >
                              Değişimi Onayla
                            </button>
                            <span className="approval-hint">Siz onay vermeden işlem yapılmaz.</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* CUSTOMER REVIEW FORM - only when car is ready */}
                    {trackingCar.status === 'hazir' && (
                      <div className="customer-review-section no-print" style={{ marginTop: '20px', padding: '24px', background: 'linear-gradient(135deg, rgba(var(--primary-rgb, 255, 152, 0), 0.05), rgba(var(--primary-rgb, 255, 152, 0), 0.02))', border: '1px dashed var(--primary, #ff9800)', borderRadius: '12px' }}>
                        {!feedbackSubmitted ? (
                          <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                              <MessageCircle size={20} className="text-gradient" />
                              <h5 style={{ margin: 0, fontSize: '1.05rem' }}>Hizmetimizi Değerlendirin</h5>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                              Aracınız teslime hazır! Deneyiminizi puanlayın ve yorumunuzla diğer müşterilere yol gösterin.
                            </p>

                            {/* Star Rating */}
                            <div style={{ marginBottom: '16px' }}>
                              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Puanınız</label>
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
                                <span style={{ marginLeft: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)', alignSelf: 'center' }}>
                                  {rating}/5
                                </span>
                              </div>
                            </div>

                            {/* Comment Textarea */}
                            <div style={{ marginBottom: '16px' }}>
                              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Yorumunuz</label>
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
                              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem', opacity: commentText.trim() ? 1 : 0.5 }}
                            >
                              <Star size={16} />
                              <span>Yorumu Gönder</span>
                            </button>
                          </>
                        ) : (
                          <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                              <CheckCircle size={32} style={{ color: '#22c55e' }} />
                            </div>
                            <h5 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>Teşekkür Ederiz!</h5>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                              Değerlendirmeniz başarıyla kaydedildi. Yorumunuz ana sayfamızda yayınlanacaktır. Bizleri tercih ettiğiniz için teşekkürler! 🙏
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
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
      </div>
    </section>
  );
}
