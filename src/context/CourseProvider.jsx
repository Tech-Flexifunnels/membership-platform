import React, { createContext, useState, useContext } from 'react';

// Create Course Context
export const CourseContext = createContext();

// Custom hook to use Course Context
export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within CourseProvider');
  }
  return context;
};

// CourseProvider Component
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all courses
  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      // const response = await getCourses();
      // setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch single course by ID
  const fetchCourseById = async (courseId) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      // const response = await getCourseById(courseId);
      // setCurrentCourse(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Update course progress
  const updateCourseProgress = (courseId, progress) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, progress } : course
      )
    );
  };

  // Clear current course
  const clearCurrentCourse = () => {
    setCurrentCourse(null);
  };

  const value = {
    courses,
    currentCourse,
    loading,
    error,
    fetchCourses,
    fetchCourseById,
    updateCourseProgress,
    clearCurrentCourse,
    setCurrentCourse,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};
