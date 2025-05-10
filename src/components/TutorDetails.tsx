import React from 'react';
import { ArrowLeft, Phone } from 'lucide-react';
import { Tutor } from '../types';
import { formatPrice } from '../utils/helpers';

interface TutorDetailsProps {
  tutor: Tutor;
  onBack: () => void;
}

const TutorDetails: React.FC<TutorDetailsProps> = ({ tutor, onBack }) => {
  return (
    <div className="tutor-details-container slide-in-bottom">
      <div className="tutor-details-content">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} />
          Вернуться к списку
        </button>
        
        <div className="tutor-details-header">
          <img src={tutor.photo} alt={tutor.name} className="tutor-details-photo" />
          <h1 className="tutor-details-name">{tutor.name}</h1>
        </div>
        
        <section className="tutor-details-section">
          <h2>Предметы</h2>
          <div className="tutor-subjects">
            {tutor.subjects.map((subject) => (
              <span key={subject} className="tutor-subject">
                {subject}
              </span>
            ))}
          </div>
        </section>
        
        <section className="tutor-details-section">
          <h2>О преподавателе</h2>
          <p>{tutor.description}</p>
        </section>
        
        <section className="tutor-details-section">
          <h2>Стоимость занятия</h2>
          <p className="tutor-details-price">{formatPrice(tutor.price)}</p>
        </section>
        
        <section className="tutor-details-section">
          <h2>Формат занятий</h2>
          <div className="lesson-types">
            {tutor.lessonType === 'online' || tutor.lessonType === 'both' ? (
              <span className="lesson-type online">Онлайн</span>
            ) : null}
            
            {tutor.lessonType === 'offline' || tutor.lessonType === 'both' ? (
              <span className="lesson-type offline">Оффлайн</span>
            ) : null}
          </div>
        </section>
        
        <div className="tutor-details-contact">
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

export default TutorDetails;