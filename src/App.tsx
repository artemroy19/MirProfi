import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TutorForm from './components/TutorForm';
import TutorList from './components/TutorList';
import { Role, Tutor } from './types';
import { mockTutors } from './utils/mockData';
import { createNewTutor } from './utils/helpers';
import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';

function App() {
  const [currentRole, setCurrentRole] = useState<Role>('student');
  const [tutors, setTutors] = useState<Tutor[]>(mockTutors);
  const [initialized, setInitialized] = useState(false);

  // При первом рендере добавляем анимацию для плавного появления
  useEffect(() => {
    setInitialized(true);
  }, []);

  const switchRole = () => {
    setCurrentRole(prev => prev === 'student' ? 'tutor' : 'student');
  };

  const addTutor = (tutorData: Omit<Tutor, 'id'>) => {
    const newTutor = createNewTutor(tutorData);
    
    // Помечаем новую анкету как анкету текущего пользователя
    newTutor.isCurrentUser = true;
    
    // Убираем метку с предыдущей анкеты текущего пользователя, если она была
    const updatedTutors = tutors.map(tutor => ({
      ...tutor,
      isCurrentUser: false
    }));
    
    // Добавляем новую анкету
    setTutors([...updatedTutors, newTutor]);
    
    // Переключаем роль на студента для просмотра анкет
    setCurrentRole('student');
  };

  return (
    <div className={`App ${initialized ? 'fade-in' : ''}`}>
      <Header currentRole={currentRole} switchRole={switchRole} />
      
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {currentRole === 'tutor' ? (
          <TutorForm addTutor={addTutor} />
        ) : (
          <TutorList tutors={tutors} />
        )}
      </main>
    </div>
  );
}

export default App;