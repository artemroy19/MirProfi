import { Tutor, Comment } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Заготовленные фотографии для преподавателей
export const tutorPhotos = [
  `${import.meta.env.BASE_URL}images/teacher1.png`,
  `${import.meta.env.BASE_URL}images/teacher2.jpg`,
  `${import.meta.env.BASE_URL}images/teacher3.jpeg`,
  // Уберите лишний слеш в начале здесь:
  `${import.meta.env.BASE_URL}images/teacher4.jpg`,
  `${import.meta.env.BASE_URL}images/teacher5.jpg`,
  `${import.meta.env.BASE_URL}images/teacher6.jpg`,
  `${import.meta.env.BASE_URL}images/teacher7.png`,
  `${import.meta.env.BASE_URL}images/teacher8.png`,
  `${import.meta.env.BASE_URL}images/teacher9.png`,
];

export const subjects = [
  'Математика',
  'Физика',
  'Химия',
  'Биология',
  'История',
  'Литература',
  'Английский язык',
  'Информатика',
  'География',
  'Обществознание',
];

// Генерация случайных комментариев
const generateRandomComments = (tutorId: string): Comment[] => {
  const commentCount = Math.floor(Math.random() * 5) + 2; // 2-6 комментариев
  const comments: Comment[] = [];
  
  const usernames = [
    'Анна К.',
    'Михаил С.',
    'Екатерина В.',
    'Дмитрий П.',
    'Ольга М.',
    'Сергей Н.',
    'Мария Д.',
    'Александр Р.',
  ];
  
  const commentTexts = [
    'Отличный преподаватель! Очень доступно объясняет материал.',
    'Помог подготовиться к экзамену, рекомендую!',
    'Интересные занятия, время пролетает незаметно.',
    'Профессионал своего дела, знает как заинтересовать ученика.',
    'Хороший педагог, но иногда торопится с объяснениями.',
    'Всё понятно объясняет, терпеливо отвечает на вопросы.',
    'Отличная методика преподавания, ребёнку очень нравится.',
    'Замечательный преподаватель, будем продолжать занятия.',
  ];
  
  for (let i = 0; i < commentCount; i++) {
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const randomText = commentTexts[Math.floor(Math.random() * commentTexts.length)];
    const randomRating = Math.floor(Math.random() * 3) + 3; // Рейтинг от 3 до 5
    
    comments.push({
      id: uuidv4(),
      tutorId,
      username: randomUsername,
      text: randomText,
      rating: randomRating,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Случайная дата за последние 30 дней
    });
  }
  
  return comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Вычисление среднего рейтинга на основе комментариев
const calculateAverageRating = (comments: Comment[]): number => {
  if (comments.length === 0) return 0;
  const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
  return Number((sum / comments.length).toFixed(1));
};

export const mockTutors: Tutor[] = [
  {
    id: uuidv4(),
    name: 'Анна Смирнова',
    photo: tutorPhotos[0],
    description: 'Преподаю иностранные языки 10 лет. Индивидуальный подход к каждому ученику. Использую современные методики обучения.',
    subjects: ['Английский язык'],
    price: 1500,
    lessonType: 'both',
    phone: '+7 (900) 123-45-67',
    comments: [],
    rating: 0,
  },
  {
    id: uuidv4(),
    name: 'Иван Ежов',
    photo: tutorPhotos[1],
    description: 'Доктор физико-математических наук. Помогаю школьникам и студентам разобраться в сложных темах физики.',
    subjects: ['Физика', 'Математика'],
    price: 2000,
    lessonType: 'online',
    phone: '+7 (900) 234-56-78',
    comments: [],
    rating: 0,
  },
  {
    id: uuidv4(),
    name: 'Виктория Соколова',
    photo: tutorPhotos[2],
    description: 'Школьный учитель по математике с большим стажем. Готовлю к ОГЭ и ЕГЭ',
    subjects: ['Математика'],
    price: 1700,
    lessonType: 'offline',
    phone: '+7 (900) 345-67-89',
    comments: [],
    rating: 0,
  },
  {
    id: uuidv4(),
    name: 'Дмитрий Козлов',
    photo: tutorPhotos[3],
    description: 'Программист с 15-летним стажем. Обучаю основам программирования, веб-разработке, алгоритмам и структурам данных.',
    subjects: ['Информатика'],
    price: 2500,
    lessonType: 'online',
    phone: '+7 (900) 456-78-90',
    comments: [],
    rating: 0,
  },
  {
    id: uuidv4(),
    name: 'Мария Иванова',
    photo: tutorPhotos[4],
    description: 'Биолог-исследователь. Делаю сложные биологические процессы понятными. Помогу подготовиться к экзаменам и поступлению в медицинские вузы.',
    subjects: ['Биология', 'Химия'],
    price: 1800,
    lessonType: 'both',
    phone: '+7 (900) 567-89-01',
    comments: [],
    rating: 0,
  },
  {
    id: uuidv4(),
    name: 'Алексей Николаев',
    photo: tutorPhotos[5],
    description: 'Географ с опытом преподавания 12 лет. Интересно объясняю, использую наглядные материалы и современные методики.',
    subjects: ['География'],
    price: 1900,
    lessonType: 'offline',
    phone: '+7 (900) 678-90-12',
    comments: [],
    rating: 0,
  },
  {
    id: uuidv4(),
    name: 'Ольга Кузнецова',
    photo: tutorPhotos[6],
    description: 'Филолог с красным дипломом. Помогаю влюбиться в литературу, развить навыки анализа текста и правильно писать сочинения.',
    subjects: ['Литература'],
    price: 1600,
    lessonType: 'online',
    phone: '+7 (900) 789-01-23',
    comments: [],
    rating: 0,
  },
  {
    id: uuidv4(),
    name: 'Елена Морозова',
    photo: tutorPhotos[7],
    description: 'Историк, автор методических пособий. Готовлю к экзаменам и олимпиадам. Увлекательные занятия с использованием интерактивных материалов.',
    subjects: ['История', 'Обществознание'],
    price: 2100,
    lessonType: 'both',
    phone: '+7 (900) 890-12-34',
    comments: [],
    rating: 0,
  },
  
  {
    id: uuidv4(),
    name: 'Наталья Волкова',
    photo: tutorPhotos[8],
    description: 'Кандидат химических наук. Преподаю химию с упором на практическое применение знаний и понимание материала.',
    subjects: ['Химия'],
    price: 1400,
    lessonType: 'online',
    phone: '+7 (900) 901-23-45',
    comments: [],
    rating: 0,
  },].map(tutor => {
  const comments = generateRandomComments(tutor.id);
  return {
    ...tutor,
    comments,
    rating: calculateAverageRating(comments),
  };
});