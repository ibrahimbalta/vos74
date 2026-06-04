import React, { useState } from 'react';
import { CreditCard, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CustomerCardGenerator({ addCustomerCard }) {
  const [name, setName] = useState('');
  const [plate, setPlate] = useState('');
  const [phone, setPhone] = useState('');
  const [createdCard, setCreatedCard] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !plate || !phone) return;

    setIsGenerating(true);

    // Generate a unique card number VOS74-VIP-XXXXX
    const randNum = Math.floor(100000 + Math.random() * 900000);
    const cardId = `VOS74-VIP-${randNum}`;
    
    // Normalize phone and plate
    const formattedPlate = plate.toUpperCase().trim();
    const formattedPhone = phone.trim();

    const newCard = {
      id: cardId,
      name: name.trim(),
      plate: formattedPlate,
      phone: formattedPhone,
      cardNo: cardId,
      createdAt: new Date().toLocaleDateString('tr-TR'),
      timestamp: Date.now()
    };

    // Simulate slight delay for premium generation animation feel
    setTimeout(async () => {
      await addCustomerCard(newCard);
      setCreatedCard(newCard);
      setIsGenerating(false);
    }, 1000);
  };

  const handleDownload = () => {
    if (!createdCard) return;

    // Create an offscreen canvas for rendering
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    // Round rect drawing helper
    const drawRoundRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    // 1. Clip canvas to rounded corners
    drawRoundRect(0, 0, 800, 500, 24);
    ctx.clip();

    // 2. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 800, 500);
    bgGrad.addColorStop(0, '#060c18');
    bgGrad.addColorStop(0.5, '#0e0b1c');
    bgGrad.addColorStop(1, '#1b0a2b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // 3. Draw a stylized grid pattern in background for texture
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 800; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0); ctx.lineTo(i, 500);
      ctx.stroke();
    }
    for (let j = 0; j < 500; j += 30) {
      ctx.beginPath();
      ctx.moveTo(0, j); ctx.lineTo(800, j);
      ctx.stroke();
    }

    // 4. Draw stylized background VW Logo in low opacity
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.035)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(600, 250, 160, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw V in top half
    ctx.beginPath();
    ctx.moveTo(524, 160);
    ctx.lineTo(600, 246);
    ctx.lineTo(676, 160);
    ctx.stroke();

    // Draw W in bottom half
    ctx.beginPath();
    ctx.moveTo(494, 227);
    ctx.lineTo(555, 345);
    ctx.lineTo(600, 269);
    ctx.lineTo(645, 345);
    ctx.lineTo(706, 227);
    ctx.stroke();

    // 5. Card Glowing Border
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 6;
    drawRoundRect(0, 0, 800, 500, 24);
    ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow

    // 6. Draw Gold Smart Chip
    const chipGrad = ctx.createLinearGradient(80, 140, 150, 190);
    chipGrad.addColorStop(0, '#ffe673');
    chipGrad.addColorStop(0.5, '#f3b63a');
    chipGrad.addColorStop(1, '#c87f0a');
    ctx.fillStyle = chipGrad;
    drawRoundRect(80, 140, 70, 50, 8);
    ctx.fill();

    // Chip lines
    ctx.strokeStyle = '#603803';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(115, 140); ctx.lineTo(115, 190);
    ctx.moveTo(80, 165); ctx.lineTo(150, 165);
    ctx.stroke();

    // 7. Typography / Details
    // Service Header
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 34px sans-serif';
    ctx.fillText('VOS74 VAG GRUBU ÖZEL SERVİS', 80, 80);

    ctx.fillStyle = '#ffffff';
    ctx.font = '22px sans-serif';
    ctx.fillText('VIP MÜŞTERİ KARTI', 80, 115);

    // Cardholder Info
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '14px sans-serif';
    ctx.fillText('KART SAHİBİ', 80, 245);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(createdCard.name.toUpperCase(), 80, 275);

    // Plate Info
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '14px sans-serif';
    ctx.fillText('ARAÇ PLAKASI', 80, 335);
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(createdCard.plate, 80, 365);

    // Phone Info
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '14px sans-serif';
    ctx.fillText('TELEFON', 360, 335);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(createdCard.phone, 360, 365);

    // Card ID bottom left
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '14px monospace';
    ctx.fillText(`KART NO: ${createdCard.cardNo}`, 80, 445);

    // Discount Badge bottom right
    const badgeGrad = ctx.createLinearGradient(540, 410, 720, 460);
    badgeGrad.addColorStop(0, '#00f2fe');
    badgeGrad.addColorStop(1, '#4facfe');
    ctx.fillStyle = badgeGrad;
    drawRoundRect(540, 410, 180, 50, 12);
    ctx.fill();

    // Badge text
    ctx.fillStyle = '#050a14';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('%10 İNDİRİM', 630, 442);
    ctx.textAlign = 'left';

    // 8. Trigger local PNG download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `vos74-vip-kart-${createdCard.plate.replace(/\s+/g, '')}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleReset = () => {
    setName('');
    setPlate('');
    setPhone('');
    setCreatedCard(null);
  };

  return (
    <div className="card-generator-section container animate-slide-up" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Page Header */}
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge" style={{ marginBottom: '10px' }}>VIP Sadakat Programı</span>
        <h2>Vos74 Dijital Müşteri Kartı</h2>
        <p className="section-desc" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Bilgilerinizi girerek adınıza kayıtlı VIP Müşteri Kartınızı anında oluşturun. 
          Servisimizde yaptıracağınız tüm periyodik bakım ve onarım işçiliklerinde <strong>%10 indirim</strong> hakkı kazanın!
        </p>
      </div>

      <div className="card-generator-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        
        {/* Left Side: Generator Form / Success View */}
        <div className="generator-form-panel glass-card" style={{ padding: '30px', borderRadius: '16px' }}>
          {!createdCard ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <CreditCard className="text-primary" size={20} />
                <span>Kart Bilgilerinizi Doldurun</span>
              </h3>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Müşteri Adı Soyadı *</label>
                <input 
                  type="text" 
                  placeholder="Örn: Ahmet Yılmaz" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '1rem', outline: 'none' }}
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Araç Plakası *</label>
                <input 
                  type="text" 
                  placeholder="Örn: 74 AC 074" 
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '1rem', outline: 'none' }}
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Telefon Numarası *</label>
                <input 
                  type="tel" 
                  placeholder="Örn: 0532 XXX XX XX" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '1rem', outline: 'none' }}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="glow-btn full-width" 
                disabled={isGenerating}
                style={{ marginTop: '10px' }}
              >
                {isGenerating ? 'Kartınız Hazırlanıyor...' : 'Müşteri Kartımı Oluştur'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 242, 254, 0.05)', border: '1px dashed rgba(0, 242, 254, 0.2)', padding: '12px', borderRadius: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <ShieldCheck size={16} className="text-primary" style={{ flexShrink: 0 }} />
                <span>Kartınız oluşturulduktan sonra bilgisayarınıza veya telefonunuza görsel (PNG) olarak indirebilirsiniz.</span>
              </div>
            </form>
          ) : (
            <div className="generator-success-panel animate-slide-up" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <CheckCircle2 size={56} style={{ color: '#22c55e' }} />
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>Kartınız Başarıyla Oluşturuldu!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Vos74 VIP Müşteri Kartınız veritabanımıza kaydedildi. Kartınızı aşağıdan indirip bir sonraki servis işleminizde ustalarımıza göstererek %10 indirimden faydalanabilirsiniz.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '10px' }}>
                <button 
                  onClick={handleDownload} 
                  className="glow-btn"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Download size={18} />
                  <span>PNG Olarak İndir</span>
                </button>
                
                <button 
                  onClick={handleReset} 
                  className="glow-btn-secondary"
                  style={{ flex: 1 }}
                >
                  Yeni Kart Oluştur
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Card Preview */}
        <div className="generator-preview-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', alignSelf: 'flex-start' }}>KART ÖNİZLEMESİ</h4>
          
          <div className="vos-loyalty-card-wrapper" style={{ perspective: '1000px', width: '100%', maxWidth: '480px' }}>
            <div 
              className={`vos-loyalty-card glass ${createdCard ? 'created-active' : ''}`}
              style={{
                position: 'relative',
                aspectRatio: '1.6 / 1',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid var(--primary-glow)',
                boxShadow: createdCard ? '0 15px 35px rgba(0, 0, 0, 0.4), 0 0 25px var(--primary-glow-strong)' : '0 10px 25px rgba(0, 0, 0, 0.3)',
                background: 'linear-gradient(135deg, rgba(10, 20, 35, 0.85) 0%, rgba(20, 12, 35, 0.85) 100%)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.5s ease',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Holographic glowing lines overlay */}
              <div className="card-mesh" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.08, pointerEvents: 'none', background: 'radial-gradient(circle at 80% 20%, var(--primary) 0%, transparent 60%)' }} />
              
              {/* Backing VW Icon silhouette */}
              <div 
                className="card-vw-logo-bg" 
                style={{
                  position: 'absolute',
                  right: '-30px',
                  bottom: '-30px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: '3px solid rgba(0, 242, 254, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}
              >
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', border: '2px solid rgba(0, 242, 254, 0.025)', position: 'relative' }}>
                  {/* Stylized V & W mockup lines inside preview logo */}
                  <div style={{ position: 'absolute', top: '35%', left: '15%', right: '15%', height: '2px', background: 'rgba(0,242,254,0.015)', transform: 'rotate(45deg)' }} />
                  <div style={{ position: 'absolute', top: '35%', right: '15%', left: '15%', height: '2px', background: 'rgba(0,242,254,0.015)', transform: 'rotate(-45deg)' }} />
                </div>
              </div>

              {/* Card Top Section: Title & Chip */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--primary)', fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.02em', textShadow: '0 0 10px var(--primary-glow)' }}>VOS74 VAG ÖZEL SERVİS</h4>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>VIP Müşteri Kartı</span>
                </div>
                {/* Microchip */}
                <div 
                  className="card-chip" 
                  style={{
                    width: '42px',
                    height: '30px',
                    borderRadius: '5px',
                    background: 'linear-gradient(135deg, #ffe066 0%, #f5b041 50%, #d35400 100%)',
                    boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4)',
                    border: '1px solid rgba(0,0,0,0.1)'
                  }}
                />
              </div>

              {/* Card Middle: Plate and Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 1 }}>
                <div>
                  <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', display: 'block', letterSpacing: '0.05em' }}>KART SAHİBİ</span>
                  <span style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.02em', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                    {createdCard ? createdCard.name.toUpperCase() : (name ? name.toUpperCase() : 'İSİM SOYİSİM')}
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '30px' }}>
                  <div>
                    <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', display: 'block', letterSpacing: '0.05em' }}>PLAKA</span>
                    <span style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 800 }}>
                      {createdCard ? createdCard.plate : (plate ? plate.toUpperCase() : '74 XX 000')}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', display: 'block', letterSpacing: '0.05em' }}>TELEFON</span>
                    <span style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700 }}>
                      {createdCard ? createdCard.phone : (phone ? phone : '0532 ... .. ..')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Bottom: Card Number & Discount */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
                <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
                  {createdCard ? createdCard.cardNo : 'KART NO: VOS74-VIP-XXXXXX'}
                </span>
                
                <div 
                  className="card-discount-badge" 
                  style={{
                    background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-glow-strong) 100%)',
                    color: '#050a14',
                    fontWeight: 900,
                    fontSize: '0.75rem',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    boxShadow: '0 0 10px var(--primary-glow)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  %10 İNDİRİM
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
