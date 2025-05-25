export type Role = 'student' | 'tutor';

export interface User {
  id: string;
  username: string;
  role: Role;
}

export interface Comment {
  id: string;
  tutorId: string;
  username: string;
  text: string;
  rating: number;
  createdAt: Date;
}

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
  rating: number;
  comments: Comment[];
}

export interface FilterOptions {
  subject: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;
}

export interface AuthFormData {
  username: string;
  password: string;
}
