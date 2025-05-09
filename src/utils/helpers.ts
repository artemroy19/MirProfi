import { v4 as uuidv4 } from 'uuid';
import { Tutor, FilterOptions } from '../types';

export const filterTutors = (tutors: Tutor[], filters: FilterOptions): Tutor[] => {
  return tutors.filter((tutor) => {
    const subjectMatch = 
      filters.subject === 'Все предметы' || 
      tutor.subjects.includes(filters.subject);
    
    const priceMatch = 
      tutor.price >= filters.minPrice && 
      tutor.price <= filters.maxPrice;
    
    const lessonTypeMatch = 
      filters.lessonType === 'Все типы' || 
      tutor.lessonType === filters.lessonType || 
      tutor.lessonType === 'both';
    
    return subjectMatch && priceMatch && lessonTypeMatch;
  });
};

export const createNewTutor = (tutorData: Omit<Tutor, 'id'>): Tutor => {
  return {
    ...tutorData,
    id: uuidv4(),
  };
};

export const formatPrice = (price: number): string => {
  return `${price.toLocaleString('ru-RU')} ₽/час`;
};