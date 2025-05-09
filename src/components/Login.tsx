import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { AuthFormData } from '../types';

interface LoginProps {
  onLogin: (data: AuthFormData) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<AuthFormData>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    onLogin(formData);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Globe className="logo-icon" />
          <h1>MirProfi</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Логин</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setError('');
              }}
              placeholder="Введите логин"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setError('');
              }}
              placeholder="Введите пароль"
            />
          </div>
          
          {error && (
            <div className="error-message" style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;