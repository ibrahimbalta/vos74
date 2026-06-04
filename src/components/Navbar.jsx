import React, { useState } from 'react';
import { Shield, Menu, X, User, ArrowLeftRight } from 'lucide-react';

export default function Navbar({ currentBranchName, activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'tracker', label: 'Servis Takip' },
    { id: 'marketplace', label: 'Mağaza' },
    { id: 'testimonials', label: 'Referanslar' },
  ];

  const handleTabClick = (tabId) => {
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
              onClick={() => handleTabClick(item.id)}
              className={`nav-link-btn ${activeTab === item.id ? 'active' : ''}`}
            >
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
              onClick={() => handleTabClick(item.id)}
              className={`mobile-nav-link ${activeTab === item.id ? 'active' : ''}`}
            >
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
