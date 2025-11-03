import React from 'react';
import CourseCard from './CourseCard';

const CourseGrid = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No courses found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;
