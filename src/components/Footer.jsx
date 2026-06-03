import React from 'react';
import { Phone, MapPin, Clock, ShieldAlert } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 005.58 2.09V11.1a4.84 4.84 0 01-1.18.15 4.82 4.82 0 01-3.4-1.42v7.84"/>
  </svg>
);

const socialConfig = {
  instagram: { icon: InstagramIcon, label: 'Instagram', color: '#E4405F' },
  facebook: { icon: FacebookIcon, label: 'Facebook', color: '#1877F2' },
  youtube: { icon: YoutubeIcon, label: 'YouTube', color: '#FF0000' },
  whatsapp: { icon: WhatsAppIcon, label: 'WhatsApp', color: '#25D366' },
  tiktok: { icon: TikTokIcon, label: 'TikTok', color: '#fff' }
};

export default function Footer({ currentBranchName, socialLinks }) {
  const activeSocials = socialLinks
    ? Object.entries(socialLinks).filter(([, url]) => url && url.trim())
    : [];

  return (
    <footer className="footer glass">
      <div className="footer-container">
        
        <div className="footer-col about">
          <div className="footer-logo">
            <span className="logo-brand">Vos74</span>
            <span className="logo-sub">VAG Grubu Özel Servis</span>
          </div>
          <p>
            Sanayi sitesinin tecrübeli ustalarını dijital çağ ile buluşturuyoruz. Randevu, maliyet hesaplama ve anlık plaka sorgulama ile şeffaf hizmet.
          </p>
          <div className="work-hours">
            <Clock size={16} className="clock-icon" />
            <span>Pzt - Cmt: 08:30 - 19:00 (Pazar Kapalı)</span>
          </div>

          {activeSocials.length > 0 && (
            <div className="footer-social-links" style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
              {activeSocials.map(([key, url]) => {
                const cfg = socialConfig[key];
                if (!cfg) return null;
                const IconComp = cfg.icon;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={cfg.label}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border-color)',
                      color: cfg.color,
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = cfg.color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${cfg.color}40`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = cfg.color; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <IconComp />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="footer-col contact">
          <h4>İletişim ve Adres</h4>
          <ul>
            <li>
              <MapPin size={18} className="footer-icon" />
              <span>Yeni Sanayi Sitesi, Gölbucağı Mah. Sanayi Sokak No: 13-1, Merkez / Bartın</span>
            </li>
            <li>
              <Phone size={18} className="footer-icon" />
              <span>+90 (532) 637 39 78</span>
            </li>
          </ul>
        </div>

        <div className="footer-col certs">
          <h4>Hizmet Sözü</h4>
          <div className="guarantee-box-small">
            <ShieldAlert size={20} className="g-icon" />
            <p>Değişen her orijinal parçaya ve ustalarımızın el emeğine en yüksek işçilik standartlarında tam garanti vermekteyiz.</p>
          </div>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {currentBranchName}. Tüm Hakları Saklıdır. | Akıllı Sanayi Portalı</p>
      </div>
    </footer>
  );
}
