import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TutorForm from './components/TutorForm';
import TutorList from './components/TutorList';
import Login from './components/Login';
import About from './components/About';
import { Role, Tutor, AuthFormData, Comment } from './types';
import { mockTutors } from './utils/mockData';
import { createNewTutor } from './utils/helpers';
import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';

function App() {
  const [currentRole, setCurrentRole] = useState<Role>('student');
  const [tutors, setTutors] = useState<Tutor[]>(mockTutors);
  const [initialized, setInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  const handleLogin = (data: AuthFormData) => {
    setUsername(data.username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setShowAbout(false);
  };

  const switchRole = () => {
    setCurrentRole(prev => prev === 'student' ? 'tutor' : 'student');
  };

  const addTutor = (tutorData: Omit<Tutor, 'id' | 'comments' | 'rating'>) => {
    const newTutor = createNewTutor({
      ...tutorData,
      comments: [],
      rating: 0,
    });
    newTutor.isCurrentUser = true;
    
    const updatedTutors = tutors.map(tutor => ({
      ...tutor,
      isCurrentUser: false
    }));
    
    setTutors([...updatedTutors, newTutor]);
    setCurrentRole('student');
  };

  const handleAddComment = (tutorId: string, comment: Comment) => {
    setTutors(prevTutors => {
      return prevTutors.map(tutor => {
        if (tutor.id === tutorId) {
          const newComments = [comment, ...tutor.comments];
          const newRating = Number((newComments.reduce((acc, c) => acc + c.rating, 0) / newComments.length).toFixed(1));
          
          return {
            ...tutor,
            comments: newComments,
            rating: newRating,
          };
        }
        return tutor;
      });
    });
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (showAbout) {
    return <About onBack={() => setShowAbout(false)} />;
  }

  return (
    <div className={`App ${initialized ? 'fade-in' : ''}`}>
      <Header 
        currentRole={currentRole} 
        switchRole={switchRole}
        username={username}
        onLogoClick={() => setShowAbout(true)}
        onLogout={handleLogout}
      />
      
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {currentRole === 'tutor' ? (
          <TutorForm addTutor={addTutor} />
        ) : (
          <TutorList 
            tutors={tutors}
            currentUsername={username}
            onAddComment={handleAddComment}
          />
        )}
      </main>
    </div>
  );
}

export default App;