import React from 'react';
import { Play, Check } from 'lucide-react';
import Badge from '../common/Badge';

const LessonItem = ({ lesson, isActive, onClick, index }) => {
  // Generate different border colors for each lesson
  const borderColors = [
    'border-blue-400',
    'border-green-400',
    'border-orange-400',
    'border-teal-400',
    'border-purple-400',
    'border-pink-400',
    'border-indigo-400',
    'border-yellow-400',
    'border-red-400',
    'border-cyan-400',
  ];
  
  const borderColor = borderColors[index % borderColors.length];
  
  const badgeColors = ['info', 'success', 'warning', 'teal', 'purple', 'pink', 'orange', 'danger'];
  const badgeColor = badgeColors[index % badgeColors.length];

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-3 rounded-lg border-2 transition-all duration-200
        ${borderColor}
        ${isActive ? 'bg-blue-50 shadow-md' : 'bg-white hover:bg-gray-50'}
        ${lesson.completed ? 'opacity-75' : ''}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <div className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            ${lesson.completed ? 'bg-green-500' : 'bg-primary-500'}
          `}>
            {lesson.completed ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white" />
            )}
          </div>
          <span className="text-sm font-medium text-gray-900 line-clamp-2">
            {lesson.title}
          </span>
        </div>
        <Badge variant={badgeColor} className="ml-2 flex-shrink-0">
          {index + 1}
        </Badge>
      </div>
    </button>
  );
};

export default LessonItem;
