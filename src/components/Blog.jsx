import React, { useState } from 'react';
import { BookOpen, Calendar, User, Search, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const defaultBlogs = [
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
    content: 'VAG grubu araçlarda kış aylarında sıkça karşılaşılan sorunlardan biri kaloriferin sadece soğuk veya ılık üflemesidir. Bu durum çoğunlukla kalorifer radyatörünün (peteğinin) tıkanmasından kaynaklanır. Özellikle fabrikasyon olarak doldurulan G13 antifrizin zamanla özelliğini yitirerek çamurlaşması veya sistemde kullanılan silika jel torbasının patlaması peteği tıkar. Ayrıca su pompası (devridaim) kaçakları da motorun susuz kalıp hararet yapmasına yol açabilir.\n\nIsınma ve soğutma sistemi sorunlarında Bartın Yeni Sanayi Sitesi\'nde faaliyet gösteren vos74 bartın, son teknoloji petek temizleme cihazlarıyla hizmetinizdedir. Servisimizde usta olarak kadir gül, kalorifer peteğinizi göğsü sökmeden özel kimyasal yıkama cihazıyla temizlemekte veya gerektiğinde orijinal yedek parçalarla değişimini sağlamaktadır. Ayrıca devridaim pompası kaçakları da hızlıca giderilmektedir.\n\nSoğutma sisteminde sadece VAG standartlarına uygun (G12 EVO veya G12++) antifriz ve saf su kullanılmalıdır. Soğutma sistemi kontrolü için vos74.com.tr üzerinden randevu alabilirsiniz. Bu vos74 seo odaklı içerik, kış aylarında güvenle seyahat etmeniz için hazırlanmıştır.',
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
    summary: 'Tiguan, Golf R, Passat 4Motion ve Audi Quattro modellerindeki Haldex diferansiyel sisteminin çalışma prensipleri, pompa filtre arızaları ve periyodik yağ değişimi.',
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

export default function Blog({ blogs = [], setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  const activeBlogs = blogs.length > 0 ? blogs : defaultBlogs;

  // Categories extraction
  const categories = ['All', ...new Set(activeBlogs.map(b => b.category || 'Genel'))];

  // Filtering logic
  const filteredBlogs = activeBlogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="blog-section animate-slide-up">
      {/* Detail Modal View */}
      {selectedPost ? (
        <div className="blog-post-detail glass-card">
          <button className="glow-btn-secondary back-to-blogs" onClick={() => setSelectedPost(null)}>
            <ArrowLeft size={16} />
            <span>Blog Listesine Dön</span>
          </button>
          
          <div className="blog-detail-header">
            <span className="blog-detail-category">{selectedPost.category || 'Genel'}</span>
            <h2>{selectedPost.title}</h2>
            <div className="blog-meta">
              <span><Calendar size={14} /> {selectedPost.date}</span>
              <span><User size={14} /> {selectedPost.author || 'Vos74'}</span>
            </div>
          </div>

          {selectedPost.image && (
            <div className="blog-detail-image-box">
              <img src={selectedPost.image} alt={selectedPost.title} className="blog-detail-image" />
            </div>
          )}

          <div className="blog-detail-content">
            {selectedPost.content ? (
              selectedPost.content.split('\n\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '1.5rem', lineHeight: '1.7', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
                  {paragraph.split('\n').map((line, lIdx) => (
                    <React.Fragment key={lIdx}>
                      {line}
                      {lIdx < paragraph.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              ))
            ) : (
              <p>{selectedPost.summary}</p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="section-header">
            <span className="badge"><BookOpen size={14} style={{ marginRight: '4px' }} /> Vos74 Blog</span>
            <h2>Bilgi ve Tecrübe Paylaşımı</h2>
            <p className="section-desc">
              VAG grubu araçlarınızın ömrünü uzatacak teknik tavsiyeler, arıza işaretlerinin anlamları ve bakım rehberlerimiz.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="blog-filters-row glass">
            <div className="blog-search-box">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Blog yazılarında ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="blog-categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-tag-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blogs Grid */}
          <div className="blogs-grid">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((post, idx) => (
                <ScrollReveal key={post.id || idx} direction="up" delay={idx * 50}>
                  <div className="glass-card blog-card" onClick={() => setSelectedPost(post)}>
                    <div className="blog-card-img-box">
                      <img src={post.image || '/hero_bg.png'} alt={post.title} className="blog-card-img" />
                      <span className="blog-category-badge">{post.category || 'Genel'}</span>
                    </div>

                    <div className="blog-card-body">
                      <div className="blog-card-meta">
                        <span><Calendar size={12} /> {post.date}</span>
                        <span><User size={12} /> {post.author || 'Vos74'}</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.summary}</p>
                      
                      <button className="read-more-btn">
                        <span>Devamını Oku</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))
            ) : (
              <div className="no-blogs-found glass full-width">
                <BookOpen size={32} className="muted-icon" />
                <h4>Yazı Bulunamadı</h4>
                <p>Arama kriterlerinize uygun blog yazısı mevcut değil.</p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
