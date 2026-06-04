import React, { useState } from 'react';
import { Shield, Menu, X, User, ArrowLeftRight } from 'lucide-react';

const YoutubeIcon = ({ size = 16, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Navbar({ currentBranchName, activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'tracker', label: 'Servis Takip' },
    { id: 'customerCard', label: 'Müşteri Kartı' },
    { id: 'marketplace', label: 'Mağaza' },
    { id: 'blog', label: 'Blog' },
    { id: 'testimonials', label: 'Referanslar' },
    { id: 'youtube', label: 'Bugün Servisimizde', external: 'https://www.youtube.com/@Vos74', icon: 'youtube' },
  ];

  const handleTabClick = (tabId, externalUrl) => {
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
      setMobileMenuOpen(false);
      return;
    }
    if (tabId === 'testimonials') {
      setActiveTab('home');
      setMobileMenuOpen(false);
      setTimeout(() => {
        const element = document.getElementById('testimonials');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      setActiveTab(tabId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="navbar glass">
      <div className="nav-container">
        {/* Dynamic Logo based on specialty */}
        <div className="nav-logo" onClick={() => handleTabClick('home')}>
          <img src="/logo.png" alt="Vos74 Logo" className="nav-logo-img" />
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id, item.external)}
              className={`nav-link-btn ${item.icon === 'youtube' ? 'youtube-link' : ''} ${activeTab === item.id ? 'active' : ''}`}
            >
              {item.icon === 'youtube' && <YoutubeIcon size={16} className="youtube-icon" />}
              {item.label}
            </button>
          ))}
          
          <button 
            className={`admin-toggle-btn ${activeTab === 'admin' ? 'active-admin' : ''}`}
            onClick={() => handleTabClick(activeTab === 'admin' ? 'home' : 'admin')}
          >
            {activeTab === 'admin' ? (
              <>
                <ArrowLeftRight size={16} />
                <span>Müşteri Ekranı</span>
              </>
            ) : (
              <>
                <User size={16} />
                <span>Usta Girişi</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id, item.external)}
              className={`mobile-nav-link ${item.icon === 'youtube' ? 'youtube-link' : ''} ${activeTab === item.id ? 'active' : ''}`}
            >
              {item.icon === 'youtube' && <YoutubeIcon size={18} className="youtube-icon" />}
              {item.label}
            </button>
          ))}
          <button 
            className="mobile-admin-btn"
            onClick={() => handleTabClick(activeTab === 'admin' ? 'home' : 'admin')}
          >
            <User size={18} />
            <span>{activeTab === 'admin' ? 'Müşteri Ekranına Dön' : 'Usta Yönetim Paneli'}</span>
          </button>
        </div>
      )}
    </nav>
  );
}
