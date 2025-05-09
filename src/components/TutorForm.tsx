import React, { useState, useRef } from 'react';
import { UserPlus, Upload } from 'lucide-react';
import { Tutor } from '../types';
import { subjects } from '../utils/mockData';

interface TutorFormProps {
  addTutor: (tutor: Omit<Tutor, 'id'>) => void;
}

const TutorForm: React.FC<TutorFormProps> = ({ addTutor }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [price, setPrice] = useState(1500);
  const [lessonType, setLessonType] = useState<'online' | 'offline' | 'both'>('online');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация формы
    const formErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      formErrors.name = 'Введите ваше имя';
    }
    
    if (!description.trim()) {
      formErrors.description = 'Добавьте описание';
    }
    
    if (selectedSubjects.length === 0) {
      formErrors.subjects = 'Выберите хотя бы один предмет';
    }
    
    if (!phone.trim()) {
      formErrors.phone = 'Введите номер телефона';
    } else if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone)) {
      formErrors.phone = 'Введите номер в формате +7 (XXX) XXX-XX-XX';
    }
    
    if (!photo) {
      formErrors.photo = 'Загрузите фото';
    }
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      
      // Добавляем встряску для формы
      const form = document.querySelector('.tutor-form');
      form?.classList.add('shake');
      setTimeout(() => {
        form?.classList.remove('shake');
      }, 800);
      
      return;
    }
    
    setIsLoading(true);
    
    // Имитация отправки данных на сервер
    setTimeout(() => {
      addTutor({
        name,
        description,
        subjects: selectedSubjects,
        price,
        lessonType,
        phone,
        photo,
      });
      
      // Сброс формы
      setName('');
      setDescription('');
      setSelectedSubjects([]);
      setPrice(1500);
      setLessonType('online');
      setPhone('');
      setPhoto('');
      setIsLoading(false);
      setErrors({});
      
      // Показываем уведомление об успешном добавлении
      alert('Ваша анкета успешно добавлена!');
    }, 1000);
  };

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
    
    // Если была ошибка, убираем её при выборе предмета
    if (errors.subjects) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.subjects;
        return newErrors;
      });
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        
        // Если была ошибка, убираем её при загрузке фото
        if (errors.photo) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.photo;
            return newErrors;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let formatted = value.replace(/\D/g, '');
    
    if (formatted.length === 0) {
      setPhone('');
      return;
    }
    
    if (formatted.length > 11) {
      formatted = formatted.slice(0, 11);
    }
    
    if (formatted.length >= 1) {
      formatted = '+7' + formatted.slice(1);
    }
    
    let result = '+7 ';
    if (formatted.length > 2) {
      result += `(${formatted.slice(2, 5)}`;
    }
    
    if (formatted.length > 5) {
      result += `) ${formatted.slice(5, 8)}`;
    }
    
    if (formatted.length > 8) {
      result += `-${formatted.slice(8, 10)}`;
    }
    
    if (formatted.length > 10) {
      result += `-${formatted.slice(10, 12)}`;
    }
    
    setPhone(result);
    
    // Если была ошибка, убираем её при вводе телефона
    if (errors.phone && /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(result)) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }
  };

  return (
    <form className="tutor-form slide-in-bottom" onSubmit={handleSubmit}>
      <h2 className="form-title">Создание анкеты репетитора</h2>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Имя и Фамилия</label>
          <input
            type="text"
            id="name"
            className={`form-control ${errors.name ? 'shake' : ''}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name && e.target.value.trim()) {
                setErrors(prev => {
                  const newErrors = { ...prev };
                  delete newErrors.name;
                  return newErrors;
                });
              }
            }}
            placeholder="Иван Иванов"
          />
          {errors.name && <p className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.name}</p>}
        </div>
        
        <div className="form-group">
          <label className="form-label">Фотография</label>
          <div className="photo-upload">
            <div className={`photo-preview ${errors.photo ? 'shake' : ''}`}>
              {photo ? (
                <img src={photo} alt="Предпросмотр фото" />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-secondary)' }}>
                  <UserPlus size={40} color="var(--color-primary)" />
                </div>
              )}
            </div>
            <input
              type="file"
              id="photo"
              ref={fileInputRef}
              className="photo-input"
              onChange={handlePhotoChange}
              accept="image/*"
            />
            <label htmlFor="photo" className="upload-btn">
              <Upload size={16} />
              Загрузить фото
            </label>
            {errors.photo && <p className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.photo}</p>}
          </div>
        </div>
        
        <div className="form-group wide">
          <label htmlFor="description" className="form-label">Описание</label>
          <textarea
            id="description"
            className={`form-control ${errors.description ? 'shake' : ''}`}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description && e.target.value.trim()) {
                setErrors(prev => {
                  const newErrors = { ...prev };
                  delete newErrors.description;
                  return newErrors;
                });
              }
            }}
            rows={4}
            placeholder="Расскажите о своем опыте, методике преподавания и достижениях..."
          />
          {errors.description && <p className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.description}</p>}
        </div>
        
        <div className="form-group wide">
          <label className="form-label">Предметы</label>
          <div className={`checkboxes-group ${errors.subjects ? 'shake' : ''}`}>
            {subjects.map((subject) => (
              <div className="checkbox-item" key={subject}>
                <input
                  type="checkbox"
                  id={`subject-${subject}`}
                  checked={selectedSubjects.includes(subject)}
                  onChange={() => handleSubjectToggle(subject)}
                />
                <label htmlFor={`subject-${subject}`}>{subject}</label>
              </div>
            ))}
          </div>
          {errors.subjects && <p className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.subjects}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="price" className="form-label">Цена за час (₽)</label>
          <div className="price-slider">
            <input
              type="range"
              id="price"
              className="slider-range"
              min="500"
              max="3000"
              step="100"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <div className="price-display">
              <span>500 ₽</span>
              <span><strong>{price} ₽</strong></span>
              <span>3000 ₽</span>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Формат занятий</label>
          <div className="lesson-types">
            <div className="lesson-type-option">
              <input
                type="radio"
                id="online"
                name="lessonType"
                checked={lessonType === 'online'}
                onChange={() => setLessonType('online')}
              />
              <label htmlFor="online">Онлайн</label>
            </div>
            <div className="lesson-type-option">
              <input
                type="radio"
                id="offline"
                name="lessonType"
                checked={lessonType === 'offline'}
                onChange={() => setLessonType('offline')}
              />
              <label htmlFor="offline">Оффлайн</label>
            </div>
            <div className="lesson-type-option">
              <input
                type="radio"
                id="both"
                name="lessonType"
                checked={lessonType === 'both'}
                onChange={() => setLessonType('both')}
              />
              <label htmlFor="both">Оба</label>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Телефон</label>
          <input
            type="tel"
            id="phone"
            className={`form-control ${errors.phone ? 'shake' : ''}`}
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+7 (XXX) XXX-XX-XX"
          />
          {errors.phone && <p className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.phone}</p>}
        </div>
        
        <div className="form-group wide" style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ minWidth: '200px' }}>
            {isLoading ? <span className="spinner"></span> : 'Создать анкету'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TutorForm;