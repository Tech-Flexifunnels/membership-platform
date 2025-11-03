import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import LessonItem from './LessonItem';
import ProgressBar from './ProgressBar';

const LessonList = ({ course, currentLessonId, onLessonSelect }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const completedCount = course.lessons.filter(l => l.completed).length;

  return (
    <div className="bg-white rounded-lg shadow-card p-4">
      {/* Module Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total 1 Modules</h3>
        <ProgressBar
          total={course.lessons.length}
          completed={completedCount}
        />
      </div>

      {/* Module Card */}
      <div className="border-2 border-orange-400 rounded-lg overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 text-sm">📚</span>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-900">{course.title}</h4>
              <p className="text-sm text-gray-600">{course.lessons.length} Lesson</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </div>
        </button>

        {/* Lessons List */}
        {isExpanded && (
          <div className="p-4 space-y-2 max-h-96 overflow-y-auto bg-gray-50">
            {course.lessons.map((lesson, index) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                index={index}
                isActive={lesson.id === currentLessonId}
                onClick={() => onLessonSelect(lesson)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonList;
