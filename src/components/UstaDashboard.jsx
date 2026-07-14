import React, { useState } from 'react';
import { 
  Calendar, Wrench, Plus, Check, X, Shield, PlusCircle, Trash, Search, 
  DollarSign, Package, Edit3, UserPlus, Image, MessageSquare, Settings2,
  Share2, FileText, Clock, Sparkles, Gift, CreditCard
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
  updateRepairLaborCost,
  updateRepairCustomerDemands,
  addPendingRequest, 
  addActiveRepair,
  updateRepairBayAndUsta,
  deleteActiveRepair,
  listings, 
  addMarketplaceListing,
  deleteMarketplaceListing,
  
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
  campaigns,
  setCampaigns,
  customerCards,
  deleteCustomerCard,
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
  const [searchCardText, setSearchCardText] = useState('');

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
  
  // State for creating new active repair (job) directly
  const [showAddRepairForm, setShowAddRepairForm] = useState(false);
  const [newRepairPlate, setNewRepairPlate] = useState('');
  const [newRepairBrand, setNewRepairBrand] = useState('Volkswagen');
  const [newRepairModel, setNewRepairModel] = useState('');
  const [newRepairYear, setNewRepairYear] = useState('2018');
  const [newRepairOwner, setNewRepairOwner] = useState('');
  const [newRepairPhone, setNewRepairPhone] = useState('');
  const [newRepairService, setNewRepairService] = useState('');
  const [newRepairCost, setNewRepairCost] = useState('');
  const [newRepairBay, setNewRepairBay] = useState('lift1');
  const [newRepairUsta, setNewRepairUsta] = useState('');

  // Extra detailed receipt fields
  const [newRepairKm, setNewRepairKm] = useState('');
  const [newRepairChassis, setNewRepairChassis] = useState('');
  const [newRepairMotorNo, setNewRepairMotorNo] = useState('');
  const [newRepairBroughtBy, setNewRepairBroughtBy] = useState('');
  const [newRepairAdvisor, setNewRepairAdvisor] = useState('İbrahim BALTA');
  const [showExtraInputs, setShowExtraInputs] = useState(false);

  React.useEffect(() => {
    if (team && team.length > 0 && !newRepairUsta) {
      setNewRepairUsta(team[0].name);
    }
  }, [team]);

  const handleCreateActiveRepair = (e) => {
    e.preventDefault();
    if (!newRepairPlate || !newRepairOwner || !newRepairPhone) return;

    const newId = activeRepairs.length > 0 ? Math.max(...activeRepairs.map(r => Number(r.id) || 0)) + 1 : 1;
    const modelFull = `${newRepairBrand} ${newRepairModel} (${newRepairYear})`;
    const costVal = Number(newRepairCost) || 0;

    const newRepair = {
      id: newId,
      plate: newRepairPlate.toUpperCase().trim(),
      model: modelFull,
      owner: newRepairOwner,
      phone: newRepairPhone,
      status: 'kabul',
      baseCost: costVal,
      jobsDone: newRepairService ? [{ name: newRepairService, cost: costVal }] : [],
      extraItems: [],
      laborCost: 0,
      customerDemands: newRepairService || '',
      pendingApproval: null,
      deliveryTime: 'İnceleme Sonrası Belirlenecek',
      bayId: newRepairBay,
      assignedUsta: newRepairUsta || (team[0]?.name || ''),
      km: newRepairKm || '105.437',
      chassis: newRepairChassis.toUpperCase().trim() || 'WUW222612244008293',
      motorNo: newRepairMotorNo.toUpperCase().trim() || 'CJZC12926',
      broughtBy: newRepairBroughtBy || newRepairOwner,
      advisor: newRepairAdvisor || 'İbrahim BALTA'
    };

    if (addActiveRepair) {
      addActiveRepair(newRepair);
      setNewRepairPlate('');
      setNewRepairModel('');
      setNewRepairOwner('');
      setNewRepairPhone('');
      setNewRepairService('');
      setNewRepairCost('');
      setNewRepairKm('');
      setNewRepairChassis('');
      setNewRepairMotorNo('');
      setNewRepairBroughtBy('');
      setNewRepairAdvisor('İbrahim BALTA');
      setShowExtraInputs(false);
      setShowAddRepairForm(false);
      alert(`${newRepair.plate} plakalı araç aktif işlere eklendi!`);
    }
  };
  const [newExtraItemName, setNewExtraItemName] = useState('');
  const [newExtraItemCost, setNewExtraItemCost] = useState('');
  const [extraItemPhone, setExtraItemPhone] = useState('');
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

  // 7. New Campaign form state
  const [newCampTitle, setNewCampTitle] = useState('');
  const [newCampDesc, setNewCampDesc] = useState('');
  const [newCampImage, setNewCampImage] = useState('/obd_bg.png');
  const [newCampLink, setNewCampLink] = useState('appointment');
  const [newCampButtonText, setNewCampButtonText] = useState('Hemen Randevu Al');
  const [newCampActive, setNewCampActive] = useState(true);

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

      // Send WhatsApp notification to the customer
      const car = activeRepairs.find(c => c.id === id);
      const recipientPhone = extraItemPhone || (car ? car.phone : '');
      if (car && recipientPhone) {
        // Format phone number for WhatsApp (remove spaces, dashes, leading 0, add 90 prefix)
        let phoneClean = recipientPhone.replace(/[\s\-\(\)]/g, '');
        if (phoneClean.startsWith('0')) phoneClean = '90' + phoneClean.substring(1);
        if (!phoneClean.startsWith('90') && !phoneClean.startsWith('+')) phoneClean = '90' + phoneClean;
        phoneClean = phoneClean.replace('+', '');

        const jobsTotal = car.jobsDone ? car.jobsDone.reduce((sum, j) => sum + (j.cost || 0), 0) : 0;
        const extrasTotal = car.extraItems ? car.extraItems.reduce((sum, j) => sum + (j.cost || 0), 0) : 0;
        const currentTotal = jobsTotal + extrasTotal;

        const message = `🔧 *Vos74 VAG Özel Servis - Ek Onarım Onay Talebi*

Sayın *${car.owner}*,

*${car.plate}* plakalı *${car.model}* aracınızda devam eden servis işlemleri sırasında ek bir onarım/parça ihtiyacı tespit edilmiştir.

━━━━━━━━━━━━━━━━
📋 *Ek İşlem Detayı:*
▸ ${newExtraItemName}
▸ Tahmini Maliyet: *${parseFloat(newExtraItemCost).toLocaleString('tr-TR')} TL*

💰 *Mevcut Toplam:* ${currentTotal.toLocaleString('tr-TR')} TL
💰 *Ek İşlem Sonrası Tahmini:* ${(currentTotal + parseFloat(newExtraItemCost)).toLocaleString('tr-TR')} TL
━━━━━━━━━━━━━━━━

Bu işlemin yapılabilmesi için onayınız gerekmektedir. Lütfen bu mesajı yanıtlayarak *ONAY* veya *RED* bilgisi veriniz.

📞 Sorularınız için: 0532 637 39 78
🌐 Araç takip: vos74.com.tr

Teşekkür ederiz.
_Vos74 VAG Grubu Özel Servis_`;

        const whatsappUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }

      setNewExtraItemName('');
      setNewExtraItemCost('');
      setExtraItemPhone('');
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

  // 7. Campaign management
  const addCampaign = (e) => {
    e.preventDefault();
    if (!newCampTitle || !newCampImage) return;

    const newCamp = {
      id: 'camp-' + Date.now(),
      title: newCampTitle,
      description: newCampDesc,
      image: newCampImage,
      link: newCampLink,
      buttonText: newCampButtonText,
      active: newCampActive
    };

    setCampaigns([newCamp, ...(campaigns || [])]);
    setNewCampTitle('');
    setNewCampDesc('');
    setNewCampImage('/obd_bg.png');
    setNewCampLink('appointment');
    setNewCampButtonText('Hemen Randevu Al');
    setNewCampActive(true);
    alert('Kampanya başarıyla eklendi!');
  };

  const deleteCampaign = (id) => {
    if (window.confirm('Bu kampanyayı silmek istediğinize emin misiniz?')) {
      setCampaigns((campaigns || []).filter(c => c.id !== id));
    }
  };

  const toggleCampaignActive = (id) => {
    setCampaigns((campaigns || []).map(c => c.id === id ? { ...c, active: !c.active } : c));
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
          <span>Araç Geçmişi</span>
        </button>

        <button 
          className={`dash-subtab-btn ${subTab === 'customerCards' ? 'active' : ''}`}
          onClick={() => setSubTab('customerCards')}
        >
          <CreditCard size={16} />
          <span>Müşteri Kartları ({customerCards ? customerCards.length : 0})</span>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', gridColumn: '1 / -1' }}>
          
          {/* Add Repair Toggle Button & Form */}
          <div className="glass-card" style={{ padding: '20px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wrench className="text-primary" size={20} />
                <span>Atölye İş Takibi</span>
              </h4>
              <button 
                onClick={() => setShowAddRepairForm(!showAddRepairForm)} 
                className="glow-btn"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.85rem' }}
              >
                <Plus size={16} />
                <span>{showAddRepairForm ? 'Formu Kapat' : 'Yeni İş Girişi Ekle'}</span>
              </button>
            </div>

            {showAddRepairForm && (
              <form onSubmit={handleCreateActiveRepair} className="admin-form animate-slide-up" style={{ marginTop: '20px', borderTop: '1px dashed var(--border-color)', paddingTop: '20px' }}>
                <h5 style={{ margin: '0 0 15px 0', fontSize: '1.5rem', color: 'var(--primary)' }}>Yeni Araç ve İş Kabul Formu</h5>
                
                <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Araç Plakası *</label>
                    <input 
                      type="text" 
                      placeholder="Örn: 74VS074" 
                      value={newRepairPlate}
                      onChange={(e) => setNewRepairPlate(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Müşteri Adı Soyadı *</label>
                    <input 
                      type="text" 
                      placeholder="Örn: Ahmet Yılmaz" 
                      value={newRepairOwner}
                      onChange={(e) => setNewRepairOwner(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Müşteri Telefon Numarası *</label>
                    <input 
                      type="tel" 
                      placeholder="Örn: 0532 123 45 67" 
                      value={newRepairPhone}
                      onChange={(e) => setNewRepairPhone(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Araç Markası *</label>
                    <select 
                      value={newRepairBrand} 
                      onChange={(e) => setNewRepairBrand(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }}
                    >
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Audi">Audi</option>
                      <option value="Seat">Seat</option>
                      <option value="Skoda">Skoda</option>
                      <option value="Fiat">Fiat</option>
                      <option value="Renault">Renault</option>
                      <option value="Ford">Ford</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes">Mercedes</option>
                      <option value="Opel">Opel</option>
                      <option value="Peugeot">Peugeot</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Araç Modeli *</label>
                    <input 
                      type="text" 
                      placeholder="Örn: Golf 7 1.6 TDI" 
                      value={newRepairModel}
                      onChange={(e) => setNewRepairModel(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Model Yılı *</label>
                    <select 
                      value={newRepairYear} 
                      onChange={(e) => setNewRepairYear(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }}
                    >
                      {Array.from({ length: 25 }, (_, i) => 2026 - i).map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Yapılacak İlk İşlem / Şikayet</label>
                    <input 
                      type="text" 
                      placeholder="Örn: Periyodik Bakım Yapılacak" 
                      value={newRepairService}
                      onChange={(e) => setNewRepairService(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>İşlem Ücreti (TL)</label>
                    <input 
                      type="number" 
                      placeholder="Örn: 2500" 
                      value={newRepairCost}
                      onChange={(e) => setNewRepairCost(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                    />
                  </div>
                </div>

                <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Atanacak Lift / İstasyon *</label>
                    <select 
                      value={newRepairBay} 
                      onChange={(e) => setNewRepairBay(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }}
                    >
                      <option value="lift1">Lift 1 (Mekanik)</option>
                      <option value="lift2">Lift 2 (Motor)</option>
                      <option value="lift3">Lift 3 (Hızlı Bakım)</option>
                      <option value="electric">İstasyon 4 (Oto Elektrik)</option>
                      <option value="paint">Boya Fırını & Estetik</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Görevli Usta *</label>
                    <select 
                      value={newRepairUsta} 
                      onChange={(e) => setNewRepairUsta(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }}
                    >
                      {team.map(t => (
                        <option key={t.id} value={t.name}>{t.name} ({t.role.split(' ')[0]})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Kilometre (KM)</label>
                    <input 
                      type="text" 
                      placeholder="Örn: 105.437" 
                      value={newRepairKm}
                      onChange={(e) => setNewRepairKm(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Şase Numarası</label>
                    <input 
                      type="text" 
                      placeholder="Örn: WUW222612244008293" 
                      value={newRepairChassis}
                      onChange={(e) => setNewRepairChassis(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                    />
                  </div>
                </div>

                <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Motor Numarası</label>
                    <input 
                      type="text" 
                      placeholder="Örn: CJZC12926" 
                      value={newRepairMotorNo}
                      onChange={(e) => setNewRepairMotorNo(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Aracı Getiren Kişi</label>
                    <input 
                      type="text" 
                      placeholder="Müşteriden farklıysa girin" 
                      value={newRepairBroughtBy}
                      onChange={(e) => setNewRepairBroughtBy(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                    />
                  </div>
                </div>

                <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Servis Danışmanı</label>
                    <input 
                      type="text" 
                      placeholder="Örn: İbrahim BALTA" 
                      value={newRepairAdvisor}
                      onChange={(e) => setNewRepairAdvisor(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                    />
                  </div>
                </div>

                <button type="submit" className="glow-btn" style={{ width: '100%', padding: '12px', fontSize: '1rem', fontWeight: 'bold' }}>
                  Aracı Atölyeye Kabul Et (Aktif İşlere Ekle)
                </button>
              </form>
            )}
          </div>

          <div className="repairs-dashboard-grid">
          {activeRepairs.length > 0 ? (
            activeRepairs.map((car) => (
              <div className="glass-card repair-manage-card" key={car.id}>
                <div className="manage-card-header">
                  <div>
                    <span className="plate-badge-large">{car.plate}</span>
                    <h4>{car.model}</h4>
                    <span className="owner-txt">Müşteri: {car.owner} ({car.phone})</span>
                    
                    {/* Dynamic Lift and Usta Selectors */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '12px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }} className="no-print">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Atanan Alan / Lift</label>
                        <select
                          value={car.bayId || 'lift1'}
                          onChange={(e) => updateRepairBayAndUsta && updateRepairBayAndUsta(car.id, e.target.value, car.assignedUsta || (team[0]?.name || ''))}
                          style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.8rem', outline: 'none', width: '100%' }}
                        >
                          <option value="lift1">Lift 1 (Mekanik)</option>
                          <option value="lift2">Lift 2 (Motor)</option>
                          <option value="lift3">Lift 3 (Hızlı Bakım)</option>
                          <option value="electric">İstasyon 4 (Oto Elektrik)</option>
                          <option value="paint">Boya Fırını & Estetik</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Görevli Usta</label>
                        <select
                          value={car.assignedUsta || (team[0]?.name || '')}
                          onChange={(e) => updateRepairBayAndUsta && updateRepairBayAndUsta(car.id, car.bayId || 'lift1', e.target.value)}
                          style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.8rem', outline: 'none', width: '100%' }}
                        >
                          {team.map(t => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="price-tag-big text-gradient">
                    {(car.jobsDone ? car.jobsDone.reduce((sum, j) => sum + (j.cost || 0), 0) : 0) + (car.extraItems ? car.extraItems.reduce((a, b) => a + b.cost, 0) : 0) + (car.laborCost || 0)} TL
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

                <div className="manage-jobs-box glass" style={{ marginBottom: '16px' }}>
                  <h6 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageSquare size={14} className="text-primary" />
                    <span>Müşteri Talepleri / Şikayetleri</span>
                  </h6>
                  <textarea
                    rows="3"
                    placeholder="Örn:&#10;Sağ salıncak değişecek&#10;Şanzıman yağı kontrol edilecek"
                    value={car.customerDemands || ''}
                    onChange={(e) => updateRepairCustomerDemands && updateRepairCustomerDemands(car.id, e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  />
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

                  <div className="labor-cost-input-row" style={{ marginTop: '15px', borderTop: '1px dashed var(--border-color)', paddingTop: '12px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Toptan İşçilik Ücreti (TL)</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="number" 
                        placeholder="İşçilik Ücreti (TL)..."
                        value={car.laborCost || ''}
                        onChange={(e) => updateRepairLaborCost && updateRepairLaborCost(car.id, e.target.value)}
                        style={{ flexGrow: 1, height: '36px', padding: '0 10px', fontSize: '0.9rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                      />
                    </div>
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
                        <div className="extra-approval-form glass" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Müşteri WhatsApp Numarası</label>
                            <input 
                              type="tel" 
                              placeholder="WhatsApp No (Örn: 05321234567)" 
                              value={extraItemPhone}
                              onChange={(e) => setExtraItemPhone(e.target.value)}
                              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.85rem' }}
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
                              onClick={() => {
                                setActiveExtraFormId(null);
                                setExtraItemPhone('');
                              }}
                            >
                              Vazgeç
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button 
                          className="glow-btn-secondary full-width"
                          onClick={() => {
                            setActiveExtraFormId(car.id);
                            setExtraItemPhone(car.phone || '');
                          }}
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

                <button 
                  className="glow-btn-danger full-width"
                  style={{ 
                    marginTop: '8px', 
                    justifyContent: 'center', 
                    background: '#ef4444', 
                    border: 'none', 
                    color: '#fff', 
                    fontSize: '0.8rem', 
                    padding: '8px 12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.2)',
                    fontWeight: '600'
                  }}
                  onClick={() => {
                    if (window.confirm(`${car.plate} plakalı aracın kaydını tamamen silmek istediğinize emin misiniz?`)) {
                      deleteActiveRepair && deleteActiveRepair(car.id);
                    }
                  }}
                >
                  <Trash size={14} />
                  <span>Kabul Formunu Sil / İşi İptal Et</span>
                </button>

                {car.status === 'hazir' && (
                  <button 
                    className="glow-btn full-width"
                    style={{ marginTop: '8px', justifyContent: 'center', background: '#22c55e', border: 'none', boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)' }}
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
                  <button 
                    type="button"
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm(`${item.title} ilanını silmek istediğinize emin misiniz?`)) {
                        deleteMarketplaceListing && deleteMarketplaceListing(item.id);
                      }
                    }}
                    title="İlanı Sil"
                  >
                    <Trash size={15} />
                  </button>
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

      {/* SUBTAB: CUSTOMER LOYALTY CARDS (MÜŞTERİ KARTLARI) */}
      {subTab === 'customerCards' && (
        <div className="customer-cards-tab-layout animate-slide-up" style={{ padding: '24px', borderRadius: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', fontSize: '1.25rem' }}>
                <CreditCard className="text-gradient" size={22} />
                <span>Kayıtlı Müşteri VIP İndirim Kartları</span>
              </h4>
              <p className="section-desc-compact" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Siteden oluşturulan VIP müşteri indirim kartlarının listesi. Bu kart sahiplerine servis işçiliklerinde %10 indirim uygulanır.
              </p>
            </div>
            
            {/* Search Input */}
            <div className="search-box-cms" style={{ position: 'relative', width: '300px' }}>
              <input 
                type="text" 
                placeholder="Plaka veya Müşteri Adı Ara..." 
                value={searchCardText}
                onChange={(e) => setSearchCardText(e.target.value)}
                style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
              />
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div className="table-responsive" style={{ overflowX: 'auto' }}>
            <table className="appointments-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '12px 16px' }}>Kart No / ID</th>
                  <th style={{ padding: '12px 16px' }}>Müşteri Adı Soyadı</th>
                  <th style={{ padding: '12px 16px' }}>Araç Plakası</th>
                  <th style={{ padding: '12px 16px' }}>Telefon</th>
                  <th style={{ padding: '12px 16px' }}>Kayıt Tarihi</th>
                  <th style={{ padding: '12px 16px', textRadius: 'center', textAlign: 'center' }}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {customerCards && customerCards.length > 0 ? (
                  customerCards
                    .filter(card => {
                      const query = searchCardText.toLowerCase().trim();
                      if (!query) return true;
                      return (
                        card.name.toLowerCase().includes(query) ||
                        card.plate.toLowerCase().includes(query) ||
                        card.phone.includes(query) ||
                        card.id.toLowerCase().includes(query)
                      );
                    })
                    .map((card) => (
                      <tr key={card.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem', transition: 'background-color 0.2s' }} className="table-row-hover">
                        <td style={{ padding: '14px 16px', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{card.id}</td>
                        <td style={{ padding: '14px 16px', fontWeight: 600 }}>{card.name}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span className="plate-badge" style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{card.plate}</span>
                        </td>
                        <td style={{ padding: '14px 16px' }}>{card.phone}</td>
                        <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>{card.createdAt || 'Bilinmiyor'}</td>
                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                          <button 
                            type="button"
                            className="delete-btn-cms" 
                            style={{ margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'auto' }}
                            onClick={() => {
                              if (window.confirm(`${card.name} adına kayıtlı ${card.plate} plakalı indirim kartını silmek istediğinize emin misiniz?`)) {
                                deleteCustomerCard && deleteCustomerCard(card.id);
                              }
                            }}
                            title="Kartı Sil"
                          >
                            <Trash size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>Kayıtlı VIP müşteri kartı bulunmamaktadır.</td>
                  </tr>
                )}
              </tbody>
            </table>
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
            <button 
              className={`cms-nav-btn ${cmsSection === 'campaigns' ? 'active' : ''}`}
              onClick={() => setCmsSection('campaigns')}
            >
              <Gift size={14} />
              <span>Kampanyalar</span>
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

            {/* SECTION 7: CAMPAIGNS */}
            {cmsSection === 'campaigns' && (
              <div className="cms-content-section animate-slide-up">
                <h4>Firma Kampanyaları Yönetimi</h4>
                <p className="section-desc-compact">Sitede açılan popup penceredeki kampanyaları, görsellerini ve buton yönlendirmelerini düzenleyin.</p>

                {/* Campaigns List */}
                <div className="cms-grid-items">
                  {campaigns && campaigns.map((camp) => (
                    <div key={camp.id} className="cms-item-card glass" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {camp.image && <img src={camp.image} alt={camp.title} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />}
                        <div style={{ flex: 1 }}>
                          <strong>{camp.title}</strong>
                          <span className={`cms-badge-role ${camp.active ? 'active-badge' : 'inactive-badge'}`} style={{ marginLeft: '8px', background: camp.active ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: camp.active ? '#22c55e' : '#ef4444', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>
                            {camp.active ? 'Aktif' : 'Pasif'}
                          </span>
                          <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>{camp.description}</p>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Buton: {camp.buttonText || 'Yok'} | Yönlendirme: {camp.link}</span>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '10px', marginTop: '5px' }}>
                        <button 
                          type="button"
                          className="glow-btn-secondary" 
                          style={{ padding: '4px 10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', width: 'auto' }}
                          onClick={() => toggleCampaignActive(camp.id)}
                        >
                          {camp.active ? 'Duraklat' : 'Aktifleştir'}
                        </button>
                        <button type="button" className="delete-btn-cms" onClick={() => deleteCampaign(camp.id)}>
                          <Trash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {(!campaigns || campaigns.length === 0) && (
                    <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>Kayıtlı kampanya bulunmamaktadır.</p>
                  )}
                </div>

                {/* Add New Campaign Form */}
                <form onSubmit={addCampaign} className="cms-inline-add-form glass">
                  <h6>➕ Yeni Kampanya Ekle</h6>
                  
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Kampanya Başlığı *</label>
                      <input 
                        type="text" 
                        placeholder="Kampanya başlığını girin..." 
                        value={newCampTitle}
                        onChange={(e) => setNewCampTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Buton Metni</label>
                      <input 
                        type="text" 
                        placeholder="Örn: Hemen Randevu Al" 
                        value={newCampButtonText}
                        onChange={(e) => setNewCampButtonText(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Buton Yönlendirme Hedefi</label>
                      <select 
                        value={newCampLink} 
                        onChange={(e) => setNewCampLink(e.target.value)}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }}
                      >
                        <option value="appointment">Randevu Sayfası</option>
                        <option value="tracker">Araç Sorgulama (Tracker)</option>
                        <option value="marketplace">Marketplace</option>
                        <option value="blog">Blog</option>
                        <option value="https://wa.me/905326373978">WhatsApp İletişim</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '25px' }}>
                      <input 
                        type="checkbox" 
                        id="campActiveCheckbox"
                        checked={newCampActive}
                        onChange={(e) => setNewCampActive(e.target.checked)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <label htmlFor="campActiveCheckbox" style={{ cursor: 'pointer', margin: 0 }}>Sitede Gösterilsin (Aktif)</label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Kampanya Resmi Seçin (Bilgisayardan veya Dosya Yolu/URL) *</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type="text" 
                        placeholder="Örn: /obd_bg.png veya dosya yükleyin" 
                        value={newCampImage}
                        onChange={(e) => setNewCampImage(e.target.value)}
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
                                setNewCampImage(reader.result);
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
                    <label>Açıklama / Detay Metni *</label>
                    <textarea 
                      placeholder="Kampanya detaylarını ve şartlarını buraya yazın..."
                      rows="3"
                      value={newCampDesc}
                      onChange={(e) => setNewCampDesc(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="glow-btn full-width">Kampanyayı Listeye Ekle</button>
                </form>
              </div>
            )}

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
            <div className="print-modal-header no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} style={{ color: '#06b6d4' }} />
                <h4 style={{ margin: 0, color: '#111827', fontWeight: 'bold' }}>Servis Fişi Önizleme</h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', userSelect: 'none', margin: 0, color: '#111827', fontWeight: 'bold' }}>
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
                    style={{ 
                      padding: '8px 16px', 
                      fontSize: '0.85rem', 
                      background: '#ef4444', 
                      color: '#ffffff', 
                      border: 'none', 
                      borderRadius: '6px', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      fontWeight: 'bold'
                    }}
                  >
                    <X size={16} /> Kapat
                  </button>
                </div>
              </div>
            </div>

            {/* Printable Invoice Body */}
            {(() => {
              const isLabor = (name) => {
                const lower = (name || '').toLowerCase();
                return lower.includes('işçilik') || lower.includes('işcilik') || lower.includes('iscilik') || lower.includes('labor') || lower.includes('ustalık') || lower.includes('ücreti') || lower.includes('sökme') || lower.includes('takma');
              };
              const demandsList = (printingCar.customerDemands || '')
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);
              const partsTotal = 
                (printingCar.jobsDone ? printingCar.jobsDone.filter(j => !isLabor(j.name)).reduce((sum, j) => sum + (j.cost || 0), 0) : 0) +
                (printingCar.extraItems ? printingCar.extraItems.filter(j => !isLabor(j.name)).reduce((sum, j) => sum + (j.cost || 0), 0) : 0);
              const laborTotal = 
                (printingCar.laborCost || 0) +
                (printingCar.jobsDone ? printingCar.jobsDone.filter(j => isLabor(j.name)).reduce((sum, j) => sum + (j.cost || 0), 0) : 0) +
                (printingCar.extraItems ? printingCar.extraItems.filter(j => isLabor(j.name)).reduce((sum, j) => sum + (j.cost || 0), 0) : 0);
              const grandTotal = partsTotal + laborTotal;
              const hasLaborRow = (printingCar.laborCost || 0) > 0;
              const jobsLength = (printingCar.jobsDone || []).length;
              const extraLength = (printingCar.extraItems || []).length;
              const laborRowCount = hasLaborRow ? 1 : 0;
              const totalRowsCount = jobsLength + extraLength + laborRowCount;

              return (
                <div className="invoice-container print-paper-invoice" style={{ fontFamily: 'Arial, sans-serif', color: '#000', background: '#fff', padding: '0', boxSizing: 'border-box' }}>
                  
                  {/* Top Double-Column Header Table */}
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>
                    <tbody>
                      <tr>
                        <td style={{ width: '55%', border: '1px solid #000', padding: '8px', verticalAlign: 'top' }}>
                          <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 'bold', color: '#000', textTransform: 'uppercase' }}>VOLKSWAGEN ÖZEL SERVİS</h3>
                          <p style={{ margin: '2px 0', fontSize: '0.8rem', color: '#000' }}><strong>{printingCar.assignedUsta || 'Kadir GÜL'}:</strong> 0532 637 39 78</p>
                          <p style={{ margin: '2px 0', fontSize: '0.8rem', color: '#000', lineHeight: '1.3' }}><strong>ADRES:</strong> Gölbucağı Mah. Yeni Sanayi Sitesi Cami Sok. 13 / BARTIN</p>
                        </td>
                        <td style={{ width: '45%', border: '1px solid #000', padding: '8px', verticalAlign: 'top', position: 'relative' }}>
                          <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center', color: '#000', textTransform: 'uppercase' }}>ARAÇ KABUL FORMU</h3>
                          
                          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '4px' }}>
                            <tbody>
                              <tr>
                                <td style={{ border: '1px solid #000', padding: '3px 6px', fontSize: '0.7rem', width: '50%', color: '#000' }}>İş Emri Sıra No</td>
                                <td style={{ border: '1px solid #000', padding: '3px 6px', fontSize: '0.7rem', fontWeight: 'bold', color: '#000' }}>DS-{printingCar.id}</td>
                              </tr>
                              <tr>
                                <td style={{ border: '1px solid #000', padding: '3px 6px', fontSize: '0.7rem', color: '#000' }}>Kabul Tarihi</td>
                                <td style={{ border: '1px solid #000', padding: '3px 6px', fontSize: '0.7rem', color: '#000' }}>{new Date().toLocaleDateString('tr-TR')}</td>
                              </tr>
                              <tr>
                                <td style={{ border: '1px solid #000', padding: '3px 6px', fontSize: '0.7rem', color: '#000' }}>Teslim Tarihi</td>
                                <td style={{ border: '1px solid #000', padding: '3px 6px', fontSize: '0.7rem', color: '#000' }}>{printingCar.deliveryTime && printingCar.deliveryTime.includes(':') ? new Date().toLocaleDateString('tr-TR') : (printingCar.deliveryTime || new Date().toLocaleDateString('tr-TR'))}</td>
                              </tr>
                            </tbody>
                          </table>

                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8px' }}>
                            <img src="/logo.png" alt="Vos74" style={{ maxHeight: '40px', width: 'auto', objectFit: 'contain' }} />
                            <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#ef4444', margin: '2px 0 0 0', letterSpacing: '0.5px' }}>VOLKSWAGEN ÖZEL SERVİS</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Araç Bilgileri Grid Table */}
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000', borderTop: 'none' }}>
                    <tbody>
                      <tr>
                        <td colSpan="4" style={{ background: '#e5e7eb', border: '1px solid #000', textAlign: 'center', fontWeight: 'bold', fontSize: '0.8rem', padding: '4px', color: '#000' }}>ARAÇ BİLGİLERİ</td>
                      </tr>
                      <tr>
                        <td style={{ width: '18%', border: '1px solid #000', padding: '5px 8px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f9fafb', color: '#000' }}>Araç Plakası</td>
                        <td style={{ width: '32%', border: '1px solid #000', padding: '5px 8px', fontSize: '0.8rem', fontWeight: 'bold', color: '#000' }}>{printingCar.plate}</td>
                        <td style={{ width: '18%', border: '1px solid #000', padding: '5px 8px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f9fafb', color: '#000' }}>Müşteri Adı</td>
                        <td style={{ width: '32%', border: '1px solid #000', padding: '5px 8px', fontSize: '0.8rem', color: '#000' }}>{printingCar.owner}</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f9fafb', color: '#000' }}>Kilometre</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.8rem', color: '#000' }}>{printingCar.km || '105.437'}</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f9fafb', color: '#000' }}>Telefon</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.8rem', color: '#000' }}>{printingCar.phone}</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f9fafb', color: '#000' }}>Marka / Model</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.8rem', color: '#000' }}>{printingCar.model}</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f9fafb', color: '#000' }}>Aracı Getiren</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.8rem', color: '#000' }}>{printingCar.broughtBy || printingCar.owner}</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f9fafb', color: '#000' }}>Şase No</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.8rem', fontFamily: 'monospace', color: '#000' }}>{printingCar.chassis || 'WUW222612244008293'}</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f9fafb', color: '#000' }}>Getiren Tel / İmza</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.75rem', height: '24px', verticalAlign: 'middle', color: '#000' }}>{printingCar.phone} / <span style={{ borderBottom: '1px dashed #000', display: 'inline-block', width: '70px', height: '8px' }}></span></td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f9fafb', color: '#000' }}>Motor No</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.8rem', fontFamily: 'monospace', color: '#000' }}>{printingCar.motorNo || 'CJZC12926'}</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f9fafb', color: '#000' }}>Servis Danışmanı / İmza</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.8rem', color: '#000' }}>{printingCar.advisor || 'İbrahim BALTA'} / <span style={{ borderBottom: '1px dashed #000', display: 'inline-block', width: '70px', height: '8px' }}></span></td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Müşteri Talepleri Table */}
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000', borderTop: 'none' }}>
                    <tbody>
                      <tr>
                        <td style={{ background: '#e5e7eb', border: '1px solid #000', textAlign: 'center', fontWeight: 'bold', fontSize: '0.8rem', padding: '4px', color: '#000' }}>MÜŞTERİ TALEPLERİ</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0', border: '1px solid #000' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                              {demandsList.map((demand, idx) => (
                                <tr key={`demand-${idx}`}>
                                  <td style={{ borderBottom: '1px solid #000', borderRight: '1px solid #000', width: '30px', textAlign: 'center', padding: '5px', fontSize: '0.75rem', fontWeight: 'bold', color: '#000' }}>{idx + 1}</td>
                                  <td style={{ borderBottom: '1px solid #000', padding: '5px 10px', fontSize: '0.8rem', color: '#000' }}>{demand}</td>
                                </tr>
                              ))}
                              {demandsList.length === 0 && (
                                <tr>
                                  <td style={{ padding: '8px', fontSize: '0.8rem', color: '#666', fontStyle: 'italic', textAlign: 'center' }}>Müşteri talebi bulunmamaktadır.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Fitted Parts & Labor Table */}
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000', borderTop: 'none', marginTop: '15px' }}>
                    <thead>
                      <tr style={{ background: '#e5e7eb' }}>
                        <th style={{ border: '1px solid #000', padding: '5px', fontSize: '0.7rem', width: '6%', textAlign: 'center', color: '#000' }}>S.NO</th>
                        <th style={{ border: '1px solid #000', padding: '5px', fontSize: '0.7rem', width: '44%', textAlign: 'left', color: '#000' }}>TAKILAN PARÇA / YAPILAN İŞÇİLİK</th>
                        <th style={{ border: '1px solid #000', padding: '5px', fontSize: '0.7rem', width: '12%', textAlign: 'right', color: '#000' }}>BİRİM FİYAT</th>
                        <th style={{ border: '1px solid #000', padding: '5px', fontSize: '0.7rem', width: '8%', textAlign: 'center', color: '#000' }}>ADET</th>
                        <th style={{ border: '1px solid #000', padding: '5px', fontSize: '0.7rem', width: '14%', textAlign: 'right', color: '#000' }}>İŞÇİLİK</th>
                        <th style={{ border: '1px solid #000', padding: '5px', fontSize: '0.7rem', width: '16%', textAlign: 'right', color: '#000' }}>PARÇA TOPLAM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {printingCar.jobsDone && printingCar.jobsDone.map((job, idx) => {
                        const jobName = typeof job === 'object' ? job.name : job;
                        const jobCost = typeof job === 'object' ? job.cost : 0;
                        const jobIsLabor = isLabor(jobName);
                        return (
                          <tr key={`part-${idx}`}>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', fontSize: '0.75rem', color: '#000' }}>{idx + 1}</td>
                            <td style={{ border: '1px solid #000', padding: '4px 8px', fontSize: '0.75rem', color: '#000' }}>{jobName}</td>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right', fontSize: '0.75rem', color: '#000' }}>{jobIsLabor ? '-' : `${jobCost} TL`}</td>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', fontSize: '0.75rem', color: '#000' }}>1</td>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right', fontSize: '0.75rem', color: '#000' }}>{jobIsLabor ? `${jobCost} TL` : '-'}</td>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right', fontSize: '0.75rem', fontWeight: 'bold', color: '#000' }}>{jobIsLabor ? '-' : `${jobCost} TL`}</td>
                          </tr>
                        );
                      })}
                      
                      {printingCar.extraItems && printingCar.extraItems.map((item, idx) => {
                        const globalIdx = (printingCar.jobsDone?.length || 0) + idx + 1;
                        const itemIsLabor = isLabor(item.name);
                        return (
                          <tr key={`extra-${idx}`} style={{ fontStyle: 'italic' }}>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', fontSize: '0.75rem', color: '#000' }}>{globalIdx}</td>
                            <td style={{ border: '1px solid #000', padding: '4px 8px', fontSize: '0.75rem', color: '#000' }}>➕ {item.name}</td>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right', fontSize: '0.75rem', color: '#000' }}>{itemIsLabor ? '-' : `${item.cost} TL`}</td>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', fontSize: '0.75rem', color: '#000' }}>1</td>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right', fontSize: '0.75rem', color: '#000' }}>{itemIsLabor ? `${item.cost} TL` : '-'}</td>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right', fontSize: '0.75rem', fontWeight: 'bold', color: '#000' }}>{itemIsLabor ? '-' : `${item.cost} TL`}</td>
                          </tr>
                        );
                      })}
                      
                      {/* Toptan İşçilik Row if exists */}
                      {hasLaborRow && (
                        <tr style={{ fontWeight: 'bold', background: 'rgba(6, 182, 212, 0.02)' }}>
                          <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', fontSize: '0.75rem', color: '#000' }}>
                            {jobsLength + extraLength + 1}
                          </td>
                          <td style={{ border: '1px solid #000', padding: '4px 8px', fontSize: '0.75rem', color: '#000' }}>
                            🛠️ Toptan İşçilik Ücreti
                          </td>
                          <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right', fontSize: '0.75rem', color: '#000' }}>-</td>
                          <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', fontSize: '0.75rem', color: '#000' }}>1</td>
                          <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right', fontSize: '0.75rem', color: '#000' }}>
                            {printingCar.laborCost} TL
                          </td>
                          <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right', fontSize: '0.75rem', color: '#000' }}>-</td>
                        </tr>
                      )}

                      {/* Padding empty rows to fit the receipt paper design */}
                      {Array.from({ length: Math.max(0, 10 - totalRowsCount) }).map((_, idx) => {
                        const globalIdx = totalRowsCount + idx + 1;
                        return (
                          <tr key={`empty-${idx}`} style={{ height: '22px' }}>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', fontSize: '0.75rem', color: '#999' }}>{globalIdx}</td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}></td>
                          </tr>
                        );
                      })}

                      {/* Calculations footer */}
                      <tr>
                        <td colSpan="4" style={{ border: '1px solid #000', borderBottom: 'none', borderLeft: 'none', background: 'transparent' }}></td>
                        <td style={{ border: '1px solid #000', padding: '4px 8px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f9fafb', color: '#000' }}>Parça Toplamı</td>
                        <td style={{ border: '1px solid #000', padding: '4px 8px', fontSize: '0.75rem', textAlign: 'right', fontWeight: 'bold', color: '#000' }}>
                          {partsTotal} TL
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="4" style={{ border: 'none', background: 'transparent' }}></td>
                        <td style={{ border: '1px solid #000', padding: '4px 8px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f9fafb', color: '#000' }}>İşçilik Toplamı</td>
                        <td style={{ border: '1px solid #000', padding: '4px 8px', fontSize: '0.75rem', textAlign: 'right', fontWeight: 'bold', color: '#000' }}>
                          {laborTotal} TL
                        </td>
                      </tr>
                      <tr style={{ background: '#e5e7eb' }}>
                        <td colSpan="4" style={{ border: 'none', background: 'transparent' }}></td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.75rem', fontWeight: 'bold', color: '#000' }}>Genel Toplam</td>
                        <td style={{ border: '1px solid #000', padding: '5px 8px', fontSize: '0.85rem', textAlign: 'right', fontWeight: 'bold', color: '#000' }}>
                          {grandTotal} TL
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Accept footer and signature lines */}
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#000', margin: '0 0 10px 0' }}>ARACIMA TAKILAN PARÇA VE İŞÇİLİKLERİ TARAFIMCA KABUL EDERİM</p>
                    {includeWarrantyNote && (
                      <p style={{ fontSize: '0.7rem', fontStyle: 'italic', color: '#ef4444', margin: '-5px 0 10px 0', fontWeight: 'bold' }}>* Takılan yedek parçalar ve işçilikler 1 yıl boyunca servisimiz garantisi altındadır.</p>
                    )}
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 50px', marginTop: '25px' }}>
                      <div style={{ textAlign: 'center', width: '130px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#000', display: 'block', marginBottom: '25px' }}>TESLİM ALAN</span>
                        <span style={{ borderTop: '1px solid #000', display: 'block', width: '100%', fontSize: '0.7rem', paddingTop: '3px', color: '#444' }}>İmza</span>
                      </div>
                      <div style={{ textAlign: 'center', width: '130px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#000', display: 'block', marginBottom: '25px' }}>TESLİM EDEN</span>
                        <span style={{ borderTop: '1px solid #000', display: 'block', width: '100%', fontSize: '0.7rem', paddingTop: '3px', color: '#444' }}>İmza</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>
        </div>
      )}

    </section>
  );
}
