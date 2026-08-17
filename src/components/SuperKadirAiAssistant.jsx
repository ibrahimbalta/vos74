import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, Send, Wrench, ShieldAlert, Sparkles, 
  ChevronRight, PhoneCall, Calendar, Zap, RefreshCw, Volume2, VolumeX, Flame
} from 'lucide-react';

export default function SuperKadirAiAssistant({ setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [speechBubbleText, setSpeechBubbleText] = useState('Selam! Aracında garip bir ses mi var? Tıkla, teşhis edeyim! 🛠️');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const messagesEndRef = useRef(null);

  // Rotating tips for the floating dock
  const rotatingTips = [
    "Selam! Aracında garip bir ses mi var? Tıkla, teşhis edeyim! 🛠️",
    "DSG titremesi, DPF doluluğu, Hararet mi var? Bana sor! ⚡",
    "Bartın, Karabük ve Zonguldak için 7/24 Vosmen AI Asistanı! 🚗",
    "Motor arıza lambası mı yandı? Hemen sorgulayalım! 💡",
    "Tıkla, Vosmen AI arızanı şıp diye bulsun! 🦸‍♂️"
  ];

  // Initial welcome messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Merhaba, ben Vosmen AI! 🖐️ VOS74 Yapay Zeka Arıza Asistanıyım. Aracındaki ses, arıza lambası veya şanzıman problemini bana sorabilir ya da aşağıdaki hızlı konulardan birini seçebilirsin!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: [
        { label: "⚙️ DSG Vites Titriyor / Şanzıman Isınması", query: "DSG şanzımanımda titreme ve arıza uyarısı var" },
        { label: "🚗 Sabah Çalışırken Şakırdama Sesi (Triger)", query: "Motor ilk çalıştırmada şakırdama sesi yapıyor" },
        { label: "💨 DPF / EGR Tıkandı, Çekiş Düşük (TDI)", query: "Dizel aracımda DPF ışığı yandı ve araç çekmiyor" },
        { label: "❄️ Kalorifer Isıtmıyor / Antifriz Kaçağı", query: "Kalorifer soğuk üflüyor ve antifriz eksiltiyor" },
        { label: "💡 Motor Arıza Lambası / ABS / ESP", query: "Ekranda motor arıza lambası yandı ne yapmalıyım" },
        { label: "🌧️ Sunroof / Araç İçine Su Alıyor", query: "Yağmurdan sonra taban halısı ıslandı su alıyor" },
        { label: "📍 Bartın, Karabük, Zonguldak Randevu", query: "Servis randevusu almak ve yol yardım istemek istiyorum" }
      ]
    }
  ]);

  // Scroll chat to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Periodic flying superhero animation trigger
  useEffect(() => {
    const flightInterval = setInterval(() => {
      if (!isOpen) {
        setIsFlying(true);
        if (soundEnabled) {
          playWhooshSound();
        }
        setTimeout(() => {
          setIsFlying(false);
        }, 6500);
      }
    }, 25000);

    return () => clearInterval(flightInterval);
  }, [isOpen, soundEnabled]);

  // Rotating speech bubble text logic
  useEffect(() => {
    const textInterval = setInterval(() => {
      setSpeechBubbleText(prev => {
        const nextIndex = (rotatingTips.indexOf(prev) + 1) % rotatingTips.length;
        return rotatingTips[nextIndex];
      });
    }, 6000);

    return () => clearInterval(textInterval);
  }, []);

  const playWhooshSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {}
  };

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  // Comprehensive AI Diagnostic Engine in Turkish
  const generateDiagnosticResponse = (userQuery) => {
    const q = userQuery.toLowerCase();
    
    // 1. DSG & Transmission Issues
    if (q.includes('dsg') || q.includes('şanzıman') || q.includes('vites') || q.includes('kavrama') || q.includes('mekatronik') || q.includes('titre')) {
      return {
        text: "⚠️ **DSG / Şanzıman Arızası Tespiti:**\n\n" +
          "DSG çift kavramalı şanzımanlarda (Volkswagen, Audi, Seat, Skoda) karşılaşılan titreme, 1'den 2'ye geçerken vuruntu veya ekranda İngiliz anahtarı çıkması iki temel nedenden kaynaklanır:\n\n" +
          "1️⃣ **Çift Kavrama Aşınması:** Sıkışık trafikte ve yokuşlarda balataların aşırı ısınmasından oluşur. Periyodik adaptasyon veya kavrama değişimi gerektirir.\n" +
          "2️⃣ **Mekatronik Ünite & Basınç Kaybı:** Mekatronik kart arızası veya orijinal akümülatör tüpünün gevşemesi sonucu şanzıman yağı basınç kaçırır.\n\n" +
          "🛠️ **Vos74 Çözümü:** Bartın servisimizde güçlendirilmiş tüp montajı, solenoid bakımı ve ODIS garantili kavrama değişimi yapıyoruz.",
        action: { label: "📅 DSG Randevusu Al", tab: "appointments" }
      };
    }

    // 2. Engine Noise & Timing Chain (Triger)
    if (q.includes('şakır') || q.includes('triger') || q.includes('zincir') || q.includes('sabah') || q.includes('ses') || q.includes('tsi') || q.includes('tfsi')) {
      return {
        text: "🔊 **Motor Şakırdama & Triger Zincir Tespiti:**\n\n" +
          "Özellikle TSI ve TFSI motorlarda (1.4 TSI, 1.2 TSI, 1.8 TSI) sabah ilk çalıştırmada 2-3 saniye süren şakırdama/zincir sesi triger zincirinin uzadığını veya sente gergisinin yağ basıncı tutamadığını gösterir.\n\n" +
          "⚠️ **Risk:** İhmal edilirse zincir atlayıp subap eğebilir ve yüksek maliyetli motor arızasına yol açabilir.\n\n" +
          "🛠️ **Vos74 Çözümü:** Orijinal VAG sente aparatlarımızla garantili triger zincir seti ve devridaim değişimi yapıyoruz.",
        action: { label: "🔧 Triger Kontrol Randevusu", tab: "appointments" }
      };
    }

    // 3. DPF & EGR Diesel Issues
    if (q.includes('dpf') || q.includes('egr') || q.includes('dizel') || q.includes('partikül') || q.includes('çekmiyor') || q.includes('duman') || q.includes('tdi')) {
      return {
        text: "💨 **DPF / EGR Tıkanıklık Tespiti:**\n\n" +
          "1.6 TDI ve 2.0 TDI motorlarda şehir içi kısa mesafe kullanımda Dizel Partikül Filtresi (DPF) dolabilir ve EGR valfi kurum bağlar.\n\n" +
          "🚨 **Belirtiler:** Kızdırma bujisi ışığının yanıp sönmesi, aracın 3000 deviri geçmemesi (Limp Mode) ve siyah/mavi duman.\n\n" +
          "🛠️ **Vos74 Çözümü:** Filtrenizi iptal etmeden özel kimyasal yıkama makinelerimizle %0 kurum seviyesine temizliyor ve ODIS canlı rejenerasyon yapıyoruz.",
        action: { label: "💨 DPF Temizlik Randevusu", tab: "appointments" }
      };
    }

    // 4. Heating & Antifreeze Issues
    if (q.includes('kalorifer') || q.includes('soğuk') || q.includes('antifriz') || q.includes('ısıtmıyor') || q.includes('su kaçağı') || q.includes('hararet')) {
      return {
        text: "❄️ **Kalorifer Petek & Antifriz Tespiti:**\n\n" +
          "Kış aylarında kaloriferin sadece soğuk veya ılık üflemesi genellikle G13 antifrizin çamurlaşması veya silika jel torbasının patlayarak kalorifer radyatörünü tıkamasından kaynaklanır.\n\n" +
          "🌡️ **Hararet Riski:** Devridaim su pompası kaçakları da motorun susuz kalıp hararet yapmasına neden olur.\n\n" +
          "🛠️ **Vos74 Çözümü:** Aracın göğsünü sökmeden basınçlı petek yıkama cihazımızla tıkanıklığı açıyor, G12++ / G12 EVO organik antifriz koyuyoruz.",
        action: { label: "🌡️ Petek Temizleme Al", tab: "appointments" }
      };
    }

    // 5. Warning Lights & ECU Electronics
    if (q.includes('arıza lambası') || q.includes('check engine') || q.includes('abs') || q.includes('esp') || q.includes('elektrik') || q.includes('kodlama') || q.includes('gizli özellik')) {
      return {
        text: "💡 **Motor Arıza Lambası & ODIS Teşhisi:**\n\n" +
          "Göstergedeki arıza lambaları oksijen (lambda) sensörü, akışmetre, ateşleme bobini veya ABS/ESP beyin sensörlerinden kaynaklanabilir.\n\n" +
          "💻 **ODIS Cihazı:** Rastgele parça değiştirmek yerine yetkili servis seviyesindeki lisanslı ODIS cihazımızla nokta atışı hata tespiti yapıyoruz.\n\n" +
          "✨ **Gizli Özellikler:** Kadran selamlama, Amerikan park, korna ile kilit onayı gibi özellikler de güvenle aktifleştirilir.",
        action: { label: "💻 ODIS Arıza Tespiti Al", tab: "appointments" }
      };
    }

    // 6. Water Leakage & Sunroof
    if (q.includes('su alıyor') || q.includes('sunroof') || q.includes('ıslak') || q.includes('tavan') || q.includes('halı') || q.includes('yağmur')) {
      return {
        text: "🌧️ **Araç Su Alma & Sunroof Tahliye Tespiti:**\n\n" +
          "Golf 7, Passat, Leon ve Octavia modellerinde yağmur sonrası taban halısının ıslanması sunroof su tahliye hortumlarının çamurla tıkanması veya kapı içi hoparlör contalarının aşınmasından olur.\n\n" +
          "⚠️ **Elektronik Risk:** Islaklık tavan döşemesini sarartır ve tabandaki konfor beyninin oksitlenmesine yol açabilir.\n\n" +
          "🛠️ **Vos74 Çözümü:** Su kanallarınızı açıyor, kapı izolasyonunu yeniliyor ve taban halınızı söküp kurutuyoruz.",
        action: { label: "🌧️ Su İzolasyonu Randevusu", tab: "appointments" }
      };
    }

    // 7. Appointment & Regional Services (Bartın, Karabük, Zonguldak)
    if (q.includes('randevu') || q.includes('bartın') || q.includes('karabük') || q.includes('zonguldak') || q.includes('nerede') || q.includes('telefon') || q.includes('ulaşım') || q.includes('fiyat')) {
      return {
        text: "📍 **Vos74 Bartın VAG Grubu Özel Servis:**\n\n" +
          "Bartın, Karabük, Safranbolu, Zonguldak, Çaycuma ve Ereğli bölgesindeki tüm sürücülerimize garantili tamir, periyodik bakım ve 7/24 teknik destek veriyoruz.\n\n" +
          "🏢 **Adres:** Bartın Yeni Sanayi Sitesi, No: 74\n" +
          "👨‍🔧 **Usta:** Kadir Gül Usta\n" +
          "📞 **Telefon / WhatsApp:** 0532 637 39 78\n\n" +
          "Dilerseniz hemen sitemiz üzerinden randevunuzu oluşturabilirsiniz!",
        action: { label: "📅 Online Randevu Oluştur", tab: "appointments" }
      };
    }

    // Default Fallback Intelligent Response
    return {
      text: `Belirttiğiniz "${userQuery}" konusuyla ilgili Vosmen AI ve teknik ekibimiz aracınızı incelemeye hazır! 🛠️\n\n` +
        "VOS74 Özel Servisimizde bilgisayarlı ODIS diagnostik cihazı, uzman usta kadrosu ve orijinal yedek parçalarla Bartın, Karabük ve Zonguldak illerine garantili hizmet vermekteyiz.\n\n" +
        "Aracınızı atölyemize getirebilir veya WhatsApp hattımızdan direkt Kadir Usta ile görüşebilirsiniz.",
      action: { label: "📞 Kadir Usta ile Görüş (WhatsApp)", url: "https://wa.me/905326373978?text=Merhaba%20Kadir%20Usta,%20aracimla%20ilgili%20bilgi%20almak%20istiyorum" }
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    playClickSound();

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = generateDiagnosticResponse(query);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseData.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: responseData.action
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleOptionClick = (optionQuery) => {
    handleSendMessage(optionQuery);
  };

  const handleActionClick = (action) => {
    playClickSound();
    if (action.tab && setActiveTab) {
      setActiveTab(action.tab);
      setIsOpen(false);
    } else if (action.url) {
      window.open(action.url, '_blank');
    }
  };

  const toggleWidget = () => {
    playClickSound();
    setIsOpen(!isOpen);
    setIsFlying(false);
  };

  return (
    <>
      {/* 1. FLYING SUPERHERO ANIMATION (Periodically flies across screen) */}
      {isFlying && !isOpen && (
        <div 
          className="super-kadir-flying-banner-container"
          onClick={toggleWidget}
          title="Vosmen AI'ya tıkla, arızanı teşhis etsin!"
        >
          <div className="flying-trail"></div>
          <div className="flying-speech-bubble">
            <span className="zap-badge"><Zap size={14} /> VOSMEN AI CANLI</span>
            <strong>Aracında arıza mı var? Tıkla, Vosmen AI Çözsün! 🛠️</strong>
          </div>
          <div className="flying-avatar-wrapper">
            <img 
              src="/super_kadir.png" 
              alt="Vosmen AI Flying" 
              className="super-kadir-flying-img"
            />
            <div className="flying-aura"></div>
          </div>
        </div>
      )}

      {/* 2. FLOATING DOCK AVATAR (Bottom Right Corner) */}
      {!isOpen && (
        <div className="super-kadir-dock-wrapper">
          {/* Hover Speech Bubble */}
          <div className="super-kadir-speech-bubble" onClick={toggleWidget}>
            <div className="bubble-badge"><Sparkles size={13} /> VOSMEN AI</div>
            <p>{speechBubbleText}</p>
            <span className="bubble-arrow"></span>
          </div>

          {/* Floating Character Button */}
          <button 
            className="super-kadir-dock-btn"
            onClick={toggleWidget}
            aria-label="Vosmen AI Arıza Asistanını Aç"
          >
            <div className="avatar-pulse-ring"></div>
            <div className="avatar-glow-bg"></div>
            <img 
              src="/super_kadir.png" 
              alt="Vosmen AI 3D Avatar" 
              className="super-kadir-dock-img"
            />
            <span className="online-indicator-dot"></span>
          </button>
        </div>
      )}

      {/* 3. AI DIAGNOSTIC CHAT MODAL / DRAWER */}
      {isOpen && (
        <div className="super-kadir-chat-modal">
          {/* Header */}
          <div className="chat-modal-header">
            <div className="header-left">
              <div className="header-avatar-box">
                <img src="/super_kadir.png" alt="Vosmen AI" className="header-avatar-img" />
                <span className="header-status-dot"></span>
              </div>
              <div className="header-info">
                <h3>Vosmen AI <Sparkles size={16} className="inline-sparkle" /></h3>
                <span className="subtitle">7/24 Canlı Araç Arıza & Diagnostik Uzmanı</span>
              </div>
            </div>

            <div className="header-right">
              <button 
                className="sound-toggle-btn"
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? "Sesi Kapat" : "Sesi Aç"}
              >
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button className="chat-close-btn" onClick={toggleWidget}>
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Regional SEO Info Bar */}
          <div className="chat-regional-bar">
            <span className="region-tag">📍 Bartın - Karabük - Zonguldak</span>
            <span className="status-badge">⚡ Yetkili Servis Kalitesi & ODIS</span>
          </div>

          {/* Messages Area */}
          <div className="chat-messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="msg-bot-avatar">
                    <img src="/super_kadir.png" alt="Vosmen AI" />
                  </div>
                )}
                
                <div className="msg-bubble">
                  <div className="msg-text-content">
                    {msg.text.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Quick Option Chips */}
                  {msg.options && (
                    <div className="msg-quick-options">
                      <p className="options-title">📌 Hızlı Arıza Sorgulama Konuları:</p>
                      <div className="options-chips-grid">
                        {msg.options.map((opt, i) => (
                          <button 
                            key={i} 
                            className="chip-btn"
                            onClick={() => handleOptionClick(opt.query)}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button (e.g. Appointment / Call) */}
                  {msg.action && (
                    <div className="msg-action-box">
                      <button 
                        className="msg-action-btn"
                        onClick={() => handleActionClick(msg.action)}
                      >
                        {msg.action.label} <ChevronRight size={16} />
                      </button>
                    </div>
                  )}

                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="message-row bot typing">
                <div className="msg-bot-avatar">
                  <img src="/super_kadir.png" alt="Vosmen AI" />
                </div>
                <div className="msg-bubble typing-bubble">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="typing-label">Vosmen AI arızayı analiz ediyor...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="chat-footer">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="chat-input-form"
            >
              <input 
                type="text" 
                placeholder="Aracınızdaki arızayı veya sesi yazın... (Örn: DSG vites titriyor)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="chat-text-input"
              />
              <button 
                type="submit" 
                className="chat-send-btn"
                disabled={!inputValue.trim()}
              >
                <Send size={18} />
              </button>
            </form>
            <div className="footer-credits">
              <span>⚡ Vos74 Bartın VAG Grubu Özel Servisi • Kadir Gül Usta</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
