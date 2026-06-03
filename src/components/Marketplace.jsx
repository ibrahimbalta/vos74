import React, { useState } from 'react';
import { Search, Tag, MessageCircle, Phone, Filter, Grid, Award } from 'lucide-react';

export default function Marketplace({ listings, currentBranch }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = listings.filter((item) => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.itemCode && item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="marketplace-section">
      <div className="section-header">
        <span className="badge">Servisimiz Güvencesiyle Garantili Ürünler</span>
        <h2>Mağaza</h2>
        <p className="section-desc">
          Kendi atölyemizde test edip onayladığımız, servis garantili yedek parçaları ve ikinci el araçları doğrudan ilk elden güvenle satın alın.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="market-filter-bar glass">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Ürün adı, parça kodu veya ilan detayı ara..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterCategory === 'all' ? 'active' : ''}`}
            onClick={() => setFilterCategory('all')}
          >
            <Grid size={14} />
            <span>Tümü</span>
          </button>
          
          <button 
            className={`filter-btn ${filterCategory === 'vehicle' ? 'active' : ''}`}
            onClick={() => setFilterCategory('vehicle')}
          >
            🚗 İkinci El Araç
          </button>
          
          <button 
            className={`filter-btn ${filterCategory === 'part' ? 'active' : ''}`}
            onClick={() => setFilterCategory('part')}
          >
            ⚙️ Yedek Parça
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="listings-grid">
        {filteredListings.length > 0 ? (
          filteredListings.map((item) => (
            <div className="glass-card listing-card" key={item.id}>
              {/* Image simulator */}
              <div className={`listing-image-box color-grad-${item.id % 4}`}>
                <span className="listing-type-badge">
                  {item.category === 'vehicle' ? '🚗 İkinci El Araç' : '⚙️ Yedek Parça'}
                </span>
                
                {item.isGuaranteed && (
                  <span className="guaranteed-badge">
                    <Award size={12} />
                    <span>Servis Garantili</span>
                  </span>
                )}
                
                {/* Visual placeholder box representing mechanical objects */}
                <div className="inner-visual-box">
                  <div className="visual-circle"></div>
                  <span className="visual-code">{item.itemCode || 'USTA-REF'}</span>
                </div>
              </div>

              <div className="listing-content">
                <div className="listing-price">{item.price.toLocaleString('tr-TR')} TL</div>
                <h3>{item.title}</h3>
                <p className="listing-desc">{item.description}</p>
                
                <div className="seller-card glass">
                  <div className="seller-info">
                    <span className="seller-workshop">🏬 {item.sellerWorkshop}</span>
                    <span className="seller-name">👨‍🔧 {item.sellerName}</span>
                  </div>
                  <div className="seller-actions">
                    <a href={`tel:${item.sellerPhone}`} className="seller-btn phone" title="Ustayı Telefonla Ara">
                      <Phone size={14} />
                      <span>Ara</span>
                    </a>
                    <a 
                      href={`https://wa.me/${item.sellerPhone.replace(/[^0-9]/g, '')}?text=Merhaba, ${item.title} ilanınız için yazıyorum.`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="seller-btn whatsapp"
                      title="WhatsApp ile İletişime Geç"
                    >
                      <MessageCircle size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-listings glass">
            <Tag size={48} className="muted-icon" />
            <h4>İlan Bulunmamaktadır</h4>
            <p>Aradığınız kriterlere uygun aktif ilan bulunamadı. Lütfen filtreleri veya arama sorgusunu değiştirin.</p>
          </div>
        )}
      </div>
    </section>
  );
}
