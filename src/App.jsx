import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParticleBackground from './components/ParticleBackground';
import ScrollReveal from './components/ScrollReveal';
import WorkshopMonitor from './components/WorkshopMonitor';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import WarningLights from './components/WarningLights';
import GalleryShowcase from './components/GalleryShowcase';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import UstaTeam from './components/UstaTeam';
import Tracker from './components/Tracker';
import Appointment from './components/Appointment';
import Marketplace from './components/Marketplace';
import UstaDashboard from './components/UstaDashboard';
import Login from './components/Login';
import Footer from './components/Footer';
import './App.css';

const initialBranchDetails = {
  general: {
    id: 'general',
    name: 'Vos74 VAG Grubu Özel Servis',
    title: 'Volkswagen, Audi, Seat & Skoda Servisi',
    subtitle: 'Bartın Yeni Sanayi Sitesi\'nde VAG grubu araçlarınız için orijinal standartlarda şeffaf, garantili ve profesyonel servis hizmeti.',
    themeClass: 'theme-general',
    services: [
      { id: 'sg1', title: 'Periyodik Bakım', desc: 'Motor yağı, filtreler ve detaylı VAG grubu periyodik kontrol prosedürleri.', price: '1,500 - 3,500 TL' },
      { id: 'sg2', title: 'Fren Bakım & Değişim', desc: 'Orijinal VAG onaylı disk ve balata değişimleri, hidrolik testi ve yenileme.', price: '1,200 - 2,500 TL' },
      { id: 'sg3', title: 'ODIS/VAG-COM Teşhis', desc: 'Orijinal bayi arıza tespit cihazlarıyla bilgisayarlı arıza teşhisi ve detaylı kodlama.', price: '500 - 1,500 TL' },
      { id: 'sg4', title: 'DSG Şanzıman Onarımı', desc: 'DSG mekatronik revizyonu, kavrama değişimi ve DSG kalibrasyon işlemleri.', price: 'Dinamik Fiyat' }
    ]
  },
  mechanic: {
    id: 'mechanic',
    name: 'Motor & Ağır Mekanik',
    title: 'VAG Motor & Mekanik Atölyesi',
    subtitle: 'TSI, TDI ve TFSI motor gruplarında rektefiye, ağır bakım, zincir değişimi ve şanzıman onarımı garantili yapılır.',
    themeClass: 'theme-mechanic',
    services: [
      { id: 'sm1', title: 'Motor Rektefiye', desc: 'Motor blok rektefiyesi, piston, yatak ve sübap sıfırlama işlemleri.', price: '25,000 - 80,000 TL' },
      { id: 'sm2', title: 'DSG Kavrama & Mekatronik', desc: 'Çift kavramalı DSG şanzıman kavrama, çatal ve mekatronik kart onarımı.', price: '8,000 - 35,000 TL' },
      { id: 'sm3', title: 'Zincir Seti & Triger Değişimi', desc: 'VAG motor gruplarında sente ayarlı eksantrik zincir/kayış değişimi.', price: '5,000 - 15,000 TL' },
      { id: 'sm4', title: 'Süspansiyon & Alt Takım', desc: 'Amortisör, salıncak burçları ve yürüyen aksam onarımları.', price: '2,000 - 6,500 TL' }
    ]
  },
  electric: {
    id: 'electric',
    name: 'Elektrik & ECU Teşhis',
    title: 'Dijital Elektronik & Yazılım',
    subtitle: 'Araç beyin (ECU) programlama, elektronik modül kodlama ve akıllı elektrik tesisatı onarımları.',
    themeClass: 'theme-electric',
    services: [
      { id: 'se1', title: 'ECU Programlama & Kodlama', desc: 'Orijinal VAG ODIS cihazı ile online beyin kodlama ve yazılım güncellemesi.', price: '3,000 - 10,000 TL' },
      { id: 'se2', title: 'Gizli Özellik Açma', desc: 'Destekleyen VAG grubu araçlarda kadran selamlama, Amerikan park vb. aktivasyonu.', price: '500 - 1,500 TL' },
      { id: 'se3', title: 'Akü Değişim & Kodlama', desc: 'AGM/EFB akülerin montajı ve araca şarj optimizasyonu için kodlanması.', price: '2,500 - 7,000 TL' },
      { id: 'se4', title: 'Tesisat & Sensör Tamiri', desc: 'Kısa devre taraması, ABS, ESP ve hava yastığı elektrik arızaları.', price: 'Dinamik Fiyat' }
    ]
  },
  bodypaint: {
    id: 'bodypaint',
    name: 'Kaporta & Pasta Cila',
    title: 'Kusursuz Detay & Kaporta Atölyesi',
    subtitle: 'Boyasız göçük düzeltme (PDR), fırın boyama ve profesyonel pasta cila - seramik kaplama uygulamaları.',
    themeClass: 'theme-bodypaint',
    services: [
      { id: 'sb1', title: 'Boyasız Göçük Düzeltme', desc: 'PDR yöntemiyle boyaya zarar vermeden dolu ve sürtme çöküklerinin düzeltilmesi.', price: '1,000 - 6,000 TL' },
      { id: 'sb2', title: 'Fırınlı Boya & Restorasyon', desc: 'Mikron boya hassasiyetinde ve orijinal renk koduyla fırınlı boyama.', price: '25,000 - 75,000 TL' },
      { id: 'sb3', title: 'Pasta Cila & Boya Koruma', desc: 'Kılcal çizik giderme ve premium seramik kaplama uygulaması.', price: '4,000 - 10,000 TL' },
      { id: 'sb4', title: 'Plastik Tampon Onarımı', desc: 'Kırık tamponların plastik kaynak ve lokal fırın boya işlemi.', price: '1,500 - 4,000 TL' }
    ]
  }
};

const initialTeam = [
  {
    id: 1,
    name: 'Nuri Usta',
    role: 'Baş Mekanik & DSG Şanzıman Ustası',
    experience: '22 Yıl Deneyim',
    rating: 5.0,
    reviews: 420,
    skills: ['Motor Rektefiye', 'DSG Kavrama & Mekatronik', 'Ağır Mekanik Onarım'],
    certifications: 'Volkswagen Group Master Tech, DSG Specialist Certification',
    phone: '0532 637 39 78'
  },
  {
    id: 2,
    name: 'Selim Usta',
    role: 'Oto Elektrik & ECU Diagnostik Uzmanı',
    experience: '15 Yıl Deneyim',
    rating: 4.9,
    reviews: 380,
    skills: ['ODIS Beyin Kodlama', 'Gizli Özellik Aktivasyonu', 'Elektrik Tesisat Onarımı'],
    certifications: 'VAG Diagnostician, Hybrid & EV Certified Tech',
    phone: '0532 637 39 78'
  },
  {
    id: 3,
    name: 'Recai Usta',
    role: 'Kaporta & Boyasız Göçük Düzeltme Ustası',
    experience: '19 Yıl Deneyim',
    rating: 5.0,
    reviews: 290,
    skills: ['PDR Boyasız Göçük Düzeltme', 'Fırınlı Mikron Boyama', 'Pasta Cila & Seramik'],
    certifications: 'Standox Paint Expert, Professional PDR Certification',
    phone: '0532 637 39 78'
  }
];

const initialTestimonials = [
  {
    name: 'Can Yılmaz',
    vehicle: 'Volkswagen Golf 7 1.6 TDI',
    rating: 5,
    text: 'Aracımın motor ışığı yandığında buraya geldim. Gösterge panelindeki yardımla 5 dakikada arızayı bulup randevu aldım. Buji değişimi yapıldı, araç fabrika ayarında çalışıyor. Şeffaflıkları müthiş.',
    date: '2 hafta önce',
    service: 'Motor Arıza Tespit',
    avatar: 'CY'
  },
  {
    name: 'Ayşe Karaca',
    vehicle: 'Skoda Octavia 1.6 TDI',
    rating: 5,
    text: 'Şanzıman sorunu yaşıyordum, başka servislerde "komple değişecek" dediler. Burada solenoid temizliği ile çözüldü, binlerce lira tasarruf ettim. Güvenilir ve dürüst bir ekip.',
    date: '1 ay önce',
    service: 'Şanzıman Onarımı',
    avatar: 'AK'
  },
  {
    name: 'Mehmet Demir',
    vehicle: 'Audi A4 2.0 TDI',
    rating: 5,
    text: 'Kaporta boyamda mükemmel iş çıkardılar. Renk uyumu birebir tuttu, fabrika çıkışı gibi oldu. Üstelik 2 yıl garanti verdiler. Kesinlikle tavsiye ederim.',
    date: '3 hafta önce',
    service: 'Kaporta & Boya',
    avatar: 'MD'
  },
  {
    name: 'Serkan Kaya',
    vehicle: 'Seat Leon 1.4 TSI',
    rating: 5,
    text: 'Periyodik bakım için geldim, araçta fark etmediğim fren aşınmasını da tespit edip hemen müdahale ettiler. Canlı lift görüntüsünü izlemek çok hoş bir deneyimdi.',
    date: '1 hafta önce',
    service: 'Periyodik Bakım',
    avatar: 'SK'
  },
  {
    name: 'Elif Yıldırım',
    vehicle: 'Volkswagen Passat B8',
    rating: 5,
    text: 'Elektrik sisteminde sürekli arıza yapan aracımı getirdim, kablolardaki temassızlığı çok hızlı buldular. Hibrit konusunda da uzmanlar, gönül rahatlığıyla teslim edebilirsiniz.',
    date: '5 gün önce',
    service: 'Elektrik & Hibrit Sistem',
    avatar: 'EY'
  }
];

const initialGallery = [
  {
    src: '/hero_bg.png',
    title: 'Profesyonel Atölye Ortamı',
    desc: 'Son teknoloji ekipmanlarla donatılmış VAG standartlarında kapalı atölye alanımız.',
    tag: 'Atölye'
  },
  {
    src: '/workshop_panorama.png',
    title: 'Çoklu Lift Sistemi',
    desc: 'Eş zamanlı onarım kapasitesi sunan modern araç liftleri.',
    tag: 'Kapasite'
  },
  {
    src: '/obd_bg.png',
    title: 'Bilgisayarlı Teşhis',
    desc: 'Orijinal VAG ODIS ve VAG-COM cihazları ile lisanslı arıza tespiti.',
    tag: 'Teknoloji'
  },
  {
    src: '/before_engine.png',
    title: 'Onarım Öncesi Durum',
    desc: 'Her onarım sürecini fotoğraflarla belgeliyoruz.',
    tag: 'Belgeleme'
  },
  {
    src: '/after_engine.png',
    title: 'Onarım Sonrası Kalite',
    desc: 'Fabrika standartlarında DSG ve motor onarımı.',
    tag: 'Kalite'
  }
];

const initialListings = [
  {
    id: 1,
    title: 'Volkswagen Golf 7 Orijinal DSG Kavrama Seti',
    category: 'part',
    price: 9500,
    description: 'Atölyemizde test edilmiş, kutulu sıfır ayarında orijinal LUK marka 7 ileri kuru tip DSG kavrama kiti. Montaj hizmetimiz mevcuttur.',
    itemCode: 'VAG-DSG07',
    isGuaranteed: true,
    sellerWorkshop: 'Vos74 VAG Grubu Özel Servis',
    sellerName: 'Nuri Usta',
    sellerPhone: '0532 637 39 78'
  },
  {
    id: 2,
    title: 'Audi A4 B9 Uyumlu Orijinal Çıkma Sol LED Far',
    category: 'part',
    price: 18000,
    description: 'Atölyemizde test edilmiş, tüm ayakları sağlam, tamir görmemiş orijinal Audi LED far ünitesi.',
    itemCode: 'VAG-AUDILED',
    isGuaranteed: true,
    sellerWorkshop: 'Vos74 VAG Grubu Özel Servis',
    sellerName: 'Nuri Usta',
    sellerPhone: '0532 637 39 78'
  },
  {
    id: 3,
    title: 'Usta Elinden Kusursuz Volkswagen Golf 7.5 R-Line',
    category: 'vehicle',
    price: 945000,
    description: 'Tüm bakımları ve ağır işlemleri atölyemizde özenle yapılmış kusursuz Golf. Kazasız, sadece 1 parça lokal çizik boyalıdır. 118 bin km.',
    itemCode: 'GOLF-RL',
    isGuaranteed: true,
    sellerWorkshop: 'Vos74 VAG Grubu Özel Servis',
    sellerName: 'Nuri Usta',
    sellerPhone: '0532 637 39 78'
  }
];

const initialActiveRepairs = [
  {
    id: 1,
    plate: '74 VS 074',
    model: 'Volkswagen Golf 7 1.6 TDI (2017)',
    owner: 'Can Yılmaz',
    phone: '0532 111 22 33',
    status: 'onarim',
    baseCost: 2800,
    jobsDone: [
      { name: 'DSG Şanzıman yağı ve filtreleri değiştirildi', cost: 1800 },
      { name: 'Kavrama boşluk adaptasyonu yapıldı', cost: 1000 }
    ],
    extraItems: [],
    pendingApproval: { item: 'Ön Fren Balataları', cost: 950 },
    deliveryTime: 'Bugün 17:30'
  },
  {
    id: 2,
    plate: '74 AS 321',
    model: 'Skoda Octavia 1.6 TDI (2018)',
    owner: 'Serkan Kaya',
    phone: '0544 555 66 77',
    status: 'ariza',
    baseCost: 1200,
    jobsDone: [
      { name: 'ODIS Detaylı Tarama Yapıldı', cost: 800 },
      { name: 'Enjektör geri dönüş hattı kaçak tespiti', cost: 400 }
    ],
    extraItems: [],
    pendingApproval: null,
    deliveryTime: 'Yarın 12:00'
  },
  {
    id: 3,
    plate: '74 AB 567',
    model: 'Audi A4 2.0 TDI (2020)',
    owner: 'Merve Demir',
    phone: '0535 888 77 66',
    status: 'hazir',
    baseCost: 1900,
    jobsDone: [
      { name: 'VAG Periyodik Bakım yapıldı', cost: 1500 },
      { name: 'Silecek suyu ve antifriz tamamlandı', cost: 400 }
    ],
    extraItems: [{ name: 'Bosch Silecek Süpürgeleri', cost: 350 }],
    pendingApproval: null,
    deliveryTime: 'Teslime Hazır'
  }
];

const initialAppointments = [
  {
    id: 'APT-423591',
    plate: '74 AC 111',
    brand: 'Audi',
    model: 'A4',
    year: '2016',
    service: 'Periyodik Bakım',
    date: '2026-06-04',
    time: '10:00',
    ownerName: 'Kemal Arslan',
    phone: '0505 123 45 67',
    notes: 'Yağ bakımının yanında arka frenlerden ses geliyor, bakılmasını rica ederim.',
    status: 'pending'
  },
  {
    id: 'APT-748293',
    plate: '74 AD 222',
    brand: 'Volkswagen',
    model: 'Passat B8',
    year: '2019',
    service: 'Bilgisayarlı Arıza Tespit',
    date: '2026-06-04',
    time: '13:30',
    ownerName: 'Ayşe Karaca',
    phone: '0554 987 65 43',
    notes: 'Motor arıza lambası yandı, ODIS ile kontrol edilecek.',
    status: 'pending'
  }
];

function App() {
  const [branch, setBranch] = useState('general');
  const [colorTheme, setColorTheme] = useState('cyan');
  const [activeTab, setActiveTab] = useState('home');
  
  // Core States
  const [appointments, setAppointments] = useState(initialAppointments);
  const [workingHours, setWorkingHours] = useState(['09:00', '10:00', '11:00', '13:30', '14:30', '15:30', '16:30']);
  const [activeRepairs, setActiveRepairs] = useState(initialActiveRepairs);
  const [completedRepairs, setCompletedRepairs] = useState([
    { plate: '74 VS 074', model: 'Volkswagen Golf 7 2017', date: '12.01.2026', desc: 'DSG Kavrama Değişimi & Şanzıman Bakımı', cost: 14500, master: 'Nuri Usta' },
    { plate: '74 VS 074', model: 'Volkswagen Golf 7 2017', date: '15.08.2025', desc: 'Ön/Arka VAG Orijinal Balata Değişimi', cost: 2850, master: 'Nuri Usta' },
    { plate: '74 AS 321', model: 'Skoda Octavia 2018', date: '04.03.2026', desc: 'Triger Seti & Devridaim değişimi ve antifriz yenileme', cost: 7200, master: 'Nuri Usta' },
    { plate: '74 AS 321', model: 'Skoda Octavia 2018', date: '10.10.2025', desc: 'ODIS Detaylı Arıza okuma, lambda sensörü değişimi', cost: 1600, master: 'Selim Usta' }
  ]);
  const [listings, setListings] = useState(initialListings);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [prefilledAppointment, setPrefilledAppointment] = useState(null);
 
  // Dynamic homepage contents state
  const [branchDetails, setBranchDetails] = useState(initialBranchDetails);
  const [team, setTeam] = useState(initialTeam);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [galleryItems, setGalleryItems] = useState(initialGallery);
  const [beforeAfterData, setBeforeAfterData] = useState({
    beforeImage: '/before_engine.png',
    afterImage: '/after_engine.png',
    description: "85.000 Km'deki Volkswagen Golf motorunun detaylı arıza giderimi, sızıntı temizliği ve motor koruma pasta-detay işlemi."
  });
  const [socialLinks, setSocialLinks] = useState({
    instagram: 'https://www.instagram.com/bartinotoservis/',
    facebook: '',
    youtube: '',
    whatsapp: 'https://wa.me/905326373978',
    tiktok: ''
  });

  // Dynamic details based on current selected branch
  const activeBranchInfo = branchDetails[branch];

  // Auto scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Appointment Actions
  const addAppointment = (newApt) => {
    setAppointments([newApt, ...appointments]);
  };

  const addWorkingHour = (hour) => {
    if (!hour || workingHours.includes(hour)) return;
    setWorkingHours([...workingHours, hour].sort((a, b) => a.localeCompare(b)));
  };

  const deleteWorkingHour = (hour) => {
    setWorkingHours(workingHours.filter(h => h !== hour));
  };

  const approveAppointment = (id) => {
    const targetApt = appointments.find(a => a.id === id);
    if (!targetApt) return;

    setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'approved' } : a));

    const newRepair = {
      id: activeRepairs.length + 1,
      plate: targetApt.plate,
      model: `${targetApt.brand} ${targetApt.model} (${targetApt.year})`,
      owner: targetApt.ownerName,
      phone: targetApt.phone,
      status: 'kabul',
      baseCost: 2000,
      jobsDone: [{ name: `Kabul formu dolduruldu: ${targetApt.service}`, cost: 2000 }],
      extraItems: [],
      pendingApproval: null,
      deliveryTime: 'İnceleme Sonrası Belirlenecek'
    };

    setActiveRepairs([newRepair, ...activeRepairs]);
    alert(`Randevu onaylandı! Araç (${targetApt.plate}) Aktif İşler Panosu'na kabul aşaması ile eklendi.`);
  };

  const rejectAppointment = (id) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'rejected' } : a));
    alert('Randevu reddedildi/iptal edildi.');
  };

  // Active Repairs Actions
  const updateRepairStatus = (id, newStatus) => {
    setActiveRepairs(activeRepairs.map(car => 
      car.id === id ? { ...car, status: newStatus, deliveryTime: newStatus === 'hazir' ? 'Teslime Hazır' : car.deliveryTime } : car
    ));
  };

  const addRepairJob = (id, newJobText, cost) => {
    setActiveRepairs(activeRepairs.map(car => 
      car.id === id ? { 
        ...car, 
        jobsDone: [...car.jobsDone, { name: newJobText, cost: Number(cost) || 0 }] 
      } : car
    ));
  };

  const deleteRepairJob = (id, jobIndex) => {
    setActiveRepairs(activeRepairs.map(car => 
      car.id === id ? { 
        ...car, 
        jobsDone: car.jobsDone.filter((_, idx) => idx !== jobIndex) 
      } : car
    ));
  };

  const updateRepairJobCost = (id, jobIndex, newCost) => {
    setActiveRepairs(activeRepairs.map(car => 
      car.id === id ? { 
        ...car, 
        jobsDone: car.jobsDone.map((job, idx) => 
          idx === jobIndex ? { ...job, cost: Number(newCost) || 0 } : job
        ) 
      } : car
    ));
  };

  const addPendingRequest = (id, itemName, cost) => {
    setActiveRepairs(activeRepairs.map(car => 
      car.id === id ? { ...car, pendingApproval: { item: itemName, cost: cost } } : car
    ));
  };

  const addExtraCostApproval = (id, cost, itemName) => {
    setActiveRepairs(activeRepairs.map(car => {
      if (car.id === id) {
        return {
          ...car,
          extraItems: [...(car.extraItems || []), { name: itemName, cost: cost }],
          pendingApproval: null
        };
      }
      return car;
    }));
  };

  const completeRepairJob = (id) => {
    const targetCar = activeRepairs.find(c => c.id === id);
    if (!targetCar) return;

    const jobsTotal = targetCar.jobsDone ? targetCar.jobsDone.reduce((sum, j) => sum + (j.cost || 0), 0) : 0;
    const extraTotal = targetCar.extraItems ? targetCar.extraItems.reduce((sum, j) => sum + (j.cost || 0), 0) : 0;
    const totalCost = jobsTotal + extraTotal;

    const historyRecord = {
      plate: targetCar.plate,
      model: targetCar.model,
      date: new Date().toLocaleDateString('tr-TR'),
      desc: targetCar.jobsDone.map(j => typeof j === 'object' ? j.name : j).join(', '),
      cost: totalCost,
      master: 'Nuri Usta'
    };

    setActiveRepairs(activeRepairs.filter(c => c.id !== id));
    setCompletedRepairs([historyRecord, ...completedRepairs]);
    alert(`${targetCar.plate} plakalı aracın işlemleri tamamlandı ve müşteri geçmişine kaydedildi.`);
  };

  // Marketplace Actions
  const addMarketplaceListing = (newListing) => {
    setListings([newListing, ...listings]);
  };

  return (
    <div className={`app-container ${activeBranchInfo.themeClass} theme-palette-${colorTheme}`}>
      {/* Interactive Particle Network Background */}
      <ParticleBackground />

      {/* Header / Nav */}
      <Navbar 
        currentBranchName={activeBranchInfo.name} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'home' && (
          <>
            <Hero 
              branchInfo={activeBranchInfo} 
              setActiveTab={setActiveTab} 
              activeRepairsCount={activeRepairs.filter(r => r.status !== 'hazir').length}
              setPrefilledAppointment={setPrefilledAppointment}
            />
            
            {/* Visual Lift Monitoring Section */}
            <ScrollReveal direction="up">
              <WorkshopMonitor 
                activeRepairs={activeRepairs} 
              />
            </ScrollReveal>

            {/* Before / After scrub Slider */}
            <ScrollReveal direction="scale" delay={100}>
              <BeforeAfterSlider beforeAfterData={beforeAfterData} />
            </ScrollReveal>

            {/* Dashboard Warning Lights Guide */}
            <ScrollReveal direction="up" delay={50}>
              <WarningLights setActiveTab={setActiveTab} />
            </ScrollReveal>

            {/* Atölye Galeri */}
            <GalleryShowcase galleryItems={galleryItems} />

            {/* Services Grid */}
            <ScrollReveal direction="up">
              <Services 
                branchInfo={activeBranchInfo} 
                setActiveTab={setActiveTab}
              />
            </ScrollReveal>

            {/* Customer Testimonials */}
            <Testimonials testimonials={testimonials} />

            {/* Roster of Expert Masters */}
            <ScrollReveal direction="up" delay={100}>
              <UstaTeam team={team} />
            </ScrollReveal>
          </>
        )}

        {activeTab === 'tracker' && (
          <Tracker 
            activeRepairs={activeRepairs}
            updateRepairStatus={updateRepairStatus}
            addExtraCostApproval={addExtraCostApproval}
            setTestimonials={setTestimonials}
          />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace 
            listings={listings} 
            currentBranch={branch}
          />
        )}

        {activeTab === 'appointment' && (
          <Appointment 
            branchInfo={activeBranchInfo}
            prefilledAppointment={prefilledAppointment}
            addAppointment={addAppointment}
            appointments={appointments}
            workingHours={workingHours}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'admin' && (
          isAuthenticated ? (
            <UstaDashboard 
              appointments={appointments}
              approveAppointment={approveAppointment}
              rejectAppointment={rejectAppointment}
              workingHours={workingHours}
              addWorkingHour={addWorkingHour}
              deleteWorkingHour={deleteWorkingHour}
              activeRepairs={activeRepairs}
              completedRepairs={completedRepairs}
              completeRepairJob={completeRepairJob}
              updateRepairStatus={updateRepairStatus}
              addRepairJob={addRepairJob}
              deleteRepairJob={deleteRepairJob}
              updateRepairJobCost={updateRepairJobCost}
              addPendingRequest={addPendingRequest}
              listings={listings}
              addMarketplaceListing={addMarketplaceListing}
              
              // CMS States & Setters
              branchDetails={branchDetails}
              setBranchDetails={setBranchDetails}
              team={team}
              setTeam={setTeam}
              testimonials={testimonials}
              setTestimonials={setTestimonials}
              galleryItems={galleryItems}
              setGalleryItems={setGalleryItems}
              beforeAfterData={beforeAfterData}
              setBeforeAfterData={setBeforeAfterData}
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
              currentBranch={branch}
              onLogout={() => setIsAuthenticated(false)}
            />
          ) : (
            <Login onLoginSuccess={() => setIsAuthenticated(true)} />
          )
        )}
      </main>

      {/* Demo panel has been removed */}

      {/* Footer */}
      <Footer currentBranchName={activeBranchInfo.name} socialLinks={socialLinks} />

      {/* Mobile Floating Action Buttons */}
      <div className="mobile-fab-container">
        <a 
          href="tel:+905326373978" 
          className="mobile-fab fab-call"
          aria-label="Hemen Ara"
        >
          <Phone size={22} />
          <span>Hemen Ara</span>
        </a>
        <a 
          href={socialLinks.whatsapp || 'https://wa.me/905326373978'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mobile-fab fab-whatsapp"
          aria-label="WhatsApp"
        >
          <MessageCircle size={22} />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

export default App;
