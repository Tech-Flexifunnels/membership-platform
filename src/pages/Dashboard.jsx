import React from 'react';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../hooks/useAuth';
import CourseGrid from '../components/course/CourseGrid';
import Loader from '../components/common/Loader';

const Dashboard = () => {
  const { data: courses, isLoading, error } = useCourses();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading courses..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error loading courses</p>
          <p className="text-gray-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-blue-700 to-pink-600 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-white rounded-full blur-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="text-white mb-8 lg:mb-0">
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.name || 'Student'}!
              </h1>
              <p className="text-xl opacity-90">
                Continue your learning journey
              </p>
            </div>

            {/* Right Illustration */}
            <div className="relative">
              <div className="w-64 h-64 lg:w-80 lg:h-80">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Video Player Illustration */}
                  <rect x="20" y="40" width="160" height="120" rx="8" fill="#8B5CF6" opacity="0.8"/>
                  <circle cx="100" cy="100" r="25" fill="white" opacity="0.9"/>
                  <polygon points="95,90 95,110 110,100" fill="#8B5CF6"/>
                  
                  {/* Person Illustration */}
                  <circle cx="150" cy="140" r="15" fill="#EC4899"/>
                  <rect x="140" y="155" width="20" height="30" rx="5" fill="#F97316"/>
                  
                  {/* Decorative Elements */}
                  <circle cx="40" cy="30" r="8" fill="white" opacity="0.6"/>
                  <circle cx="160" cy="35" r="6" fill="white" opacity="0.6"/>
                  <path d="M 60 25 L 70 20 L 65 30 Z" fill="white" opacity="0.6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Courses</h2>
        <CourseGrid courses={courses} />
      </div>
    </div>
  );
};

export default Dashboard;
