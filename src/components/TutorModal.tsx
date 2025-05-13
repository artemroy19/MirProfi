import React from 'react';
import { X, Phone } from 'lucide-react';
import { Tutor } from '../types';
import { formatPrice } from '../utils/helpers';

interface TutorModalProps {
  tutor: Tutor;
  onClose: () => void;
}

const TutorModal: React.FC<TutorModalProps> = ({ tutor, onClose }) => {
  // Закрытие модального окна при клике на оверлей
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Предотвращение закрытия при клике внутри модального окна
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // Получение отображаемого текста для типа занятий
  return (
    <div className="modal-overlay active" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={handleModalClick}>
        <div className="modal-header">
          <h2 className="modal-title">{tutor.name}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <img src={tutor.photo} alt={tutor.name} className="modal-photo" />
          
          <div className="modal-section">
            <div className="modal-label">Предметы</div>
            <div className="tutor-subjects">
              {tutor.subjects.map((subject) => (
                <span key={subject} className="tutor-subject">
                  {subject}
                </span>
              ))}
            </div>
          </div>
          
          <div className="modal-section">
            <div className="modal-label">Описание</div>
            <p>{tutor.description}</p>
          </div>
          
          <div className="modal-section">
            <div className="modal-label">Стоимость занятия</div>
            <p style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '1.25rem' }}>
              {formatPrice(tutor.price)}
            </p>
          </div>
          
          <div className="modal-section">
            <div className="modal-label">Формат занятий</div>
            <div>
              {tutor.lessonType === 'online' || tutor.lessonType === 'both' ? (
                <span className="lesson-type online">Онлайн</span>
              ) : null}
              
              {tutor.lessonType === 'offline' || tutor.lessonType === 'both' ? (
                <span className="lesson-type offline">Оффлайн</span>
              ) : null}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <a 
            href={`tel:${tutor.phone.replace(/\D/g, '')}`} 
            className="btn btn-primary btn-icon"
          >
            <Phone size={16} />
            Позвонить: {tutor.phone}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TutorModal;