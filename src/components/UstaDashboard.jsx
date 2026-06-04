import React, { useState } from 'react';
import { 
  Calendar, Wrench, Plus, Check, X, Shield, PlusCircle, Trash, Search, 
  DollarSign, Package, Edit3, UserPlus, Image, MessageSquare, Settings2,
  Share2, FileText, Clock, Sparkles
} from 'lucide-react';

export default function UstaDashboard({ 
  appointments, 
  approveAppointment, 
  rejectAppointment,
  workingHours,
  addWorkingHour,
  deleteWorkingHour,
  activeRepairs, 
  completedRepairs,
  completeRepairJob,
  updateRepairStatus, 
  addRepairJob, 
  deleteRepairJob,
  updateRepairJobCost,
  addPendingRequest, 
  listings, 
  addMarketplaceListing,
  
  // CMS Props
  branchDetails,
  setBranchDetails,
  team,
  setTeam,
  testimonials,
  setTestimonials,
  galleryItems,
  setGalleryItems,
  beforeAfterData,
  setBeforeAfterData,
  currentBranch,
  onLogout,
  
  // Blog Props
  blogs,
  addBlogPost,
  deleteBlogPost
}) {
  const [subTab, setSubTab] = useState('repairs'); // repairs, appointments, listings, history, cms, hours
  const [newHourInput, setNewHourInput] = useState('');
  const [includeWarrantyNote, setIncludeWarrantyNote] = useState(false);
  const [cmsSection, setCmsSection] = useState('headers'); // headers, team, testimonials, gallery

  // State for Add Listing form
  const [listingTitle, setListingTitle] = useState('');
  const [listingCategory, setListingCategory] = useState('part');
  const [listingPrice, setListingPrice] = useState('');
  const [listingDesc, setListingDesc] = useState('');
  const [listingCode, setListingCode] = useState('');
  const [listingGuarantee, setListingGuarantee] = useState(true);

  // State for adding extra jobs
  const [newJobTexts, setNewJobTexts] = useState({});
  const [newJobCosts, setNewJobCosts] = useState({});
  const [newExtraItemName, setNewExtraItemName] = useState('');
  const [newExtraItemCost, setNewExtraItemCost] = useState('');
  const [activeExtraFormId, setActiveExtraFormId] = useState(null);
  
  // State for invoice print preview & job editing
  const [printingCar, setPrintingCar] = useState(null);
  const [editingJob, setEditingJob] = useState(null); // { carId, jobIndex, name, cost }

  // State for Plate Search History
  const [searchPlate, setSearchPlate] = useState('');
  const [historyResult, setHistoryResult] = useState(null);

  // --- CMS FORMS STATES ---
  // 1. Branch Headers & Services State
  const activeBranchData = branchDetails[currentBranch] || {};
  const [editBranchName, setEditBranchName] = useState(activeBranchData.name || '');
  const [editBranchTitle, setEditBranchTitle] = useState(activeBranchData.title || '');
  const [editBranchSubtitle, setEditBranchSubtitle] = useState(activeBranchData.subtitle || '');

  // 2. New Service form state
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  // 3. New Master form state
  const [newMasterName, setNewMasterName] = useState('');
  const [newMasterRole, setNewMasterRole] = useState('');
  const [newMasterExp, setNewMasterExp] = useState('');
  const [newMasterSkills, setNewMasterSkills] = useState('');
  const [newMasterCerts, setNewMasterCerts] = useState('');
  const [newMasterPhone, setNewMasterPhone] = useState('');

  // 4. New Testimonial form state
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewVehicle, setNewReviewVehicle] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewService, setNewReviewService] = useState('');
  const [newReviewDate, setNewReviewDate] = useState('Bugün');

  // 5. New Gallery item form state
  const [newGalSrc, setNewGalSrc] = useState('/hero_bg.png');
  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalDesc, setNewGalDesc] = useState('');
  const [newGalTag, setNewGalTag] = useState('Atölye');

  // 6. New Blog post form state
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogSummary, setNewBlogSummary] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogImage, setNewBlogImage] = useState('/hero_bg.png');
  const [newBlogCategory, setNewBlogCategory] = useState('Genel');

  // Sync edit text when current branch changes
  React.useEffect(() => {
    const data = branchDetails[currentBranch] || {};
    setEditBranchName(data.name || '');
    setEditBranchTitle(data.title || '');
    setEditBranchSubtitle(data.subtitle || '');
  }, [currentBranch, branchDetails]);


  // --- ACTIONS ---
  const handleAddListing = (e) => {
    e.preventDefault();
    if (!listingTitle || !listingPrice) return;

    const newListing = {
      id: listings.length + 1,
      title: listingTitle,
      category: listingCategory,
      price: parseFloat(listingPrice),
      description: listingDesc || 'Usta tarafından kontrol edilmiş temiz ürün.',
      itemCode: listingCode || 'PARCA-' + Math.floor(100 + Math.random() * 900),
      isGuaranteed: listingGuarantee,
      sellerWorkshop: branchDetails[currentBranch]?.name || 'Bizim Atölyemiz',
      sellerName: 'Baş Usta',
      sellerPhone: '0532 999 88 11'
    };

    if (addMarketplaceListing) {
      addMarketplaceListing(newListing);
      setListingTitle('');
      setListingPrice('');
      setListingDesc('');
      setListingCode('');
      alert('İlan başarıyla yayına alındı! Mağaza sekmesinden kontrol edebilirsiniz.');
    }
  };

  const handleAddJob = (id) => {
    const txt = newJobTexts[id];
    const cost = newJobCosts[id] || '';
    if (!txt) return;

    if (addRepairJob) {
      addRepairJob(id, txt, cost);
      setNewJobTexts({ ...newJobTexts, [id]: '' });
      setNewJobCosts({ ...newJobCosts, [id]: '' });
    }
  };

  const handleShareReceipt = (car) => {
    const jobsTotal = car.jobsDone ? car.jobsDone.reduce((sum, j) => sum + (j.cost || 0), 0) : 0;
    const extraTotal = car.extraItems ? car.extraItems.reduce((sum, j) => sum + (j.cost || 0), 0) : 0;
    const grandTotal = jobsTotal + extraTotal;
    const vat = Math.round(grandTotal * 0.20);
    const subtotal = grandTotal - vat;

    const workshopName = branchDetails[currentBranch]?.name || 'Dijital Oto Servis';

    const jobsText = car.jobsDone && car.jobsDone.length > 0 
      ? car.jobsDone.map((j, i) => `${i + 1}. ${j.name}: ${j.cost} TL`).join('\n')
      : 'Yapılan işlem bulunmamaktadır.';

    const extrasText = car.extraItems && car.extraItems.length > 0
      ? '\n\nEkstra Onaylananlar:\n' + car.extraItems.map((j, i) => `- ${j.name}: ${j.cost} TL`).join('\n')
      : '';

    const shareText = `🛠️ ${workshopName} Servis Fişi
----------------------------------------
🚗 Plaka: ${car.plate}
📦 Araç: ${car.model}
👨 Müşteri: ${car.owner}
📅 Tarih: ${new Date().toLocaleDateString('tr-TR')}
----------------------------------------
Yapılan İşlemler:
${jobsText}${extrasText}
----------------------------------------
Ara Toplam: ${subtotal} TL
KDV (%20): ${vat} TL
TOPLAM TUTAR: ${grandTotal} TL
----------------------------------------
Bizleri tercih ettiğiniz için teşekkür ederiz!`;

    if (navigator.share) {
      navigator.share({
        title: `${car.plate} - Servis Fişi`,
        text: shareText
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Servis fişi özeti panoya kopyalandı! Dilediğiniz platformda (WhatsApp, SMS vb.) paylaşabilirsiniz.');
    }
  };

  const handleAddExtraRequest = (id) => {
    if (!newExtraItemName || !newExtraItemCost) return;

    if (addPendingRequest) {
      addPendingRequest(id, newExtraItemName, parseFloat(newExtraItemCost));
      setNewExtraItemName('');
      setNewExtraItemCost('');
      setActiveExtraFormId(null);
    }
  };

  const handleHistorySearch = (e) => {
    e.preventDefault();
    if (!searchPlate) return;

    const cleanQuery = searchPlate.toUpperCase().replace(/\s+/g, '');
    const records = completedRepairs ? completedRepairs.filter(r => r.plate.toUpperCase().replace(/\s+/g, '') === cleanQuery) : [];

    if (records.length > 0) {
      setHistoryResult({
        plate: records[0].plate,
        model: records[0].model,
        history: records
      });
    } else {
      setHistoryResult('notfound');
    }
  };


  // --- CMS SUB-ACTIONS ---
  // 1. Save general titles
  const saveBranchHeaders = () => {
    const updated = {
      ...branchDetails,
      [currentBranch]: {
        ...branchDetails[currentBranch],
        name: editBranchName,
        title: editBranchTitle,
        subtitle: editBranchSubtitle
      }
    };
    setBranchDetails(updated);
    alert('Dükkan başlık ve açıklamaları güncellendi!');
  };

  // 2. Add service to current branch
  const addService = (e) => {
    e.preventDefault();
    if (!newServiceTitle || !newServicePrice) return;

    const newSvc = {
      id: 'svc-' + Date.now(),
      title: newServiceTitle,
      desc: newServiceDesc || 'Hızlı ve garantili el işçiliği.',
      price: newServicePrice
    };

    const updated = {
      ...branchDetails,
      [currentBranch]: {
        ...branchDetails[currentBranch],
        services: [...branchDetails[currentBranch].services, newSvc]
      }
    };
    setBranchDetails(updated);
    setNewServiceTitle('');
    setNewServiceDesc('');
    setNewServicePrice('');
    alert('Hizmet listeye eklendi!');
  };

  // 3. Delete service from current branch
  const deleteService = (svcId) => {
    const updated = {
      ...branchDetails,
      [currentBranch]: {
        ...branchDetails[currentBranch],
        services: branchDetails[currentBranch].services.filter(s => s.id !== svcId)
      }
    };
    setBranchDetails(updated);
  };

  // 4. Team management
  const addMaster = (e) => {
    e.preventDefault();
    if (!newMasterName || !newMasterRole) return;

    const newMst = {
      id: Date.now(),
      name: newMasterName,
      role: newMasterRole,
      experience: newMasterExp || '10 Yıl Deneyim',
      rating: 5.0,
      reviews: 1,
      skills: newMasterSkills ? newMasterSkills.split(',').map(s => s.trim()) : ['Genel Bakım'],
      certifications: newMasterCerts || 'Sertifikalı Servis Teknisyeni',
      phone: newMasterPhone || '0532 999 88 00'
    };

    setTeam([...team, newMst]);
    setNewMasterName('');
    setNewMasterRole('');
    setNewMasterExp('');
    setNewMasterSkills('');
    setNewMasterCerts('');
    setNewMasterPhone('');
    alert('Yeni usta kadroya eklendi!');
  };

  const deleteMaster = (id) => {
    setTeam(team.filter(t => t.id !== id));
  };

  // 5. Testimonials management
  const addTestimonial = (e) => {
    e.preventDefault();
    if (!newReviewName || !newReviewText) return;

    const newTst = {
      name: newReviewName,
      vehicle: newReviewVehicle || 'Bilinmiyor',
      rating: parseInt(newReviewRating),
      text: newReviewText,
      date: newReviewDate,
      service: newReviewService || 'Genel Bakım',
      avatar: newReviewName.split(' ').map(n => n[0]).join('').toUpperCase()
    };

    setTestimonials([newTst, ...testimonials]);
    setNewReviewName('');
    setNewReviewVehicle('');
    setNewReviewText('');
    setNewReviewService('');
    alert('Müşteri yorumu başarıyla eklendi!');
  };

  const deleteTestimonial = (idx) => {
    setTestimonials(testimonials.filter((_, i) => i !== idx));
  };

  // 6. Gallery management
  const addGalleryItem = (e) => {
    e.preventDefault();
    if (!newGalTitle || !newGalSrc) return;

    const newGal = {
      src: newGalSrc,
      title: newGalTitle,
      desc: newGalDesc || 'Atölyemizden canlı kareler.',
      tag: newGalTag
    };

    setGalleryItems([newGal, ...galleryItems]);
    setNewGalTitle('');
    setNewGalDesc('');
    alert('Fotoğraf galeriye başarıyla yüklendi!');
  };

  const deleteGalleryItem = (idx) => {
    setGalleryItems(galleryItems.filter((_, i) => i !== idx));
  };

  const steps = [
    { label: 'Kabul', val: 'kabul' },
    { label: 'Teşhis', val: 'ariza' },
    { label: 'Onarım', val: 'onarim' },
    { label: 'Test', val: 'test' },
    { label: 'Teslime Hazır', val: 'hazir' }
  ];

  return (
    <section className="dashboard-section">
      <div className="section-header usta-dashboard-header">
        <div>
          <span className="badge">Gelişmiş Usta CMS & İş Takibi</span>
          <h2>Atölye Yönetim Paneli</h2>
          <p className="section-desc">
            Müşteri araç durumlarını güncelleyin, gelen randevuları yönetin veya sitenin ana sayfasındaki tüm başlıkları, hizmetleri ve ustaları anında editleyin.
          </p>
        </div>
        {onLogout && (
          <button onClick={onLogout} className="glow-btn-secondary logout-btn-dash">
            Güvenli Çıkış Yap
          </button>
        )}
      </div>

      {/* Dashboard sub tabs switcher */}
      <div className="dash-subtabs glass">
        <button 
          className={`dash-subtab-btn ${subTab === 'repairs' ? 'active' : ''}`}
          onClick={() => setSubTab('repairs')}
        >
          <Wrench size={16} />
          <span>Aktif İşler ({activeRepairs.length})</span>
        </button>

        <button 
          className={`dash-subtab-btn ${subTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setSubTab('appointments')}
        >
          <Calendar size={16} />
          <span>Gelen Randevular ({appointments.filter(a => a.status === 'pending').length})</span>
        </button>

        <button 
          className={`dash-subtab-btn ${subTab === 'hours' ? 'active' : ''}`}
          onClick={() => setSubTab('hours')}
        >
          <Clock size={16} />
          <span>Çalışma Saatleri ({workingHours?.length || 0})</span>
        </button>

        <button 
          className={`dash-subtab-btn ${subTab === 'listings' ? 'active' : ''}`}
          onClick={() => setSubTab('listings')}
        >
          <Package size={16} />
          <span>İlan Ekle & Yönet</span>
        </button>

        <button 
          className={`dash-subtab-btn ${subTab === 'history' ? 'active' : ''}`}
          onClick={() => setSubTab('history')}
        >
          <Search size={16} />
          <span>Müşteri Geçmişi</span>
        </button>

        <button 
          className={`dash-subtab-btn ${subTab === 'cms' ? 'active' : ''}`}
          onClick={() => setSubTab('cms')}
          style={{ borderLeft: '1px dashed var(--primary)' }}
        >
          <Settings2 size={16} className="text-warning" />
          <span className="text-warning">Web Sitesi CMS Yönetimi</span>
        </button>
      </div>

      {/* SUBTAB 1: ACTIVE REPAIRS */}
      {subTab === 'repairs' && (
        <div className="repairs-dashboard-grid">
          {activeRepairs.length > 0 ? (
            activeRepairs.map((car) => (
              <div className="glass-card repair-manage-card" key={car.id}>
                <div className="manage-card-header">
                  <div>
                    <span className="plate-badge-large">{car.plate}</span>
                    <h4>{car.model}</h4>
                    <span className="owner-txt">Müşteri: {car.owner} ({car.phone})</span>
                  </div>
                  <div className="price-tag-big text-gradient">
                    {(car.jobsDone ? car.jobsDone.reduce((sum, j) => sum + (j.cost || 0), 0) : 0) + (car.extraItems ? car.extraItems.reduce((a, b) => a + b.cost, 0) : 0)} TL
                  </div>
                </div>

                <div className="stepper-controls">
                  <span className="stepper-lbl">Mevcut Durum:</span>
                  <div className="stepper-buttons-row">
                    {steps.map((st) => {
                      const isCurrent = car.status === st.val;
                      return (
                        <button
                          key={st.val}
                          onClick={() => updateRepairStatus(car.id, st.val)}
                          className={`stepper-btn ${isCurrent ? 'active' : ''}`}
                        >
                          {st.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="manage-jobs-box glass">
                  <h6>Yapılan İşlemler Checklist</h6>
                  <ul>
                    {car.jobsDone.map((job, idx) => {
                      const jobName = typeof job === 'object' ? job.name : job;
                      const jobCost = typeof job === 'object' ? job.cost : 0;
                      return (
                        <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span>✓ {jobName} <strong style={{ color: 'var(--primary)' }}>({jobCost} TL)</strong></span>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button 
                              onClick={() => setEditingJob({ carId: car.id, jobIndex: idx, name: jobName, cost: jobCost })}
                              style={{ padding: '2px 6px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}
                              title="Düzenle"
                            >
                              <Edit3 size={10} />
                            </button>
                            <button 
                              onClick={() => deleteRepairJob && deleteRepairJob(car.id, idx)}
                              style={{ padding: '2px 6px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#ef4444' }}
                              title="Sil"
                            >
                              <Trash size={10} />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {editingJob && editingJob.carId === car.id && (
                    <div className="glass" style={{ padding: '10px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid var(--primary)', borderRadius: '8px' }}>
                      <small style={{ fontWeight: 'bold', color: 'var(--primary)', display: 'block' }}>İşlem Ücretini Düzenle</small>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{editingJob.name}</span>
                        <input 
                          type="number" 
                          style={{ width: '80px', padding: '4px 8px', fontSize: '0.8rem', height: '28px' }}
                          value={editingJob.cost}
                          onChange={(e) => setEditingJob({ ...editingJob, cost: e.target.value })}
                        />
                        <button 
                          className="glow-btn"
                          style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '4px', height: '28px', display: 'flex', alignItems: 'center' }}
                          onClick={() => {
                            updateRepairJobCost && updateRepairJobCost(car.id, editingJob.jobIndex, editingJob.cost);
                            setEditingJob(null);
                          }}
                        >
                          Kaydet
                        </button>
                        <button 
                          className="glow-btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '4px', height: '28px', display: 'flex', alignItems: 'center' }}
                          onClick={() => setEditingJob(null)}
                        >
                          İptal
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="add-job-input-row" style={{ display: 'flex', gap: '6px' }}>
                    <input 
                      type="text" 
                      placeholder="Yapılan yeni işlem..."
                      value={newJobTexts[car.id] || ''}
                      onChange={(e) => setNewJobTexts({ ...newJobTexts, [car.id]: e.target.value })}
                      style={{ flexGrow: 2 }}
                    />
                    <input 
                      type="number" 
                      placeholder="Üret (TL)..."
                      value={newJobCosts[car.id] || ''}
                      onChange={(e) => setNewJobCosts({ ...newJobCosts, [car.id]: e.target.value })}
                      style={{ flexGrow: 1, maxWidth: '90px' }}
                    />
                    <button onClick={() => handleAddJob(car.id)} className="glow-btn square-btn">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="approval-generator">
                  {car.pendingApproval ? (
                    <div className="active-pending-badge">
                      <span>Müşteriden Onay Bekleyen: <strong>{car.pendingApproval.item} (+{car.pendingApproval.cost} TL)</strong></span>
                      <span className="approval-status-lbl warning">Bekleniyor...</span>
                    </div>
                  ) : (
                    <div>
                      {activeExtraFormId === car.id ? (
                        <div className="extra-approval-form glass">
                          <h6>Parça / Onarım Onayı Gönder</h6>
                          <div className="form-row-2">
                            <input 
                              type="text" 
                              placeholder="Parça Adı (Örn: Ön Balata)" 
                              value={newExtraItemName}
                              onChange={(e) => setNewExtraItemName(e.target.value)}
                            />
                            <input 
                              type="number" 
                              placeholder="Fiyat (TL)" 
                              value={newExtraItemCost}
                              onChange={(e) => setNewExtraItemCost(e.target.value)}
                            />
                          </div>
                          <div className="form-actions">
                            <button 
                              className="approve-btn"
                              onClick={() => handleAddExtraRequest(car.id)}
                            >
                              Müşteriye Gönder
                            </button>
                            <button 
                              className="cancel-btn"
                              onClick={() => setActiveExtraFormId(null)}
                            >
                              Vazgeç
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button 
                          className="glow-btn-secondary full-width"
                          onClick={() => setActiveExtraFormId(car.id)}
                        >
                          <PlusCircle size={14} />
                          <span>Ekstra Onarım/Parça Onayı İste</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
                  <button 
                    className="glow-btn-secondary" 
                    style={{ justifyContent: 'center', padding: '8px 12px', fontSize: '0.8rem' }}
                    onClick={() => setPrintingCar(car)}
                  >
                    <FileText size={14} />
                    <span>Yazdır / PDF</span>
                  </button>
                  <button 
                    className="glow-btn-secondary" 
                    style={{ justifyContent: 'center', padding: '8px 12px', fontSize: '0.8rem' }}
                    onClick={() => handleShareReceipt(car)}
                  >
                    <Share2 size={14} />
                    <span>Paylaş</span>
                  </button>
                </div>

                {car.status === 'hazir' && (
                  <button 
                    className="glow-btn full-width"
                    style={{ marginTop: '12px', justifyContent: 'center', background: '#22c55e', border: 'none', boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)' }}
                    onClick={() => completeRepairJob && completeRepairJob(car.id)}
                  >
                    <Check size={16} />
                    <span>İşi Tamamla & Arşive Gönder</span>
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="no-appointments-card glass full-width">
              <Wrench size={36} className="muted-icon" />
              <h4>Atölye Boş</h4>
              <p>Şu anda atölyede onarılan araç bulunmamaktadır.</p>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: INCOMING APPOINTMENTS */}
      {subTab === 'appointments' && (
        <div className="appointments-dashboard-list">
          {appointments.filter(a => a.status === 'pending').length > 0 ? (
            appointments.filter(a => a.status === 'pending').map((apt) => (
              <div className="glass-card appointment-row-card" key={apt.id}>
                <div className="apt-info-left">
                  <span className="plate-badge">{apt.plate}</span>
                  <div className="apt-car-details">
                    <h4>{apt.brand} {apt.model} ({apt.year})</h4>
                    <p className="apt-customer">👨 {apt.ownerName} | 📱 {apt.phone}</p>
                    <p className="apt-service">🛠️ Hizmet: <strong>{apt.service}</strong></p>
                    {apt.notes && <p className="apt-notes">📝 <em>Not: {apt.notes}</em></p>}
                  </div>
                </div>

                <div className="apt-info-right">
                  <div className="apt-time-box">
                    <span>📅 {apt.date}</span>
                    <span>⏰ {apt.time}</span>
                  </div>

                  <div className="apt-actions">
                    <button 
                      className="apt-action-btn accept"
                      onClick={() => approveAppointment(apt.id)}
                    >
                      <Check size={16} />
                      <span>Onayla</span>
                    </button>
                    
                    <button 
                      className="apt-action-btn reject"
                      onClick={() => rejectAppointment(apt.id)}
                    >
                      <X size={16} />
                      <span>Reddet</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-appointments-card glass">
              <Calendar size={36} className="muted-icon" />
              <h4>Bekleyen Randevu Yok</h4>
              <p>Şu anda onay bekleyen randevu bulunmamaktadır.</p>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: ADD & MANAGE LISTINGS */}
      {subTab === 'listings' && (
        <div className="listings-management-layout">
          <div className="listing-add-form-wrapper glass">
            <h4>Mağazaya Ürün Ekle</h4>
            <form onSubmit={handleAddListing} className="listing-add-form">
              <div className="form-group">
                <label>İlan Başlığı *</label>
                <input 
                  type="text" 
                  value={listingTitle}
                  onChange={(e) => setListingTitle(e.target.value)}
                  placeholder="Örn: Fiat Egea Orijinal Çıkma Sol Çamurluk"
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Kategori *</label>
                  <select value={listingCategory} onChange={(e) => setListingCategory(e.target.value)}>
                    <option value="part">⚙️ Yedek Parça</option>
                    <option value="vehicle">🚗 İkinci El Araç</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fiyat (TL) *</label>
                  <input 
                    type="number" 
                    value={listingPrice}
                    onChange={(e) => setListingPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Ürün Kodu</label>
                  <input type="text" value={listingCode} onChange={(e) => setListingCode(e.target.value)} />
                </div>
                <div className="form-group check-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={listingGuarantee}
                      onChange={(e) => setListingGuarantee(e.target.checked)}
                    />
                    <span>1 Yıl Garantili</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="glow-btn full-width">İlanı Mağazada Yayınla</button>
            </form>
          </div>

          <div className="listing-manage-list glass">
            <h4>Aktif İlanlarınız ({listings.length})</h4>
            <div className="manage-listings-scroll">
              {listings.map((item) => (
                <div key={item.id} className="manage-listing-row glass">
                  <div className="row-info">
                    <span className="row-cat">{item.category === 'vehicle' ? '🚗 İlan' : '⚙️ Parça'}</span>
                    <strong className="row-title">{item.title}</strong>
                    <span className="row-price">{item.price.toLocaleString('tr-TR')} TL</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: CLIENT / VEHICLE HISTORY */}
      {subTab === 'history' && (
        <div className="history-search-layout glass">
          <h4>Plaka Sorgulama (Servis Kartı Geçmişi)</h4>
          <form onSubmit={handleHistorySearch} className="history-search-form">
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Örn: 34ABC123" 
                value={searchPlate}
                onChange={(e) => setSearchPlate(e.target.value)}
              />
              <button type="submit" className="glow-btn">Sorgula</button>
            </div>
          </form>

          <div className="history-results-area">
            {historyResult === 'notfound' && <p>Sonuç bulunamadı (Demo için 34ABC123 yazın)</p>}
            {historyResult && historyResult !== 'notfound' && (
              <div className="history-success-card glass-card">
                <h5>{historyResult.plate} - {historyResult.model} Geçmişi</h5>
                <div className="history-timeline">
                  {historyResult.history.map((record, idx) => (
                    <div key={idx} className="history-timeline-item">
                      <p>📅 {record.date} | 💰 {record.cost} TL - {record.desc} (Usta: {record.master})</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 5: WEB SITE CMS EDITOR (ANA SAYFA YÖNETİMİ) */}
      {subTab === 'cms' && (
        <div className="cms-layout-grid">
          {/* CMS Sub-sections selector (left) */}
          <div className="cms-sidebar glass">
            <h5>CMS Bölümleri</h5>
            <button 
              className={`cms-nav-btn ${cmsSection === 'headers' ? 'active' : ''}`}
              onClick={() => setCmsSection('headers')}
            >
              <Settings2 size={14} />
              <span>Başlıklar & Hizmetler</span>
            </button>
            <button 
              className={`cms-nav-btn ${cmsSection === 'team' ? 'active' : ''}`}
              onClick={() => setCmsSection('team')}
            >
              <UserPlus size={14} />
              <span>Usta Kadrosu</span>
            </button>
            <button 
              className={`cms-nav-btn ${cmsSection === 'testimonials' ? 'active' : ''}`}
              onClick={() => setCmsSection('testimonials')}
            >
              <MessageSquare size={14} />
              <span>Müşteri Yorumları</span>
            </button>
            <button 
              className={`cms-nav-btn ${cmsSection === 'gallery' ? 'active' : ''}`}
              onClick={() => setCmsSection('gallery')}
            >
              <Image size={14} />
              <span>Resim Galerisi</span>
            </button>
            <button 
              className={`cms-nav-btn ${cmsSection === 'beforeafter' ? 'active' : ''}`}
              onClick={() => setCmsSection('beforeafter')}
            >
              <Sparkles size={14} />
              <span>Önce / Sonra Slider</span>
            </button>
            <button 
              className={`cms-nav-btn ${cmsSection === 'blog' ? 'active' : ''}`}
              onClick={() => setCmsSection('blog')}
            >
              <FileText size={14} />
              <span>Blog Yazıları</span>
            </button>

            <div className="cms-help-alert">
              <small>💡 Seçili branş: <strong>{activeBranchData.name}</strong>. Buradan yaptığınız değişiklikler ana sayfada canlı olarak güncellenir.</small>
            </div>
          </div>

          {/* CMS Forms Area (right) */}
          <div className="cms-main-panel glass">
            
            {/* SECTION 1: HEADERS & SERVICES */}
            {cmsSection === 'headers' && (
              <div className="cms-content-section animate-slide-up">
                <h4>Hizmetler ve Dükkan Tanıtım Yazıları</h4>
                <p className="section-desc-compact">Aktif branşın sloganını ve listelenen tamir paketlerini güncelleyin.</p>

                <div className="cms-form-box glass">
                  <div className="form-group">
                    <label>Dükkan / Branş İsmi</label>
                    <input 
                      type="text" 
                      value={editBranchName} 
                      onChange={(e) => setEditBranchName(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Ana Slogan (Hero Başlık)</label>
                    <input 
                      type="text" 
                      value={editBranchTitle} 
                      onChange={(e) => setEditBranchTitle(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Alt Açıklama Metni</label>
                    <textarea 
                      rows="2"
                      value={editBranchSubtitle} 
                      onChange={(e) => setEditBranchSubtitle(e.target.value)} 
                    />
                  </div>
                  <button onClick={saveBranchHeaders} className="glow-btn">
                    <Check size={14} />
                    <span>Dükkan Bilgilerini Kaydet</span>
                  </button>
                </div>

                {/* Services Management */}
                <div className="cms-services-list-wrapper">
                  <h5>Sitede Listelenen Hizmetler</h5>
                  <div className="cms-services-scroll">
                    {activeBranchData.services && activeBranchData.services.map((svc) => (
                      <div key={svc.id} className="cms-item-card glass">
                        <div>
                          <strong>{svc.title}</strong>
                          <p>{svc.desc}</p>
                          <span className="price-lbl-cms">Fiyat: {svc.price}</span>
                        </div>
                        <button className="delete-btn-cms" onClick={() => deleteService(svc.id)}>
                          <Trash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Service Form */}
                  <form onSubmit={addService} className="cms-inline-add-form glass">
                    <h6>➕ Yeni Hizmet Ekle</h6>
                    <div className="form-row-2">
                      <input 
                        type="text" 
                        placeholder="Hizmet Adı (Örn: Rot Balans Ayarı)" 
                        value={newServiceTitle}
                        onChange={(e) => setNewServiceTitle(e.target.value)}
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="Fiyat (Örn: 800 - 1500 TL)" 
                        value={newServicePrice}
                        onChange={(e) => setNewServicePrice(e.target.value)}
                        required
                      />
                    </div>
                    <textarea 
                      placeholder="Kısa Hizmet Açıklaması..."
                      rows="2"
                      value={newServiceDesc}
                      onChange={(e) => setNewServiceDesc(e.target.value)}
                    />
                    <button type="submit" className="glow-btn-secondary full-width">Hizmeti Listeye Ekle</button>
                  </form>
                </div>
              </div>
            )}

            {/* SECTION 2: MASTER TEAM */}
            {cmsSection === 'team' && (
              <div className="cms-content-section animate-slide-up">
                <h4>Kadroya Usta Ekle / Düzenle</h4>
                <p className="section-desc-compact">Kadroda yer alan ustaları, yeteneklerini ve sertifikalarını yönetin.</p>

                <div className="cms-grid-items">
                  {team.map((mst) => (
                    <div key={mst.id} className="cms-item-card glass">
                      <div>
                        <strong>{mst.name}</strong>
                        <span className="cms-badge-role">{mst.role} ({mst.experience})</span>
                        <p><strong>Yetenekler:</strong> {mst.skills.join(', ')}</p>
                        <p><strong>Sertifikalar:</strong> {mst.certifications}</p>
                      </div>
                      <button className="delete-btn-cms" onClick={() => deleteMaster(mst.id)}>
                        <Trash size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={addMaster} className="cms-inline-add-form glass">
                  <h6>➕ Yeni Usta Ekle</h6>
                  <div className="form-row-2">
                    <input 
                      type="text" 
                      placeholder="Usta Adı Soyadı (Örn: Hasan Usta)" 
                      value={newMasterName}
                      onChange={(e) => setNewMasterName(e.target.value)}
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Branşı / Rolü" 
                      value={newMasterRole}
                      onChange={(e) => setNewMasterRole(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-row-2">
                    <input 
                      type="text" 
                      placeholder="Deneyim Süresi (Örn: 20 Yıl)" 
                      value={newMasterExp}
                      onChange={(e) => setNewMasterExp(e.target.value)}
                    />
                    <input 
                      type="text" 
                      placeholder="Telefon Numarası" 
                      value={newMasterPhone}
                      onChange={(e) => setNewMasterPhone(e.target.value)}
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Yetenekleri (virgülle ayırarak yazın: Motor Rektefiye, Buji)" 
                    value={newMasterSkills}
                    onChange={(e) => setNewMasterSkills(e.target.value)}
                  />
                  <input 
                    type="text" 
                    placeholder="Sertifikalar" 
                    value={newMasterCerts}
                    onChange={(e) => setNewMasterCerts(e.target.value)}
                  />
                  <button type="submit" className="glow-btn full-width">Ustayı Kadroya Ekle</button>
                </form>
              </div>
            )}

            {/* SECTION 3: TESTIMONIALS */}
            {cmsSection === 'testimonials' && (
              <div className="cms-content-section animate-slide-up">
                <h4>Müşteri Yorumları Yönetimi</h4>
                <p className="section-desc-compact">Referansları, puanları ve müşteri beyanlarını güncelleyin veya yeni yorum yazın.</p>

                <div className="cms-testimonials-scroll">
                  {testimonials.map((tst, idx) => (
                    <div key={idx} className="cms-item-card glass">
                      <div>
                        <strong>{tst.name} ({tst.vehicle})</strong>
                        <span className="cms-badge-role">⭐ {tst.rating}/5 | {tst.service}</span>
                        <p>"{tst.text}"</p>
                      </div>
                      <button className="delete-btn-cms" onClick={() => deleteTestimonial(idx)}>
                        <Trash size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={addTestimonial} className="cms-inline-add-form glass">
                  <h6>➕ Yeni Müşteri Yorumu Ekle</h6>
                  <div className="form-row-2">
                    <input 
                      type="text" 
                      placeholder="Müşteri Adı" 
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Araç Modeli (Örn: Honda Civic)" 
                      value={newReviewVehicle}
                      onChange={(e) => setNewReviewVehicle(e.target.value)}
                    />
                  </div>
                  <div className="form-row-2">
                    <input 
                      type="text" 
                      placeholder="Yapılan İşlem (Örn: Periyodik Bakım)" 
                      value={newReviewService}
                      onChange={(e) => setNewReviewService(e.target.value)}
                    />
                    <select value={newReviewRating} onChange={(e) => setNewReviewRating(e.target.value)}>
                      <option value="5">⭐⭐⭐⭐⭐ 5 Yıldız</option>
                      <option value="4">⭐⭐⭐⭐ 4 Yıldız</option>
                      <option value="3">⭐⭐⭐ 3 Yıldız</option>
                    </select>
                  </div>
                  <textarea 
                    placeholder="Müşterinin yorum metni..."
                    rows="3"
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    required
                  />
                  <button type="submit" className="glow-btn full-width">Müşteri Yorumunu Kaydet</button>
                </form>
              </div>
            )}

            {/* SECTION 4: GALLERY */}
            {cmsSection === 'gallery' && (
              <div className="cms-content-section animate-slide-up">
                <h4>Atölye Galerisi Fotoğraf Yönetimi</h4>
                <p className="section-desc-compact">Atölye görsellerini ve Lightbox'ta büyüyen resim kartlarını güncelleyin.</p>

                <div className="cms-grid-items">
                  {galleryItems.map((item, idx) => (
                    <div key={idx} className="cms-item-card glass">
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <img src={item.src} alt={item.title} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div>
                          <strong>{item.title}</strong>
                          <span className="cms-badge-role">{item.tag}</span>
                          <p style={{ fontSize: '0.75rem' }}>{item.desc}</p>
                        </div>
                      </div>
                      <button className="delete-btn-cms" onClick={() => deleteGalleryItem(idx)}>
                        <Trash size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={addGalleryItem} className="cms-inline-add-form glass">
                  <h6>➕ Galeriye Yeni Resim Ekle</h6>
                  <div className="form-row-2">
                    <input 
                      type="text" 
                      placeholder="Resim Başlığı" 
                      value={newGalTitle}
                      onChange={(e) => setNewGalTitle(e.target.value)}
                      required
                    />
                    <select value={newGalTag} onChange={(e) => setNewGalTag(e.target.value)}>
                      <option value="Atölye">Atölye</option>
                      <option value="Kapasite">Kapasite</option>
                      <option value="Teknoloji">Teknoloji</option>
                      <option value="Kalite">Kalite</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Resim Seçin (Bilgisayardan veya Dosya Yolu/URL)</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type="text" 
                        placeholder="Örn: /workshop_panorama.png veya dosya yükleyin" 
                        value={newGalSrc}
                        onChange={(e) => setNewGalSrc(e.target.value)}
                        style={{ flex: 1 }}
                        required
                      />
                      <label className="glow-btn-secondary" style={{ padding: '10px 15px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', margin: 0, fontSize: '0.85rem' }}>
                        Dosya Seç
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setNewGalSrc(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>
                  <textarea 
                    placeholder="Görsel açıklaması..."
                    rows="2"
                    value={newGalDesc}
                    onChange={(e) => setNewGalDesc(e.target.value)}
                  />
                  <button type="submit" className="glow-btn full-width">Görseli Yükle</button>
                </form>
              </div>
            )}

            {/* SECTION 5: BEFORE & AFTER SLIDER */}
            {cmsSection === 'beforeafter' && (
              <div className="cms-content-section animate-slide-up">
                <h4>Önce & Sonra Kalite Kanıtı Görselleri</h4>
                <p className="section-desc-compact">Ana sayfadaki sürgülü karşılaştırma slider'ının görsellerini ve detay açıklamasını güncelleyin.</p>

                <div className="cms-form-box glass" style={{ padding: '20px', borderRadius: '8px' }}>
                  <div className="form-group">
                    <label>İşlemden Önce Görseli (Bilgisayardan veya Dosya Yolu/URL)</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type="text" 
                        value={beforeAfterData?.beforeImage || ''} 
                        onChange={(e) => setBeforeAfterData({ ...beforeAfterData, beforeImage: e.target.value })} 
                        placeholder="Örn: /before_engine.png veya dosya yükleyin"
                        style={{ flex: 1 }}
                      />
                      <label className="glow-btn-secondary" style={{ padding: '10px 15px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', margin: 0, fontSize: '0.85rem' }}>
                        Dosya Seç
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setBeforeAfterData({ ...beforeAfterData, beforeImage: reader.result });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>İşlemden Sonra Görseli (Bilgisayardan veya Dosya Yolu/URL)</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type="text" 
                        value={beforeAfterData?.afterImage || ''} 
                        onChange={(e) => setBeforeAfterData({ ...beforeAfterData, afterImage: e.target.value })} 
                        placeholder="Örn: /after_engine.png veya dosya yükleyin"
                        style={{ flex: 1 }}
                      />
                      <label className="glow-btn-secondary" style={{ padding: '10px 15px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', margin: 0, fontSize: '0.85rem' }}>
                        Dosya Seç
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setBeforeAfterData({ ...beforeAfterData, afterImage: reader.result });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Örnek İnceleme Açıklaması</label>
                    <textarea 
                      rows="3"
                      value={beforeAfterData?.description || ''} 
                      onChange={(e) => setBeforeAfterData({ ...beforeAfterData, description: e.target.value })} 
                      placeholder="Görsel altındaki açıklama yazısı..."
                    />
                  </div>
                  <button 
                    type="button" 
                    className="glow-btn"
                    onClick={() => alert('Karşılaştırma slider görselleri başarıyla güncellendi!')}
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 6: BLOG POSTS */}
            {cmsSection === 'blog' && (
              <div className="cms-content-section animate-slide-up">
                <h4>Blog Yazıları Yönetimi</h4>
                <p className="section-desc-compact">Sitenin blog sayfasında yayınlanan makaleleri yönetin veya yeni bir yazı ekleyin.</p>

                <div className="cms-testimonials-scroll">
                  {blogs && blogs.map((post) => (
                    <div key={post.id} className="cms-item-card glass">
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {post.image && <img src={post.image} alt={post.title} style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }} />}
                        <div>
                          <strong>{post.title}</strong>
                          <span className="cms-badge-role">{post.category || 'Genel'} | {post.date}</span>
                          <p style={{ fontSize: '0.75rem' }}>{post.summary}</p>
                        </div>
                      </div>
                      <button className="delete-btn-cms" onClick={() => deleteBlogPost && deleteBlogPost(post.id)}>
                        <Trash size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newBlogTitle || !newBlogSummary || !newBlogContent) return;
                    const newPost = {
                      id: 'blog-' + Date.now(),
                      title: newBlogTitle,
                      summary: newBlogSummary,
                      content: newBlogContent,
                      image: newBlogImage || '/hero_bg.png',
                      category: newBlogCategory || 'Genel',
                      date: new Date().toLocaleDateString('tr-TR'),
                      author: 'Vos74 Kadir Usta'
                    };
                    addBlogPost && addBlogPost(newPost);
                    setNewBlogTitle('');
                    setNewBlogSummary('');
                    setNewBlogContent('');
                    setNewBlogImage('/hero_bg.png');
                    setNewBlogCategory('Genel');
                    alert('Blog yazısı başarıyla eklendi!');
                  }} 
                  className="cms-inline-add-form glass"
                >
                  <h6>➕ Yeni Blog Yazısı Ekle</h6>
                  
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Başlık *</label>
                      <input 
                        type="text" 
                        placeholder="Yazı başlığı girin..." 
                        value={newBlogTitle}
                        onChange={(e) => setNewBlogTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Kategori *</label>
                      <input 
                        type="text" 
                        placeholder="Örn: Şanzıman, Mekanik, Bakım" 
                        value={newBlogCategory}
                        onChange={(e) => setNewBlogCategory(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Öne Çıkan Resim (Görsel URL / Dosya Yolu)</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type="text" 
                        placeholder="Örn: /obd_bg.png veya dosya yükleyin" 
                        value={newBlogImage}
                        onChange={(e) => setNewBlogImage(e.target.value)}
                        style={{ flex: 1 }}
                      />
                      <label className="glow-btn-secondary" style={{ padding: '10px 15px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', margin: 0, fontSize: '0.85rem' }}>
                        Dosya Seç
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setNewBlogImage(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Özet / Kısa Açıklama *</label>
                    <textarea 
                      placeholder="Kart üzerinde görünecek kısa açıklama..."
                      rows="2"
                      value={newBlogSummary}
                      onChange={(e) => setNewBlogSummary(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Tam Yazı İçeriği *</label>
                    <textarea 
                      placeholder="Blog yazısının detaylı içeriği..."
                      rows="6"
                      value={newBlogContent}
                      onChange={(e) => setNewBlogContent(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="glow-btn full-width">Blog Yazısını Yayınla</button>
                </form>
              </div>
            ) }

          </div>
        </div>
      )}

      {/* SUBTAB 6: WORKING HOURS MANAGEMENT */}
      {subTab === 'hours' && (
        <div className="hours-management-layout animate-slide-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="hours-manage-box glass" style={{ padding: '24px', borderRadius: '12px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Clock className="text-gradient" size={20} />
              <span>Çalışma Saat Dilimleri</span>
            </h4>
            <p className="section-desc-compact" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Dükkanınızın aktif olarak randevu kabul ettiği saat dilimlerini ekleyebilir veya silebilirsiniz.
            </p>
            
            <div className="hours-list-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              {workingHours && workingHours.length > 0 ? (
                workingHours.map((hour) => (
                  <div key={hour} className="hour-card glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', transition: 'all 0.3s ease' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 'bold' }}>
                      <Clock size={14} className="text-primary" />
                      <span>{hour}</span>
                    </div>
                    <button 
                      onClick={() => deleteWorkingHour && deleteWorkingHour(hour)} 
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', transition: 'transform 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      title="Saat dilimini sil"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>Kayıtlı çalışma saati bulunmamaktadır.</p>
              )}
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (newHourInput) {
                  addWorkingHour && addWorkingHour(newHourInput);
                  setNewHourInput('');
                }
              }} 
              className="hour-add-form"
              style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '20px' }}
            >
              <h6 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>➕ Yeni Saat Dilimi Ekle</h6>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input 
                  type="time" 
                  value={newHourInput}
                  onChange={(e) => setNewHourInput(e.target.value)}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '1rem', outline: 'none' }}
                  required
                />
                <button type="submit" className="glow-btn" style={{ padding: '0 24px' }}>Ekle</button>
              </div>
            </form>
          </div>

          <div className="hours-booked-box glass" style={{ padding: '24px', borderRadius: '12px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Calendar className="text-gradient" size={20} />
              <span>Dolu Saatler & Rezervasyonlar</span>
            </h4>
            <p className="section-desc-compact" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Onayladığınız randevuların saatleri o günler için diğer müşterilere otomatik olarak kapatılır.
            </p>

            <div className="booked-slots-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto', paddingRight: '5px' }}>
              {appointments && appointments.filter(a => a.status === 'approved').length > 0 ? (
                appointments.filter(a => a.status === 'approved').map((apt) => (
                  <div key={apt.id} className="booked-slot-card glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderRadius: '10px', borderLeft: '4px solid #22c55e', background: 'rgba(34, 197, 94, 0.03)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className="plate-badge" style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{apt.plate}</span>
                        <strong style={{ fontSize: '0.95rem' }}>{apt.brand} {apt.model}</strong>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        👤 {apt.ownerName} | 🛠️ {apt.service}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 'bold', color: '#22c55e' }}>
                        <Calendar size={12} />
                        <span>{apt.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 'bold', color: '#22c55e', justifyContent: 'flex-end', marginTop: '4px' }}>
                        <Clock size={12} />
                        <span>{apt.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-secondary)' }}>
                  <Calendar size={36} className="muted-icon" style={{ marginBottom: '12px', opacity: 0.4 }} />
                  <p style={{ fontSize: '0.9rem' }}>Şu anda onaylı/dolu bir randevu saati bulunmamaktadır.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {printingCar && (
        <div className="print-invoice-modal-overlay">
          <div className="print-invoice-modal print-area glass-card">
            {/* Modal Header for UI display, hidden in print */}
            <div className="print-modal-header no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} className="text-gradient" />
                <h4 style={{ margin: 0 }}>Servis Fişi Önizleme</h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', userSelect: 'none', margin: 0 }}>
                  <input 
                    type="checkbox" 
                    checked={includeWarrantyNote} 
                    onChange={(e) => setIncludeWarrantyNote(e.target.checked)} 
                    style={{ cursor: 'pointer' }}
                  />
                  <span>Garanti Notunu Ekle (1 Yıl)</span>
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => window.print()} 
                    className="glow-btn"
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    <Check size={16} /> Yazdır / PDF Kaydet
                  </button>
                  <button 
                    onClick={() => setPrintingCar(null)} 
                    className="glow-btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    <X size={16} /> Kapat
                  </button>
                </div>
              </div>
            </div>

            {/* Printable Invoice Body */}
            <div className="invoice-container">
              {/* Receipt Header */}
              <div className="invoice-header">
                <div className="invoice-company-details">
                  <div className="invoice-logo">⚙️ Vos74 Özel Servis</div>
                  <p className="invoice-subtitle">Dijital Servis Takip ve Onarım Fişi</p>
                  <small>E-Posta: info@vos74.com | Tel: +90 532 637 39 78</small>
                </div>
                <div className="invoice-meta">
                  <h3>SERVİS FİŞİ</h3>
                  <p><strong>Fiş No:</strong> DS-{printingCar.id}{Date.now().toString().slice(-4)}</p>
                  <p><strong>Tarih:</strong> {new Date().toLocaleDateString('tr-TR')}</p>
                </div>
              </div>

              <hr className="invoice-divider" />

              {/* Customer and Vehicle Info */}
              <div className="invoice-details-grid">
                <div className="details-col">
                  <h5>Müşteri Bilgileri</h5>
                  <p><strong>Adı Soyadı:</strong> {printingCar.owner}</p>
                  <p><strong>Telefon:</strong> {printingCar.phone}</p>
                </div>
                <div className="details-col">
                  <h5>Araç Bilgileri</h5>
                  <p><strong>Plaka:</strong> <span className="plate-badge" style={{ display: 'inline-block', verticalAlign: 'middle', background: '#000', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{printingCar.plate}</span></p>
                  <p><strong>Araç Modeli:</strong> {printingCar.model}</p>
                  <p><strong>Servis Durumu:</strong> {printingCar.status === 'hazir' ? 'Teslime Hazır' : 'İşlem Görmekte'}</p>
                </div>
              </div>

              {/* Itemized Invoice Table */}
              <table className="invoice-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '8px 0' }}>Sıra</th>
                    <th style={{ padding: '8px 0' }}>Yapılan İşlem / Parça</th>
                    <th style={{ padding: '8px 0' }}>Tür</th>
                    <th style={{ padding: '8px 0', textAlign: 'right' }}>Fiyat (TL)</th>
                  </tr>
                </thead>
                <tbody>
                  {printingCar.jobsDone && printingCar.jobsDone.map((job, idx) => (
                    <tr key={`job-${idx}`} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '8px 0' }}>{idx + 1}</td>
                      <td style={{ padding: '8px 0' }}>{typeof job === 'object' ? job.name : job}</td>
                      <td style={{ padding: '8px 0' }}>Mekanik / İşçilik</td>
                      <td style={{ padding: '8px 0', textAlign: 'right' }}>{typeof job === 'object' ? job.cost : 0} TL</td>
                    </tr>
                  ))}
                  {printingCar.extraItems && printingCar.extraItems.map((item, idx) => (
                    <tr key={`extra-${idx}`} style={{ borderBottom: '1px solid var(--border-color)', fontStyle: 'italic' }}>
                      <td style={{ padding: '8px 0' }}>{(printingCar.jobsDone?.length || 0) + idx + 1}</td>
                      <td style={{ padding: '8px 0' }}>➕ {item.name} (Ekstra Onaylanan)</td>
                      <td style={{ padding: '8px 0' }}>Yedek Parça / Ekstra</td>
                      <td style={{ padding: '8px 0', textAlign: 'right' }}>{item.cost} TL</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Price Calculation details */}
              <div className="invoice-summary-box" style={{ marginTop: '20px', marginLeft: 'auto', width: '300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Ara Toplam:</span>
                  <span>
                    {Math.round(
                      ((printingCar.jobsDone ? printingCar.jobsDone.reduce((sum, j) => sum + (j.cost || 0), 0) : 0) +
                       (printingCar.extraItems ? printingCar.extraItems.reduce((a, b) => a + b.cost, 0) : 0)) * 0.833
                    )} TL
                  </span>
                </div>
                <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>KDV (%20):</span>
                  <span>
                    {Math.round(
                      ((printingCar.jobsDone ? printingCar.jobsDone.reduce((sum, j) => sum + (j.cost || 0), 0) : 0) +
                       (printingCar.extraItems ? printingCar.extraItems.reduce((a, b) => a + b.cost, 0) : 0)) * 0.167
                    )} TL
                  </span>
                </div>
                <div className="summary-row grand-total" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderTop: '2px solid var(--primary)', paddingTop: '8px', fontSize: '1.2rem', color: 'var(--primary)' }}>
                  <span>Genel Toplam:</span>
                  <span>
                    {(printingCar.jobsDone ? printingCar.jobsDone.reduce((sum, j) => sum + (j.cost || 0), 0) : 0) +
                     (printingCar.extraItems ? printingCar.extraItems.reduce((a, b) => a + b.cost, 0) : 0)} TL
                  </span>
                </div>
              </div>

              {/* Footer notes */}
              <div className="invoice-footer" style={{ marginTop: '40px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Açıklamalar & Notlar:</p>
                <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <li>Bu fiş dijital servis takip sistemi üzerinden otomatik olarak oluşturulmuştur.</li>
                  {includeWarrantyNote && (
                    <li>Takılan yedek parçalar ve işçilikler 1 yıl boyunca servisimiz garantisi altındadır.</li>
                  )}
                </ul>
                <div className="signature-area" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                  <div className="sig-box" style={{ width: '200px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '30px' }}>Servis Sorumlusu (Usta)</p>
                    <div style={{ borderBottom: '1px solid var(--border-color)', margin: '10px 0' }}></div>
                    <small style={{ color: 'var(--text-muted)' }}>İmza / Kaşe</small>
                  </div>
                  <div className="sig-box" style={{ width: '200px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '30px' }}>Müşteri</p>
                    <div style={{ borderBottom: '1px solid var(--border-color)', margin: '10px 0' }}></div>
                    <small style={{ color: 'var(--text-muted)' }}>İmza</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
