import React, { useEffect } from 'react';
import { FilterOptions } from '../types';
import { subjects } from '../utils/mockData';

interface FiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  // Инициализация и синхронизация значений цены
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      maxPrice: Math.min(Math.max(prev.maxPrice, 500), 3000),
      minPrice: Math.min(prev.minPrice, 3000)
    }));
  }, []);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, subject: e.target.value }));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 500;
    setFilters(prev => ({
      ...prev,
      maxPrice: value,
    }));
  };

  const handleLessonTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, lessonType: e.target.value }));
  };

  return (
    
      <div className="filters slide-in-top select-styles">
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="subject" className="form-label">Предмет</label>
            <select
              id="subject"
              className="form-control"
              value={filters.subject}
              onChange={handleSubjectChange}
            >
              <option value="Все предметы">Все предметы</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="lessonType" className="form-label">Формат занятий</label>
            <select
              id="lessonType"
              className="form-control"
              value={filters.lessonType}
              onChange={handleLessonTypeChange}
            >
              <option value="Все типы">Все типы</option>
              <option value="online">Онлайн</option>
              <option value="offline">Оффлайн</option>
            </select>
          </div>
        <div className="filter-group">
          <label className="form-label">Макс. цена за час</label>
          <div className="price-slider">
            <input
              type="range"
              className="slider-range"
              min="500"
              max="3000"
              step="100"
              value={filters.maxPrice}
              onChange={handleMaxPriceChange}
            />
            <div className="price-display">
              <span>500 ₽</span>
              <span><strong>{filters.maxPrice} ₽</strong></span>
              <span>3000 ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;