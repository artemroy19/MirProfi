import React from 'react';
import { Globe } from 'lucide-react';
import { Role } from '../types';

interface HeaderProps {
  currentRole: Role;
  switchRole: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentRole, switchRole }) => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Globe className="logo-icon" />
          <span>MirProfi</span>
        </div>
        
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
      </div>
    </header>
  );
};

export default Header;