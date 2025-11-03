import React from 'react';

const ProgressBar = ({ progress, total, completed, className = '' }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="font-medium text-gray-700">{percentage}%</span>
        <span className="text-gray-600">{completed}/{total} Lessons</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
