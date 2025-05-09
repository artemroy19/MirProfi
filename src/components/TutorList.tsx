import React, { useState } from 'react';
import { Tutor, FilterOptions } from '../types';
import TutorCard from './TutorCard';
import TutorModal from './TutorModal';
import Filters from './Filters';
import { filterTutors } from '../utils/helpers';
import { UserCheck } from 'lucide-react';

interface TutorListProps {
  tutors: Tutor[];
}

const TutorList: React.FC<TutorListProps> = ({ tutors }) => {
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    subject: 'Все предметы',
    minPrice: 500,
    maxPrice: 5000,
    lessonType: 'Все типы',
  });

  // Отделяем анкету текущего пользователя
  const currentUserTutor = tutors.find(tutor => tutor.isCurrentUser);
  const otherTutors = tutors.filter(tutor => !tutor.isCurrentUser);
  
  // Применяем фильтры только к анкетам других пользователей
  const filteredTutors = filterTutors(otherTutors, filters);

  const openTutorModal = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    document.body.style.overflow = 'hidden';
  };

  const closeTutorModal = () => {
    setSelectedTutor(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="container slide-in-bottom">
      <Filters filters={filters} setFilters={setFilters} />
      
      {currentUserTutor && (
        <div className="current-tutors-section">
          <h2 className="section-title">
            <UserCheck size={24} />
            Ваша анкета
          </h2>
          <div className="tutor-grid">
            <TutorCard 
              tutor={currentUserTutor} 
              onClick={() => openTutorModal(currentUserTutor)}
            />
          </div>
        </div>
      )}
      
      <h2 className="section-title">Доступные репетиторы</h2>
      
      {filteredTutors.length > 0 ? (
        <div className="tutor-grid">
          {filteredTutors.map((tutor) => (
            <TutorCard 
              key={tutor.id} 
              tutor={tutor} 
              onClick={() => openTutorModal(tutor)}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>Репетиторы не найдены</h3>
          <p>Попробуйте изменить параметры фильтра</p>
          <button 
            className="btn btn-primary"
            onClick={() => setFilters({
              subject: 'Все предметы',
              minPrice: 500,
              maxPrice: 5000,
              lessonType: 'Все типы',
            })}
          >
            Сбросить фильтры
          </button>
        </div>
      )}
      
      {selectedTutor && (
        <TutorModal tutor={selectedTutor} onClose={closeTutorModal} />
      )}
    </div>
  );
};

export default TutorList;