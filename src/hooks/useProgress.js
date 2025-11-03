import { useLocalStorage } from './useLocalStorage';

export const useProgress = () => {
  const [progress, setProgress] = useLocalStorage('courseProgress', {});

  const markLessonComplete = (courseId, lessonId) => {
    setProgress((prev) => {
      const courseProgress = prev[courseId] || { completedLessons: [] };
      
      if (!courseProgress.completedLessons.includes(lessonId)) {
        return {
          ...prev,
          [courseId]: {
            ...courseProgress,
            completedLessons: [...courseProgress.completedLessons, lessonId],
          },
        };
      }
      
      return prev;
    });
  };

  const isLessonComplete = (courseId, lessonId) => {
    const courseProgress = progress[courseId];
    return courseProgress?.completedLessons?.includes(lessonId) || false;
  };

  const getCourseProgress = (courseId) => {
    return progress[courseId] || { completedLessons: [] };
  };

  const getCompletedCount = (courseId) => {
    const courseProgress = progress[courseId];
    return courseProgress?.completedLessons?.length || 0;
  };

  return {
    progress,
    markLessonComplete,
    isLessonComplete,
    getCourseProgress,
    getCompletedCount,
  };
};
