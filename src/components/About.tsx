import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="about-container slide-in-bottom">
      <div className="about-content">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} />
          Вернуться на главную
        </button>
        
        <h1>О платформе MirProfi</h1>
        
        <section className="about-section">
          <h2>Наша миссия</h2>
          <p>MirProfi - это современная платформа, соединяющая талантливых преподавателей и мотивированных учеников. Мы стремимся сделать качественное образование доступным для каждого.</p>
        </section>
        
        <section className="about-section">
          <h2>Для учеников</h2>
          <ul>
            <li>Удобный поиск репетиторов по предметам</li>
            <li>Фильтрация по цене и формату обучения</li>
            <li>Подробные анкеты преподавателей</li>
            <li>Возможность оценить работу репетитора</li>
            <li>Быстрая связь с выбранным преподавателем</li>
          </ul>
        </section>
        
        <section className="about-section">
          <h2>Для репетиторов</h2>
          <ul>
            <li>Создание профессионального профиля</li>
            <li>Гибкие настройки формата занятий</li>
            <li>Установка индивидуальной стоимости</li>
            <li>Выбор преподаваемых предметов</li>
            <li>Управление расписанием занятий</li>
          </ul>
        </section>
        
        <section className="about-section">
          <h2>Как это работает</h2>
          <ol>
            <li>Зарегистрируйтесь на платформе</li>
            <li>Выберите свою роль (ученик или репетитор)</li>
            <li>Заполните профиль или начните поиск преподавателя</li>
            <li>Свяжитесь с выбранным репетитором</li>
            <li>Начните обучение</li>
          </ol>
        </section>
        
        <section className="about-section">
          <h2>Наши преимущества</h2>
          <ul>
            <li>Простой и удобный интерфейс</li>
            <li>Быстрый поиск подходящего репетитора</li>
            <li>Прозрачная система оценок и отзывов</li>
            <li>Безопасная и надёжная платформа</li>
            <li>Поддержка пользователей</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;