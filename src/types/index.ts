// Type definitions for the application

// User role type
export type Role = 'student' | 'tutor';

// User authentication state
export interface User {
  username: string;
  isLoggedIn: boolean;
}

// Comment type
export interface Comment {
  id: string;
  tutorId: string;
  username: string;
  text: string;
  rating: number;
  createdAt: Date;
}

// Tutor profile data
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

// Filter options for tutor search
export interface FilterOptions {
  subject: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;
}

// Authentication form data
export interface AuthFormData {
  username: string;
  password: string;
}