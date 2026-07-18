import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { db, seedDatabaseIfEmpty } from './firebase';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
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
import Blog from './components/Blog';
import Footer from './components/Footer';
import CampaignPopup from './components/CampaignPopup';
import CustomerCardGenerator from './components/CustomerCardGenerator';
import GoogleReviewsWidget from './components/GoogleReviewsWidget';
import './App.css';

const defaultCampaigns = [
  {
    id: 'camp-default-1',
    title: 'VAG Periyodik Bakım Fırsatı',
    description: 'Volkswagen, Audi, Seat ve Skoda araçlarınızda periyodik bakım paketlerinde haziran ayına özel %20 indirim ve ücretsiz 15 nokta check-up! Hemen randevunuzu oluşturun.',
    image: '/obd_bg.png',
    buttonText: 'Hemen Randevu Al',
    link: 'appointment',
    active: true
  }
];

const initialBranchDetails = {
  general: {
    id: 'general',
    name: 'Vos74 VAG Grubu Özel Servis',
    title: 'Volkswagen, Audi, Seat & Skoda Servisi',
    subtitle: 'Bartın, Karabük ve Zonguldak bölgesindeki VAG grubu (Volkswagen, Audi, Seat, Skoda) araçlarınız için orijinal standartlarda şeffaf, garantili ve profesyonel özel servis hizmeti (Bartın Yeni Sanayi Sitesi).',
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
    subtitle: 'Bartın, Karabük ve Zonguldak VAG grubu araçlarda TSI, TDI ve TFSI motor rektefiye, ağır bakım, zincir değişimi ve DSG şanzıman onarımı.',
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
    subtitle: 'Bartın, Karabük ve Zonguldak bölgelerinde VAG grubu beyin (ECU) programlama, elektronik modül kodlama ve akıllı elektrik tesisatı.',
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
    subtitle: 'Bartın, Karabük, Zonguldak boyasız göçük düzeltme (PDR), fırın boyama ve profesyonel pasta cila - seramik kaplama uygulamaları.',
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

const initialBlogs = [
  {
    id: 'blog-1',
    title: 'DSG Şanzıman Ömrünü Uzatmanın 5 Altın Kuralı',
    summary: 'Çift kavramalı DSG şanzımanlarda ısınma, kavrama aşınması ve mekatronik arızalarını önlemek için dikkat etmeniz gereken sürüş teknikleri.',
    content: 'Volkswagen grubunun çift kavramalı şanzıman sistemi olan DSG (Direct Shift Gearbox), hızlı vites geçişleri ve yüksek yakıt ekonomisi sunar. Ancak doğru kullanılmadığında erken aşınma, mekatronik arızaları veya kavrama bitmesi gibi masraflı problemler çıkarabilir. İşte DSG şanzımanınızın ömrünü iki katına çıkaracak 5 hayati kural:\n\n1. Sıkışık Trafikte Manuel veya Spor Moda Geçin:\nDur-kalk trafikte DSG sürekli 1. ve 2. vitesler arasında geçiş yaparak kavramayı ısıtır. Aracı manuel (M) veya spor (S) moda alarak sürekli vites değiştirmesini engelleyin.\n\n2. Rampada Dururken Freni Tam Bırakmayın ve Yarım Debriyaj Yapmayın:\nYokuşlarda dur-kalk yaparken fren pedalına tam basın. Hafif basıldığında şanzıman kavramayı hazırda bekletir ve balataları aşındırır.\n\n3. Park Ederken Yükü Şanzımana Değil El Frenine Bırakın:\nPark ederken sırasıyla: Vitesi boşa (N) alın, el frenini çekin, ayağınızı fren pedalından çekip yükün el frenine binmesini sağlayın, ardından vitesi Park (P) konumuna alın.\n\n4. Araç Tam Durmadan Vites Değiştirmeyin:\nD konumundan R konumuna (veya tersi) geçerken aracın tamamen durmuş olduğundan emin olun. Hareket halindeyken yapılan geçişler dişlilere ciddi zarar verir.\n\n5. Periyodik Şanzıman Yağı Bakımını İhmal Etmeyin:\nHer 60.000 km veya 4 yılda bir DSG şanzıman yağı ve filtresinin orijinal VAG onaylı yağlarla değiştirilmesi hayati önem taşır.',
    image: '/obd_bg.png',
    date: '04.06.2026',
    author: 'Vos74 Kadir Usta',
    category: 'Şanzıman'
  },
  {
    id: 'blog-2',
    title: 'VAG Grubu Araçlarda Periyodik Bakımın Önemi',
    summary: 'Volkswagen, Audi, Seat ve Skoda araçlarda periyodik bakım aralıkları, kullanılan yağ kalitesi ve motor sağlığı için kritik kontroller.',
    content: 'TSI, TDI ve TFSI motorlar yüksek performans ve verimlilik sunan hassas mühendislik ürünleridir. Bu motorların uzun ömürlü olması doğrudan düzenli ve doğru bakıma bağlıdır. \n\nNeden Orijinal Onaylı Yağ?\nVAG grubu motorlarda kullanılan motor yağının viskozitesi (örn: 5W-30) kadar VAG onay kodu da (örn: VW 504 00 / 507 00) önemlidir. Yanlış yağ kullanımı partikül filtresinin (DPF) tıkanmasına, turbo milinin aşınmasına ve motor yatak sarmasına neden olabilir.\n\nBakımda Neler Değişmeli?\nHer 15.000 km veya yılda bir yapılan periyodik bakımda:\n- Motor Yağı ve Yağ Filtresi\n- Hava Filtresi\n- Polen Filtresi (Karbonlu tercih edilmelidir)\n- Yakıt Filtresi (Dizel araçlarda her 30.000 km\'de bir)\nkesinlikle değiştirilmeli, buji ve fren hidroliği kontrolleri yapılmalıdır.',
    image: '/hero_bg.png',
    date: '03.06.2026',
    author: 'Vos74 Kadir Usta',
    category: 'Mekanik'
  },
  {
    id: 'blog-3',
    title: 'DSG Şanzıman Arızaları: Mekatronik ve Kavrama Sorunları Nasıl Çözülür?',
    summary: 'DSG şanzımanlarda sık karşılaşılan mekatronik arızaları, vites geçişlerindeki sarsıntılar ve kavrama aşınmalarının tespiti ile profesyonel çözüm yolları.',
    content: 'VAG grubunun (Volkswagen, Audi, Seat, Skoda) çift kavramalı şanzıman sistemi olan DSG, sürüş konforu ve yakıt tasarrufu açısından mükemmeldir. Ancak, zamanla mekatronik ünitesinde basınç kayıpları, kart arızaları veya çift kavramada (debriyaj) aşınmalar meydana gelebilir. Özellikle trafikte aşırı ısınma, göstergede İngiliz anahtarı işareti çıkması veya vites geçişlerinde titreme bu sorunların en net belirtileridir.\n\nBartın\'da DSG şanzıman sorunlarına profesyonel çözümler sunan vos74 bartın özel servisimizde, en karmaşık şanzıman arızaları bile kısa sürede çözüme kavuşturulmaktadır. Servisimizde usta olarak kadir gül ve deneyimli ekibimiz, DSG mekatronik tamiri, solenoid değişimi, güçlendirilmiş tüp montajı ve kavrama değişimlerini garantili olarak gerçekleştirmektedir.\n\nDSG şanzımanınızın ömrünü uzatmak ve yüksek maliyetli arızalardan kaçınmak için periyodik adaptasyon ve şanzıman yağı değişimlerini ihmal etmeyin. Detaylı bilgi ve randevu işlemleri için vos74.com.tr web sitemizi ziyaret edebilir, vos74 seo uyumlu arıza tespit bloglarımızla araç sağlığınızı nasıl koruyacağınızı öğrenebilirsiniz.',
    image: '/workshop_panorama.png',
    date: '14.07.2026',
    author: 'Kadir Gül Usta',
    category: 'Şanzıman'
  },
  {
    id: 'blog-4',
    title: 'TSI ve TFSI Motorların Kronik Sorunları: Yağ Eksiltme ve Triger Zincir Uzaması',
    summary: 'Volkswagen grubu TSI ve TFSI motorlarda görülen aşırı yağ tüketimi (yağ yakma) ve triger zinciri uzaması belirtileri, riskleri ve kalıcı tamir yöntemleri.',
    content: 'VAG grubu araçlarda kullanılan TSI (Turbocharged Stratified Injection) ve TFSI motorlar, yüksek tork ve düşük yakıt tüketimi sunar. Ancak, özellikle 1.4 TSI, 1.8 TSI ve 2.0 TFSI motorların bazı nesillerinde yağ yakma (yağ eksiltme) ve triger zinciri uzaması gibi kronik sorunlar görülebilmektedir. Motorun sabah ilk çalışmada zincir sesi yapması (şakırdama) veya egzozdan mavi duman atması bu sorunların habercisidir.\n\nBu tip kronik motor arızalarında, vos74 bartın bölgesinde VAG grubu sahipleri için en güvenilir çözüm ortağıdır. Atölyemizde usta olarak kadir gül tarafından yönetilen ağır mekanik bölümümüzde, triger zinciri değişimi sente aparatları eşliğinde hassasiyetle yapılır. Piston segman değişimi ve silindir kapak revizyonu gibi büyük motor operasyonları da orijinal parçalarla garantili olarak tamamlanır.\n\nDoğru vizkozitede ve VAG onaylı motor yağı kullanımı bu motorların sağlığı için kritiktir. Bakım randevunuzu hızlıca oluşturmak için vos74.com.tr adresini kullanabilirsiniz. Ayrıca vos74 seo odaklı teknik makalelerimizi takip ederek motorunuzun ömrünü nasıl uzatabileceğiniz hakkında bilgi alabilirsiniz.',
    image: '/before_engine.png',
    date: '14.07.2026',
    author: 'Kadir Gül Usta',
    category: 'Motor'
  },
  {
    id: 'blog-5',
    title: '1.6 TDI ve 2.0 TDI Motorlarda DPF ve EGR Tıkanması: Belirtiler ve Çözümler',
    summary: 'VAG grubu dizel araçlarda sıkça karşılaşılan dizel partikül filtresi (DPF) doluluğu ve EGR valfi arızalarının temizliği, iptal edilmeden çözümleri.',
    content: 'Volkswagen, Audi, Seat ve Skoda\'nın dizel motorları (TDI), yakıt verimliliğiyle bilinir. Ancak şehir içi kısa mesafe kullanımlarda Dizel Partikül Filtresi (DPF) ve Egzoz Gazı Geri Döndürme (EGR) sistemleri hızla kurumla dolup tıkanabilir. Gösterge panelinde kızdırma bujisi ışığının yanıp sönmesi, motor arıza lambası ve aracın çekişten düşerek "limp mode" (koruma modu) durumuna geçmesi en yaygın belirtilerdir.\n\nBartın ve çevre illerde dizel VAG grubu araç sahiplerinin bu sorunlardaki ilk adresi olan vos74 bartın servisimiz, çevre dostu ve yasal çözümleri ön planda tutar. Atölyemizde usta olarak kadir gül, DPF ve EGR sistemlerini sökmeden profesyonel makineler ve özel kimyasallar yardımıyla temizlemekte, ardından ODIS arıza tespit cihazımızla gerekli adaptasyon ve rejenerasyon işlemlerini tamamlamaktadır.\n\nDPF doluluğunu önlemek için aracınızı belirli aralıklarla yüksek devirde kullanmanız faydalı olacaktır. Randevu almak veya DPF temizlik fiyatlarını öğrenmek için vos74.com.tr sitemizi ziyaret edebilir. Hazırladığımız vos74 seo uyumlu bu rehberler, dizel aracınızı sorunsuz kullanmanıza yardımcı olacaktır.',
    image: '/after_engine.png',
    date: '14.07.2026',
    author: 'Kadir Gül Usta',
    category: 'Mekanik'
  },
  {
    id: 'blog-6',
    title: 'VAG Grubu Araçlarda Elektronik Beyin (ECU) Arızaları ve ODIS Kodlama Çözümleri',
    summary: 'Volkswagen, Audi, Seat ve Skoda araçlarında elektronik modül hataları, gösterge paneli arıza lambaları ve online ODIS kodlama ile beyin tamiri işlemleri.',
    content: 'Yeni nesil VAG grubu araçlar, gelişmiş sürüş destek sistemleri ve konfor bileşenleri nedeniyle yoğun bir elektronik altyapıya sahiptir. ABS/ESP beyin arızaları, BCM (gövde kontrol modülü) sorunları, gösterge panelindeki iletişim kopuklukları veya bileşen koruma (component protection) engelleri, bu araçlarda uzmanlık gerektiren elektronik sorunlardır.\n\nBu karmaşık arızaların tespitinde vos74 bartın özel servisimiz, yetkili servis standartlarında hizmet vermektedir. Atölyemizde usta olarak kadir gül liderliğindeki dijital elektronik bölümümüz, orijinal online ODIS arıza tespit cihazı yardımıyla beyin programlama, yazılım güncelleme ve elektronik modül adaptasyonlarını başarıyla gerçekleştirmektedir.\n\nAyrıca aracınızın desteklediği gizli özelliklerin aktivasyonu (kadran selamlama, Amerikan park, korna ile kilitleme onayı vb.) gibi işlemler de güvenle yapılmaktadır. Tüm elektronik hizmet yelpazemize vos74.com.tr adresinden ulaşabilirsiniz. Sitemizdeki vos74 seo odaklı bilgilendirmelerle VAG grubu araç elektroniğine dair en doğru bilgilere ulaşabilirsiniz.',
    image: '/obd_bg.png',
    date: '14.07.2026',
    author: 'Kadir Gül Usta',
    category: 'Elektronik'
  },
  {
    id: 'blog-7',
    title: 'VAG Grubu Araçlarda Antifriz Kaçağı ve Isınmama (Kalorifer Radyatörü) Problemi',
    summary: 'Devridaim (su pompası) kaçakları, G13 antifrizin çamurlaşması ve kalorifer peteğinin tıkanması sonucu aracın içini ısıtmaması sorunlarının tespiti ve çözümü.',
    content: 'VAG grubu araçlarda kış aylarında sıkça karşılaşılan sorunlardan biri kaloriferin sadece soğuk veya ılık üflemesidir. This durum çoğunlukla kalorifer radyatörünün (peteğinin) tıkanmasından kaynaklanır. Özellikle fabrikasyon olarak doldurulan G13 antifrizin zamanla özelliğini yitirerek çamurlaşması veya sistemde kullanılan silika jel torbasının patlaması peteği tıkar. Ayrıca su pompası (devridaim) kaçakları da motorun susuz kalıp hararet yapmasına yol açabilir.\n\nIsınma ve soğutma sistemi sorunlarında Bartın Yeni Sanayi Sitesi\'nde faaliyet gösteren vos74 bartın, son teknoloji petek temizleme cihazlarıyla hizmetinizdedir. Servisimizde usta olarak kadir gül, kalorifer peteğinizi göğsü sökmeden özel kimyasal yıkama cihazıyla temizlemekte veya gerektiğinde orijinal yedek parçalarla değişimini sağlamaktadır. Ayrıca devridaim pompası kaçakları da hızlıca giderilmektedir.\n\nSoğutma sisteminde sadece VAG standartlarına uygun (G12 EVO veya G12++) antifriz ve saf su kullanılmalıdır. Soğutma sistemi kontrolü için vos74.com.tr üzerinden randevu alabilirsiniz. Bu vos74 seo odaklı içerik, kış aylarında güvenle seyahat etmeniz için hazırlanmıştır.',
    image: '/hero_bg.png',
    date: '14.07.2026',
    author: 'Kadir Gül Usta',
    category: 'Soğutma'
  },
  {
    id: 'blog-8',
    title: 'VAG Grubu Araçlarda AdBlue Arızaları ve Çözüm Yolları',
    summary: 'Volkswagen, Audi ve Skoda TDI motorlu araçlarda sık rastlanan AdBlue pompa arızaları, enjektör tıkanmaları ve motor çalışmasını engelleyen geri sayım hatalarının çözümleri.',
    content: 'VAG grubunun (Volkswagen, Audi, Skoda) Euro 6 normlarına sahip dizel (TDI) motorlu araçlarında, zararlı egzoz gazlarını azaltmak amacıyla AdBlue (SCR) sistemi kullanılmaktadır. Ancak bu sistem, özellikle soğuk havalarda AdBlue sıvısının kristalleşmesi, enjektörün tıkanması veya AdBlue ısıtıcısı ve pompasının arızalanması gibi sebeplerle sık sık hata verebilmektedir. Gösterge panelinde beliren ve motorun belirli bir kilometre sonra çalıştırılamayacağını bildiren "AdBlue geri sayım hatası" sürücülerin en çok korktuğu sorunlardan biridir.\n\nBartın ve çevre illerde dizel VAG grubu araçlarda karşılaşılan AdBlue arızalarında, vos74 bartın özel servisimiz yetkili servis kalitesinde çözümler sunmaktadır. Atölyemizde usta olarak kadir gül, AdBlue deposu, pompa modülü ve enjektör kontrollerini titizlikle yapmakta, tıkanan enjektörlerin temizliğini ve arızalı pompaların revizyonunu gerçekleştirmektedir. Tüm bu işlemler orijinal yedek parçalarla ve ODIS arıza tespit sistemimiz yardımıyla güvenle tamamlanmaktadır.\n\nSistemin sağlıklı çalışabilmesi için kaliteli ve standartlara uygun AdBlue sıvısı kullanılması kritik önem taşır. Detaylı bilgi edinmek ve AdBlue arıza tespit randevusu oluşturmak için vos74.com.tr adresini ziyaret edebilirsiniz. Hazırladığımız vos74 seo uyumlu rehberlerimizle VAG grubu araç sahiplerine en doğru teknik çözümleri sunmaya devam ediyoruz.',
    image: '/obd_bg.png',
    date: '14.07.2026',
    author: 'Kadir Gül Usta',
    category: 'Motor'
  },
  {
    id: 'blog-9',
    title: 'VAG Grubu Araçlarda Su Alma Sorunları ve Sunroof Tahliye Tıkanıklıkları',
    summary: 'Golf, Leon, Octavia ve Passat modellerinde sık karşılaşılan ıslak taban halısı şikayetleri, sunroof su tahliye hortumu tıkanıklığı ve kapı içi sızıntı çözümleri.',
    content: 'VAG grubu araç sahiplerinin (özellikle Golf 7, Seat Leon, Skoda Octavia ve Passat modellerinde) yağmurlu günlerin ardından en çok karşılaştığı sorunlardan biri aracın içine su almasıdır. Bu durum genellikle sunroof su tahliye kanallarının çamur, toz veya yapraklarla tıkanması sonucu suyun tavan döşemesinden veya ön direklerden sızarak taban halısını ıslatmasıyla başlar. Diğer bir yaygın sebep ise kapı içlerindeki hoparlör contalarının zamanla yıpranarak kapı iç döşemesinden içeri su sızdırmasıdır. Taban halısının ıslanması, araç içinde kötü kokuya ve elektronik bileşenlerin oksitlenmesine yol açabilir.\n\nAraç içi su alma ve sızıntı tespitlerinde, vos74 bartın servisimiz uzman kadrosuyla kesin çözümler üretmektedir. Atölyemizde usta olarak kadir gül ve ekibimiz, sunroof tahliye kanallarını özel temizleme aparatlarıyla açmakta, kapı paneli ve hoparlör contalarını VAG standartlarında izole etmektedir. Islanan taban halısının sökülerek kurutulması ve alt kısımdaki kablo tesisatlarının oksitlenmeye karşı temizlenmesi işlemleri de titizlikle yürütülmektedir.\n\nAracınızın tavan ve kapı kanallarının her yıl düzenli temizlenmesi bu sorunları önlemenin en kolay yoludur. Su tahliyesi bakımı ve sızıntı onarımları için vos74.com.tr sitemiz üzerinden hemen randevu alabilirsiniz. Bu vos74 seo odaklı bilgilendirme, aracınızın kabin konforunu korumanıza yardımcı olmak amacıyla hazırlanmıştır.',
    image: '/hero_bg.png',
    date: '14.07.2026',
    author: 'Kadir Gül Usta',
    category: 'Mekanik'
  },
  {
    id: 'blog-10',
    title: 'VAG Grubu Haldex 4x4 (4Motion/Quattro) Sistem Sorunları ve Bakımı',
    summary: 'Tiguan, Golf R, Passat 4Motion and Audi Quattro modellerindeki Haldex diferansiyel sisteminin çalışma prensipleri, pompa filtre arızaları ve periyodik yağ değişimi.',
    content: 'Volkswagen grubunun 4Motion, Audi\'nin ise Quattro adıyla sunduğu akıllı dört tekerlekten çekiş sistemlerinin kalbinde Haldex kavrama ünitesi yer alır. Bu sistem, ön tekerleklerin patinaja düştüğü anlarda torku milisaniyeler içinde arka tekerleklere aktarır. Ancak Haldex sistemlerinde en sık karşılaşılan arıza, Haldex pompasının süzgecinin (filtresinin) aşınan kavrama balatalarının çamuruyla tıkanmasıdır. Tıkanma sonucunda pompa yanabilir ve araç sadece önden çekişli hale gelir. Göstergede herhangi bir hata lambası yanmasa bile, ani kalkışlarda ön tekerleklerin sarması Haldex arızasının en büyük belirtisidir.\n\nBartın ve Karadeniz bölgesinde Haldex 4x4 sistemlerinin bakımı ve onarımında, vos74 bartın özel servisimiz öncü konumdadır. Servisimizde usta olarak kadir gül, Haldex yağ değişimi sırasında pompayı sökerek filtresini temizlemekte, arızalı Haldex pompalarının elektrik motoru ve kart revizyonunu profesyonelce gerçekleştirmektedir. Sistemde kullanılan Haldex yağının orijinal VAG onaylı olması sistemin ömrü açısından hayati önem taşır.\n\nHer 60.000 km\'de bir yapılması gereken Haldex bakımı, sistemi yüksek maliyetli diferansiyel arızalarından korur. Haldex yağı değişimi ve sistem testi için vos74.com.tr üzerinden randevu kaydı oluşturabilirsiniz. Bu teknik makale, vos74 seo çalışmaları kapsamında VAG 4x4 kullanıcılarını bilgilendirmek için yazılmıştır.',
    image: '/workshop_panorama.png',
    date: '14.07.2026',
    author: 'Kadir Gül Usta',
    category: 'Yürüyen Aksam'
  },
  {
    id: 'blog-11',
    title: 'VAG Grubu Araçlarda Direksiyon Kilidi (ELV) Arızası ve Çalışmama Sorunu',
    summary: 'Passat B6, B7, CC ve Audi A4 modellerinde görülen ELV direksiyon kilidi modülü arızaları, anahtar algılamama ve aracı çalıştıramama sorunlarının tamiri.',
    content: 'VAG grubu araçlarda (özellikle Passat B6, B7, CC ve eski nesil Audi modellerinde) sık rastlanan kronik sorunlardan biri de elektronik direksiyon kilidi (ELV) arızasıdır. Sürücü anahtarı yuvaya taktığında direksiyon kilidinin açılmaması, gösterge panelinde sarı veya kırmızı direksiyon sembolünün yanması ve "Steering Column Lock Defective" uyarısı bu arızanın temel göstergeleridir. Kırmızı uyarı yandığında araç güvenlik nedeniyle marş basmaz ve çalıştırılamaz.\n\nELV direksiyon kilidi arızalarının giderilmesinde, vos74 bartın özel servisimiz online programlama ve lisanslı donanımları ile kesin çözümler üretmektedir. Atölyemizde usta olarak kadir gül liderliğindeki oto elektronik ekibimiz, arızalı ELV modülünün içindeki mikro motor ve switch\'leri yenilemekte veya müşterinin tercihine göre sisteme lisanslı ELV emülatör kodlaması yapmaktadır. Bu sayede direksiyon kilidi kronik sorunu ömür boyu kalıcı olarak çözülmektedir.\n\nELV arızaları aniden yolda kalmanıza neden olabileceği için ilk sarı uyarıyı aldığınızda servise başvurmanız önemlidir. Detaylı bilgi ve tamir fiyatları için vos74.com.tr sitemizden destek alabilirsiniz. Hazırladığımız vos74 seo uyumlu bu makale, elektronik arızalarla karşılaştığınızda izlemeniz gereken yolları özetlemektedir.',
    image: '/obd_bg.png',
    date: '14.07.2026',
    author: 'Kadir Gül Usta',
    category: 'Elektronik'
  },
  {
    id: 'blog-12',
    title: 'VAG Grubu Start-Stop Sistemi Arızaları ve Akü Seçimi',
    summary: 'Start-Stop sisteminin devreye girmeme nedenleri, AGM ve EFB akülerin özellikleri ve yeni akü takıldıktan sonra yapılması gereken kodlama işlemleri.',
    content: 'Yeni nesil VAG grubu araçlarda yakıt tüketimini ve emisyon değerlerini düşürmek amacıyla Start-Stop teknolojisi standart olarak sunulmaktadır. Ancak birçok araç sahibi, Start-Stop sisteminin çalışmadığından veya ekranda "Start-Stop Error" uyarısı verdiğinden şikayetçidir. Bu sistemin çalışmaması genellikle akü voltajının düşmesi, motor sıcaklığının uygun olmaması veya klima yükünün fazla olmasından kaynaklanır. Start-Stop özellikli VAG araçlarda standart sulu akü yerine kesinlikle AGM veya EFB tipi yüksek döngüye dayanıklı akülerin kullanılması gerekmektedir.\n\nStart-Stop sistemi arızaları ve akü değişimlerinde, vos74 bartın özel servisimiz orijinal standartlarda hizmet vermektedir. Atölyemizde usta olarak kadir gül, yeni AGM veya EFB akülerin montajını yaptıktan sonra ODIS veya VAG-COM cihazları ile akünün kapasite ve seri numarası bilgilerini motor kontrol ünitesine (ECU) kodlamaktadır. Akü kodlama işlemi yapılmadığında, şarj dinamosu yeni aküyü eski zayıf akü gibi şarj etmeye devam eder ve akünün ömrü kısa sürede biter.\n\nStart-Stop sisteminizin sağlığını korumak ve doğru akü montajı yaptırmak için vos74.com.tr üzerinden servis randevusu alabilirsiniz. Bu yazı, vos74 seo stratejileri doğrultusunda VAG grubu araç sahiplerinin akü seçimi ve kodlama konusundaki farkındalığını artırmak amacıyla yayınlanmıştır.',
    image: '/hero_bg.png',
    date: '14.07.2026',
    author: 'Kadir Gül Usta',
    category: 'Elektronik'
  }
];

const initialActiveRepairs = [
  {
    id: 1,
    plate: '74BT671',
    model: 'Volkswagen POLO (2002)',
    owner: 'İSMAİL ÇELİKTAŞ',
    phone: '05533065274',
    status: 'test',
    baseCost: 5500,
    jobsDone: [
      { name: 'genel kontrol vires geçiyormu', cost: 5500 }
    ],
    customerDemands: 'genel kontrol vires geçiyormu',
    extraItems: [],
    pendingApproval: null,
    deliveryTime: 'Bugün 17:30',
    bayId: 'lift1',
    assignedUsta: 'Kadir GÜL',
    photos: [
      { url: '/before_engine.png', title: 'Şanzıman & Vites Geçiş Kontrolü', category: 'Kabul / Teşhis', date: 'Bugün 10:15' },
      { url: '/after_engine.png', title: 'Genel Alt Takım ve Mekanik Test', category: 'Onarım Aşaması', date: 'Bugün 14:30' }
    ]
  },
  {
    id: 2,
    plate: '74DH422',
    model: 'Volkswagen POLO (2015)',
    owner: 'FURKAN KADİR ŞENOCAK',
    phone: '05013301529',
    status: 'kabul',
    baseCost: 0,
    jobsDone: [
      { name: 'Ön amortisör 2 adet', cost: 0 }
    ],
    customerDemands: 'Ön amortisör 2 adet',
    extraItems: [],
    pendingApproval: null,
    deliveryTime: 'Yarın 12:00',
    bayId: 'lift1',
    assignedUsta: 'Kadir GÜL',
    photos: []
  },
  {
    id: 3,
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
    deliveryTime: 'Bugün 17:30',
    bayId: 'lift3',
    assignedUsta: 'Nuri Usta',
    photos: [
      { url: '/before_engine.png', title: 'DSG Şanzıman Yağ Değişimi Öncesi', category: 'Kabul / Teşhis', date: 'Bugün 09:30' }
    ]
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
  const [appointments, setAppointments] = useState([]);
  const [workingHours, setWorkingHours] = useState(['09:00', '10:00', '11:00', '13:30', '14:30', '15:30', '16:30']);
  const [activeRepairs, setActiveRepairs] = useState([]);
  const [completedRepairs, setCompletedRepairs] = useState([]);
  const [listings, setListings] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [prefilledAppointment, setPrefilledAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [customerCards, setCustomerCards] = useState([]);
 
  // Dynamic homepage contents state
  const [branchDetails, setBranchDetails] = useState(initialBranchDetails);
  const [team, setTeam] = useState(initialTeam);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [galleryItems, setGalleryItems] = useState(initialGallery);
  const [beforeAfterData, setBeforeAfterData] = useState({
    beforeImage: '/before_engine.png',
    afterImage: '/after_engine.png',
    description: "85.000 Km'deki Volkswagen Golf motorunun detaylı arıza giderimi, sızıntı temizliği motor koruma pasta-detay işlemi."
  });
  const [socialLinks, setSocialLinks] = useState({
    instagram: 'https://www.instagram.com/bartinotoservis/',
    facebook: '',
    youtube: '',
    whatsapp: 'https://wa.me/905326373978',
    tiktok: ''
  });

  // Load and seed Firestore database
  useEffect(() => {
    async function loadData() {
      try {
        const initialData = {
          socialLinks: {
            instagram: 'https://www.instagram.com/bartinotoservis/',
            facebook: '',
            youtube: '',
            whatsapp: 'https://wa.me/905326373978',
            tiktok: ''
          },
          beforeAfterData: {
            beforeImage: '/before_engine.png',
            afterImage: '/after_engine.png',
            description: "85.000 Km'deki Volkswagen Golf motorunun detaylı arıza giderimi, sızıntı temizliği motor koruma pasta-detay işlemi."
          },
          workingHours: ['09:00', '10:00', '11:00', '13:30', '14:30', '15:30', '16:30'],
          team: initialTeam,
          branchDetails: initialBranchDetails,
          appointments: initialAppointments,
          activeRepairs: initialActiveRepairs,
          completedRepairs: [
            { plate: '74 VS 074', model: 'Volkswagen Golf 7 2017', date: '12.01.2026', desc: 'DSG Kavrama Değişimi & Şanzıman Bakımı', cost: 14500, master: 'Nuri Usta' },
            { plate: '74 VS 074', model: 'Volkswagen Golf 7 2017', date: '15.08.2025', desc: 'Ön/Arka VAG Orijinal Balata Değişimi', cost: 2850, master: 'Nuri Usta' },
            { plate: '74 AS 321', model: 'Skoda Octavia 2018', date: '04.03.2026', desc: 'Triger Seti & Devridaim değişimi ve antifriz yenileme', cost: 7200, master: 'Nuri Usta' },
            { plate: '74 AS 321', model: 'Skoda Octavia 2018', date: '10.10.2025', desc: 'ODIS Detaylı Arıza okuma, lambda sensörü değişimi', cost: 1600, master: 'Selim Usta' }
          ],
          listings: initialListings,
          blogs: initialBlogs
        };

        // Seed data if database is fresh/empty
        await seedDatabaseIfEmpty(initialData);

        // Fetch settings document
        const settingsSnap = await getDoc(doc(db, "settings", "general"));
        if (settingsSnap.exists()) {
          const settings = settingsSnap.data();
          if (settings.socialLinks) setSocialLinks(settings.socialLinks);
          if (settings.beforeAfterData) setBeforeAfterData(settings.beforeAfterData);
          if (settings.workingHours) setWorkingHours(settings.workingHours);
          if (settings.team) setTeam(settings.team);
          if (settings.branchDetails) setBranchDetails(settings.branchDetails);
          if (settings.campaigns) {
            setCampaigns(settings.campaigns);
          } else {
            setCampaigns(defaultCampaigns);
            updateDoc(doc(db, "settings", "general"), { campaigns: defaultCampaigns }).catch(console.error);
          }
        }

        // Fetch dynamic lists
        const fetchCol = async (colName) => {
          const snap = await getDocs(collection(db, colName));
          return snap.docs.map(doc => ({ ...doc.data(), _docId: doc.id }));
        };

        const apts = await fetchCol("appointments");
        setAppointments(apts);

        const active = await fetchCol("activeRepairs");
        setActiveRepairs(active);

        const completed = await fetchCol("completedRepairs");
        setCompletedRepairs(completed);

        const list = await fetchCol("listings");
        setListings(list);

        const blgs = await fetchCol("blogs");
        // Ensure new initial blogs are seeded to Firestore if they are missing
        const existingIds = new Set(blgs.map(b => b.id));
        const missingBlogs = initialBlogs.filter(b => !existingIds.has(b.id));
        if (missingBlogs.length > 0) {
          for (const blog of missingBlogs) {
            try {
              await setDoc(doc(db, "blogs", blog.id), blog);
              blgs.push(blog);
            } catch (err) {
              console.error("Failed to seed missing blog:", blog.id, err);
            }
          }
        }
        setBlogs(blgs);

        const cards = await fetchCol("customerCards");
        setCustomerCards(cards);

      } catch (error) {
        console.error("Firestore database loading failed:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Dynamic details based on current selected branch
  const activeBranchInfo = branchDetails[branch];

  // Auto scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Settings custom state handlers that sync with Firestore in background
  const handleSetBranchDetails = async (valOrFunc) => {
    setBranchDetails(prev => {
      const updated = typeof valOrFunc === 'function' ? valOrFunc(prev) : valOrFunc;
      updateDoc(doc(db, "settings", "general"), { branchDetails: updated }).catch(console.error);
      return updated;
    });
  };

  const handleSetTeam = async (valOrFunc) => {
    setTeam(prev => {
      const updated = typeof valOrFunc === 'function' ? valOrFunc(prev) : valOrFunc;
      updateDoc(doc(db, "settings", "general"), { team: updated }).catch(console.error);
      return updated;
    });
  };

  const handleSetTestimonials = async (valOrFunc) => {
    setTestimonials(prev => {
      const updated = typeof valOrFunc === 'function' ? valOrFunc(prev) : valOrFunc;
      updateDoc(doc(db, "settings", "general"), { testimonials: updated }).catch(console.error);
      return updated;
    });
  };

  const handleSetGalleryItems = async (valOrFunc) => {
    setGalleryItems(prev => {
      const updated = typeof valOrFunc === 'function' ? valOrFunc(prev) : valOrFunc;
      updateDoc(doc(db, "settings", "general"), { galleryItems: updated }).catch(console.error);
      return updated;
    });
  };

  const handleSetBeforeAfterData = async (valOrFunc) => {
    setBeforeAfterData(prev => {
      const updated = typeof valOrFunc === 'function' ? valOrFunc(prev) : valOrFunc;
      updateDoc(doc(db, "settings", "general"), { beforeAfterData: updated }).catch(console.error);
      return updated;
    });
  };

  const handleSetSocialLinks = async (valOrFunc) => {
    setSocialLinks(prev => {
      const updated = typeof valOrFunc === 'function' ? valOrFunc(prev) : valOrFunc;
      updateDoc(doc(db, "settings", "general"), { socialLinks: updated }).catch(console.error);
      return updated;
    });
  };

  const handleSetCampaigns = async (valOrFunc) => {
    setCampaigns(prev => {
      const updated = typeof valOrFunc === 'function' ? valOrFunc(prev) : valOrFunc;
      updateDoc(doc(db, "settings", "general"), { campaigns: updated }).catch(console.error);
      return updated;
    });
  };

  // Appointment Actions
  const addAppointment = async (newApt) => {
    setAppointments([newApt, ...appointments]);
    try {
      await setDoc(doc(db, "appointments", newApt.id), newApt);
    } catch (e) {
      console.error("Firestore addAppointment failed:", e);
    }
  };

  const addActiveRepair = async (newRepair) => {
    setActiveRepairs([newRepair, ...activeRepairs]);
    try {
      await setDoc(doc(db, "activeRepairs", String(newRepair.id)), newRepair);
    } catch (e) {
      console.error("Firestore addActiveRepair failed:", e);
    }
  };

  const addWorkingHour = async (hour) => {
    if (!hour || workingHours.includes(hour)) return;
    const updated = [...workingHours, hour].sort((a, b) => a.localeCompare(b));
    setWorkingHours(updated);
    try {
      await updateDoc(doc(db, "settings", "general"), { workingHours: updated });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteWorkingHour = async (hour) => {
    const updated = workingHours.filter(h => h !== hour);
    setWorkingHours(updated);
    try {
      await updateDoc(doc(db, "settings", "general"), { workingHours: updated });
    } catch (e) {
      console.error(e);
    }
  };

  const approveAppointment = async (id) => {
    const targetApt = appointments.find(a => a.id === id);
    if (!targetApt) return;

    setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'approved' } : a));

    const newRepair = {
      id: activeRepairs.length > 0 ? Math.max(...activeRepairs.map(r => Number(r.id) || 0)) + 1 : 1,
      plate: targetApt.plate,
      model: `${targetApt.brand} ${targetApt.model} (${targetApt.year})`,
      owner: targetApt.ownerName,
      phone: targetApt.phone,
      status: 'kabul',
      baseCost: 2000,
      jobsDone: [{ name: `Kabul formu dolduruldu: ${targetApt.service}`, cost: 2000 }],
      extraItems: [],
      laborCost: 0,
      customerDemands: targetApt.service || '',
      pendingApproval: null,
      deliveryTime: 'İnceleme Sonrası Belirlenecek',
      bayId: 'lift1',
      assignedUsta: 'Nuri Usta'
    };

    setActiveRepairs([newRepair, ...activeRepairs]);
    alert(`Randevu onaylandı! Araç (${targetApt.plate}) Aktif İşler Panosu'na kabul aşaması ile eklendi.`);

    try {
      await updateDoc(doc(db, "appointments", id), { status: 'approved' });
      await setDoc(doc(db, "activeRepairs", String(newRepair.id)), newRepair);
    } catch (e) {
      console.error(e);
    }
  };

  const rejectAppointment = async (id) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'rejected' } : a));
    alert('Randevu reddedildi/iptal edildi.');
    try {
      await updateDoc(doc(db, "appointments", id), { status: 'rejected' });
    } catch (e) {
      console.error(e);
    }
  };

  // Active Repairs Actions
  const updateRepairStatus = async (id, newStatus) => {
    const updatedRepairs = activeRepairs.map(car => 
      String(car.id) === String(id) ? { ...car, status: newStatus, deliveryTime: newStatus === 'hazir' ? 'Teslime Hazır' : car.deliveryTime } : car
    );
    setActiveRepairs(updatedRepairs);
    
    const targetCar = updatedRepairs.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateRepairBayAndUsta = async (id, bayId, assignedUsta) => {
    const updatedRepairs = activeRepairs.map(car => 
      String(car.id) === String(id) ? { ...car, bayId, assignedUsta } : car
    );
    setActiveRepairs(updatedRepairs);
    
    const targetCar = updatedRepairs.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteActiveRepair = async (id) => {
    setActiveRepairs(activeRepairs.filter(c => String(c.id) !== String(id)));
    try {
      await deleteDoc(doc(db, "activeRepairs", String(id)));
    } catch (e) {
      console.error(e);
    }
  };

  const addRepairJob = async (id, newJobText, cost) => {
    const updated = activeRepairs.map(car => 
      String(car.id) === String(id) ? { 
        ...car, 
        jobsDone: [...car.jobsDone, { name: newJobText, cost: Number(cost) || 0 }] 
      } : car
    );
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteRepairJob = async (id, jobIndex) => {
    const updated = activeRepairs.map(car => 
      String(car.id) === String(id) ? { 
        ...car, 
        jobsDone: car.jobsDone.filter((_, idx) => idx !== jobIndex) 
      } : car
    );
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateRepairJobCost = async (id, jobIndex, newCost) => {
    const updated = activeRepairs.map(car => 
      String(car.id) === String(id) ? { 
        ...car, 
        jobsDone: car.jobsDone.map((job, idx) => 
          idx === jobIndex ? { ...job, cost: Number(newCost) || 0 } : job
        ) 
      } : car
    );
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateRepairLaborCost = async (id, newLaborCost) => {
    const updated = activeRepairs.map(car => 
      String(car.id) === String(id) ? { 
        ...car, 
        laborCost: Number(newLaborCost) || 0 
      } : car
    );
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateRepairCustomTotalCost = async (id, newCustomTotalCost) => {
    const updated = activeRepairs.map(car => 
      String(car.id) === String(id) ? { 
        ...car, 
        customTotalCost: newCustomTotalCost !== '' ? Number(newCustomTotalCost) : '' 
      } : car
    );
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateRepairCustomPartsCost = async (id, newCustomPartsCost) => {
    const updated = activeRepairs.map(car => 
      String(car.id) === String(id) ? { 
        ...car, 
        customPartsCost: newCustomPartsCost !== '' ? Number(newCustomPartsCost) : '' 
      } : car
    );
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateRepairCustomerDemands = async (id, demands) => {
    const updated = activeRepairs.map(car => 
      String(car.id) === String(id) ? { 
        ...car, 
        customerDemands: demands 
      } : car
    );
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const addRepairPhoto = async (id, photoObj) => {
    const updated = activeRepairs.map(car => 
      String(car.id) === String(id) ? { 
        ...car, 
        photos: [...(car.photos || []), photoObj] 
      } : car
    );
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error("Firestore addRepairPhoto failed:", e);
      }
    }
  };

  const deleteRepairPhoto = async (id, photoIndex) => {
    const updated = activeRepairs.map(car => 
      String(car.id) === String(id) ? { 
        ...car, 
        photos: (car.photos || []).filter((_, idx) => idx !== photoIndex) 
      } : car
    );
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error("Firestore deleteRepairPhoto failed:", e);
      }
    }
  };

  const addPendingRequest = async (id, itemName, cost) => {
    const updated = activeRepairs.map(car => 
      String(car.id) === String(id) ? { ...car, pendingApproval: { item: itemName, cost: cost } } : car
    );
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const addExtraCostApproval = async (id, cost, itemName) => {
    const updated = activeRepairs.map(car => {
      if (String(car.id) === String(id)) {
        return {
          ...car,
          extraItems: [...(car.extraItems || []), { name: itemName, cost: cost }],
          pendingApproval: null
        };
      }
      return car;
    });
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(id));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(id)), targetCar);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const completeRepairJob = async (id) => {
    const targetCar = activeRepairs.find(c => String(c.id) === String(id));
    if (!targetCar) return;

    const jobsTotal = targetCar.jobsDone ? targetCar.jobsDone.reduce((sum, j) => sum + (j.cost || 0), 0) : 0;
    const extraTotal = targetCar.extraItems ? targetCar.extraItems.reduce((sum, j) => sum + (j.cost || 0), 0) : 0;
    const laborTotal = targetCar.laborCost || 0;
    const computedTotal = jobsTotal + extraTotal + laborTotal;
    const totalCost = (targetCar.customTotalCost !== undefined && targetCar.customTotalCost !== '' && Number(targetCar.customTotalCost) > 0)
      ? Number(targetCar.customTotalCost)
      : computedTotal;

    const historyRecord = {
      plate: targetCar.plate,
      model: targetCar.model,
      date: new Date().toLocaleDateString('tr-TR'),
      desc: [
        ...targetCar.jobsDone.map(j => typeof j === 'object' ? j.name : j),
        ...(laborTotal > 0 ? [`Toptan İşçilik (${laborTotal} TL)`] : [])
      ].join(', '),
      cost: totalCost,
      master: targetCar.assignedUsta || 'Nuri Usta',
      // Full vehicle details for service receipt generation
      id: targetCar.id,
      owner: targetCar.owner || '',
      phone: targetCar.phone || '',
      km: targetCar.km || '',
      chassis: targetCar.chassis || '',
      motorNo: targetCar.motorNo || '',
      broughtBy: targetCar.broughtBy || '',
      advisor: targetCar.advisor || '',
      assignedUsta: targetCar.assignedUsta || '',
      customerDemands: targetCar.customerDemands || '',
      deliveryTime: targetCar.deliveryTime || '',
      jobsDone: targetCar.jobsDone || [],
      extraItems: targetCar.extraItems || [],
      laborCost: targetCar.laborCost || 0,
      customTotalCost: targetCar.customTotalCost !== undefined ? targetCar.customTotalCost : '',
      customPartsCost: targetCar.customPartsCost !== undefined ? targetCar.customPartsCost : ''
    };

    setActiveRepairs(activeRepairs.filter(c => String(c.id) !== String(id)));
    
    try {
      await deleteDoc(doc(db, "activeRepairs", String(id)));
      const docRef = await addDoc(collection(db, "completedRepairs"), historyRecord);
      historyRecord._docId = docRef.id;
    } catch (e) {
      console.error(e);
    }

    setCompletedRepairs([historyRecord, ...completedRepairs]);
    alert(`${targetCar.plate} plakalı aracın işlemleri tamamlandı ve müşteri geçmişine kaydedildi.`);
  };

  const deleteCompletedRepair = async (targetRecord) => {
    setCompletedRepairs(prev => prev.filter(item => item !== targetRecord));

    try {
      if (targetRecord._docId) {
        await deleteDoc(doc(db, "completedRepairs", targetRecord._docId));
      } else {
        const snap = await getDocs(collection(db, "completedRepairs"));
        for (const d of snap.docs) {
          const data = d.data();
          if (
            (targetRecord.id && data.id === targetRecord.id) ||
            (data.plate === targetRecord.plate && data.date === targetRecord.date && data.desc === targetRecord.desc)
          ) {
            await deleteDoc(d.ref);
            break;
          }
        }
      }
    } catch (e) {
      console.error("deleteCompletedRepair failed:", e);
    }
  };

  // Marketplace Actions
  const addMarketplaceListing = async (newListing) => {
    setListings([newListing, ...listings]);
    try {
      await setDoc(doc(db, "listings", String(newListing.id)), newListing);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMarketplaceListing = async (id) => {
    setListings(listings.filter(item => String(item.id) !== String(id)));
    try {
      await deleteDoc(doc(db, "listings", String(id)));
    } catch (e) {
      console.error("Firestore deleteMarketplaceListing failed:", e);
    }
  };

  // Blog Actions
  const addBlogPost = async (newPost) => {
    setBlogs([newPost, ...blogs]);
    try {
      await setDoc(doc(db, "blogs", newPost.id), newPost);
    } catch (e) {
      console.error("Firestore addBlogPost failed:", e);
    }
  };

  const deleteBlogPost = async (id) => {
    setBlogs(blogs.filter(b => b.id !== id));
    try {
      await deleteDoc(doc(db, "blogs", id));
    } catch (e) {
      console.error("Firestore deleteBlogPost failed:", e);
    }
  };

  const addCustomerCard = async (newCard) => {
    setCustomerCards([newCard, ...customerCards]);
    try {
      await setDoc(doc(db, "customerCards", newCard.id), newCard);
    } catch (e) {
      console.error("Firestore addCustomerCard failed:", e);
    }
  };

  const deleteCustomerCard = async (id) => {
    setCustomerCards(customerCards.filter(c => c.id !== id));
    try {
      await deleteDoc(doc(db, "customerCards", id));
    } catch (e) {
      console.error("Firestore deleteCustomerCard failed:", e);
    }
  };

  const addRepairPart = async (carId, partName, cost, qty, supplier, status) => {
    const updated = activeRepairs.map(car => {
      if (String(car.id) === String(carId)) {
        const newPart = {
          id: 'part-' + Date.now() + Math.random().toString(36).substr(2, 4),
          name: partName,
          cost: Number(cost) || 0,
          qty: Number(qty) || 1,
          supplier: supplier || 'Belirtilmedi',
          status: status || 'Sipariş Edildi'
        };
        return {
          ...car,
          parts: [...(car.parts || []), newPart]
        };
      }
      return car;
    });
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(carId));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(carId)), targetCar);
      } catch (e) {
        console.error("Firestore addRepairPart failed:", e);
      }
    }
  };

  const updateRepairPartStatus = async (carId, partId, newStatus) => {
    const updated = activeRepairs.map(car => {
      if (String(car.id) === String(carId)) {
        return {
          ...car,
          parts: (car.parts || []).map(p => p.id === partId ? { ...p, status: newStatus } : p)
        };
      }
      return car;
    });
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(carId));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(carId)), targetCar);
      } catch (e) {
        console.error("Firestore updateRepairPartStatus failed:", e);
      }
    }
  };

  const deleteRepairPart = async (carId, partId) => {
    const updated = activeRepairs.map(car => {
      if (String(car.id) === String(carId)) {
        return {
          ...car,
          parts: (car.parts || []).filter(p => p.id !== partId)
        };
      }
      return car;
    });
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(carId));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(carId)), targetCar);
      } catch (e) {
        console.error("Firestore deleteRepairPart failed:", e);
      }
    }
  };

  const addRepairPayment = async (carId, amount, method, note) => {
    const updated = activeRepairs.map(car => {
      if (String(car.id) === String(carId)) {
        const newPayment = {
          id: 'pay-' + Date.now() + Math.random().toString(36).substr(2, 4),
          amount: Number(amount) || 0,
          method: method || 'Nakit',
          date: new Date().toLocaleDateString('tr-TR'),
          note: note || ''
        };
        return {
          ...car,
          payments: [...(car.payments || []), newPayment]
        };
      }
      return car;
    });
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(carId));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(carId)), targetCar);
      } catch (e) {
        console.error("Firestore addRepairPayment failed:", e);
      }
    }
  };

  const deleteRepairPayment = async (carId, paymentId) => {
    const updated = activeRepairs.map(car => {
      if (String(car.id) === String(carId)) {
        return {
          ...car,
          payments: (car.payments || []).filter(p => p.id !== paymentId)
        };
      }
      return car;
    });
    setActiveRepairs(updated);
    const targetCar = updated.find(c => String(c.id) === String(carId));
    if (targetCar) {
      try {
        await setDoc(doc(db, "activeRepairs", String(carId)), targetCar);
      } catch (e) {
        console.error("Firestore deleteRepairPayment failed:", e);
      }
    }
  };


  if (loading) {
    return (
      <div className="app-loader-container">
        <div className="app-loader-card glass-card">
          <div className="loader-logo-wrapper">
            <img src="/logo.png" alt="Vos74 Logo" className="loader-logo-img" />
            <div className="logo-glow-pulse"></div>
          </div>
          
          <div className="loader-progress-container">
            <div className="loader-progress-bar"></div>
            <div className="loader-progress-scanner"></div>
          </div>

          <h2 className="text-gradient" style={{ margin: '0', fontSize: '1.4rem', fontWeight: '800' }}>Vos74 Veritabanı Yükleniyor...</h2>
          <p className="loader-status-text">Lütfen bekleyiniz, veriler güvenli bir şekilde senkronize ediliyor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-container ${activeBranchInfo.themeClass} theme-palette-${colorTheme}`}>
      {/* Interactive Particle Network Background */}
      <ParticleBackground />

      {/* Campaigns Popup Modal */}
      <CampaignPopup campaigns={campaigns} setActiveTab={setActiveTab} />

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

        {activeTab === 'customerCard' && (
          <CustomerCardGenerator 
            addCustomerCard={addCustomerCard}
          />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace 
            listings={listings} 
            currentBranch={branch}
          />
        )}

        {activeTab === 'blog' && (
          <Blog 
            blogs={blogs} 
            setActiveTab={setActiveTab}
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
              deleteCompletedRepair={deleteCompletedRepair}
              updateRepairStatus={updateRepairStatus}
              addRepairJob={addRepairJob}
              deleteRepairJob={deleteRepairJob}
              updateRepairJobCost={updateRepairJobCost}
              updateRepairLaborCost={updateRepairLaborCost}
              updateRepairCustomTotalCost={updateRepairCustomTotalCost}
              updateRepairCustomPartsCost={updateRepairCustomPartsCost}
              updateRepairCustomerDemands={updateRepairCustomerDemands}
              addRepairPhoto={addRepairPhoto}
              deleteRepairPhoto={deleteRepairPhoto}
              addPendingRequest={addPendingRequest}
              addActiveRepair={addActiveRepair}
              updateRepairBayAndUsta={updateRepairBayAndUsta}
              deleteActiveRepair={deleteActiveRepair}
              listings={listings}
              addMarketplaceListing={addMarketplaceListing}
              deleteMarketplaceListing={deleteMarketplaceListing}
              blogs={blogs}
              addBlogPost={addBlogPost}
              deleteBlogPost={deleteBlogPost}
              
              // CMS States & Setters
              branchDetails={branchDetails}
              setBranchDetails={handleSetBranchDetails}
              team={team}
              setTeam={handleSetTeam}
              testimonials={testimonials}
              setTestimonials={handleSetTestimonials}
              galleryItems={galleryItems}
              setGalleryItems={handleSetGalleryItems}
              beforeAfterData={beforeAfterData}
              setBeforeAfterData={handleSetBeforeAfterData}
              socialLinks={socialLinks}
              setSocialLinks={handleSetSocialLinks}
              campaigns={campaigns}
              setCampaigns={handleSetCampaigns}
              customerCards={customerCards}
              deleteCustomerCard={deleteCustomerCard}
              addRepairPart={addRepairPart}
              updateRepairPartStatus={updateRepairPartStatus}
              deleteRepairPart={deleteRepairPart}
              addRepairPayment={addRepairPayment}
              deleteRepairPayment={deleteRepairPayment}
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

      {/* Google Reviews Widget (Floating Badge & Drawer) */}
      <GoogleReviewsWidget />

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
