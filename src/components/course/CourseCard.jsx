import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const CourseCard = ({ course }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Generate a color variant based on course id
  const colorVariants = ['pink', 'orange', 'teal', 'purple', 'info'];
  const colorIndex = parseInt(course.id.replace(/\D/g, '')) % colorVariants.length;
  const badgeColor = colorVariants[colorIndex];

  return (
    <Card className="overflow-hidden group">
      <Link to={`/course/${course.id}`}>
        {/* Course Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="danger" className="text-xs">
              {course.lessonCount}
            </Badge>
          </div>
        </div>

        {/* Course Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
            {course.title}
          </h3>

          {/* Metadata */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>{course.lessonCount} Lesson</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">{formatDate(course.enrolledDate)}</span>
            </div>
          </div>

          {/* View Course Button */}
          <div className="relative">
            <button className="w-full bg-navy text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-between group-hover:bg-navy-light transition-colors">
              <span>View Course</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <Badge 
              variant={badgeColor}
              className="absolute -top-2 -right-2 px-2 py-1"
            >
              {course.lessonCount}
            </Badge>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default CourseCard;
