import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TutorForm from './components/TutorForm';
import TutorList from './components/TutorList';
import Login from './components/Login';
import About from './components/About';
import { Role, Tutor, AuthFormData, Comment, User } from './types';
import { mockTutors } from './utils/mockData';
import { createNewTutor } from './utils/helpers';
import { getCurrentUser, login, logout } from './utils/auth';
import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';

function App() {
  const [currentRole, setCurrentRole] = useState<Role>('student');
  const [tutors, setTutors] = useState<Tutor[]>(mockTutors);
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setInitialized(true);
  }, []);

  const handleLogin = (data: AuthFormData) => {
    const user = login(data.username, data.password);
    setUser(user);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
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

  if (!user) {
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
        username={user.username}
        onLogoClick={() => setShowAbout(true)}
        onLogout={handleLogout}
      />
      
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {currentRole === 'tutor' ? (
          <TutorForm addTutor={addTutor} />
        ) : (
          <TutorList 
            tutors={tutors}
            currentUsername={user.username}
            onAddComment={handleAddComment}
          />
        )}
      </main>
    </div>
  );
}

export default App;