import { useQuery } from '@tanstack/react-query';
import courseService from '../services/courseService';

// Fetch all courses from API
const fetchCourses = async () => {
  const response = await courseService.getCourses();
  if (response.success) {
    return response.courses;
  }
  throw new Error('Failed to fetch courses');
};

// Fetch single course by ID
const fetchCourseById = async (courseId) => {
  const response = await courseService.getCourseDetails(courseId);
  if (response.success) {
    return response.course;
  }
  throw new Error('Course not found');
};

// Hook to fetch all courses
export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Retry once if fails
  });
};

// Hook to fetch single course
export const useCourse = (courseId) => {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: () => fetchCourseById(courseId),
    staleTime: 5 * 60 * 1000,
    enabled: !!courseId,
    retry: 1,
  });
};

// Hook to fetch lessons for a course
export const useLessons = (courseId) => {
  return useQuery({
    queryKey: ['lessons', courseId],
    queryFn: async () => {
      const response = await courseService.getLessons(courseId);
      if (response.success) {
        return response.lessons;
      }
      throw new Error('Failed to fetch lessons');
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!courseId,
    retry: 1,
  });
};
