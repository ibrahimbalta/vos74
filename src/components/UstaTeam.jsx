import React from 'react';
import { Star, Phone, ShieldCheck, Award } from 'lucide-react';

export default function UstaTeam({ team }) {
  if (!team || team.length === 0) return null;

  return (
    <section className="team-section">
      <div className="section-header">
        <span className="badge">Çekirdek Kadro</span>
        <h2>Atölyemizin Ustaları</h2>
        <p className="section-desc">
          Aracınızı çıraklara değil, her biri alanında en az 15 yıl tecrübeli ve lisanslı ustalarımıza emanet ediyorsunuz.
        </p>
      </div>

      <div className="team-grid">
        {team.map((u) => (
          <div className="glass-card team-card" key={u.id}>
            {/* Visual Profile Avatar Container */}
            <div className="avatar-container color-grad-0">
              <div className="avatar-circle">
                <span className="avatar-letters">{u.name.split(' ')[0][0]}{u.name.split(' ')[1]?.[0] || 'U'}</span>
              </div>
              <div className="team-rating-badge glass">
                <Star size={12} className="star-icon" />
                <span>{u.rating.toFixed(1)} ({u.reviews} Yorum)</span>
              </div>
            </div>

            {/* Profile Content */}
            <div className="team-content">
              <h3>{u.name}</h3>
              <span className="team-role-lbl">{u.role}</span>
              <span className="team-exp-badge">{u.experience}</span>
              
              <div className="team-skills-list">
                {u.skills && u.skills.map((s, idx) => (
                  <span key={idx} className="skill-tag">🔧 {s}</span>
                ))}
              </div>

              <div className="team-certs-box glass">
                <Award size={16} className="certs-icon" />
                <div>
                  <strong>Sertifikalar:</strong>
                  <p>{u.certifications}</p>
                </div>
              </div>

              <a href={`tel:${u.phone}`} className="glow-btn full-width">
                <Phone size={14} />
                <span>Usta ile Doğrudan Görüş</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
