// Main application component that handles routing and state management
import  { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import TutorForm from './components/TutorForm';
import TutorList from './components/TutorList';
import Login from './components/Login';
import { Role, Tutor, AuthFormData } from './types';
import { mockTutors } from './utils/mockData';
import { createNewTutor } from './utils/helpers';
import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';

function App() {
  // Application state
  const [currentRole, setCurrentRole] = useState<Role>('student');
  const [tutors, setTutors] = useState<Tutor[]>(mockTutors.map(tutor => ({ ...tutor, likes: 0 })));
  const [initialized, setInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showAbout, setShowAbout] = useState(false);

  // Initialize animation on mount
  useEffect(() => {
    setInitialized(true);
  }, []);

  // Authentication handlers
  const handleLogin = (data: AuthFormData) => {
    setUsername(data.username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setShowAbout(false);
  };

  // Role switching handler
  const switchRole = () => {
    setCurrentRole(prev => prev === 'student' ? 'tutor' : 'student');
  };

  // Tutor management handlers
  const addTutor = (tutorData: Omit<Tutor, 'id' | 'likes'>) => {
    const newTutor = createNewTutor({ ...tutorData, likes: 0 });
    newTutor.isCurrentUser = true;
    
    const updatedTutors = tutors.map(tutor => ({
      ...tutor,
      isCurrentUser: false
    }));
    
    setTutors([...updatedTutors, newTutor]);
    setCurrentRole('student');
  };

  // Conditional rendering based on authentication and navigation state
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
          />
        )}
      </main>
    </div>
  );
}

export default App;