import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Home, ChevronRight } from 'lucide-react';

const MyLearning = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock courses data with progress
  const mockCourses = [
    {
      id: 1,
      title: 'Yoga & Meditation',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      lessons: 29,
      progress: 35,
      completedLessons: 10,
    },
    {
      id: 2,
      title: 'Common Myths & Mistakes',
      thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
      lessons: 2,
      progress: 100,
      completedLessons: 2,
    },
    {
      id: 3,
      title: 'Know Your Hair',
      thumbnail: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400',
      lessons: 23,
      progress: 0,
      completedLessons: 0,
    },
  ];

  // Filter courses based on progress
  const filteredCourses = mockCourses.filter((course) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'in-progress') return course.progress > 0 && course.progress < 100;
    if (activeFilter === 'completed') return course.progress === 100;
    return true;
  });

  const filters = [
    { id: 'all', label: 'All Courses', count: mockCourses.length },
    {
      id: 'in-progress',
      label: 'In Progress',
      count: mockCourses.filter((c) => c.progress > 0 && c.progress < 100).length,
    },
    {
      id: 'completed',
      label: 'Completed',
      count: mockCourses.filter((c) => c.progress === 100).length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center hover:text-primary-500 transition-colors"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">My Learning</span>
        </div>

        {/* Heading */}
        <div className="flex items-center space-x-3 mb-8">
          <BookOpen className="w-6 h-6 text-cyan-500" />
          <h1 className="text-2xl font-bold text-gray-900">My Learning</h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {filter.label}
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.id
                    ? 'bg-white text-primary-500'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        course.progress === 100
                          ? 'bg-green-500 text-white'
                          : course.progress > 0
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}
                    >
                      {course.progress === 100
                        ? 'Completed'
                        : course.progress > 0
                        ? 'In Progress'
                        : 'Not Started'}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {course.completedLessons}/{course.lessons} Lessons
                    </span>
                    <span className="font-medium text-primary-500">{course.progress}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Courses Found</h3>
            <p className="text-gray-600 mb-6">
              {activeFilter === 'all'
                ? "You haven't enrolled in any courses yet."
                : activeFilter === 'in-progress'
                ? "You don't have any courses in progress."
                : "You haven't completed any courses yet."}
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
