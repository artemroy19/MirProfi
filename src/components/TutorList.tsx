import React, { useState } from 'react';
import { Tutor, FilterOptions } from '../types';
import TutorCard from './TutorCard';
import TutorDetails from './TutorDetails';
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

  const currentUserTutor = tutors.find(tutor => tutor.isCurrentUser);
  const otherTutors = tutors.filter(tutor => !tutor.isCurrentUser);
  const filteredTutors = filterTutors(otherTutors, filters);

  if (selectedTutor) {
    return (
      <TutorDetails 
        tutor={selectedTutor}
        onBack={() => setSelectedTutor(null)}
      />
    );
  }

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
              onClick={() => setSelectedTutor(currentUserTutor)}
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
              onClick={() => setSelectedTutor(tutor)}
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
    </div>
  );
};

export default TutorList;