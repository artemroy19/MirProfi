import { User } from '../types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'mirprofi_auth';
const USERS_STORAGE_KEY = 'mirprofi_users';

interface StoredUser extends User {
  password: string;
}

// Get registered users from localStorage
const getUsers = (): StoredUser[] => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const register = (username: string, password: string): User => {
  const users = getUsers();
  
  // Check if username already exists
  if (users.some(user => user.username === username)) {
    throw new Error('Пользователь с таким именем уже существует');
  }
  
  // Create new user
  const newUser: StoredUser = {
    id: uuidv4(),
    username,
    password,
    role: 'student'
  };
  
  // Save user
  users.push(newUser);
  saveUsers(users);
  
  // Return user without password
  const { password: _, ...user } = newUser;
  return user;
};

export const login = (username: string, password: string): User => {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    throw new Error('Неверное имя пользователя или пароль');
  }
  
  // Create session
  const { password: _, ...sessionUser } = user;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
  return sessionUser;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};