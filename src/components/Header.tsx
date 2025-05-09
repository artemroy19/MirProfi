import React from 'react';
import { Globe, LogOut } from 'lucide-react';
import { Role } from '../types';

interface HeaderProps {
  currentRole: Role;
  switchRole: () => void;
  username: string;
  onLogoClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentRole, 
  switchRole, 
  username,
  onLogoClick,
  onLogout
}) => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
          <Globe className="logo-icon" />
          <span>MirProfi</span>
        </div>
        
        <div className="header-right">
          <div className="role-toggle">
            <button
              className={`role-btn ${currentRole === 'student' ? 'active' : ''}`}
              onClick={() => currentRole !== 'student' && switchRole()}
            >
              Ученик
            </button>
            <button
              className={`role-btn ${currentRole === 'tutor' ? 'active' : ''}`}
              onClick={() => currentRole !== 'tutor' && switchRole()}
            >
              Репетитор
            </button>
            <div 
              className="role-indicator role-transition" 
              style={{ 
                width: 'calc(50% - 0.25rem)',
                transform: `translateX(${currentRole === 'student' ? 0 : '100%'})` 
              }}
            ></div>
          </div>
          
          <div className="user-info">
            <span className="username">{username}</span>
            <button onClick={onLogout} className="logout-btn">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;