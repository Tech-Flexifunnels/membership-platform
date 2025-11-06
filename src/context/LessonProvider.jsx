import React, { createContext, useState, useContext } from 'react';

// Create Lesson Context
export const LessonContext = createContext();

// Custom hook to use Lesson Context
export const useLesson = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLesson must be used within LessonProvider');
  }
  return context;
};

// LessonProvider Component
export const LessonProvider = ({ children }) => {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch lessons for a course
  const fetchLessons = async (courseId) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      // const response = await getLessons(courseId);
      // setLessons(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Mark lesson as complete
  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      
      // Store in localStorage for persistence
      const stored = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      localStorage.setItem('completedLessons', JSON.stringify([...stored, lessonId]));
    }
  };

  // Check if lesson is completed
  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  // Get next lesson
  const getNextLesson = () => {
    if (!currentLesson || !lessons.length) return null;
    
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex < lessons.length - 1) {
      return lessons[currentIndex + 1];
    }
    return null;
  };

  // Get previous lesson
  const getPreviousLesson = () => {
    if (!currentLesson || !lessons.length) return null;
    
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex > 0) {
      return lessons[currentIndex - 1];
    }
    return null;
  };

  // Load completed lessons from localStorage on mount
  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    setCompletedLessons(stored);
  }, []);

  const value = {
    lessons,
    currentLesson,
    completedLessons,
    loading,
    error,
    fetchLessons,
    setCurrentLesson,
    markLessonComplete,
    isLessonCompleted,
    getNextLesson,
    getPreviousLesson,
  };

  return <LessonContext.Provider value={value}>{children}</LessonContext.Provider>;
};
