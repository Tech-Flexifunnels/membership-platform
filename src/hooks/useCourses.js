import { useQuery } from '@tanstack/react-query';
import mockCoursesData from '../data/mockCourses.json';

// Simulate API call
const fetchCourses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCoursesData);
    }, 500);
  });
};

const fetchCourseById = async (courseId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const course = mockCoursesData.find((c) => c.id === courseId);
      if (course) {
        resolve(course);
      } else {
        reject(new Error('Course not found'));
      }
    }, 300);
  });
};

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCourse = (courseId) => {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: () => fetchCourseById(courseId),
    staleTime: 5 * 60 * 1000,
    enabled: !!courseId,
  });
};
