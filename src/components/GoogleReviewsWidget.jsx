import React, { useState, useEffect } from 'react';
import { Star, X, ExternalLink, ChevronRight } from 'lucide-react';
import './GoogleReviewsWidget.css';

const googleReviewsData = [
  {
    id: 1,
    name: 'Mustafa Yılmaz',
    rating: 5,
    date: '3 ay önce',
    text: 'Bartın için değer niteliğinde bir işletme. Garantili veya garantisi bitmiş her marka model araca, yetkili servis hassasiyeti ile bakım yapılıyor. Kesinlikle tavsiye ederim.',
    avatarColor: '#b71c1c', // Dark red as seen in the image (M avatar)
    initial: 'M'
  },
  {
    id: 2,
    name: 'Adem T',
    rating: 5,
    date: '2 ay önce',
    text: 'Bartın için gerçekten bir nimet olmuş açanlardan Allah razı olsun, aracımı 1 yıl önce aldım klima sorunu vardı bütün Bartın sanayisini gezdim çözemediler, burada Kadir usta 10 dakikada çözdü.',
    avatarColor: '#4a148c', // Purple (A avatar)
    initial: 'A'
  },
  {
    id: 3,
    name: 'Yusuf Demir',
    rating: 5,
    date: '1 ay önce',
    text: 'VAG grubu aracınız varsa Bartın ve çevre illerde gidebileceğiniz tek adres. Güler yüzlü hizmet, kaliteli işçilik ve şeffaf fiyatlandırma. Çok memnun kaldım.',
    avatarColor: '#0d47a1', // Blue
    initial: 'Y'
  },
  {
    id: 4,
    name: 'Merve K.',
    rating: 5,
    date: '2 hafta önce',
    text: 'Aracımın DSG şanzıman arızasını aynı gün içinde yapıp teslim ettiler. Nuri usta işinin ehli, fiyatları da yetkili servise göre çok makul. Teşekkürler.',
    avatarColor: '#006064', // Cyan
    initial: 'M'
  },
  {
    id: 5,
    name: 'Hakan Şen',
    rating: 5,
    date: '3 hafta önce',
    text: 'Periyodik bakım ve arıza tespit için tercih ettim. ODIS cihazıyla bağlayıp tüm gizli özellikleri de açtılar. Bartın\'da böyle profesyonel bir ekibin olması harika.',
    avatarColor: '#e65100', // Orange
    initial: 'H'
  }
];

// SVG for the Google multicolor 'G' logo
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" className="google-g-svg">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function GoogleReviewsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const googleReviewUrl = 'https://www.google.com/search?q=VOS74+VOLKSWAGEN+%C3%96ZEL+SERViSi+Yorumlar&rflfq=1&num=20#lkt=LocalPoiReviews';

  // Prevent background scrolling when reviews drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Badge (Bottom-Left) */}
      <div 
        className="google-floating-badge" 
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Google Müşteri Yorumlarını Aç"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(true);
          }
        }}
      >
        <div className="google-badge-logo-container">
          <GoogleIcon />
        </div>
        <div className="google-badge-rating-val">4.9</div>
        <div className="google-badge-stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="star-filled-google" fill="#FFC107" color="#FFC107" />
          ))}
        </div>
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div 
          className="google-drawer-backdrop" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Reviews Slide Drawer (Left Side) */}
      <div className={`google-reviews-drawer ${isOpen ? 'open' : ''}`}>
        <div className="google-drawer-header">
          <div className="google-drawer-title-group">
            <GoogleIcon />
            <h3 className="google-drawer-title">Müşteri Yorumları</h3>
          </div>
          <button 
            className="google-drawer-close-btn" 
            onClick={() => setIsOpen(false)}
            aria-label="Kapat"
          >
            <X size={20} />
          </button>
        </div>

        <div className="google-drawer-content">
          {/* Summary Score Card */}
          <div className="google-summary-card">
            <div className="google-summary-score">4.9</div>
            <div className="google-summary-stars-wrapper">
              <div className="google-summary-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="star-filled-google" fill="#FFC107" color="#FFC107" />
                ))}
              </div>
              <div className="google-summary-count">Google Haritalar üzerinde 120+ Değerlendirme</div>
            </div>
          </div>

          {/* Rate Us Button */}
          <a 
            href={googleReviewUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="google-rate-us-btn"
          >
            Bizi Değerlendirin
            <ExternalLink size={16} />
          </a>

          {/* Reviews List */}
          <div className="google-reviews-list">
            {googleReviewsData.map((review) => (
              <div key={review.id} className="google-review-card">
                <div className="google-review-user-row">
                  <div 
                    className="google-review-avatar" 
                    style={{ backgroundColor: review.avatarColor }}
                  >
                    <span>{review.initial}</span>
                    <div className="google-avatar-badge">
                      <GoogleIcon />
                    </div>
                  </div>
                  <div className="google-review-user-info">
                    <h4 className="google-review-username">{review.name}</h4>
                    <span className="google-review-date">{review.date}</span>
                  </div>
                </div>

                <div className="google-review-rating-row">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#FFC107" color="#FFC107" />
                  ))}
                </div>

                <p className="google-review-text">{review.text}</p>
              </div>
            ))}
          </div>

          <div className="google-drawer-footer">
            <a 
              href={googleReviewUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="google-view-all-link"
            >
              Google'da tüm yorumları gör
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
