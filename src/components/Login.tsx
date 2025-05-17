import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { AuthFormData } from '../types';
import { register } from '../utils/auth';


interface LoginProps {
  onLogin: (data: AuthFormData) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    username: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.username.trim() || !formData.password.trim()) {
        throw new Error('Пожалуйста, заполните все поля');
      }

      if (formData.username.length < 3) {
        throw new Error('Имя пользователя должно содержать минимум 3 символа');
      }

      if (formData.password.length < 6) {
        throw new Error('Пароль должен содержать минимум 6 символов');
      }

      if (isRegistering) {
        if (formData.password !== confirmPassword) {
          throw new Error('Пароли не совпадают');
        }
        register(formData.username, formData.password);
      }

      onLogin(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Globe className="login-icon" />
          <h1 className="login-title">MirProfi</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Имя пользователя
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setError('');
              }}
              placeholder="Введите имя пользователя"
              required
              minLength={3}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setError('');
              }}
              placeholder="Введите пароль"
              required
              minLength={6}
            />
          </div>
          
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Подтвердите пароль
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                placeholder="Повторите пароль"
                required
                minLength={6}
              />
            </div>
          )}
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              isRegistering ? 'Зарегистрироваться' : 'Войти'
            )}
          </button>
          
          <div className="toggle-form">
            <button
              type="button"
              className="toggle-button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
                setFormData({ username: '', password: '' });
                setConfirmPassword('');
              }}
            >
              {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;