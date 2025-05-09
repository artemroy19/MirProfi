import React from 'react';
import { Tutor } from '../types';
import { User } from 'lucide-react';
import { formatPrice } from '../utils/helpers';

interface TutorCardProps {
  tutor: Tutor;
  onClick: () => void;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor, onClick }) => {
  return (
    <div 
      className={`tutor-card card staggered-item ${tutor.isCurrentUser ? 'current-user' : ''}`} 
      onClick={onClick}
    >
      {tutor.isCurrentUser && (
        <div className="current-user-badge">Ваша анкета</div>
      )}
      
      <div className="tutor-photo-container">
        {tutor.photo ? (
          <img src={tutor.photo} alt={tutor.name} className="tutor-photo" />
        ) : (
          <div className="tutor-photo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-secondary)' }}>
            <User size={50} color="var(--color-primary)" />
          </div>
        )}
      </div>
      
      <div className="tutor-info">
        <h3 className="tutor-name">{tutor.name}</h3>
        
        <div className="tutor-subjects">
          {tutor.subjects.map((subject) => (
            <span key={subject} className="tutor-subject">
              {subject}
            </span>
          ))}
        </div>
        
        <div className="tutor-price">
          {formatPrice(tutor.price)}
        </div>
      </div>
    </div>
  );
};

export default TutorCard;