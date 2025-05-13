import React, { useState } from 'react';
import { ArrowLeft, Phone, Star, Send } from 'lucide-react';
import { Tutor, Comment } from '../types';
import { formatPrice } from '../utils/helpers';
import { v4 as uuidv4 } from 'uuid';

interface TutorDetailsProps {
  tutor: Tutor;
  onBack: () => void;
  currentUsername: string;
  onAddComment: (tutorId: string, comment: Comment) => void;
}

const TutorDetails: React.FC<TutorDetailsProps> = ({ 
  tutor, 
  onBack, 
  currentUsername,
  onAddComment 
}) => {
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: uuidv4(),
      tutorId: tutor.id,
      username: currentUsername,
      text: commentText,
      rating,
      createdAt: new Date(),
    };
    
    onAddComment(tutor.id, newComment);
    setCommentText('');
    setRating(5);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="tutor-details-container slide-in-bottom">
      <div className="tutor-details-content">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} />
          Вернуться к списку
        </button>
        
        <div className="tutor-details-header">
          <img src={tutor.photo} alt={tutor.name} className="tutor-details-photo" />
          <h1 className="tutor-details-name">{tutor.name}</h1>
          <div className="tutor-details-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  fill={star <= tutor.rating ? "var(--color-warning)" : "none"}
                  color="var(--color-warning)"
                />
              ))}
            </div>
            <span className="rating-value">{tutor.rating}</span>
          </div>
        </div>
        
        <section className="tutor-details-section">
          <h2>Предметы</h2>
          <div className="tutor-subjects">
            {tutor.subjects.map((subject) => (
              <span key={subject} className="tutor-subject">
                {subject}
              </span>
            ))}
          </div>
        </section>
        
        <section className="tutor-details-section">
          <h2>О преподавателе</h2>
          <p>{tutor.description}</p>
        </section>
        
        <section className="tutor-details-section">
          <h2>Стоимость занятия</h2>
          <p className="tutor-details-price">{formatPrice(tutor.price)}</p>
        </section>
        
        <section className="tutor-details-section">
          <h2>Формат занятий</h2>
          <div className="lesson-types">
            {tutor.lessonType === 'online' || tutor.lessonType === 'both' ? (
              <span className="lesson-type online">Онлайн</span>
            ) : null}
            
            {tutor.lessonType === 'offline' || tutor.lessonType === 'both' ? (
              <span className="lesson-type offline">Оффлайн</span>
            ) : null}
          </div>
          <div className="tutor-details-contact">
          <a 
            href={`tel:${tutor.phone.replace(/\D/g, '')}`} 
            className="btn btn-primary btn-icon"
          >
            <Phone size={16} />
            Позвонить: {tutor.phone}
          </a>
        </div>
        </section>
        
        <section className="tutor-details-section">
          <h2>Отзывы</h2>
          
          <form onSubmit={handleSubmit} className="comment-form">
            <div className="rating-input">
              <span className="rating-label">Ваша оценка:</span>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className="star-input"
                    fill={star <= (hoveredStar ?? rating) ? "var(--color-warning)" : "none"}
                    color="var(--color-warning)"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
            
            <div className="comment-input-container">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Напишите ваш отзыв..."
                className="comment-input"
                rows={3}
              />
              <button type="submit" className="btn btn-primary btn-icon" disabled={!commentText.trim()}>
                <Send size={16} />
                Отправить
              </button>
            </div>
          </form>
          
          <div className="comments-list">
            {tutor.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.username}</span>
                  <div className="comment-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        fill={star <= comment.rating ? "var(--color-warning)" : "none"}
                        color="var(--color-warning)"
                      />
                    ))}
                  </div>
                </div>
                <p className="comment-text">{comment.text}</p>
                <span className="comment-date">{formatDate(comment.createdAt)}</span>
              </div>
            ))}
          </div>
        </section>
        
      
      </div>
    </div>
  );
};

export default TutorDetails;