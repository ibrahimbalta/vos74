import React, { useState } from 'react';
import { User, Lock, Key, AlertTriangle } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setShake(false);

    // Simple authentication logic
    if (username.toLowerCase() === 'usta' && password === '1234') {
      onLoginSuccess();
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="login-container">
      <div className={`login-card glass-card ${shake ? 'shake-anim' : ''}`}>
        <div className="login-header">
          <div className="login-icon-box pulse-glow">
            <Key size={28} />
          </div>
          <h3>Usta Paneli Girişi</h3>
          <p>Yönetim ve iş takip paneline erişmek için yetkilendirme gereklidir.</p>
        </div>

        {error && (
          <div className="login-error-badge">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-login">
            <label>Kullanıcı Adı</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="Örn: usta" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group-login">
            <label>Şifre</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="glow-btn login-btn">
            <span>Doğrula & Giriş Yap</span>
          </button>
        </form>

        <div className="login-hint-box">
          <small>🔑 <strong>Demo Giriş Bilgileri:</strong></small>
          <small>Kullanıcı Adı: <code>usta</code> | Şifre: <code>1234</code></small>
        </div>
      </div>
    </div>
  );
}
