import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CampaignPopup({ campaigns, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter only active campaigns
  const activeCampaigns = campaigns ? campaigns.filter(c => c.active) : [];

  useEffect(() => {
    if (activeCampaigns.length === 0) return;

    // Check session storage so it only shows once per session
    const hasShown = sessionStorage.getItem('vos74_campaign_popup_shown');
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Add a micro-delay for animation trigger
        setTimeout(() => setIsVisible(true), 50);
        sessionStorage.setItem('vos74_campaign_popup_shown', 'true');
      }, 1200); // Trigger after 1.2s for clean loading flow

      return () => clearTimeout(timer);
    }
  }, [campaigns]);

  // Autoplay carousel if multiple campaigns exist
  useEffect(() => {
    if (!isOpen || activeCampaigns.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, [isOpen, currentIndex, activeCampaigns.length]);

  if (!isOpen || activeCampaigns.length === 0) return null;

  const handleClose = () => {
    setIsVisible(false);
    // Wait for fade out animation before unmounting
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? activeCampaigns.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === activeCampaigns.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index, e) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const handleActionClick = (campaign) => {
    handleClose();
    if (campaign.link === 'appointment') {
      setActiveTab('appointment');
    } else if (campaign.link && campaign.link.startsWith('http')) {
      window.open(campaign.link, '_blank', 'noopener,noreferrer');
    } else if (campaign.link) {
      setActiveTab(campaign.link);
    }
  };

  const currentCamp = activeCampaigns[currentIndex];

  return (
    <div 
      className={`campaign-popup-overlay ${isVisible ? 'visible' : ''}`}
      onClick={handleClose}
    >
      <div 
        className={`campaign-popup-card glass-card ${isVisible ? 'visible' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          className="campaign-popup-close" 
          onClick={handleClose} 
          aria-label="Kapat"
        >
          <X size={20} />
        </button>

        {/* Carousel controls if more than 1 campaign */}
        {activeCampaigns.length > 1 && (
          <>
            <button 
              className="carousel-control-btn prev" 
              onClick={handlePrev}
              aria-label="Önceki Kampanya"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="carousel-control-btn next" 
              onClick={handleNext}
              aria-label="Sonraki Kampanya"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Campaign Content */}
        <div className="campaign-popup-body">
          <div className="campaign-popup-image-container">
            <img 
              src={currentCamp.image} 
              alt={currentCamp.title} 
              className="campaign-popup-img"
            />
          </div>
          <div className="campaign-popup-info">
            <span className="campaign-badge">Fırsat / Kampanya</span>
            <h3 className="campaign-title text-gradient">{currentCamp.title}</h3>
            <p className="campaign-desc">{currentCamp.description}</p>
            
            {currentCamp.buttonText && (
              <button 
                className="campaign-action-btn glow-btn"
                onClick={() => handleActionClick(currentCamp)}
              >
                {currentCamp.buttonText}
              </button>
            )}
          </div>
        </div>

        {/* Dots Page Indicator */}
        {activeCampaigns.length > 1 && (
          <div className="campaign-carousel-dots">
            {activeCampaigns.map((_, idx) => (
              <button
                key={idx}
                className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={(e) => handleDotClick(idx, e)}
                aria-label={`Slayt ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
