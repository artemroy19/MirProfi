export type Role = 'student' | 'tutor';

export interface Tutor {
  id: string;
  name: string;
  photo: string;
  description: string;
  subjects: string[];
  price: number;
  lessonType: 'online' | 'offline' | 'both';
  phone: string;
  isCurrentUser?: boolean;
}

export interface FilterOptions {
  subject: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;
}